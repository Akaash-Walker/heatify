import {useEffect, useState} from "react";
// using axios instead of fetch for simplicity
import axios from "axios";

export default function Home() {
    // useState to store the message contents
    const [message, setMessage] = useState('');

    // useEffect to fetch the message from the server
    useEffect(() => {
        axios.get('/api/')
            .then(response => {
                setMessage(response.data);
            })
            .catch(error => {
                console.error('Error: ', error);
            });
        // runs once on mount
    }, []);

    // display the message
    return (
        <div>
            {message}
        </div>
    );
}