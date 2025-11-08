<script lang="ts">
	import InputSearch from '$lib/components/input-search.svelte';
	import type { Job } from '$lib/types.js';

  const { data } = $props();
  let searchquery = $state('');
  let jobs = $state<Job[]>(data?.jobs ?? []);
  const filterJobs = $derived(() => {
        if (!searchquery) return [];
        return (jobs ?? []).filter(job =>
            job.title?.toLowerCase().includes(searchquery.toLowerCase()) ||
            job.description?.toLowerCase().includes(searchquery.toLowerCase())
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
    <a href="/job/{job.id}" class="block">
      <li class="border p-4 rounded shadow">
        <h2 class="text-xl font-semibold">{job.title}</h2>
        <p>{job.description}</p>
        <p class="text-sm text-gray-500">Location: {job.location}</p>
      </li>
    </a>
    {/each}
     {#each data?.jobs ?? [] as job}
    <a href="/job/{job.id}" class="block">
      <li class="border p-4 rounded shadow">
        <h2 class="text-xl font-semibold">{job.title}</h2>
        <p>{job.description}</p>
        <p class="text-sm text-gray-500">Location: {job.location}</p>
      </li>
    </a>
    {/each}
     {#each data?.jobs ?? [] as job}
    <a href="/job/{job.id}" class="block">
      <li class="border p-4 rounded shadow">
        <h2 class="text-xl font-semibold">{job.title}</h2>
        <p>{job.description}</p>
        <p class="text-sm text-gray-500">Location: {job.location}</p>
      </li>
    </a>
    {/each}
     {#each data?.jobs ?? [] as job}
    <a href="/job/{job.id}" class="block">
      <li class="border p-4 rounded shadow">
        <h2 class="text-xl font-semibold">{job.title}</h2>
        <p>{job.description}</p>
        <p class="text-sm text-gray-500">Location: {job.location}</p>
      </li>
    </a>
    {/each}
  </ul>
{/if}
  
{/if}
