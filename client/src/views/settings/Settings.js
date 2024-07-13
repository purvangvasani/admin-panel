import { cilAppsSettings, cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCardText, CCol, CRow } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Settings = () => {
  return (
    <CRow className="mb-4" xs={{ gutter: 4 }}>
      <CCol style={{ cursor: 'pointer' }} sm={6} xl={4} xxl={4}>
        <Link to="/settings/role" style={{ textDecoration: 'none' }}>
          <CCard color="primary" style={{ height: '10rem' }}>
            <CCardBody>
              <CCardText>
                <h4 className="text-white">Role</h4>
                <span className="text-center">
                  <CIcon icon={cilLockLocked} height={52} className="my-4 text-white" />
                </span>
              </CCardText>
            </CCardBody>
          </CCard>
        </Link>
      </CCol>
      <CCol style={{ cursor: 'pointer' }} sm={6} xl={4} xxl={4}>
        <Link to="/settings/permission" style={{ textDecoration: 'none' }}>
          <CCard color="warning" style={{ height: '10rem' }}>
            <CCardBody>
              <CCardText>
                <h4 className="text-white">Permission</h4>
                <span className="text-center">
                  <CIcon icon={cilAppsSettings} height={52} className="my-4 text-white" />
                </span>
              </CCardText>
            </CCardBody>
          </CCard>
        </Link>
      </CCol>
    </CRow>
  )
}

export default Settings
