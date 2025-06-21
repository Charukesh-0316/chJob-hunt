import  supabase  from "../lib/supabaseClient";


export async function load() {
  const { data, error } = await supabase
    .from('jobs')
    .select('*');

  if (error) {
    console.error(error);
  }

  return { jobs: data };
}
