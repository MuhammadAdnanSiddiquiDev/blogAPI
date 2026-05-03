import app from './src/app.js'
import dotenv from 'dotenv';
import cors from 'cors'; 
import connectDB from './src/config/db.js' 
dotenv.config();


connectDB();



app.use(cors());
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})