import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, FormControl } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import checkAuth from '../hoc/checkAuth'
import { DataGrid } from '@mui/x-data-grid'
import { useCookies } from 'react-cookie'
import { promo_destroy, promo_index, promo_store, promo_update } from '../api/promo'
import { toast } from 'react-toastify'
import $ from 'jquery'
import { logout } from '../redux/authSlice'
import { Navigate, useNavigate } from 'react-router-dom'
<<<<<<< HEAD
import bg1 from './images/bg_1.jpg'
=======
import { Dropdown } from 'bootstrap'
import { DropdownButton } from 'react-bootstrap'
import { Description } from '@mui/icons-material'
import bg1 from './images/bg_1.jpg';
>>>>>>> 8104337c06823d2533d4ba8994bcfba5d13b21d9



function PromoPage() {
    const [warnings, setWarnings] = useState({})
    const [loading, setLoading] = useState(false)
    const [createDialog, setCreateDialog] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(null)
    const [editDialog, setEditDialog] = useState(null)
    const [promoDialog, setPromoDialog] = useState(false)
    const [deletePromoDialog, setPromoDeleteDialog] = useState(null)
    const [editPromoDialog, setPromoEditDialog] = useState(null)
    const [promo_rows, setPromoRows] = useState([])

    const user = useSelector(state => state.auth.user)
    const [cookies, setCookie, removeCookie] = useCookies()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    
    const promoColumns = [
        {field: 'discount', headerName: 'Discount', flex: 1},
        {field: 'description', headerName: 'Description', flex: 1},
        {field: 'price', headerName: 'Price', flex: 1},
        {field: 'promo_name', headerName: 'Promo Name', flex: 1},
        {field: 'promo_end', headerName: 'Promo End', flex: 1},
        {field: 'actions', headerName: '', sortable: false, filterable: false, renderCell: params => (
            <Box sx={{display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Button onClick={() => setPromoEditDialog({...params.row})} variant="contained" color="primary">Edit</Button>
                    <Button onClick={() => setPromoDeleteDialog(params.row.id)} variant="contained" color="error">Delete</Button>
            </Box>
            ), minWidth: 200, hideable: false}]
            const onPromoCreate = (e) => {
                e.preventDefault()
                if(!loading){
                    const body = {
                        discount: $("#discount").val(),
                        description: $("#description").val(),
                        price: $("#price").val(),
                        promo_name: $("#promo_name").val(),
                        promo_end: $("#promo_end").val()
                    }
                    promo_store(body).then(res => {
                        if(res?.ok){
                            toast.success(res?.message ?? "Account has been created")
                            setPromoDialog(false)
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
        
            const onPromoDelete = (e) => {
                if(!loading){
                    promo_destroy(deletePromoDialog).then(res => {
                        if(res?.ok){
                            toast.success(res?.message ?? "Promo has been deleted")
                            refreshData()
                            setPromoDeleteDialog(null)
                        } else{
                            toast.error("Something went Wrong")
                        }
                    }).finally(() => {
                        setLoading(false)
                    })
                }
            }
        
            const onPromoEdit = e => {
                e.preventDefault()
                if(!loading){
                    setLoading(true)
                    promo_update({
                        discount: editPromoDialog.discount,
                        description: editPromoDialog.description,
                        price: editPromoDialog.price,
                        promo_name: editPromoDialog.promo_name,
                        promo_end: editPromoDialog.promo_end,
                    }, editPromoDialog.id,).then(res => {
                        if(res?.ok){
                            toast.success(res?.message ?? "Promo has been updated")
                            refreshData()
                            setPromoEditDialog(null)
                        } else{
                            toast.error("Something went Wrong")
                        }
                    }).finally(() => {
                        setLoading(false)
                    })
                }
            }
    
    
    const onLogout = () => {
        removeCookie("AUTH_TOKEN")
        dispatch(logout())
        navigate("/login")
        toast.success("Logged Out!")
    } 
    
    
    const refreshData = () => {
        promo_index(cookies.AUTH_TOKEN).then(res => {
            if(res?.ok){
                res.data = res.data.map(d => {
                    d = {...d, ...d.profile}
                    return d
                })
                setPromoRows(res.data)
            } else{
                toast.error(res?.message ?? "Something went Wrong")
            }
        })
    }
    useEffect(refreshData, [])

    

    

  return (

=======
    <Box sx={{ backgroundImage: `url(${bg1})`}}>
        <Typography variant="h1">Hello {user?.profile.last_name}, {user?.profile.first_name ?? "Guest"}</Typography>
        {
            user ? (
                <Box sx={{mt: 2, backgroundColor: 'azure', opacity: '0.9'}}>
>>>>>>> 8104337c06823d2533d4ba8994bcfba5d13b21d9
                    <Box sx={{display: 'flex', justifyContent: 'end', py: 2}}>
                        <Button sx={{mr: 5}} onClick={() => setPromoDialog(true)}>Create Promo</Button>
                        <Button sx={{ mr: 5 }} ><Link to="/Home">Users</Link></Button>

                        <Button sx={{ mr: 2 }} onClick={onLogout} variant="contained" color="error">Logout</Button>
                    </Box>

                    <DataGrid sx={{height: '500px'}} columns={promoColumns} rows={promo_rows}/>

                    <Dialog open={!!promoDialog}>
                        <DialogTitle>
                            Create A Promo
                        </DialogTitle>
                        <DialogContent>
                            
                            <Box component="form" onSubmit={onPromoCreate} sx={{width: 300, mx: 'auto'}}>
                                
                                <Box sx={{mt: 1}}>
                                    <TextField required id="discount" fullWidth size="small" label="Discount" />
                                    {
                                    warnings?.discount ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.discount}</Typography>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField required id="description" fullWidth size="small" label="Description" />
                                    {
                                    warnings?.description ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.description}</Typography>
                                        ) : null
                                    }
                                </Box>
                                
                                <Box sx={{mt: 1}}>
                                    <TextField required id="price" fullWidth size="small" label="Price" 
                                    type="number" />
                                    {
                                    warnings?.price ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.price}</Typography>
                                        ) : null
                                    }
                                </Box>
                               
                                <Box sx={{mt: 1}}>
                                    <TextField id="promo_name" fullWidth size="small" label="Promo Name" />
                                    {
                                    warnings?.promo_name ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.promo_name}</Typography>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField id="promo_end" fullWidth size="small" label="promo_end" type="date"/>
                                    {
                                    warnings?.promo_end ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.promo_end}</Typography>
                                        ) : null
                                    }
                                </Box>
                                
                                <Box sx={{mt: 1, textAlign: 'center'}}>
                                    <Button id="promosubmit_btn" disabled={loading} type="submit" sx={{display: 'none'}}></Button>
                                </Box>
                            </Box>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setPromoDialog(false)} color='info'>Close</Button>
                            <Button onClick={() => {$("#promosubmit_btn").trigger("click")}}>Create</Button>
                        
                        </DialogActions>

                    </Dialog>
                    <Dialog open={!!deletePromoDialog}>
                        <DialogTitle>
                            Are you Sure?
                        </DialogTitle>
                        <DialogContent>
                            <Typography>
                                Do you want to delete this user with ID: {deletePromoDialog}?
                            </Typography>
                        </DialogContent>
                        <DialogActions sx={{display: !!deletePromoDialog ? "flex" : 'none'}}>
                            <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
                            <Button disabled={loading} onClick={onPromoDelete}>Confirm</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={!!editPromoDialog}>
                        <DialogTitle>
                            Edit Promo
                        </DialogTitle>
                        <DialogContent>
                            
                            <Box component="form" onSubmit={onPromoEdit} sx={{width: 300, mx: 'auto'}}>

                                <Box sx={{mt: 1}}>
                                    <TextField onChange={e =>setPromoEditDialog({...editPromoDialog, discount: e.target.value})} value={editPromoDialog?.discount ?? ""}  fullWidth size="small" label="Discount"/>
                                    {
                                    warnings?.discount ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.discount}</Typography>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField onChange={e =>setPromoEditDialog({...editPromoDialog, description: e.target.value})} value={editPromoDialog?.description ?? ""}  fullWidth size="small" label="Description" />
                                    {
                                    warnings?.description ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.description}</Typography>
                                        ) : null
                                    }
                                </Box>
                                
                                <Box sx={{mt: 1}}>
                                    <TextField onChange={e =>setPromoEditDialog({...editPromoDialog, price: e.target.value})} value={editPromoDialog?.price ?? ""}fullWidth size="small" label="Price" 
                                    type="number" />
                                    {
                                    warnings?.price ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.price}</Typography>
                                        ) : null
                                    }
                                </Box>
                               
                                <Box sx={{mt: 1}}>
                                    <TextField onChange={e =>setPromoEditDialog({...editPromoDialog, promo_name: e.target.value})} value={editPromoDialog?.promo_name ?? ""}  fullWidth size="small" label="Promo Name" />
                                    {
                                    warnings?.promo_name ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.promo_name}</Typography>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField onChange={e =>setPromoEditDialog({...editPromoDialog, promo_end: e.target.value})} value={editPromoDialog?.promo_end ?? ""} fullWidth size="small" label="promo_end" type="date" />
                                    {
                                    warnings?.promo_end ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error"> {warnings.promo_end} </Typography>
                                        ) : null
                                    }
                                </Box>
                                
                                <Box sx={{mt: 1, textAlign: 'center'}}>
                                    <Button id="promoEdit_btn" disabled={loading} type="submit" sx={{display: 'none'}}></Button>
                                </Box>
                            </Box>

                        </DialogContent>
                        <DialogActions sx={{display: !!editPromoDialog ? "flex" : 'none'}}>
                            <Button onClick={() => setPromoEditDialog(null)}>Close</Button>
                            <Button disabled={loading} onClick={() => $("#promoEdit_btn").trigger("click")}>Update</Button>
                        </DialogActions>

                    </Dialog>

                </Box>
            ) : null
        }

    </Box>
  )
}
export default checkAuth(PromoPage)