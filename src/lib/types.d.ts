export type Job = {
  id: string; // uuid
  created_at: string; // timestamp with time zone (ISO string)
  title: string | null;
  description: string | null;
  location: string | null;
  company_name: string | null;
  salary: string | null;
  apply_link: string | null;
  posted_by: string | null; // uuid, FK to user.id
};
