<script lang="ts">
    import MiapeerPage from '../MiapeerPage.svelte';
    import type { PageData } from './$types';

    import { invalidate } from '$app/navigation';

    import UserRow from './UserRow.svelte';

    export let data: PageData;

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
                console.error('NOT ok');
            }
        }
    };
</script>

<MiapeerPage pageTitle="Miapeer: User Management" headline="User Management" {data}>
    <section class="user-management-grid max-w-3xl mx-auto">
        {#each data.users as user}
            <div class="mt-8">
                <UserRow
                    {user}
                    roles={data.roles}
                    applications={data.applications}
                    applicationRoles={data.applicationRoles}
                    permissions={data.permissions}
                    {permit}
                    {deny}
                />
            </div>
        {/each}
    </section>
</MiapeerPage>
