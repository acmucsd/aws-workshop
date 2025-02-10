import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source'; // Import your DataSource configuration
import router from './routes/tripRoutes.js';

// Create an Express server
const server = express();

server.use(cors());
server.use(express.json());

// Mount /api onto our server
server.use('/api', router);

// Connect to PostgreSQL database using TypeORM DataSource
AppDataSource.initialize()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });

// Start the server
server.listen(4000, () => {
    console.log("Server started on PORT 4000");
});
