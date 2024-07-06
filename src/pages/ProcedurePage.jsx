import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { procedure_index, procedure_store, procedure_destroy, procedure_update } from '../api/procedure';
import checkAuth from '../hoc/checkAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import bg1 from './images/bg_1.jpg';
import axios from 'axios';
import $ from 'jquery'

function ProcedurePage() {
    const [deleteProDialog, setProDeleteDialog] = useState(null);
    const [editProDialog, setProEditDialog] = useState(null);
    const [procedureDialog, setProcedureDialog] = useState(false);
    const [procedureRows, setProRows] = useState([]);
    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.auth.user);
    const [cookies, , removeCookie] = useCookies();
    const [promo, setPromo] = useState('');
    const [promos, setPromos] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Columns configuration for DataGrid
    const procedureColumns = [
        { field: 'promo_id', headerName: 'Promo ID', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'cost', headerName: 'Cost', flex: 1 },
        {
            field: 'actions',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: params => (
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Button onClick={() => setProEditDialog({ ...params.row })} variant="contained" color="warning">Edit</Button>
                    <Button onClick={() => setProDeleteDialog(params.row.id)} variant="contained" color="error">Delete</Button>
                </Box>
            ),
            minWidth: 200,
            hideable: false
        }
    ];

    // Fetch promo data on component mount
    useEffect(() => {
        axios.get('http://localhost:8000/api/dentists')
            .then(res => setPromos(res.data ?? []))
            .catch(error => console.error("Error fetching promo data:", error));
    }, []);

    // Fetch procedure data on component mount and on refresh
    useEffect(() => {
        refreshData();
    }, []);

    // Function to fetch procedure data
    const refreshData = () => {
        procedure_index(cookies.AUTH_TOKEN)
            .then(res => {
                if (res?.ok) {
                    setProRows(res.data || []);
                } else {
                    toast.error(res?.message ?? "Something went wrong fetching procedure data.");
                }
            })
            .catch(error => {
                console.error("Error fetching procedure data:", error);
                toast.error("Failed to fetch procedure data.");
            });
    };

    // Function to create a new procedure
    const onProcedureCreate = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            const body = {
                promo_id: promo ,
                description: $("#pro_description").val(),
                cost: $("#cost").val()
            };
            procedure_store(body)
                .then(res => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Procedure has been created");
                        setProcedureDialog(false);
                        setWarnings({});
                        refreshData();
                    } else {
                        toast.error(res?.message ?? "Failed to create procedure.");
                        setWarnings(res?.errors);
                    }
                })
                .catch(error => {
                    console.error("Error creating procedure:", error);
                    toast.error("Failed to create procedure.");
                })
                .finally(() => setLoading(false));
        }
    };

    // Function to delete a procedure
    const onProcedureDelete = () => {
        if (!loading && deleteProDialog) {
            setLoading(true);
            procedure_destroy(deleteProDialog)
                .then(res => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Procedure has been deleted");
                        refreshData();
                        setProDeleteDialog(null);
                    } else {
                        toast.error(res?.message ?? "Failed to delete procedure.");
                    }
                })
                .catch(error => {
                    console.error("Error deleting procedure:", error);
                    toast.error("Failed to delete procedure.");
                })
                .finally(() => setLoading(false));
        }
    };


    const onProcedureEdit = e => {
        e.preventDefault();
        if (!loading && editProDialog) {
            setLoading(true);
            const { id, promo_id, description, cost } = editProDialog;
            procedure_update({ promo_id, description, cost }, id)
                .then(res => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Procedure has been updated");
                        refreshData();
                        setProEditDialog(null);
                    } else {
                        toast.error(res?.message ?? "Failed to update procedure.");
                    }
                })
                .catch(error => {
                    console.error("Error updating procedure:", error);
                    toast.error("Failed to update procedure.");
                })
                .finally(() => setLoading(false));
        }
    };

    // Function to handle logout
    const onLogout = () => {
        removeCookie("AUTH_TOKEN");
        dispatch(logout());
        navigate("/login");
        toast.success("Logged Out!");
    };

    return (
        <Box sx={{ backgroundImage: `url(${bg1})`, backgroundSize: 'cover', height: '100vh' }}>
            <Typography variant="h3" padding={'50px'} >Hello {user?.profile.last_name}, {user?.profile.first_name ?? "Guest"}</Typography>
            {user ? (
                <Box sx={{ mt: 2, backgroundColor: 'azure', opacity: '0.9' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'end', py: 2 }}>
                        <Button sx={{ mr: 5 }}><Link to="/Home">Users</Link></Button>
                        <Button sx={{ mr: 5 }} onClick={() => setProcedureDialog(true)}>Create Procedure</Button>
                        <Button sx={{ mr: 2 }} onClick={onLogout} variant="contained" color="error">Logout</Button>
                    </Box>

                    <DataGrid sx={{ height: '600px', margin: '10px', padding:'20px', border:'5px solid lightblue' }} columns={procedureColumns} rows={procedureRows} />

                    {/* Create Procedure Dialog */}
                    <Dialog open={procedureDialog}>
                        <DialogTitle>Create a Procedure</DialogTitle>
                        <DialogContent>
                            <form onSubmit={onProcedureCreate}>
                                <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="promo-label">Promo</InputLabel>
                                        <Select
                                            labelId="promo-label"
                                            id="pro_promo_id"
                                            value={promo}
                                            onChange={(e) => setPromo(e.target.value)}
                                            label="Promo"
                                        >
                                               <MenuItem value={1}>Dentist 1</MenuItem>
                                    <MenuItem value={2}>Dentist 2</MenuItem>
                                    <MenuItem value={3}>Dentist 3</MenuItem>
                                    <MenuItem value={4}>Dentist 4</MenuItem>
                                    <MenuItem value={5}>Dentist 5</MenuItem>
                                        </Select>
                                        {warnings?.promo_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.promo_id}</Typography>}
                                    </FormControl>
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        required
                                        id="pro_description"
                                        fullWidth
                                        size="small"
                                        label="Description"
                                    />
                                    {warnings?.pro_description && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.pro_description}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        required
                                        id="cost"
                                        fullWidth
                                        size="small"
                                        label="Cost"
                                        type="number"
                                    />
                                    {warnings?.cost && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.cost}</Typography>}
                                </Box>
                                <Box sx={{ mt: 2, textAlign: 'center' }}>
                                    <Button disabled={loading} type="submit" variant="contained">Create Procedure</Button>
                                </Box>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setProcedureDialog(false)} color="info">Close</Button>
                        </DialogActions>
                    </Dialog>

                    {/* Edit Procedure Dialog */}
                    <Dialog open={!!editProDialog}>
                        <DialogTitle>Edit Procedure</DialogTitle>
                        <DialogContent>
                            <form onSubmit={onProcedureEdit}>
                                <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="edit-promo-label">Promo</InputLabel>
                                        <Select
                                            labelId="edit-promo-label"
                                            id="edit_pro_promo_id"
                                            value={editProDialog?.promo_id ?? ''}
                                            onChange={(e) => setProEditDialog({ ...editProDialog, promo_id: e.target.value })}
                                            label="Promo"
                                        >
                                               <MenuItem value={1}>Dentist 1</MenuItem>
                                    <MenuItem value={2}>Dentist 2</MenuItem>
                                    <MenuItem value={3}>Dentist 3</MenuItem>
                                    <MenuItem value={4}>Dentist 4</MenuItem>
                                    <MenuItem value={5}>Dentist 5</MenuItem>
                                        </Select>
                                        {warnings?.promo_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.promo_id}</Typography>}
                                    </FormControl>
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        required
                                        id="edit_pro_description"
                                        fullWidth
                                        size="small"
                                        label="Description"
                                        value={editProDialog?.description ?? ''}
                                        onChange={(e) => setProEditDialog({ ...editProDialog, description: e.target.value })}
                                    />
                                    {warnings?.pro_description && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.pro_description}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        required
                                        id="edit_cost"
                                        fullWidth
                                        size="small"
                                        label="Cost"
                                        type="number"
                                        value={editProDialog?.cost ?? ''}
                                        onChange={(e) => setProEditDialog({ ...editProDialog, cost: e.target.value })}
                                    />
                                    {warnings?.cost && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.cost}</Typography>}
                                </Box>
                                <Box sx={{ mt: 2, textAlign: 'center' }}>
                                    <Button disabled={loading} type="submit" variant="contained">Update Procedure</Button>
                                </Box>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setProEditDialog(null)} color="info">Close</Button>
                        </DialogActions>
                    </Dialog>

                    {/* Delete Confirmation Dialog */}
                    <Dialog open={!!deleteProDialog}>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogContent>
                            <Typography>Are you sure you want to delete this procedure?</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setProDeleteDialog(null)}>Cancel</Button>
                            <Button disabled={loading} onClick={onProcedureDelete}>Delete</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            ) : null}
        </Box>
    );
}

export default checkAuth(ProcedurePage);
