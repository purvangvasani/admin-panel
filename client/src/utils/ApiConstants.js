import { BACKEND_URL } from '../environment/AppEnvironment'

export const ApiConstants = {
  verifySession: BACKEND_URL + '/admin-panel/verify',
  register: BACKEND_URL + '/admin-panel/register',
  login: BACKEND_URL + '/admin-panel/login',
  getRoles: BACKEND_URL + '/admin-panel/role/getAll',
  addRole: BACKEND_URL + '/admin-panel/role/add',
  updateRole: BACKEND_URL + '/admin-panel/role/update',
  deleteRole: BACKEND_URL + '/admin-panel/role/delete',
}
