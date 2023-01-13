<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    const lookupApplicationRole = (application_id, role_id) => {
        const filteredResults = data.applicationRoles.filter((a) => {
            return a.application_id === application_id && a.role_id === role_id;
        });

        if (!filteredResults.length) {
            return null;
        }

        return filteredResults[0];
    }

    const hasPermission = (user_id, application_id, role_id) => {
        console.log('hasPermission');
        
        const applicationRole = lookupApplicationRole(application_id, role_id);

        if (!applicationRole) {
            return false;
        }

        return !!data.permissions.filter((p) => {return p.user_id === user_id && p.application_role_id === applicationRole.application_role_id}).length;
    }
</script>

<div class="container text-center">
    <div class="row">
        <div class="col-2"></div>
        {#each data.applications as _, index}
            <div class={"col-" + data.roles.length}>{data.applications[index].name}</div>
        {/each}
    </div>
    <div class="row">
        <div class="col-2"></div>
        {#each data.applications as _}
            {#each data.roles as _, index}
                <div class="col-1">
                    {data.roles[index].name}
                </div>
            {/each}
        {/each}
    </div>
    {#each data.users as user}
        <div class="row">
            <div class="col-2">
                {user.email}
            </div>
            {#each data.applications as _, applicationIndex}
                {#each data.roles as _, roleIndex}
                    <div class="col-1">
                        {hasPermission(user.user_id, data.applications[applicationIndex].application_id, data.roles[roleIndex].role_id)}
                    </div>
                {/each}
            {/each}
        </div>
    {/each}
</div>

<!-- <style lang="sass">
    .container
        background-color: red

        .row
            background-color: green
</style> -->