import supabase from "$lib/supabaseClient";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const { job_Id } = params;

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', job_Id)
    .single();

  if (error) {
    console.error(error);
    return { job: null, error: error.message };
  }

  return { job: data };
}