import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { nurse_destroy, nurse_index, nurse_store, nurse_update } from '../api/nurse';
import checkAuth from '../hoc/checkAuth';

function NursePage() {
    const [nurseDialog, setNurseDialog] = useState(false);
    const [deleteNurDialog, setNurDeleteDialog] = useState(null);
    const [editNurDialog, setNurEditDialog] = useState(null);
    const [nurse_rows, setNurRows] = useState([]);
    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);

    const user = useSelector(state => state.auth.user);
    const [cookies, setCookie, removeCookie] = useCookies();
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
                    <Button onClick={() => setNurEditDialog(params.row)} variant="contained" color="warning">Edit</Button>
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
                    const updatedRows = res.data.map((nurse, index) => ({
                        ...nurse,
                        id: index + 1, // Assuming there is an ID or another unique identifier available in the data
                    }));
                    setNurRows(updatedRows);
                } else {
                    toast.error(res?.message ?? "Something went wrong while fetching nurses");
                }
            })
            .catch(error => {
                console.error("Error fetching nurse data:", error);
                toast.error("Failed to fetch nurse data");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onNurCreate = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                user_id: $("#nur_user_id").val(),
                name: $("#nurse_name").val(),
                address: $("#nurseaddress").val(),
                hire_date: $("#nur_hire_date").val()
            };
            nurse_store(body)
                .then(res => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Nurse has been created successfully");
                        setNurseDialog(false);
                        setWarnings({});
                        refreshData();
                    } else {
                        toast.error(res?.message ?? "Failed to create nurse");
                        setWarnings(res?.errors);
                    }
                })
                .catch(error => {
                    console.error("Error creating nurse:", error);
                    toast.error("Failed to create nurse");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const onNurDelete = () => {
        if (!loading) {
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
        }
    };

    const onNurEdit = () => {
        if (!loading) {
            setLoading(true);
            nurse_update({
                user_id: editNurDialog.user_id,
                name: editNurDialog.name,
                address: editNurDialog.address,
                hire_date: editNurDialog.hire_date,
            }, editNurDialog.id)
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
        }
    };

    const onLogout = () => {
        removeCookie("AUTH_TOKEN");
        dispatch(logout());
        navigate("/login");
        toast.success("Logged Out!");
    };

    return (
        <Box>
            <Typography variant="h1">Hello {user?.profile.last_name}, {user?.profile.first_name ?? "Guest"}</Typography>
            {user ? (
                <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'end', py: 2 }}>
                        <Button sx={{ mr: 5 }} onClick={() => setNurseDialog(true)}>Create Nurse</Button>
                        <Button sx={{ mr: 5 }}><Link to="/Home">Users</Link></Button>
                        <Button sx={{ mr: 2 }} onClick={onLogout} variant="contained" color="error">Logout</Button>
                    </Box>
                    <DataGrid sx={{ height: '500px' }} columns={nurColumns} rows={nurse_rows} />
                    <Dialog open={!!nurseDialog}>
                        <DialogTitle>Create A Nurse</DialogTitle>
                        <DialogContent>
                            <Box component="form" onSubmit={onNurCreate} sx={{ width: 300, mx: 'auto' }}>
                                <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="nurse-label">Nurse</InputLabel>
                                        <Select
                                            labelId="nurse-label"
                                            id="nur_user_id"
                                            defaultValue=""
                                            label="Nurse"
                                        >
                                            {nurse_rows.map((nurse) => (
                                                <MenuItem key={nurse.id} value={nurse.id}>{nurse.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {warnings?.nurse_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.nurse_id}</Typography>}
                                    </FormControl>
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField required id="nurse_name" fullWidth size="small" label="Nurse Name" />
                                    {warnings?.name && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.name}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField required id="nurseaddress" fullWidth size="small" label="Address" />
                                    {warnings?.address && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.address}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField required id="nur_hire_date" fullWidth size="small" label="Hire Date" type="date" />
                                    {warnings?.hire_date && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.hire_date}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1, textAlign: 'center' }}>
                                    <Button id="nursubmit_btn" disabled={loading} type="submit" sx={{ display: 'none' }}></Button>
                                </Box>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setNurseDialog(false)} color='info'>Close</Button>
                            <Button onClick={() => { $("#nursubmit_btn").trigger("click") }}>Create</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={!!deleteNurDialog}>
                        <DialogTitle>Are you Sure?</DialogTitle>
                        <DialogContent>
                            <Typography>Do you want to delete this Nurse with ID: {deleteNurDialog}?</Typography>
                        </DialogContent>
                        <DialogActions sx={{ display: !!deleteNurDialog ? "flex" : 'none' }}>
                            <Button onClick={() => setNurDeleteDialog(null)}>Cancel</Button>
                            <Button disabled={loading} onClick={onNurDelete}>Confirm</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={!!editNurDialog}>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogContent>
                            <Box component="form" onSubmit={onNurEdit} sx={{ width: 300, mx: 'auto' }}>
                                <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="nurse-label">Nurse</InputLabel>
                                        <Select
                                            labelId="nurse-label"
                                            id="nur_user_id"
                                            defaultValue=""
                                            label="Nurse"
                                        >
                                            {nurse_rows.map((nurse) => (
                                                <MenuItem key={nurse.id} value={nurse.id}>{nurse.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {warnings?.nurse_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.nurse_id}</Typography>}
                                    </FormControl>
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField required id="nurse_name" fullWidth size="small" label="Nurse Name" />
                                    {warnings?.name && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.name}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField required id="nurseaddress" fullWidth size="small" label="Address" />
                                    {warnings?.address && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.address}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField required id="nur_hire_date" fullWidth size="small" label="Hire Date" type="date" />
                                    {warnings?.hire_date && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.hire_date}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1, textAlign: 'center' }}>
                                    <Button id="nurEdit_btn" disabled={loading} type="submit" sx={{ display: 'none' }}></Button>
                                </Box>
                            </Box>
                        </DialogContent>
                        <DialogActions sx={{ display: !!editNurDialog ? "flex" : 'none' }}>
                            <Button onClick={() => setNurEditDialog(null)}>Close</Button>
                            <Button disabled={loading} onClick={() => $("#nurEdit_btn").trigger("click")}>Update</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            ) : null}
        </Box>
    );
}

export default checkAuth(NursePage);
