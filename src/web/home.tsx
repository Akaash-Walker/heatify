import {useEffect, useState} from "react";
// using axios instead of fetch for simplicity
import axios from "axios";
import Navbar from "./components/navbar.tsx";

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
        <>
            <Navbar/>
            <div className={"flex flex-col items-center justify-center"}>
            <label className={"label text-center mt-10"}>
                {message}
            </label>
            </div>
        </>
    );
}