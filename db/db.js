import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const url = process.env.DB_URL;
async function connectToDatabase() {
  try {
    await connect(`${url}`, {

    });
    console.log('Connected!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectToDatabase();
