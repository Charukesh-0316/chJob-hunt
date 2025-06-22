<script lang="ts">
  import "../app.css";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
   let { children } = $props();
</script>

<Sidebar.Provider
 style="--sidebar-width: 14rem; --sidebar-width-mobile: 14rem;"
>
  <div class="flex min-h-screen w-full">
    <!-- Sidebar section -->
    <AppSidebar />

    <!-- Main content section -->
    <div class="flex-1 flex flex-col">
      <header class="bg-blue-600 text-white p-4">
        <Sidebar.Trigger class="mr-4" />
        Job Hunt
      </header>

      <main class="p-6 flex-1">
        {@render children?.()}
      </main>

      <footer class="bg-gray-100 p-4 text-center">
        © {new Date().getFullYear()} JobHunt. All rights reserved.
      </footer>
    </div>
  </div>
</Sidebar.Provider>
