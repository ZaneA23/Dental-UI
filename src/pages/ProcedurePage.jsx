import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import checkAuth from '../hoc/checkAuth'
import { DataGrid } from '@mui/x-data-grid'
import { useCookies } from 'react-cookie'
import { procedure_destroy, procedure_index, procedure_store, procedure_update } from '../api/procedure'
import { toast } from 'react-toastify'
import $ from 'jquery'
import { logout } from '../redux/authSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import { Dropdown } from 'bootstrap'
import { DropdownButton } from 'react-bootstrap'


function ProcedurePage() {
    const [deleteProDialog, setProDeleteDialog] = useState(null)
    const [editProDialog, setProEditDialog] = useState(null)
    const [procedureDialog, setProcedureDialog] = useState(false)
    const [procedure_rows, setProRows] = useState([])
    const [warnings, setWarnings] = useState({})
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.auth.user)
    const [cookies, setCookie, removeCookie] = useCookies()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const procedureColumns = [
        {field: 'promo_id', headerName: 'Promo_id'},
        {field: 'description', headerName: 'Description'},
        {field: 'cost', headerName: 'cost'},
        {field: 'actions', headerName: '', sortable: false, filterable: false, renderCell: params => (
            <Box sx={{display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Button onClick={() => setProEditDialog({...params.row})} variant="contained" color="warning">Edit</Button>
                    <Button onClick={() => setProDeleteDialog(params.row.id)} variant="contained" color="error">Delete</Button>
            </Box>
            ), minWidth: 200, hideable: false}]
            
    const onLogout = () => {
        removeCookie("AUTH_TOKEN")
        dispatch(logout())
        navigate("/login")
        toast.success("Logged Out!")
    } 
    
    const refreshData = () => {
        procedure_index(cookies.AUTH_TOKEN).then(res => {
            if(res?.ok){
                res.data = res.data.map(d => {
                    d = {...d, ...d.profile}
                    return d
                })
                setProRows(res.data)
            } else{
                toast.error(res?.message ?? "Something went Wrong")
            }
        })
    }
    useEffect(refreshData, [])

            const onProcedureCreate = (e) => {
                e.preventDefault()
                if(!loading){
                    const body = {
                        promo_id: $("#pro_promo_id").val(),
                        description: $("#pro_description").val(),
                        cost: $("#cost").val()
                    }
                    procedure_store(body).then(res => {
                        if(res?.ok){
                            toast.success(res?.message ?? "Account has been created")
                            setProcedureDialog(false)
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
        
            const onProcedureDelete = (e) => {
                if(!loading){
                    procedure_destroy(deleteProDialog).then(res => {
                        if(res?.ok){
                            toast.success(res?.message ?? "Procedure has been deleted")
                            refreshData()
                            setProDeleteDialog(null)
                        } else{
                            toast.error("Something went Wrong")
                        }
                    }).finally(() => {
                        setLoading(false)
                    })
                }
            }
        
            const onProcedureEdit = () => {
                e.preventDefault()
                if(!loading){
                    setLoading(true)
                    procedure_update({
                        promo_id: editProDialog.promo_id,
                        description: editProDialog.description,
                        cost: editProDialog.price,
                    }, editProDialog.id,).then(res => {
                        if(res?.ok){
                            toast.success(res?.message ?? "Procedure has been updated")
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
                    <Button sx={{ mr: 5 }}><Link to="/Home">Users</Link></Button>                        
                    <Button sx={{mr: 5}} onClick={() => setProcedureDialog(true)}>Create Procedures</Button>
                    <Button sx={{ mr: 2 }} onClick={onLogout} variant="contained" color="error">Logout</Button>
                    </Box>


                    <DataGrid sx={{height: '500px'}} columns={procedureColumns} rows={procedure_rows} />

                    <Dialog open={!!procedureDialog}>
                        <DialogTitle>
                            Create a Procedure
                        </DialogTitle>
                        <DialogContent>
                            
                            <Box component="form" onSubmit={onProcedureCreate} sx={{width: 300, mx: 'auto'}}>
                            <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="edit-procedure-label">Promo</InputLabel>
                                        <Select
                                            labelId="promo-label"
                                            id="pro_promo_id"
                                            value={editProDialog?.promo_id ?? ''}
                                            onChange={(e) => setProEditDialog({ ...editProDialog, promo_id: e.target.value })}
                                            label="Procedure"
                                        >
                                            {procedure_rows.map((promo) => (
                                                <MenuItem key={promo.id} value={promo.id}>{promo.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {warnings?.promo_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.promo_id}</Typography>}
                                    </FormControl>
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField required id="pro_description" fullWidth size="small" label="Description" />
                                    {
                                    warnings?.pro_description ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.pro_description}</Typography>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField required id="cost" fullWidth size="small" label="Cost" type="number"/>
                                    {
                                    warnings?.cost ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.cost}</Typography>
                                        ) : null
                                    }
                                </Box>
                            </Box>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setProcedureDialog(false)} color='info'>Close</Button>
                            <Button onClick={() => {$("submitPro_btn").trigger("click")}}>Create</Button>
                        
                        </DialogActions>

                    </Dialog>
                    <Dialog open={!!editProDialog}>
                        <DialogTitle>
                            edit a Procedure
                        </DialogTitle>
                        <DialogContent>
                            
                            <Box component="form" onSubmit={onProcedureEdit} sx={{width: 300, mx: 'auto'}}>
                            <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="edit-procedure-label">Promo</InputLabel>
                                        <Select
                                            labelId="promo-label"
                                            id="pro_promo_id"
                                            value={editProDialog?.promo_id ?? ''}
                                            onChange={(e) => setProEditDialog({ ...editProDialog, promo_id: e.target.value })}
                                            label="Procedure"
                                        >
                                            {procedure_rows.map((promo) => (
                                                <MenuItem key={promo.id} value={promo.id}>{promo.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {warnings?.promo_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.promo_id}</Typography>}
                                    </FormControl>
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField required id="pro_description" fullWidth size="small" label="Description" />
                                    {
                                    warnings?.pro_description ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.pro_description}</Typography>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <TextField required id="cost" fullWidth size="small" label="Cost" type="number"/>
                                    {
                                    warnings?.cost ? (
                                            <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.cost}</Typography>
                                        ) : null
                                    }
                                </Box>
                            </Box>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setProcedureDialog(false)} color='info'>Close</Button>
                            <Button onClick={() => {$("editPro_btn").trigger("click")}}>Create</Button>
                        
                        </DialogActions>
                    </Dialog>                
                </Box>
            ) : null
        }

    </Box>
  )
}
export default checkAuth(ProcedurePage)