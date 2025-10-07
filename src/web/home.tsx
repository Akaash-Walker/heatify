import NoUserNav from "./components/noUserNav.tsx";
import {useEffect} from "react";

export default function Home() {
    const navigateToLogin = () => {
        window.location.href = "/api/login";
    }

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        if (accessToken) {
            localStorage.setItem('access_token', accessToken);
            // Optionally, remove the token from the URL
            window.location.hash = '';
        }
    }, []);

    return (
        <div className="h-screen flex flex-col">
            <NoUserNav/>
            <div className="flex-1 relative">
                <video
                    src={"world_map.mp4"}
                    autoPlay
                    muted
                    className={"w-full h-full object-cover absolute top-0 left-0"}
                />
                <div className="absolute inset-0 flex flex-col items-start justify-center w-1/3 ml-12 animate-fade-in">
                    <span className="text-white text-8xl font-bold mb-8">Visualize Your Music</span>
                    <button className="btn btn-primary" onClick={navigateToLogin}>Try Now</button>
                </div>
            </div>
        </div>
    );
}