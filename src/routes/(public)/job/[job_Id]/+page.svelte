<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { ChevronLeftIcon } from 'lucide-svelte';
	import JobDetails from './components/job-details.svelte';

    const { data } = $props();
</script>
<a href="/" class="inline-flex items-center gap-2">
  <Button variant="outline">
    <ChevronLeftIcon />
    <span>Back to jobs</span>
  </Button>
</a>

{#if data.job}
 <JobDetails job={data?.job} />
{:else}
  <p class="text-red-500">Job not found.</p>
{/if}