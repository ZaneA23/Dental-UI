import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { nurse_destroy, nurse_index, nurse_store, nurse_update } from '../api/nurse';
import checkAuth from '../hoc/checkAuth';
<<<<<<< HEAD
import bg1 from './images/bg_1.jpg'
=======
import bg1 from './images/bg_1.jpg';

>>>>>>> 8104337c06823d2533d4ba8994bcfba5d13b21d9

function NursePage() {
    const [nurseDialog, setNurseDialog] = useState(false);
    const [deleteNurDialog, setNurDeleteDialog] = useState(null);
    const [editNurDialog, setNurEditDialog] = useState(null);
    const [nurseRows, setNurseRows] = useState([]);
    const [formValues, setFormValues] = useState({ name: '', address: '', hire_date: '' });
    const [editFormValues, setEditFormValues] = useState({ id: '', name: '', address: '', hire_date: '' });
    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.auth.user);
    const [cookies, , removeCookie] = useCookies();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const nurColumns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'address', headerName: 'Address', flex: 1 },
        { field: 'hire_date', headerName: 'Hire Date', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            filterable: false,
            renderCell: params => (
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
<<<<<<< HEAD
                    <Button onClick={() => handleEditOpen(params.row)} variant="contained" color="warning">Edit</Button>
=======
                    <Button onClick={() => setNurEditDialog(params.row)} variant="contained" color="primary">Edit</Button>
>>>>>>> 8104337c06823d2533d4ba8994bcfba5d13b21d9
                    <Button onClick={() => setNurDeleteDialog(params.row.id)} variant="contained" color="error">Delete</Button>
                </Box>
            ),
            minWidth: 200,
            hideable: false
        }
    ];

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = () => {
        setLoading(true);
        nurse_index(cookies.AUTH_TOKEN)
            .then(res => {
                if (res?.ok) {
                    setNurseRows(res.data || []);
                } else {
                    toast.error(res?.message ?? "Failed to fetch Nurse data");
                }
            })
            .catch(error => {
                console.error("Error fetching Nurse data:", error);
                toast.error("Failed to fetch Nurse data");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onNurCreate = (e) => {
        e.preventDefault();
        setLoading(true);
        nurse_store(formValues)
            .then(res => {
                if (res?.ok) {
                    toast.success(res?.message ?? "Nurse created successfully");
                    setNurseDialog(false);
                    setWarnings({});
                    refreshData();
                } else {
                    toast.error(res?.message ?? "Failed to create Nurse");
                    setWarnings(res?.errors);
                }
            })
            .catch(error => {
                console.error("Error creating Nurse:", error);
                toast.error("Failed to create Nurse");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onNurDelete = () => {
        setLoading(true);
        nurse_destroy(deleteNurDialog)
            .then(res => {
                if (res?.ok) {
                    toast.success(res?.message ?? "Nurse has been deleted successfully");
                    refreshData();
                    setNurDeleteDialog(null);
                } else {
                    toast.error("Failed to delete nurse");
                }
            })
            .catch(error => {
                console.error("Error deleting nurse:", error);
                toast.error("Failed to delete nurse");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onNurEdit = (e) => {
        e.preventDefault();
        setLoading(true);
        nurse_update(editFormValues, editFormValues.id)
            .then(res => {
                if (res?.ok) {
                    toast.success(res?.message ?? "Nurse has been updated successfully");
                    refreshData();
                    setNurEditDialog(null);
                } else {
                    toast.error("Failed to update nurse");
                }
            })
            .catch(error => {
                console.error("Error updating nurse:", error);
                toast.error("Failed to update nurse");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onLogout = () => {
        removeCookie("AUTH_TOKEN");
        dispatch(logout());
        navigate("/login");
        toast.success("Logged Out!");
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleEditInputChange = (e) => {
        const { id, value } = e.target;
        setEditFormValues(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleEditOpen = (nurse) => {
        setEditFormValues(nurse);
        setNurEditDialog(true);
    };

    return (
<<<<<<< HEAD
        <Box sx={{backgroundImage: `url(${bg1})`, backgroundSize: 'cover',height:'100vh'}}>
            <Typography variant="h1">Hello {user?.profile.last_name}, {user?.profile.first_name ?? "Guest"}</Typography>
            {user ? (
                <Box sx={{ mt: 2, backgroundColor: 'azure', opacity:'0.9' }}>
=======
        <Box sx={{ backgroundImage: `url(${bg1})`}}>
            <Typography variant="h1">Hello {user?.profile.last_name}, {user?.profile.first_name ?? "Guest"}</Typography>
            {user ? (
                <Box sx={{ mt: 2, backgroundColor: 'azure', opacity: '0.9'}}>
>>>>>>> 8104337c06823d2533d4ba8994bcfba5d13b21d9
                    <Box sx={{ display: 'flex', justifyContent: 'end', py: 2 }}>
                        <Button sx={{ mr: 5 }} onClick={() => setNurseDialog(true)}>Create Nurse</Button>
                        <Button sx={{ mr: 5 }}><Link to="/Home">Users</Link></Button>
                        <Button sx={{ mr: 2 }} onClick={onLogout} variant="contained" color="error">Logout</Button>
                    </Box>

                    <DataGrid sx={{ height: '500px' }} columns={nurColumns} rows={nurseRows} />
                    
                    <Dialog open={nurseDialog} onClose={() => setNurseDialog(false)}>
                        <DialogTitle>Create A Nurse</DialogTitle>
                        <DialogContent>
                            <Box component="form" onSubmit={onNurCreate} sx={{ width: 300, mx: 'auto' }}>
                                <Box sx={{ mt: 1 }}>
                                    <TextField required id="name" fullWidth size="small" label="Nurse Name" value={formValues.name} onChange={handleInputChange} />
                                    {warnings?.name && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.name}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField required id="address" fullWidth size="small" label="Address" value={formValues.address} onChange={handleInputChange} />
                                    {warnings?.address && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.address}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField required id="hire_date" fullWidth size="small" label="Hire Date" type="date" value={formValues.hire_date} onChange={handleInputChange} />
                                    {warnings?.hire_date && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.hire_date}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1, textAlign: 'center' }}>
                                    <Button type="submit" disabled={loading} sx={{ display: 'none' }}></Button>
                                </Box>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setNurseDialog(false)} color='info'>Close</Button>
                            <Button onClick={onNurCreate}>Create</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={!!deleteNurDialog} onClose={() => setNurDeleteDialog(null)}>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogContent>
                            <Typography>Do you want to delete this Nurse with ID: {deleteNurDialog}?</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setNurDeleteDialog(null)}>Cancel</Button>
                            <Button disabled={loading} onClick={onNurDelete}>Confirm</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={!!editNurDialog} onClose={() => setNurEditDialog(null)}>
                        <DialogTitle>Edit Nurse</DialogTitle>
                        <DialogContent>
                            <Box component="form" onSubmit={onNurEdit} sx={{ width: 300, mx: 'auto' }}>
                                <Box sx={{ mt: 1 }}>
                                    <TextField required id="name" fullWidth size="small" label="Nurse Name" value={editFormValues.name} onChange={handleEditInputChange} />
                                    {warnings?.name && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.name}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField required id="address" fullWidth size="small" label="Address" value={editFormValues.address} onChange={handleEditInputChange} />
                                    {warnings?.address && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.address}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField required id="hire_date" fullWidth size="small" label="Hire Date" type="date" value={editFormValues.hire_date} onChange={handleEditInputChange} />
                                    {warnings?.hire_date && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.hire_date}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1, textAlign: 'center' }}>
                                    <Button type="submit" disabled={loading} sx={{ display: 'none' }}></Button>
                                </Box>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setNurEditDialog(null)}>Close</Button>
                            <Button onClick={onNurEdit}>Update</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            ) : null}
        </Box>
    );
}

export default checkAuth(NursePage);
