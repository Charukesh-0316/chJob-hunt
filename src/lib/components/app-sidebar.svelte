<script lang="ts">
 import * as Sidebar from "$lib/components/ui/sidebar/index.js";
 import { HouseIcon, BriefcaseIcon, BookmarkIcon, UserIcon, LogOutIcon } from "lucide-svelte";
 
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
 <Sidebar.Content>
  <Sidebar.Group>
   <Sidebar.GroupLabel>
    Job Hunt
   </Sidebar.GroupLabel>
   <Sidebar.GroupContent>
    <Sidebar.Menu>
     {#each items as item (item.title)}
      <Sidebar.MenuItem>
       <Sidebar.MenuButton>
        {#snippet child({ props })}
         <a href={item.url} {...props}>
          <item.icon />
          <span>{item.title}</span>
         </a>
        {/snippet}
       </Sidebar.MenuButton>
      </Sidebar.MenuItem>
     {/each}
    </Sidebar.Menu>
   </Sidebar.GroupContent>
  </Sidebar.Group>
 </Sidebar.Content>
</Sidebar.Root>