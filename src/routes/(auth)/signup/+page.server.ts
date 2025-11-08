import { fail, redirect, type Actions } from '@sveltejs/kit';
import supabase from '$lib/supabaseClient';
import { createClient } from '@supabase/supabase-js';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const company_name = formData.get('company_name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const contact_number = formData.get('contact_number') as string;
    const registration_number = formData.get('registration_number') as string;
    const role = (formData.get('role') as string) || 'user';

    // Signup in Supabase Auth
    if (!email || !password) {
      return fail(400, { message: 'Email and password are required.' });
    }

    let authData = null;
    let authError: any = null;
    try {
      const res = await supabase.auth.signUp({ email, password });
      authData = (res as any).data;
      authError = (res as any).error ?? null;
    } catch (err) {
      // supabase-js may throw an AuthApiError instead of returning it in `error`.
      authError = err as any;
    }

    // If signUp succeeded normally, proceed to insert into users table.
    if (!authError) {
      const userId = authData.user?.id;
      if (!userId) {
        console.error('No user id returned from signUp:', authData);
        return fail(500, { message: 'Could not create user.' });
      }

      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: userId,
          first_name,
          last_name,
          company_name,
          email,
          role: role === 'job_poster' ? 'job_poster' : 'job_seeker',
          contact_number: contact_number ? Number(contact_number) : null,
          registration_number: registration_number ? Number(registration_number) : null
        });

      if (insertError) {
        console.error('Error inserting user row:', insertError);
        return fail(500, { message: insertError.message });
      }

      throw redirect(303, '/log-in');
    }

  // If we reach here there was an authError. Log it for debugging.
  console.error('Supabase signUp error:', authError);

    // If error is email-send rate limit and a service role key is available, try admin create user
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;

    if (authError?.status === 429 && authError?.code === 'over_email_send_rate_limit' && serviceRoleKey && supabaseUrl) {
      try {
        const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
        const { data: createdUserData, error: createErr } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { first_name, last_name, role }
        });

        if (createErr) {
          console.error('Admin create user error:', createErr);
          return fail(500, { message: createErr.message });
        }

        // createdUserData might be the created user object or contain a user property depending on SDK version
        const createdId = (createdUserData && ((createdUserData as any).id || (createdUserData as any).user?.id));
        if (!createdId) {
          console.error('Could not determine id from admin.createUser response:', createdUserData);
          return fail(500, { message: 'Could not create user (admin).' });
        }

        // Insert into users table using the admin client (service key bypasses RLS)
        const { error: insertErr } = await supabaseAdmin
          .from('users')
          .insert({
            id: createdId,
            first_name,
            last_name,
            company_name,
            email,
            role: role === 'job_poster' ? 'job_poster' : 'job_seeker',
            contact_number: contact_number ? Number(contact_number) : null,
            registration_number: registration_number ? Number(registration_number) : null
          });

        if (insertErr) {
          console.error('Error inserting user row (admin):', insertErr);
          return fail(500, { message: insertErr.message });
        }

        // Success via admin fallback
        return redirect(303, '/log-in');
      } catch (e) {
        console.error('Unexpected error in admin fallback:', e);
        return fail(500, { message: 'Unexpected server error' });
      }
    }

    // Otherwise surface the original auth error to the client
    return fail(400, { message: authError.message || 'Signup failed.' });
  }
};
