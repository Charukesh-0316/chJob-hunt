<script lang="ts">
	import { SearchIcon } from "lucide-svelte";
	import Input from "./ui/input/input.svelte";

    let { searchquery = $bindable(), placeholder} : {
        searchquery?: string;
        placeholder?: string;
    } = $props();

    
</script>

<div class="flex justify-end p-4">
  <div class="relative w-full max-w-xs">
    <div class="absolute inset-y-0 left-2 flex items-center pointer-events-none">
      <SearchIcon size="1.2em" />
    </div>
    <Input
      type="search"
      bind:value={searchquery}
      placeholder={placeholder ?? "Search..."}
      class="w-full pl-10"
    />
  </div>
</div>
