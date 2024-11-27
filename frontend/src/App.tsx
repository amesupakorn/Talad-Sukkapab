import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // เรียก API จาก Backend
        axios.get('http://localhost:5001/')
            .then(response => setMessage(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1 className='text-blue-500'>Frontend Connected to Backend</h1>
            <p>Message from Backend: {message}</p>
        </div>
    );
}

export default App;
