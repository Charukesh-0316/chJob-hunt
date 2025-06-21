<script>
  export let data;
</script>

<header class="bg-blue-600 text-white p-4">
  <nav class="flex justify-between">
    <a href="/" class="font-bold text-lg">JobPortal</a>
    <div class="space-x-4">
      <a href="/jobs">Jobs</a>
      <a href="/post-job">Post Job</a>
      <a href="/login">Login</a>
    </div>
  </nav>
</header>

<main class="p-6">
  <slot />
</main>

<footer class="bg-gray-100 p-4 text-center mt-10">
  © {new Date().getFullYear()} JobPortal. All rights reserved.
</footer>
