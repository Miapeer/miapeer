// /** @type {import('./$types').LayoutServerLoad} */
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  console.log({
    lastUpdate: locals.app.lastUpdate,
    isAuthenticated: locals.user.isAuthenticated,
    userName: locals.user.userName,
  });

  return {
    lastUpdate: locals.app.lastUpdate,
    isAuthenticated: locals.user.isAuthenticated,
    userName: locals.user.userName,
  }
}