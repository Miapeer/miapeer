<script lang="ts">
    import type { PageData } from './$types';
    import { invalidate } from '$app/navigation';

    export let data: PageData;

    const lookupApplicationRole = (application_id, role_id) => {
        const filteredResults = data.applicationRoles.filter((ar) => {
            return ar.application_id === application_id && ar.role_id === role_id;
        });

        if (!filteredResults.length) {
            return null;
        }

        return filteredResults[0];
    };

    const hasPermission = (user_id, application_id, role_id) => {
        const applicationRole = lookupApplicationRole(application_id, role_id);

        if (!applicationRole) {
            return false;
        }

        return !!data.permissions.filter((p) => {
            return (
                p.user_id === user_id &&
                p.application_role_id === applicationRole.application_role_id
            );
        }).length;
    };

    const permit = async (userId, applicationId, RoleId) => {
        await updateUserPermission(userId, applicationId, RoleId, true);
    };

    const deny = async (userId, applicationId, RoleId) => {
        await updateUserPermission(userId, applicationId, RoleId, false);
    };

    const updateUserPermission = async (userId, applicationId, roleId, permit) => {
        let applicationRole;
        const applicationRoles = data.applicationRoles.filter(
            (ar) => ar.application_id === applicationId && ar.role_id === roleId
        );

        if (applicationRoles.length === 1) {
            applicationRole = applicationRoles[0];
        }

        let permission;
        const permissions = data.permissions.filter(
            (p) =>
                p.user_id === userId &&
                p.application_role_id === applicationRole.application_role_id
        );
        if (permissions.length === 1) {
            permission = permissions[0];
        } else if (permissions.length > 1) {
            // TODO: If there's multiple (how would that even happen?), just send multiple DELETEs?
            console.log(permissions);
        }

        const requestData = {
            userId,
            applicationRoleId: applicationRole.application_role_id,
            permissionId: permission?.permission_id,
            permit
        };

        if (applicationRole) {
            const permissionRequest = await fetch('/users', {
                method: 'POST',
                body: JSON.stringify(requestData)
            });

            if (permissionRequest.ok) {
                invalidate('miapeer:permissions');
            } else {
                console.log('NOT ok');
            }
        }
    };
</script>

<div class="container text-center">
    <!-- <div class="row">
        <div class="col-md-4"></div>
        {#each data.applications as _, index}
            <div class={`col-md-${data.roles.length} text-center`}>{data.applications[index].name}</div>
        {/each}
    </div> -->
    <div class="row">
        <div class="col-md-4" />
        <div class="col-md-8">
            <div class="row">
                <div class="col-md-2" />
                {#each data.roles as _, index}
                    <div class={`col-md-${Math.floor(10 / data.roles.length)} text-center`}>
                        {data.roles[index].name}
                    </div>
                {/each}
            </div>
        </div>
    </div>
    {#each data.users as user}
        <div class="row">
            <div class="col-md-4">
                {user.email}
            </div>
            <div class="col-md-8">
                {#each data.applications as application, applicationIndex}
                    <div class="row">
                        <div class="col-md-2">{data.applications[applicationIndex].name}</div>
                        {#each data.roles as _, roleIndex}
                            <div class={`col-md-${Math.floor(10 / data.roles.length)}`}>
                                {#if user.email === 'jep.navarra@miapeer.com' && application.name === 'Miapeer'}
                                    {#if hasPermission(user.user_id, data.applications[applicationIndex].application_id, data.roles[roleIndex].role_id)}
                                        Yes
                                    {:else}
                                        No: That's not right
                                    {/if}
                                {:else if hasPermission(user.user_id, data.applications[applicationIndex].application_id, data.roles[roleIndex].role_id)}
                                    <i
                                        class="bi bi-toggle-on"
                                        on:click={() =>
                                            deny(
                                                user.user_id,
                                                data.applications[applicationIndex].application_id,
                                                data.roles[roleIndex].role_id
                                            )}
                                    />
                                {:else}
                                    <i
                                        class="bi bi-toggle-off"
                                        on:click={() =>
                                            permit(
                                                user.user_id,
                                                data.applications[applicationIndex].application_id,
                                                data.roles[roleIndex].role_id
                                            )}
                                    />
                                {/if}
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
    .container > .row {
        border-bottom: 1px solid var(--bs-light-text);
    }

    i.bi {
        font-size: 3rem;
        cursor: pointer;
    }
</style>
