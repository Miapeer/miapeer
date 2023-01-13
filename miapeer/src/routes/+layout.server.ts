// /** @type {import('./$types').LayoutServerLoad} */
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    isAuthenticated: locals.user.isAuthenticated,
    userName: locals.user.userName,
  }
}