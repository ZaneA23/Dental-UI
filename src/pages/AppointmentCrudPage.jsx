import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import checkAuth from '../hoc/checkAuth'; // Import checkAuth correctly
import { appointment_index, appointment_store, appointment_destroy, appointment_update } from '../api/appointment'; // Adjust your API imports as per your setup

function AppointmentCrudPage() {
    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.auth.user);
    const [cookies, , removeCookie] = useCookies(); // Destructure `removeCookie` from useCookies hook
    const [appointmentDialog, setAppointmentDialog] = useState(false);
    const [deleteAppDialog, setAppDeleteDialog] = useState(null);
    const [editAppDialog, setAppEditDialog] = useState(null);
    const [appointmentRows, setAppointmentRows] = useState([]); // State for appointment data
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const appointmentColumns = [
        { field: 'nurse_id', headerName: 'Nurse ID' },
        { field: 'dentist_id', headerName: 'Dentist ID' },
        { field: 'promo_id', headerName: 'Promo ID' },
        { field: 'procedure_id', headerName: 'Procedure ID' },
        { field: 'treatment_date', headerName: 'Treatment Date' },
        { field: 'treatment_time', headerName: 'Treatment Time' },
        {
            field: 'actions', headerName: '', sortable: false, filterable: false, renderCell: params => (
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Button onClick={() => setAppEditDialog({ ...params.row })} variant="contained" color="warning">Edit</Button>
                    <Button onClick={() => setAppDeleteDialog(params.row.id)} variant="contained" color="error">Delete</Button>
                </Box>
            ), minWidth: 200, hideable: false
        }
    ];

    const refreshData = () => {
        appointment_index(cookies.AUTH_TOKEN).then(res => {
            if (res?.ok) {
                setAppointmentRows(res.data || []);
            } else {
                toast.error(res?.message ?? "Something went Wrong");
            }
        }).catch(error => {
            console.error("Error fetching appointment data:", error);
            toast.error("Failed to fetch appointment data.");
        });
    };

    useEffect(() => {
        refreshData();
    }, []);

    const onAppointCreate = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            const body = {
                nurse_id: $("#app_nurse_id").val(),
                dentist_id: $("#app_dentist_id").val(),
                procedure_id: $("#app_procedure_id").val(),
                promo_id: $("#app_promo_id").val(),
                treatment_date: $("#treatment_date").val(),
                treatment_time: $("#treatment_time").val()
            };
            appointment_store(body).then(res => {
                if (res?.ok) {
                    toast.success(res?.message ?? "Appointment has been created");
                    setAppointmentDialog(false);
                    setWarnings({});
                    refreshData();
                } else {
                    toast.error(res?.message ?? "Something went wrong.");
                    setWarnings(res?.errors);
                }
            }).finally(() => {
                setLoading(false);
            });
        }
    };

    const onAppointDelete = () => {
        if (!loading && deleteAppDialog) {
            setLoading(true);
            appointment_destroy(deleteAppDialog).then(res => {
                if (res?.ok) {
                    toast.success(res?.message ?? "Appointment has been deleted");
                    refreshData();
                    setAppDeleteDialog(null);
                } else {
                    toast.error("Failed to delete appointment.");
                }
            }).finally(() => {
                setLoading(false);
            });
        }
    };

    const onAppointEdit = (e) => {
        e.preventDefault();
        if (!loading && editAppDialog) {
            setLoading(true);
            const { id, dentist_id, nurse_id, promo_id, procedure_id, treatment_date, treatment_time } = editAppDialog;
            appointment_update({ dentist_id, nurse_id, promo_id, procedure_id, treatment_date, treatment_time }, id).then(res => {
                if (res?.ok) {
                    toast.success(res?.message ?? "Appointment has been updated");
                    refreshData();
                    setAppEditDialog(null);
                } else {
                    toast.error("Failed to update appointment.");
                }
            }).finally(() => {
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
                        <Button sx={{ mr: 5 }} onClick={() => setAppointmentDialog(true)}>Create Appointment</Button>
                        <Button sx={{ mr: 5 }} ><Link to="/Home">Users</Link></Button>
                        <Button sx={{ mr: 2 }} onClick={onLogout} variant="contained" color="error">Logout</Button>
                    </Box>

                    <DataGrid sx={{ height: '500px' }} columns={appointmentColumns} rows={appointmentRows} />

                    <Dialog open={appointmentDialog}>
                        <DialogTitle>Create an Appointment</DialogTitle>
                        <DialogContent>
                            <form onSubmit={onAppointCreate}>
                                <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="dentist-label">Dentist</InputLabel>
                                        <Select
                                            labelId="dentist-label"
                                            id="app_dentist_id"
                                            defaultValue=""
                                            label="Dentist"
                                        >
                                            {appointmentRows.map((dentist) => (
                                                <MenuItem key={dentist.id} value={dentist.id}>{dentist.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {warnings?.dentist_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.dentist_id}</Typography>}
                                    </FormControl>
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="nurse-label">Nurse</InputLabel>
                                        <Select
                                            labelId="nurse-label"
                                            id="app_nurse_id"
                                            defaultValue=""
                                            label="Nurse"
                                        >
                                            {appointmentRows.map((nurse) => (
                                                <MenuItem key={nurse.id} value={nurse.id}>{nurse.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {warnings?.nurse_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.nurse_id}</Typography>}
                                    </FormControl>
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="procedure-label">Procedure</InputLabel>
                                        <Select
                                            labelId="procedure-label"
                                            id="app_procedure_id"
                                            defaultValue=""
                                            label="Procedure"
                                        >
                                            {appointmentRows.map((procedure) => (
                                                <MenuItem key={procedure.id} value={procedure.id}>{procedure.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {warnings?.procedure_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.procedure_id}</Typography>}
                                    </FormControl>
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        id="treatment_date"
                                        fullWidth
                                        size="small"
                                        type="date"
                                    />
                                    {warnings?.treatment_date && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.treatment_date}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        required
                                        id="treatment_time"
                                        fullWidth
                                        size="small"
                                        type="time"
                                    />
                                    {warnings?.treatment_time && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.treatment_time}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1, textAlign: 'center' }}>
                                    <Button disabled={loading} type="submit" variant="contained">Create Appointment</Button>
                                </Box>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setAppointmentDialog(false)} color="info">Close</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={!!editAppDialog}>
                        <DialogTitle>Edit Appointment</DialogTitle>
                        <DialogContent>
                            <form onSubmit={onAppointEdit}>
                                <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="edit-dentist-label">Dentist</InputLabel>
                                        <Select
                                            labelId="edit-dentist-label"
                                            id="edit_app_dentist_id"
                                            value={editAppDialog?.dentist_id ?? ''}
                                            onChange={(e) => setAppEditDialog({ ...editAppDialog, dentist_id: e.target.value })}
                                            label="Dentist"
                                        >
                                            {appointmentRows.map((dentist) => (
                                                <MenuItem key={dentist.id} value={dentist.id}>{dentist.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {warnings?.dentist_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.dentist_id}</Typography>}
                                    </FormControl>
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="edit-nurse-label">Nurse</InputLabel>
                                        <Select
                                            labelId="edit-nurse-label"
                                            id="edit_app_nurse_id"
                                            value={editAppDialog?.nurse_id ?? ''}
                                            onChange={(e) => setAppEditDialog({ ...editAppDialog, nurse_id: e.target.value })}
                                            label="Nurse"
                                        >
                                            {appointmentRows.map((nurse) => (
                                                <MenuItem key={nurse.id} value={nurse.id}>{nurse.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {warnings?.nurse_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.nurse_id}</Typography>}
                                    </FormControl>
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="edit-procedure-label">Procedure</InputLabel>
                                        <Select
                                            labelId="edit-procedure-label"
                                            id="edit_app_procedure_id"
                                            value={editAppDialog?.procedure_id ?? ''}
                                            onChange={(e) => setAppEditDialog({ ...editAppDialog, procedure_id: e.target.value })}
                                            label="Procedure"
                                        >
                                            {appointmentRows.map((procedure) => (
                                                <MenuItem key={procedure.id} value={procedure.id}>{procedure.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {warnings?.procedure_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.procedure_id}</Typography>}
                                    </FormControl>
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        id="edit_treatment_date"
                                        fullWidth
                                        size="small"
                                        type="date"
                                        value={editAppDialog?.treatment_date ?? ''}
                                        onChange={(e) => setAppEditDialog({ ...editAppDialog, treatment_date: e.target.value })}
                                    />
                                    {warnings?.treatment_date && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.treatment_date}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        required
                                        id="edit_treatment_time"
                                        fullWidth
                                        size="small"
                                        type="time"
                                        value={editAppDialog?.treatment_time ?? ''}
                                        onChange={(e) => setAppEditDialog({ ...editAppDialog, treatment_time: e.target.value })}
                                    />
                                    {warnings?.treatment_time && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.treatment_time}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1, textAlign: 'center' }}>
                                    <Button disabled={loading} type="submit" variant="contained">Update Appointment</Button>
                                </Box>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setAppEditDialog(null)} color="info">Close</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={!!deleteAppDialog}>
                        <DialogTitle>Are you Sure?</DialogTitle>
                        <DialogContent>
                            <Typography>Do you want to delete this appointment with ID: {deleteAppDialog}?</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setAppDeleteDialog(null)}>Cancel</Button>
                            <Button disabled={loading} onClick={onAppointDelete}>Confirm</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            ) : null}
        </Box>
    );
}

export default checkAuth(AppointmentCrudPage);
