import supabase from "$lib/supabaseClient";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return fail(400, { message: "Email and password are required." });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      // Log the error for debugging
      console.error("Supabase login error:", error);
      return fail(400, { message: error.message || "Invalid email or password." });
    }

    const user = data.user;

    if (!user) {
      return fail(400, { message: "User not found." });
    }

    // Fetch user role from your 'user' table if not present in auth user
    let role = user.role;
    if (!role) {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (userError) {
        console.error('Error fetching role from users table:', userError);
        return fail(400, { message: 'Could not fetch user role.' });
      }
      if (!userData) {
        console.error('No user row found for id:', user.id);
        return fail(400, { message: 'Could not fetch user role.' });
      }
      role = userData.role;
    }

    // Redirect based on role
    if (role === "job_poster") {
      throw redirect(303, "/jobs");
    } else {
      throw redirect(303, "/jobs");
    }
  }
};