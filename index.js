import express from 'express'; 
import bodyParser from 'body-parser';

import path from 'path';
import { fileURLToPath, URL } from 'url';
import { dirname } from 'path';

import restaurantsRouter from './routes/restaurants-router.js';


import mongoose from 'mongoose';
import { databaseConfig } from './config.js';





const app = express();
const PORT = 3000;
app.use(bodyParser.json());



// API routes
app.use('/restaurants', restaurantsRouter);




// // Serve static files from the 'public' directory


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.static(path.join(__dirname, 'public')));
// Serve the homepage
app.get('/' , (req , res) => {
    //console.log('[Test]');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})





// mongodb
const { connectionString } = databaseConfig;
if (!connectionString) {
    console.error('DATABASE_CONNECTION_STRING is not defined. Check your environment variables.');
    process.exit(1);
}



mongoose.connect(connectionString )
    .then(()=>app.listen(PORT))
    .then(()=>console.log(`Connected To Database and Listening To http://localhost:${PORT}`))
    .catch((err)=>console.log(err));
















