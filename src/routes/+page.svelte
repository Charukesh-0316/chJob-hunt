<script lang="ts">
  export let data;
</script>

<h1 class="text-2xl font-bold mb-4">Available Jobs</h1>

{#if data.jobs?.length === 0}
  <p>No jobs found.</p>
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
