import { Pool, PoolClient } from 'pg'; 
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

// ฟังก์ชันเชื่อมต่อกับ PostgreSQL
const connectDB = async (): Promise<void> => {
    const client: PoolClient = await pool.connect();
    try {
        const result = await client.query('SELECT NOW()'); 
        console.log('Connected to PostgreSQL:', result.rows);
    } catch (err: unknown) {  
        if (err instanceof Error) { 
            console.error('Error executing query', err.stack);
        } else {
            console.error('An unknown error occurred:', err);
        }
    } finally {
        client.release();
    }
};

connectDB().catch(err => console.error('Error connecting to the database', err));

export default pool;
