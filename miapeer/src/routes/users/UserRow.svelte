<script lang="ts">
    import { SlideToggle } from '@skeletonlabs/skeleton';

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

    const handleSwitch = (user_id, application_id, role_id) => {
        if (hasPermission(user_id, application_id, role_id)) {
            deny(user_id, application_id, role_id);
        } else {
            permit(user_id, application_id, role_id);
        }
    };

    export let user;
    export let roles = [];
    export let applications = [];
    export let applicationRoles = [];
    export let permissions = [];
    export let permit;
    export let deny;
</script>

<div>
    <h2 class="h2 mb-2">
        {user.email}
    </h2>

    <div class="table-container">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th></th>
                    {#each roles as role}
                        <th>{role.name}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each applications as application, applicationIndex}
                    <tr>
                        <td>{application.name}</td>
                        {#each roles as role, roleIndex}
                            <td>
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
                                    <SlideToggle
                                        checked={hasPermission(
                                            user.user_id,
                                            applications[applicationIndex].application_id,
                                            roles[roleIndex].role_id
                                        )}
                                        active="bg-primary-500"
                                        on:click={() => {
                                            handleSwitch(
                                                user.user_id,
                                                application.application_id,
                                                role.role_id
                                            );
                                        }}
                                    />
                                {/if}
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
