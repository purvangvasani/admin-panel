import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect } from '@coreui/react'
import React from 'react'

const Profile = () => {
  const handleSubmit = (data) => {
    alert('Form Submitted ' + data)
  }

  return (
    <CForm className="row g-3">
      <CCol md={6}>
        <CFormInput type="text" id="firstname" name="firstname" label="First Name" />
      </CCol>
      <CCol md={6}>
        <CFormInput type="text" id="lastname" name="lastname" label="Last Name" />
      </CCol>
      <CCol md={6}>
        <CFormInput type="email" id="inputEmail4" label="Email" />
      </CCol>
      <CCol md={6}>
        <CFormInput type="password" id="inputPassword4" label="Password" />
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="button" onClick={() => handleSubmit('By PV')}>
          Submit
        </CButton>
      </CCol>
    </CForm>
  )
}

export default Profile
