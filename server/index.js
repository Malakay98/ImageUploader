import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv'
import userRoutes from './routes/users.js';
import imageRoutes from './routes/images.js';
dotenv.config()

const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(express.json({ extended: true, limit: '50MB' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));


// Routes for user
app.use('/users', userRoutes);

// Routes for images
app.use('/images', imageRoutes);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))
