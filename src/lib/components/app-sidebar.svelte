<script lang="ts">
 import * as Sidebar from "$lib/components/ui/sidebar/index.js";
 import { HouseIcon, BriefcaseIcon, BookmarkIcon, UserIcon, LogOutIcon, SunIcon, MoonIcon } from "lucide-svelte";
	import { Button } from "./ui/button";
   import { toggleMode } from "mode-watcher";

 // Menu items.
 const items = [
  {
   title: "Home",
   url: "/",
   icon: HouseIcon,
  },
  {
   title: "Browse Jobs",
   url: "/jobs",
   icon: BriefcaseIcon,
  },
  {
   title: "Saved Jobs",
   url: "/saved-jobs",
   icon: BookmarkIcon,
  },
  {
   title: "Profile",
   url: "/profile",
   icon: UserIcon,
  },
  {
    title: "logout",
    url: "/logout",
    icon: LogOutIcon,
  }
 ];
</script>
 
<Sidebar.Root>
  <Sidebar.Content class="flex flex-col h-full">
    <Sidebar.Group>
      <Sidebar.GroupLabel>Job Hunt</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each items as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={item.url} {...props}>
                    <item.icon class="mr-2" />
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>

    <Sidebar.Menu class="mt-auto">
      <Sidebar.MenuItem>
        <Sidebar.MenuButton onclick={toggleMode}>
          {#snippet child({ props })}
            <Button variant="ghost" class="w-full justify-start gap-2" {...props}>
              <SunIcon class="dark:hidden" />
              <MoonIcon class="hidden dark:block" />
              <span>Toggle Mode</span>
            </Button>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Content>
</Sidebar.Root>
