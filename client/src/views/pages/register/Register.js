import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
  CToastHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import AuthService from '../../../services/auth.service'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [validation, setValidation] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = (data) => {
    const errors = {}

    if (!data.firstname) {
      errors.firstname = 'First Name is required'
    }
    if (!data.lastname) {
      errors.lastname = 'Last Name is required'
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid'
    }

    if (!data.password) {
      errors.password = 'Password is required'
    } else if (data.password.length < 8) {
      errors.password = `Password must be at 
        least 8 characters long`
    } else if (data.password.length >= 8) {
      const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
      if (!passwordPattern.test(data.password)) {
        errors.password = 'Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol.'
      }
    }

    return errors
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    const hasErrors = validateForm(formData)
    setErrors(hasErrors)
    Object.keys(hasErrors).length ? setValidation(true) : setValidation(false)

    if (!Object.keys(hasErrors).length) {
      formData['role'] = '651d68659af8e51eeee0288b'
      const response = await AuthService.registerUser(formData)
      if (response.success) {
        navigate('/dashboard')
      } else {
        toast.error(response.message)
      }
    }
  }

  return (
    <>
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm validated={validation}>
                    <h1>Register</h1>
                    <p className="text-body-secondary">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="firstname"
                        type="text"
                        placeholder="First Name"
                        feedbackInvalid={errors.firstname}
                        autoFocus
                        required
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="lastname"
                        type="text"
                        feedbackInvalid={errors.lastname}
                        required
                        placeholder="Last Name"
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        name="email"
                        type="email"
                        required
                        feedbackInvalid={errors.email}
                        placeholder="Email"
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        required
                        feedbackInvalid={errors.password}
                        placeholder="Password"
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="success" onClick={handleFormSubmit}>
                        Create Account
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <ToastContainer autoClose={2000} hideProgressBar={true} position="top-right" />
        </CContainer>
      </div>
    </>
  )
}

export default Register
