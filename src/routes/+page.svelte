<script lang="ts">
  import { browser } from "$app/environment"
  import user from "$lib/graphql/user"
  import { auth, userData } from "$lib/helpers/store"
  import { onMount } from "svelte"
  import Dashboard from "$lib/components/dashboard/index.svelte"
  import type { RequiredKeys, UserData } from "$lib/interface/user_interface"
  import { RefreshStore } from "$houdini"

    const refresh = new RefreshStore()
  onMount(() => {})
</script>

{#if $refresh.data?.refresh?.id}
  <Dashboard />
{/if}
