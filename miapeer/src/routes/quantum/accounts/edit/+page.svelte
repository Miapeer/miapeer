<script lang="ts">
    // import type { PageData } from './$types';
    // import { goto, invalidateAll } from '$app/navigation';
    // import Link from "$lib/Link.svelte";
    import TextField from '$lib/TextField.svelte';

    // const handleAddNewAccount = () => {
    //     goto('./new');
    // }

    // export let data: PageData;
</script>

<h1>Create a new account</h1>

<div class="new-account-wrapper">
    <TextField placeholder="Account Name" />
    <TextField type="number" placeholder="Starting Balance" />
</div>
