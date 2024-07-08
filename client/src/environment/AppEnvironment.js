import { DEPLOYMENT_MODE } from '../utils/DeploymentConstants'
import { BACKEND_DEV_URL } from './Dev'
import { BACKEND_PROD_URL } from './Production'
import { isProductionMode } from './AppConfig'

let url

if (window.Configs) {
  if (window.Configs.deploymentEnv === DEPLOYMENT_MODE.DEV) {
    url = BACKEND_DEV_URL
  } else if (window.Configs.deploymentEnv === DEPLOYMENT_MODE.PROD) {
    url = BACKEND_PROD_URL
  }
} else {
  url = isProductionMode ? BACKEND_PROD_URL : BACKEND_DEV_URL
}

export const BACKEND_URL = url
