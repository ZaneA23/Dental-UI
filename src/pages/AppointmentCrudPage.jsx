import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import checkAuth from '../hoc/checkAuth'; 
import { appointment_index, appointment_store, appointment_destroy, appointment_update } from '../api/appointment'; 
import bg1 from './images/bg_1.jpg';

function AppointmentCrudPage() {
    const [dentists, setDentists] = useState([]);
    const [nurses, setNurses] = useState([]);
    const [procedures, setProcedures] = useState([]);
    const [dentist, setDentist] = useState('');
    const [nurse, setNurse] = useState('');
    const [procedure, setProcedure] = useState('');
    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.auth.user);
    const [cookies, , removeCookie] = useCookies(); 
    const [appointmentDialog, setAppointmentDialog] = useState(false);
    const [deleteAppDialog, setAppDeleteDialog] = useState(null);
    const [editAppDialog, setAppEditDialog] = useState(null);
    const [appointmentRows, setAppointmentRows] = useState([]);
    const [treatmentDate, setTreatmentDate] = useState('');
    const [treatmentTime, setTreatmentTime] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const appointmentColumns = [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'address', headerName: 'Address', flex: 1 },
        { field: 'nurse_id', headerName: 'Nurse ID', flex: 1 },
        { field: 'dentist_id', headerName: 'Dentist ID', flex: 1 },
        { field: 'procedure_id', headerName: 'Procedure ID', flex: 1 },
        { field: 'treatment_date', headerName: 'Treatment Date', flex: 1 },
        { field: 'treatment_time', headerName: 'Treatment Time', flex: 1 },
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
                toast.error(res?.message ?? "Something went wrong.");
            }
        }).catch(error => {
            console.error("Error fetching appointment data:", error);
            toast.error("Failed to fetch appointment data.");
        });
    };

    useEffect(() => {
        refreshData();
        axios.get('http://localhost:8000/api/dentists').then(res => setDentists(res.data ?? []));
        axios.get('http://localhost:8000/api/nurses').then(res => setNurses(res.data ?? []));
        axios.get('http://localhost:8000/api/procedures').then(res => setProcedures(res.data ?? []));
    }, []);

    const onAppointCreate = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                name,
                address,
                dentist_id: dentist,
                nurse_id: nurse,
                procedure_id: procedure,
                treatment_date: treatmentDate,
                treatment_time: treatmentTime,
            };
            setLoading(true);
            appointment_store(body).then(res => {
                if (res?.ok) {
                    toast.success(res?.message ?? "Appointment has been created!");
                    refreshData();
                    setAppointmentDialog(false);
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
        setLoading(true);
        appointment_destroy(deleteAppDialog).then(res => {
            if (res?.ok) {
                toast.success(res?.message ?? "Appointment has been deleted.");
                refreshData();
                setAppDeleteDialog(null);
            } else {
                toast.error("Failed to delete appointment.");
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    const onAppointEdit = e => {
        e.preventDefault();
        setLoading(true);

        const body = {
            name: editAppDialog.name, 
            address: editAppDialog.address,
            dentist_id: editAppDialog.dentist_id,
            nurse_id: editAppDialog.nurse_id,
            procedure_id: editAppDialog.procedure_id, 
            treatment_date: editAppDialog.treatment_date,
            treatment_time: editAppDialog.treatment_time
        };

        appointment_update(body, editAppDialog.id).then(res => {
            if (res?.ok) {
                toast.success(res?.message ?? "Appointment has been updated.");
                refreshData();
                setAppEditDialog(null);
            } else {
                toast.error("Failed to update appointment.");
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    const onLogout = () => {
        removeCookie("AUTH_TOKEN");
        dispatch(logout());
        navigate("/login");
        toast.success("Logged Out!");
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundImage: `url(${bg1})`, backgroundSize: 'cover' }}>
            <Typography variant="h1">Hello {user?.profile.last_name}, {user?.profile.first_name ?? "Guest"}</Typography>
            {user ? (
                <Box sx={{ mt: 2, backgroundColor: 'azure', opacity: '0.9' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'end', py: 2 }}>
                        <Button sx={{ mr: 5 }} onClick={() => setAppointmentDialog(true)}>Create Appointment</Button>
                        <Button sx={{ mr: 5 }}><Link to="/Home">Users</Link></Button>
                        <Button sx={{ mr: 2 }} onClick={onLogout} variant="contained" color="error">Logout</Button>
                    </Box>

                    <DataGrid sx={{ height: '500px' }} columns={appointmentColumns} rows={appointmentRows} />

                    <Dialog open={appointmentDialog}>
                        <DialogTitle>Create an Appointment</DialogTitle>
                        <DialogContent>
                            <form onSubmit={onAppointCreate}>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        required
                                        id="name"
                                        fullWidth
                                        size="small"
                                        label="Full Name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                    {warnings?.name && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.name}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        required
                                        id="address"
                                        fullWidth
                                        size="small"
                                        label="Address"
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                    />
                                    {warnings?.address && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.address}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Dentist</InputLabel>
                                        <Select label="Dentist" value={dentist} onChange={e => setDentist(e.target.value)}>
                                        <MenuItem value={1}>Dentist 1</MenuItem>
                                    <MenuItem value={2}>Dentist 2</MenuItem>
                                    <MenuItem value={3}>Dentist 3</MenuItem>
                                    <MenuItem value={4}>Dentist 4</MenuItem>
                                    <MenuItem value={5}>Dentist 5</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {warnings?.dentist_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.dentist_id}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Nurse</InputLabel>
                                        <Select label="Nurse" value={nurse} onChange={e => setNurse(e.target.value)}>
                                        <MenuItem value={1}>Dentist 1</MenuItem>
                                    <MenuItem value={2}>Dentist 2</MenuItem>
                                    <MenuItem value={3}>Dentist 3</MenuItem>
                                    <MenuItem value={4}>Dentist 4</MenuItem>
                                    <MenuItem value={5}>Dentist 5</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {warnings?.nurse_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.nurse_id}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Procedure</InputLabel>
                                        <Select label="Procedure" value={procedure} onChange={e => setProcedure(e.target.value)}>
                                        <MenuItem value={1}>Dentist 1</MenuItem>
                                    <MenuItem value={2}>Dentist 2</MenuItem>
                                    <MenuItem value={3}>Dentist 3</MenuItem>
                                    <MenuItem value={4}>Dentist 4</MenuItem>
                                    <MenuItem value={5}>Dentist 5</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {warnings?.procedure_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.procedure_id}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        required
                                        id="treatment_date"
                                        type="date"
                                        fullWidth
                                        size="small"
                                        label="Treatment Date"
                                        value={treatmentDate}
                                        onChange={e => setTreatmentDate(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    {warnings?.treatment_date && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.treatment_date}</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        required
                                        id="treatment_time"
                                        type="time"
                                        fullWidth
                                        size="small"
                                        label="Treatment Time"
                                        value={treatmentTime}
                                        onChange={e => setTreatmentTime(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    {warnings?.treatment_time && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.treatment_time}</Typography>}
                                </Box>
                                <DialogActions>
                                    <Button onClick={() => setAppointmentDialog(false)}>Cancel</Button>
                                    <Button type="submit" variant="contained" disabled={loading}>{loading ? "Loading..." : "Create"}</Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {deleteAppDialog && (
                        <Dialog open={Boolean(deleteAppDialog)}>
                            <DialogTitle>Delete Confirmation</DialogTitle>
                            <DialogContent>Are you sure you want to delete this appointment?</DialogContent>
                            <DialogActions>
                                <Button onClick={() => setAppDeleteDialog(null)}>Cancel</Button>
                                <Button variant="contained" color="error" onClick={onAppointDelete} disabled={loading}>{loading ? "Loading..." : "Delete"}</Button>
                            </DialogActions>
                        </Dialog>
                    )}

                    {editAppDialog && (
                        <Dialog open={Boolean(editAppDialog)}>
                            <DialogTitle>Edit Appointment</DialogTitle>
                            <DialogContent>
                                <form onSubmit={onAppointEdit}>
                                    <Box sx={{ mt: 1 }}>
                                        <TextField
                                            required
                                            id="name"
                                            fullWidth
                                            size="small"
                                            label="Full Name"
                                            value={editAppDialog.name}
                                            onChange={e => setAppEditDialog(prev => ({ ...prev, name: e.target.value }))}
                                        />
                                        {warnings?.name && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.name}</Typography>}
                                    </Box>
                                    <Box sx={{ mt: 1 }}>
                                        <TextField
                                            required
                                            id="address"
                                            fullWidth
                                            size="small"
                                            label="Address"
                                            value={editAppDialog.address}
                                            onChange={e => setAppEditDialog(prev => ({ ...prev, address: e.target.value }))}
                                        />
                                        {warnings?.address && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.address}</Typography>}
                                    </Box>
                                    <Box sx={{ mt: 1 }}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Dentist</InputLabel>
                                            <Select label="Dentist" value={editAppDialog.dentist_id} onChange={e => setAppEditDialog(prev => ({ ...prev, dentist_id: e.target.value }))}>
                                            <MenuItem value={1}>Dentist 1</MenuItem>
                                    <MenuItem value={2}>Dentist 2</MenuItem>
                                    <MenuItem value={3}>Dentist 3</MenuItem>
                                    <MenuItem value={4}>Dentist 4</MenuItem>
                                    <MenuItem value={5}>Dentist 5</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {warnings?.dentist_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.dentist_id}</Typography>}
                                    </Box>
                                    <Box sx={{ mt: 1 }}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Nurse</InputLabel>
                                            <Select label="Nurse" value={editAppDialog.nurse_id} onChange={e => setAppEditDialog(prev => ({ ...prev, nurse_id: e.target.value }))}>
                                            <MenuItem value={1}>Dentist 1</MenuItem>
                                    <MenuItem value={2}>Dentist 2</MenuItem>
                                    <MenuItem value={3}>Dentist 3</MenuItem>
                                    <MenuItem value={4}>Dentist 4</MenuItem>
                                    <MenuItem value={5}>Dentist 5</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {warnings?.nurse_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.nurse_id}</Typography>}
                                    </Box>
                                    <Box sx={{ mt: 1 }}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Procedure</InputLabel>
                                            <Select label="Procedure" value={editAppDialog.procedure_id} onChange={e => setAppEditDialog(prev => ({ ...prev, procedure_id: e.target.value }))}>
                                            <MenuItem value={1}>Dentist 1</MenuItem>
                                    <MenuItem value={2}>Dentist 2</MenuItem>
                                    <MenuItem value={3}>Dentist 3</MenuItem>
                                    <MenuItem value={4}>Dentist 4</MenuItem>
                                    <MenuItem value={5}>Dentist 5</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {warnings?.procedure_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.procedure_id}</Typography>}
                                    </Box>
                                    <Box sx={{ mt: 1 }}>
                                        <TextField
                                            required
                                            id="treatment_date"
                                            type="date"
                                            fullWidth
                                            size="small"
                                            label="Treatment Date"
                                            value={editAppDialog.treatment_date}
                                            onChange={e => setAppEditDialog(prev => ({ ...prev, treatment_date: e.target.value }))}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        {warnings?.treatment_date && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.treatment_date}</Typography>}
                                    </Box>
                                    <Box sx={{ mt: 1 }}>
                                        <TextField
                                            required
                                            id="treatment_time"
                                            type="time"
                                            fullWidth
                                            size="small"
                                            label="Treatment Time"
                                            value={editAppDialog.treatment_time}
                                            onChange={e => setAppEditDialog(prev => ({ ...prev, treatment_time: e.target.value }))}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        {warnings?.treatment_time && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.treatment_time}</Typography>}
                                    </Box>
                                    <DialogActions>
                                        <Button onClick={() => setAppEditDialog(null)}>Cancel</Button>
                                        <Button type="submit" variant="contained" disabled={loading}>{loading ? "Loading..." : "Update"}</Button>
                                    </DialogActions>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                </Box>
            ) : (
                <Typography variant="h4" sx={{ color: 'white', mt: 4 }}>Please log in to manage appointments.</Typography>
            )}
        </Box>
    );
}

export default checkAuth(AppointmentCrudPage);
