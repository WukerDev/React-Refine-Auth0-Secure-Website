import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import userRoutes from './routes/user.routes.js';
import router from './routes/user.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));


app.use('/user', userRoutes);

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);

        app.listen(8080, () => {
            console.log('Server listening on port http://localhost:8080');
        });
    } catch (error) {
        console.error(error);
    }
    }

startServer();