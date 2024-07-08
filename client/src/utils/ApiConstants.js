import { BACKEND_URL } from '../environment/AppEnvironment'

export const ApiConstants = {
  verifySession: BACKEND_URL + '/admin-panel/verify',
  register: BACKEND_URL + '/admin-panel/register',
  login: BACKEND_URL + '/admin-panel/login',
}
