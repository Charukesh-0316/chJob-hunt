import { createClient, SupabaseClient } from '@supabase/supabase-js';

let adminClient: SupabaseClient | null = null;

/**
 * Returns a Supabase admin client (server-only) that uses the Service Role key.
 * - Must only be called on the server (SvelteKit server routes, actions, etc.).
 * - Requires `SUPABASE_SERVICE_ROLE_KEY` and `VITE_SUPABASE_URL` or `SUPABASE_URL`
 *   to be set in the server environment.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (typeof window !== 'undefined') {
    throw new Error('getSupabaseAdmin() should only be called on the server.');
  }

  if (adminClient) return adminClient;

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error('Missing SUPABASE_URL (VITE_SUPABASE_URL or SUPABASE_URL) in server environment');
  }
  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in server environment');
  }

  adminClient = createClient(supabaseUrl, serviceRoleKey);
  return adminClient;
}

export default getSupabaseAdmin;
