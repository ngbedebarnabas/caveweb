<script lang="ts">
  import "$lib/assets/css/app-dark.min.css";
  import "$lib/assets/css/bootstrap-dark.min.css";
  import "$lib/assets/css/custom.css";
  import "$lib/assets/css/icons.min.css";

  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import type { Refresh$result } from "$houdini";
  import { RefreshStore, SignInStore, SignIn$input } from "$houdini";
  import VerticalLayout from "$lib/common/VerticalLayout/Index.svelte";
  import { setLocale } from "$lib/helpers/i18n";
  import { onMount } from "svelte";

  const withLoader = ["/signup/program"];
  const publicRoutes = [
    "/login",
    "/signup",
    "/signup/register",
    "/signup/verify",
    "/signup/upload",
  ];

  let auth: Refresh$result | null;
  let loader: boolean;
  let isPublic: boolean;

  const refresh = new RefreshStore();
  const signin = new SignInStore();
  $: if (browser) {
    auth = $refresh.data;
    isPublic = publicRoutes.includes($page.url.pathname);
    loader = withLoader.includes($page.url.pathname);
  }

  $: if (browser && !!auth?.refresh && !!isPublic)
    goto("/", { replaceState: true });

  onMount(async () => {
    await refresh.fetch();
    setLocale();
  });
</script>

{#if $refresh.isFetching}
  <div>loading...</div>
{:else if !!auth?.refresh && !loader && !isPublic}
  <svelte:component this={VerticalLayout}>
    <slot />
  </svelte:component>
{:else if (!!auth?.refresh && loader) || isPublic}
  <slot />
{/if}

<!-- <div bind:this={video} /> -->
<style global>
  .form-floating > .form-control,
  .form-floating > .form-select {
    height: calc(3em + 12px);
    padding-top: 0;
    /* line-height: 2.20; */
  }

  .form-switch .form-check-input {
    width: 2.5em;
  }

  .border-dashed {
    border-style: dashed !important;
    border-color: var(--kt-border-dashed-color);
  }
</style>
