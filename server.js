require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const connectToMongo = require('./config/db');
const cors = require('cors');
const Doctor = require('./models/doctorModel');


const port = process.env.PORT;

const app = express();
// Allow all origins
app.use(cors());
app.use(express.json());

connectToMongo();

app.get('/', ((req, res)=>{
  return res.send('working fine')  
}))
app.use('/api/auth', authRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/appointment', appointmentRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
  