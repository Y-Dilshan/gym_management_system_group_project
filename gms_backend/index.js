import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());


// Routes
app.use('/api/users', userRoutes);


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});