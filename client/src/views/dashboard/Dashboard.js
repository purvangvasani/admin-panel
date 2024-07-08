import React from 'react'

import { CRow, CCol, CCard, CCardBody, CCardText } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBank, cilDollar } from '@coreui/icons'

const Dashboard = () => {
  return (
    <>
      <CRow className="mb-4" xs={{ gutter: 4 }}>
        <CCol sm={6} xl={4} xxl={4}>
          <CCard color="primary" style={{ height: '10rem' }}>
            <CCardBody>
              <CCardText>
                <h4 className="text-white">Deposit Requests</h4>
                <span className="text-center">
                  <CIcon icon={cilDollar} height={52} className="my-4 text-white" />
                </span>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6} xl={4} xxl={4}>
          <CCard color="info" style={{ height: '10rem' }}>
            <CCardBody>
              <CCardText>
                <h4 className="text-white">Pending Deposit Requests</h4>
                <span className="text-center">
                  <CIcon icon={cilDollar} height={52} className="my-4 text-white" />
                </span>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6} xl={4} xxl={4}>
          <CCard color="warning" style={{ height: '10rem' }}>
            <CCardBody>
              <CCardText>
                <h4 className="text-white">Withdrawal Requests</h4>
                <span className="text-center">
                  <CIcon icon={cilDollar} height={52} className="my-4 text-white" />
                </span>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6} xl={4} xxl={4}>
          <CCard color="success" style={{ height: '10rem' }}>
            <CCardBody>
              <CCardText>
                <h4 className="text-white">Pending Withdrawal Requests</h4>
                <span className="text-center">
                  <CIcon icon={cilDollar} height={52} className="my-4 text-white" />
                </span>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6} xl={4} xxl={4}>
          <CCard color="danger" style={{ height: '10rem' }}>
            <CCardBody>
              <CCardText>
                <h4 className="text-white">List of Banks</h4>
                <span className="text-center">
                  <CIcon icon={cilBank} height={52} className="my-4 text-white" />
                </span>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
