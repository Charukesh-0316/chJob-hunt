<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { toast } from "svelte-sonner";
  import { enhance } from "$app/forms";
    const data = $props();
  let email = $state('');
  let password = $state('');
  if (data.message) {
    toast.error(data.message);
  }
</script>

<form method="POST" use:enhance class="space-y-4 max-w-sm mx-auto">
  <Input name="email" bind:value={email} placeholder="Email" required />
  <Input name="password" bind:value={password} type="password" placeholder="Password" required />
  <Button type="submit">Login</Button>
  <a href="/signup" class="text-sm text-blue-500 hover:underline">Don't have an account? Sign up</a>      
</form>
