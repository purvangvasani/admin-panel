import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCol,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import RoleService from '../../../services/role.service'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

const Role = () => {
  const [formData, setFormData] = useState({
    roleName: '',
    displayName: '',
    roleLevel: 0,
    isActive: true,
    isDeletable: true,
  })
  const [errors, setErrors] = useState({})
  const [roles, setRoles] = useState([])
  const [deleteRole, setDeleteRole] = useState({})
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    getRoles()
  }, [null])

  const getRoles = async () => {
    const response = await RoleService.getRoles()
    if (response.success) {
      setRoles(response.data)
    } else {
      toast.error(response.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]:
        name === 'isActive'
          ? setIsActive(!isActive)
          : name === 'isDeletable'
            ? setIsDeletable(!isDeletable)
            : value,
    })
  }

  const handleEditEvent = (item) => {
    setErrors({})
    setDeleteRole({})
    setFormData(item)
  }

  const handleDeleteEvent = (item) => {
    setErrors({})
    setFormData({
      roleName: '',
      displayName: '',
      roleLevel: 0,
      isActive: true,
      isDeletable: true,
    })
    setVisible(true)
    setDeleteRole(item)
  }

  const handleDelete = async () => {
    const data = await RoleService.deleteRole({ rolesId: deleteRole.rolesId })
    if (data.success) {
      toast.success(data.message)
      setVisible(false)
      setDeleteRole({})
      getRoles()
    } else {
      toast.error(data?.message || 'Something went wrong!')
    }
  }

  const handleCloseEvent = () => {
    setVisible(false)
    setDeleteRole({})
  }

  const handleSubmt = async (event) => {
    event.preventDefault()
    const newErrors = validateForm(formData)
    setErrors(newErrors)

    if (!Object.keys(newErrors).length) {
      const data = !formData?.rolesId
        ? await RoleService.addRole(formData)
        : await RoleService.updateRole(formData)
      if (data.success) {
        toast.success(data.message)
        setFormData({
          roleName: '',
          displayName: '',
          roleLevel: 0,
          isActive: true,
          isDeletable: true,
        })
        setRoles([])
        getRoles()
      } else {
        toast.error(data?.message || 'Something went wrong!')
      }
    }
  }

  const validateForm = (data) => {
    const errors = {}

    if (!data.roleName) {
      errors.roleName = 'Role Name is required'
    }
    if (!data.displayName) {
      errors.displayName = 'Display Name is required'
    }
    if (!data.roleLevel) {
      errors.roleLevel = 'Role Level is required'
    }

    return errors
  }

  return (
    <>
      <CCard>
        <CCardHeader>Role Add/Edit Form</CCardHeader>
        <CCardBody>
          <CCardText>
            <CForm className="row g-3" onSubmit={handleSubmt}>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  id="roleName"
                  name="roleName"
                  label="Role Name"
                  disabled={formData?.rolesId}
                  value={formData.roleName}
                  onChange={handleChange}
                  placeholder="admin/super/viewer"
                />
                {errors && <span>{errors?.roleName}</span>}
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  id="displayName"
                  name="displayName"
                  label="Display Name"
                  value={formData.displayName}
                  onChange={handleChange}
                  placeholder="Admin/Super/Viewer"
                />
                {errors && <span>{errors?.displayName}</span>}
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="number"
                  id="roleLevel"
                  name="roleLevel"
                  label="Role Level"
                  value={formData.roleLevel}
                  onChange={handleChange}
                />
                {errors && <span>{errors?.roleLevel}</span>}
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Submit
                </CButton>
              </CCol>
            </CForm>
          </CCardText>
        </CCardBody>
      </CCard>
      <CCard className="mt-3">
        <CCardHeader>Role List</CCardHeader>
        <CCardBody>
          <CTable striped responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Role Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Role Level</CTableHeaderCell>
                <CTableHeaderCell scope="col">Is Active?</CTableHeaderCell>
                <CTableHeaderCell scope="col">Is Deletable?</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {roles &&
                roles.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{item.displayName}</CTableDataCell>
                    <CTableDataCell>{item.roleLevel}</CTableDataCell>
                    <CTableDataCell>{item.isActive ? 'Yes' : 'No'}</CTableDataCell>
                    <CTableDataCell>{item.isDeletable ? 'Yes' : 'No'}</CTableDataCell>
                    <CTableDataCell style={{ cursor: 'pointer', display: 'flex', gap: '1rem' }}>
                      <a onClick={() => handleEditEvent(item)}>
                        <CIcon icon={cilPencil} />
                      </a>
                      {item.isDeletable && (
                        <a onClick={() => handleDeleteEvent(item)}>
                          <CIcon icon={cilTrash} />
                        </a>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              {!roles.length && (
                <CTableDataCell colSpan={4} style={{ textAlign: 'center' }}>
                  No Data Found!
                </CTableDataCell>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      {deleteRole && (
        <CModal visible={visible} onClose={handleCloseEvent}>
          <CModalHeader>
            <CModalTitle>Delete Role ({deleteRole.displayName})</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>Are you sure you want to delete this role?</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={handleCloseEvent}>
              Cancel
            </CButton>
            <CButton color="danger" style={{ color: 'white' }} onClick={handleDelete}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      )}
      <ToastContainer autoClose={2000} hideProgressBar={true} position="top-right" />
    </>
  )
}

export default Role
