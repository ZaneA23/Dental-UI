import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { appointment_store } from '../api/appointment';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import bg1 from './images/bg_1.jpg'


export default function Appointment() {
    const [dentist, setDentist] = useState('');
    const [nurse, setNurse] = useState('');
    const [procedure, setProcedure] = useState('');
    const [treatmentDate, setTreatmentDate] = useState('');
    const [treatmentTime, setTreatmentTime] = useState('');
    const [name, setName] = useState('');
    const [address,setAddress] = useState('');
    const [dentists, setDentists] = useState([]);
    const [nurses, setNurses] = useState([]);
    const [procedures, setProcedures] = useState([]);
    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://localhost:8000/api/dentists').then(res => setDentists(res.data ?? []));
        axios.get('http://localhost:8000/api/nurses').then(res => setNurses(res.data ?? []));
        axios.get('http://localhost:8000/api/procedures').then(res => setProcedures(res.data ?? []));
    }, []);
    
    const onSubmit = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                name: name,
                address: address,
                dentist_id: dentist,
                nurse_id: nurse,
                procedure_id: procedure,
                treatment_date: treatmentDate,
                treatment_time: treatmentTime,
            };
            setLoading(true);
            appointment_store(body).then(res => {
                console.log(res);
                if (res?.ok) {
                    toast.success(res?.message ?? "Appointment has been created!!");
                    navigate("/HomePage");
                } else {
                    toast.error(res?.message ?? "Something went wrong.");
                    setWarnings(res?.errors);
                }
            }).finally(() => {
                setLoading(false);
            });
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' , backgroundImage: `url(${bg1})` , backgroundSize: 'cover' }}>
            <Box sx={{ height: 500, width: 500, boxShadow: 'black 0px 0px 20px', borderRadius: 2 }}>
                <Typography variant="h4" sx={{ textAlign: 'center', mt: 2 }}>
                    Appointment
                </Typography>
                <Box component="form" onSubmit={onSubmit} sx={{ width: 300, mx: 'auto' }}>
                <Box sx={{ mt: 1 }}>
                        <TextField
                            required
                            id="name"
                            fullWidth
                            size="small"
                             label="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {warnings?.address && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.address}</Typography>}
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="dentist-label">Dentist</InputLabel>
                            <Select
                                labelId="dentist-label"
                                id="dentist"
                                value={dentist}
                                onChange={(e) => setDentist(e.target.value)}
                                label="Dentist"
                            >
                                
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
                            <InputLabel id="nurse-label">Nurse</InputLabel>
                            <Select
                                labelId="nurse-label"
                                id="nurse"
                                value={nurse}
                                onChange={(e) => setNurse(e.target.value)}
                                label="Nurse"
                            >
                                <MenuItem value={1}>Nurse 1</MenuItem>
                                <MenuItem value={2}>Nurse 2</MenuItem>
                                <MenuItem value={3}>Nurse 3</MenuItem>
                                <MenuItem value={4}>Nurse 4</MenuItem>
                                <MenuItem value={5}>Nurse 5</MenuItem>
                              
                            </Select>
                        </FormControl>
                        {warnings?.nurse_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.nurse_id}</Typography>}
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="procedure-label">Procedure</InputLabel>
                            <Select
                                labelId="procedure-label"
                                id="procedure"
                                value={procedure}
                                onChange={(e) => setProcedure(e.target.value)}
                                label="Procedure"
                            >
                                <MenuItem value={1}>procedure 1</MenuItem>
                                <MenuItem value={2}>Procedure 2</MenuItem>
                                <MenuItem value={3}>Procedure 3</MenuItem>
                                <MenuItem value={4}>Procedure 4</MenuItem>
                                <MenuItem value={5}>Procedure 5</MenuItem>
                               
                            </Select>
                        </FormControl>
                        {warnings?.procedure_id && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.procedure_id}</Typography>}
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            id="treatment_date"
                            fullWidth
                            size="small"
                            type="date"
                            value={treatmentDate}
                            onChange={(e) => setTreatmentDate(e.target.value)}
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
                            value={treatmentTime}
                            onChange={(e) => setTreatmentTime(e.target.value)}
                        />
                        {warnings?.treatment_time && <Typography sx={{ fontSize: 12 }} component="small" color="error">{warnings.treatment_time}</Typography>}
                    </Box>
                    <Box sx={{ mt: 1, textAlign: 'center' }}>
                        <Button disabled={loading} type="submit" variant="contained">Create Appointment</Button>
                    </Box>
                </Box>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Link to="/HomePage">
                        <Typography>
                            Cancel
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}
