<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';

  let first_name = '';
  let last_name = '';
  let company_name = '';
  let email = '';
  let password = '';
  let role = 'job_seeker';
  let contact_number = '';
  let registration_number = '';
</script>

<form method="post" class="space-y-4 max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
  <div class="flex justify-center gap-4 mb-4">
    <Button
      type="button"
      variant={role === 'job_seeker' ? 'default' : 'outline'}
      onclick={() => role = 'job_seeker'}
    >
      Job Seeker
    </Button>
    <Button
      type="button"
      variant={role === 'job_poster' ? 'default' : 'outline'}
      onclick={() => role = 'job_poster'}
    >
      Job Poster
    </Button>
  </div>

  <Input name="first_name" bind:value={first_name} placeholder="First Name" required />
  <Input name="last_name" bind:value={last_name} placeholder="Last Name" required />

  {#if role === 'job_poster'}
    <Input name="company_name" bind:value={company_name} placeholder="Company Name" />
    <Input name="contact_number" bind:value={contact_number} type="number" placeholder="Contact Number" />

    <Input name="registration_number" bind:value={registration_number} type="number" placeholder="Registration Number" />
  {/if}

  <Input name="email" bind:value={email} type="email" placeholder="Email" required />
  <Input name="password" bind:value={password} type="password" placeholder="Password" required />
  <input type="hidden" name="role" bind:value={role} />

  <Button type="submit" class="w-full">
    Sign Up
  </Button>

</form>
