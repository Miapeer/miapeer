<script lang="ts">
    import Switch from '$lib/Switch.svelte';

    const lookupApplicationRole = (applicationId, roleId) => {
        const filteredResults = applicationRoles.filter((ar) => {
            return ar.application_id === applicationId && ar.role_id === roleId;
        });

        if (!filteredResults.length) {
            return null;
        }

        return filteredResults[0];
    };

    const hasPermission = (userId, applicationId, roleId) => {
        const applicationRole = lookupApplicationRole(applicationId, roleId);

        if (!applicationRole) {
            return false;
        }

        return !!permissions.filter((p) => {
            return (
                p.user_id === userId &&
                p.application_role_id === applicationRole.application_role_id
            );
        }).length;
    };

    export let user;
    export let roles = [];
    export let applications = [];
    export let applicationRoles = [];
    export let permissions = [];
    export let permit;
    export let deny;
</script>

<div class="user-row">
    <h2 class="user">
        {user.email}
    </h2>
    {#each applications as application, applicationIndex}
        {#each roles as role, roleIndex}
            <div class={`role${roleIndex + 1}`}>{role.name}</div>
            <div class={`app${applicationIndex + 1}`}>{application.name}</div>

            <div class={`app${applicationIndex + 1}-role${roleIndex + 1}`}>
                {#if user.email === 'jep.navarra@miapeer.com' && application.name === 'Miapeer' && roles[roleIndex].name === 'User'}
                    {#if hasPermission(user.user_id, applications[applicationIndex].application_id, roles[roleIndex].role_id)}
                        Yes
                    {:else}
                        No: ...and that's ok
                    {/if}
                {:else if user.email === 'jep.navarra@miapeer.com' && application.name === 'Miapeer'}
                    {#if hasPermission(user.user_id, applications[applicationIndex].application_id, roles[roleIndex].role_id)}
                        Yes
                    {:else}
                        No: That's not right!
                    {/if}
                {:else}
                    <div class="switch-wrap">
                        <Switch
                            containButton={true}
                            checked={hasPermission(
                                user.user_id,
                                applications[applicationIndex].application_id,
                                roles[roleIndex].role_id
                            )}
                            onSwitchOn={() => {
                                permit(user.user_id, application.application_id, role.role_id);
                            }}
                            onSwitchOff={() => {
                                deny(user.user_id, application.application_id, role.role_id);
                            }}
                        />
                    </div>
                {/if}
            </div>
        {/each}
    {/each}
</div>

<style>
    .user-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-areas:
            'user user user user'
            '... role1 role2 role3'
            'app1 app1-role1 app1-role2 app1-role3'
            'app2 app2-role1 app2-role2 app2-role3';
    }

    .user {
        grid-area: user;
    }

    .role1 {
        grid-area: role1;
    }

    .role2 {
        grid-area: role2;
    }

    .role3 {
        grid-area: role3;
    }

    .app1 {
        grid-area: app1;
    }

    .app2 {
        grid-area: app2;
    }

    .app1-role1 {
        grid-area: app1-role1;
    }

    .app1-role2 {
        grid-area: app1-role2;
    }

    .app1-role3 {
        grid-area: app1-role3;
    }

    .app2-role1 {
        grid-area: app2-role1;
    }

    .app2-role2 {
        grid-area: app2-role2;
    }

    .app2-role3 {
        grid-area: app2-role3;
    }

    .switch-wrap {
        height: 2em;
        width: 4em;
        padding: 0.25em;
    }
</style>
