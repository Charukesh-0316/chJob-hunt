<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { Building2Icon, IndianRupeeIcon, MapPinIcon } from "lucide-svelte";

    const { job }:{
        job?: {
            id: string;
            title: string;
            description: string;
            location: string;
            company_name: string;
            salary: number;
            apply_link?: string;
        }   
    } = $props();
</script>

 <div class="p-6">
    <h1 class="text-3xl font-bold mb-2">{job?.title}</h1>
    <p class="text-gray-600 mb-4"><strong>Skills required:</strong> {job?.description}</p>
    <p class="flex items-center gap-2">
  <MapPinIcon size={16} />
  <strong>Location:</strong> {job?.location}
</p>

<p class="flex items-center gap-2">
  <Building2Icon size={16} />
  <strong>Company:</strong> {job?.company_name}
</p>

<p class="flex items-center gap-2">
  <IndianRupeeIcon size={16} />
  <strong>Salary:</strong> ₹{job?.salary}
</p>
  </div>
<div class="p-6">
    <Button variant="default">
        <a href={job?.apply_link} target="_blank" rel="noopener noreferrer">
             Apply now
        </a>    
    </Button>
    </div>
