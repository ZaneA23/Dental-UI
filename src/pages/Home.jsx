import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import checkAuth from '../hoc/checkAuth'
import { DataGrid } from '@mui/x-data-grid'
import { useCookies } from 'react-cookie'
import { destroy, index, store, update } from '../api/user'
import { toast } from 'react-toastify'
import $ from 'jquery'
import { logout } from '../redux/authSlice'
import { Navigate, useNavigate } from 'react-router-dom'

function Home() {
    const [rows, setRows] = useState([])
    const [warnings, setWarnings] = useState({})
    const [loading, setLoading] = useState(false)
    const [createDialog, setCreateDialog] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(null)
    const [editDialog, setEditDialog] = useState(null)
    const user = useSelector(state => state.auth.user)
    const [cookies, setCookie, removeCookie] = useCookies()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const columns = [
        {field: 'id', headerName: 'ID'},
        {field: 'name', headerName: 'Username'},
        {field: 'email', headerName: 'Email'},
        {field: 'first_name', headerName: 'First Name'},
        {field: 'middle_name', headerName: 'Middle Name'},
        {field: 'last_name', headerName: 'Last Name'},
        {field: 'contact', headerName: 'Contact'},
        {field: 'address', headerName: 'Address'},
        {field: 'birth_date', headerName: 'Birth Date'},
        {field: 'actions', headerName: '', sortable: false, filterable: false, renderCell: params => (
            <Box sx={{display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <Button onClick={() => setEditDialog({...params.row})} variant="contained" color="warning">Edit</Button>
                <Button onClick={() => setDeleteDialog(params.row.id)} variant="contained" color="error">Delete</Button>
            </Box>
        ), minWidth: 200, hideable: false} 
    ]

    const onLogout = () => {
        removeCookie("AUTH_TOKEN")
        dispatch(logout())
        navigate("/login")
        toast.success("Logged Out!")
    } 
    
    const refreshData = () => {
        index(cookies.AUTH_TOKEN).then(res => {
            if(res?.ok){
                res.data = res.data.map(d => {
                    d = {...d, ...d.profile}
                    return d
                })
                setRows(res.data)
            } else{
                toast.error(res?.message ?? "Something went Wrong")
            }
        })
    }
    useEffect(refreshData, [])

    const onCreate = (e) => {
        e.preventDefault()
        if(!loading){
            const body = {
                name: $("#name").val(),
                email: $("#email").val(),
                password: $("#password").val(),
                password_confirmation: $("#password_confirmation").val(),
                first_name: $("#first_name").val(),
                last_name: $("#last_name").val(),
                middle_name: $("#middle_name").val(),
                contact: $("#contact").val(),
                address: $("#address").val(),
                birth_date: $("#birth_date").val()
            }
            store(body, cookies.AUTH_TOKEN).then(res => {
                if(res?.ok){
                    toast.success(res?.message ?? "Account has been created")
                    setCreateDialog(false)
                    setWarnings({})
                    refreshData()
                }else{
                    toast.error(res?.message ?? "Something went wrong.")
                    setWarnings(res?.errors)
                }
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    const onDelete = (e) => {
        if(!loading){
            destroy(deleteDialog, cookies.AUTH_TOKEN).then(res => {
                if(res?.ok){
                    toast.success(res?.message ?? "User has been deleted")
                    refreshData()
                    setDeleteDialog(null)
                } else{
                    toast.error("Something went Wrong")
                }
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    const onEdit = () => {
        e.preventDefault()
        if(!loading){
            setLoading(true)
            update({
                email: editDialog.email,
                first_name: editDialog.first_name,
                middle_name: editDialog.middle_name,
                last_name: editDialog.last_name,
                contact: editDialog.contact,
                address: editDialog.address,
                birth_date: editDialog.birth_date,
            }, editDialog.id, cookies.AUTH_TOKEN).then(res => {
                if(res?.ok){
                    toast.success(res?.message ?? "User has been updated")
                    refreshData()
                    setEditDialog(null)
                } else{
                    toast.error("Something went Wrong")
                }
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    

  return (
    <Box>
        <Typography variant="h1">Hello {user?.profile.last_name}, {user?.profile.first_name ?? "Guest"}</Typography>
        {
            user ? (
                <Box sx={{mt: 2}}>
                    <Box sx={{display: 'flex', justifyContent: 'end', py: 2}}>
                        <Button sx={{mr: 5}} onClick={() => setCreateDialog(true)}>Create User</Button>
                        <Button sx={{ mr: 2 }} onClick={onLogout} variant="contained" color="error">Logout</Button>
                    </Box>
                    <DataGrid sx={{height: '500px'}} columns={columns} rows={rows} />
                    <Dialog open={!!createDialog}>
                        <DialogTitle>
                            Create a User
                        </DialogTitle>
                        <DialogContent>
                            
                            <Box component="form" onSubmit={onCreate} sx={{width: 300, mx: 'auto'}}>
                                <Box sx={{mt: 1}}>
                                    <TextField required id="name" fullWidth size="small" label="Username" />
                                    {
                                    warnings?.name ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.name}</Typography>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField required id="email" fullWidth size="small" label="Email" type="email"/>
                                    {
                                    warnings?.email ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.email}</Typography>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField required id="password" fullWidth size="small" label="Password" type="password"/>
                                    {
                                    warnings?.password ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.password}</Typography>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField required id="password_confirmation" fullWidth size="small" label="Repeat Password" type="password"/>
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField required id="first_name" fullWidth size="small" label="First Name" />
                                    {
                                    warnings?.first_name ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.first_name}</Typography>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField required id="last_name" fullWidth size="small" label="Last Name" />
                                    {
                                    warnings?.last_name ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.last_name}</Typography>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField id="middle_name" fullWidth size="small" label="Middle Name" />
                                    {
                                    warnings?.middle_name ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.middle_name}</Typography>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField id="contact" fullWidth size="small" label="Contact" />
                                    {
                                    warnings?.contact ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.contact}</Typography>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField id="address" fullWidth size="small" label="Address" />
                                    {
                                    warnings?.address ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.address}</Typography>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField required id="birth_date" fullWidth size="small" type="date" />
                                    {
                                    warnings?.birth_date ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.birth_date}</Typography>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{mt: 1, textAlign: 'center'}}>
                                    <Button id="submit_btn" disabled={loading} type="submit" sx={{display: 'none'}}></Button>
                                </Box>
                            </Box>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setCreateDialog(false)} color='info'>Close</Button>
                            <Button onClick={() => {$("submit_btn").trigger("click")}}>Create</Button>
                        
                        </DialogActions>

                    </Dialog>
                    <Dialog open={!!deleteDialog}>
                        <DialogTitle>
                            Are you Sure?
                        </DialogTitle>
                        <DialogContent>
                            <Typography>
                                Do you want to delete this user with ID: {deleteDialog}?
                            </Typography>
                        </DialogContent>
                        <DialogActions sx={{display: !!deleteDialog ? "flex" : 'none'}}>
                            <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
                            <Button disabled={loading} onClick={onDelete}>Confirm</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={!!editDialog}>
                        <DialogTitle>
                            Edit User
                        </DialogTitle>
                        <DialogContent>
                            <Box component="form" onSubmit={onEdit} sx={{p: 2}}>
                                <Box sx={{mt: 0}}>
                                    <TextField onChange={e =>setEditDialog({...editDialog, email: e.target.value})} value={editDialog?.email ?? ""} size="small" fullWidth label="email" type="email" />
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField onChange={e =>setEditDialog({...editDialog, first_name: e.target.value})} value={editDialog?.first_name ?? ""} size="small" fullWidth label="First Name" />
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField onChange={e =>setEditDialog({...editDialog, middle_name: e.target.value})} value={editDialog?.middle_name ?? ""} size="small" fullWidth label="Middle Name" />
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField onChange={e =>setEditDialog({...editDialog, last_name: e.target.value})} value={editDialog?.last_name ?? ""} size="small" fullWidth label="Last Name" />
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField onChange={e =>setEditDialog({...editDialog, contact: e.target.value})} value={editDialog?.contact ?? ""} size="small" fullWidth label="Contact" />
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField onChange={e =>setEditDialog({...editDialog, address: e.target.value})} value={editDialog?.address ?? ""} size="small" fullWidth label="Address" />
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField onChange={e =>setEditDialog({...editDialog, birth_date: e.target.value})} value={editDialog?.birth_date ?? ""} size="small" fullWidth label="Birth Date" />
                                </Box>
                                <Button id="edit-btn" type="submit" sx={{display: 'none'}}></Button>

                            </Box>
                        </DialogContent>
                        <DialogActions sx={{display: !!editDialog ? "flex" : 'none'}}>
                            <Button onClick={() => setEditDialog(null)}>Close</Button>
                            <Button disabled={loading} onClick={() => $("#edit-btn").trigger("click")}>Update</Button>
                        </DialogActions>

                    </Dialog>

                </Box>
            ) : null
        }
    </Box>
  )
}


export default checkAuth(Home)