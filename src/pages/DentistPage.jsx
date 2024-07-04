import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { dentist_destroy, dentist_index, dentist_store, dentist_update } from '../api/dentist';
import checkAuth from '../hoc/checkAuth';

function DentistPage() {
    const [dentistDialog, setDentistDialog] = useState(false);
    const [deleteDentistDialog, setDeleteDentistDialog] = useState(null);
    const [editDentistDialog, setEditDentistDialog] = useState(null);
    const [dentistRows, setDentistRows] = useState([]); // Initialize as empty array
    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        user_id: '',
        name: '',
        address: '',
        hire_date: ''
    });

    const user = useSelector(state => state.auth.user);
    const [cookies, setCookie, removeCookie] = useCookies();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dentistColumns = [
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
                    <Button onClick={() => setEditDentistDialog(params.row)} variant="contained" color="warning">Edit</Button>
                    <Button onClick={() => setDeleteDentistDialog(params.row.id)} variant="contained" color="error">Delete</Button>
                </Box>
            ),
            minWidth: 200,
            hideable: false
        }
    ];

    useEffect(() => {
        refreshData();
    }, []); // Empty dependency array to fetch data once when component mounts

    const refreshData = () => {
        setLoading(true);
        dentist_index(cookies.AUTH_TOKEN)
            .then(res => {
                if (res?.ok) {
                    setDentistRows(res.data || []); // Update dentistRows state with fetched data
                } else {
                    toast.error(res?.message ?? "Failed to fetch dentist data");
                }
            })
            .catch(error => {
                console.error("Error fetching dentist data:", error);
                toast.error("Failed to fetch dentist data");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onCreateDentist = () => {
        setLoading(true);
        dentist_store(formValues)
            .then(res => {
                if (res?.ok) {
                    toast.success(res?.message ?? "Dentist created successfully");
                    setDentistDialog(false);
                    setWarnings({});
                    refreshData(); // Refresh data after creating dentist
                } else {
                    toast.error(res?.message ?? "Failed to create dentist");
                    setWarnings(res?.errors);
                }
            })
            .catch(error => {
                console.error("Error creating dentist:", error);
                toast.error("Failed to create dentist");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onDeleteDentist = () => {
        setLoading(true);
        dentist_destroy(deleteDentistDialog)
            .then(res => {
                if (res?.ok) {
                    toast.success(res?.message ?? "Dentist deleted successfully");
                    refreshData(); // Refresh data after deleting dentist
                    setDeleteDentistDialog(null);
                } else {
                    toast.error("Failed to delete dentist");
                }
            })
            .catch(error => {
                console.error("Error deleting dentist:", error);
                toast.error("Failed to delete dentist");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onUpdateDentist = () => {
        setLoading(true);
        dentist_update({
            user_id: editDentistDialog.user_id,
            name: editDentistDialog.name,
            address: editDentistDialog.address,
            hire_date: editDentistDialog.hire_date,
        }, editDentistDialog.id)
            .then(res => {
                if (res?.ok) {
                    toast.success(res?.message ?? "Dentist updated successfully");
                    refreshData(); // Refresh data after updating dentist
                    setEditDentistDialog(null);
                } else {
                    toast.error("Failed to update dentist");
                }
            })
            .catch(error => {
                console.error("Error updating dentist:", error);
                toast.error("Failed to update dentist");
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

    return (
        <Box>
            <Typography variant="h1">Hello {user?.profile.last_name}, {user?.profile.first_name ?? "Guest"}</Typography>
            {user ? (
                <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'end', py: 2 }}>
                        <Button sx={{ mr: 5 }} onClick={() => setDentistDialog(true)}>Create Dentist</Button>
                        <Button sx={{ mr: 5 }}><Link to="/Home">Users</Link></Button>
                        <Button sx={{ mr: 2 }} onClick={onLogout} variant="contained" color="error">Logout</Button>
                    </Box>

                        <DataGrid sx={{ height: '500px' }} columns={dentistColumns} rows={dentistRows} />
  
                    
                    <Dialog open={!!dentistDialog}>
                        <DialogTitle>Create A Dentist</DialogTitle>
                        <DialogContent>
                            <Box component="form" onSubmit={(e) => { e.preventDefault(); onCreateDentist(); }} sx={{ width: 300, mx: 'auto' }}>
                                <Box sx={{ mt: 1 }}>
                                    <TextField required id="name" fullWidth size="small" label="Dentist Name" value={formValues.name} onChange={handleInputChange} />
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
                                    <Button disabled={loading} type="submit">Create</Button>
                                </Box>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDentistDialog(false)} color='info'>Close</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={!!deleteDentistDialog}>
                        <DialogTitle>Are you Sure?</DialogTitle>
                        <DialogContent>
                            <Typography>Do you want to delete this Dentist with ID: {deleteDentistDialog}?</Typography>
                        </DialogContent>
                        <DialogActions sx={{ display: !!deleteDentistDialog ? "flex" : 'none' }}>
                            <Button onClick={() => setDeleteDentistDialog(null)}>Cancel</Button>
                            <Button disabled={loading} onClick={onDeleteDentist}>Confirm</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={!!editDentistDialog}>
                        <DialogTitle>Edit Dentist</DialogTitle>
                        <DialogContent>
                            <Box component="form" onSubmit={(e) => { e.preventDefault(); onUpdateDentist(); }} sx={{ width: 300, mx: 'auto' }}>
                                <Box sx={{ mt: 1 }}>
                                    <TextField required id="name" fullWidth size="small" label="Dentist Name" value={formValues.name} onChange={handleInputChange} />
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
                                    <Button disabled={loading} type="submit">Update</Button>
                                </Box>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setEditDentistDialog(null)}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            ) : null}
        </Box>
    );
}

export default checkAuth(DentistPage);
