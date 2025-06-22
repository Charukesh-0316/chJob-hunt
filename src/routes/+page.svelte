<script lang="ts">
	import InputSearch from '$lib/components/input-search.svelte';

  const { data } = $props();
  let searchquery = $state('');
  const filterJobs = $derived(() => {
        if (!searchquery) return [];
        return (data?.jobs ?? []).filter(job =>
            job.title.toLowerCase().includes(searchquery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchquery.toLowerCase())
        );
    });
</script>

<div class="flex items-center justify-between ">
  <h1 class="text-2xl font-bold">Available Jobs</h1>
  <InputSearch bind:searchquery placeholder="Search jobs..." />
</div>

{#if data.jobs?.length === 0}
  <p>No jobs found.</p>
{:else}
{#if searchquery}
  <ul>
  {#each filterJobs() as job}
     <li class="border p-4 rounded shadow">
        <h2 class="text-xl font-semibold">{job.title}</h2>
        <p>{job.description}</p>
        <p class="text-sm text-gray-500">Location: {job.location}</p>
      </li>
  {/each}
</ul>
{:else}
<ul class="space-y-4">
    {#each data?.jobs ?? [] as job}
      <li class="border p-4 rounded shadow">
        <h2 class="text-xl font-semibold">{job.title}</h2>
        <p>{job.description}</p>
        <p class="text-sm text-gray-500">Location: {job.location}</p>
      </li>
    {/each}
  </ul>
{/if}
  
{/if}
