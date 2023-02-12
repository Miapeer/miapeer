<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import { invalidate } from '$app/navigation';
    // import {watchResize} from 'svelte-watch-resize';

    export let data: PageData;

    // let mainWidth;

    // function handleLeftResize(node) {
    //     mainWidth = node.clientWidth;
    // }

    // const getMaxWidth = () => {
    //     let max = 0;
    //     const elements = document.getElementsByClassName("sync-1");
    //     Array.from(elements).forEach((element) => {
    //         const width = parseInt(element.clientWidth);
    //         if (width > max) {
    //             max = width;
    //         }
    //     });

    //     console.log(max);

    //     return max;
    // }

    onMount(async () => {
        const s1 = getMaxWidth();

        const r = document.querySelector(':root');
        const rs = getComputedStyle(r);
        console.log(rs.getPropertyValue('--s1'));
        r.style.setProperty('--s1', `${s1}px`);
    });

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

<!-- <div class="content leftContent" use:watchResize={handleLeftResize}>
    {leftWidth}
</div> -->

<div class="container text-center">
    <!-- <div class="row">
        <div class="col-4"></div>
        {#each data.applications as _, index}
            <div class={`col-${data.roles.length} text-center`}>{data.applications[index].name}</div>
        {/each}
    </div> -->
    <div class="row">
        <div class="col sync-1" />
        <div class="col sync-2">
            <div class="row">
                <div class="col-2" />
                {#each data.roles as _, index}
                    <div class={`col-${Math.floor(10 / data.roles.length)} text-center`}>
                        {data.roles[index].name}
                    </div>
                {/each}
            </div>
        </div>
    </div>
    {#each data.users as user}
        <div class="row">
            <div class="col sync-1">
                {user.email}
            </div>
            <div class="col sync-2">
                {#each data.applications as application, applicationIndex}
                    <div class="row">
                        <div class="col-2">{data.applications[applicationIndex].name}</div>
                        {#each data.roles as _, roleIndex}
                            <div class={`col-${Math.floor(10 / data.roles.length)}`}>
                                {#if user.email === 'jep.navarra@miapeer.com' && application.name === 'Miapeer' && data.roles[roleIndex].name === 'User'}
                                    {#if hasPermission(user.user_id, data.applications[applicationIndex].application_id, data.roles[roleIndex].role_id)}
                                        Yes
                                    {:else}
                                        No: ...and that's ok
                                    {/if}
                                {:else if user.email === 'jep.navarra@miapeer.com' && application.name === 'Miapeer'}
                                    {#if hasPermission(user.user_id, data.applications[applicationIndex].application_id, data.roles[roleIndex].role_id)}
                                        Yes
                                    {:else}
                                        No: That's not right!
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
    .container {
        display: flex;
        flex-direction: column;
    }

    .container .row {
        display: flex;
        flex-direction: row;
    }

    .sync-1 {
        width: var(--s1);
    }

    /* .container .row > .col {
        width: fit-content;
    } */
    /*
    .container .row > .col-1 {
        width: 10%;
    }

    .container .row > .col-2 {
        width: 20%;
    }

    .container .row > .col-3 {
        width: 30%;
    }

    .container .row > .col-4 {
        width: 40%;
    } */

    /* .container > .row {
        border-bottom: 1px solid var(--bs-light-text);
    }

    i.bi {
        font-size: 3rem;
        cursor: pointer;
    } */
</style>
