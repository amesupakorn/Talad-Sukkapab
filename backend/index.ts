import express, { Request, Response } from 'express';
import UserController from './database/controllers/user';


const app = express();
const PORT = 5001;

app.use(express.json());  

app.get('/', (req: Request, res: Response) => {  
    res.send('Hello!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/users', UserController.createUser);
app.get('/users', UserController.getAllUsers);
app.get('/users/:id', UserController.getUserById);
app.put('/users/:id', UserController.updateUser);
app.delete('/users/:id', UserController.deleteUser);
