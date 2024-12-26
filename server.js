require('dotenv').config();
const express = require('express');
const connectToMongo = require('./config/db');
const cors = require('cors');
const { login } = require('./controllers/authController/login');
const { signup } = require('./controllers/authController/signup');
const { verifyToken } = require('./controllers/authController/verifytoken');
const { getAvailableDoctors } = require('./controllers/doctorController/fetchavailabledoctor');
const { getAvailableDoctorSlots } = require('./controllers/doctorController/fetchdoctordata');
const { getAppointmentsByUsername } = require('./controllers/appointmentController/fetch');
const { createAppointment } = require('./controllers/appointmentController/create');
const { updateAppointment } = require('./controllers/appointmentController/update');
const { deleteAppointment } = require('./controllers/appointmentController/delete');



const port = process.env.PORT;

const app = express();
// Allow all origins
app.use(cors());
app.use(express.json());

connectToMongo();

app.get('/', ((req, res)=>{
  return res.send('working fine')  
}))

//----authRoutes
app.post('/login', login);
app.post('/signup', signup);
app.post('/verifyuser', verifyToken)


//----doctorRoutes
app.get('/api/doctor/available', getAvailableDoctors);
app.get('/api/doctor/available-slots', getAvailableDoctorSlots);

//----appointmentRoutes
app.get('/api/appointment/', getAppointmentsByUsername);
app.post('/api/appointment/insert', createAppointment);
app.patch('/api/appointment/update/:appointmentId', updateAppointment);  
app.delete('/api/appointment/delete/:appointmentId', deleteAppointment); 

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
  