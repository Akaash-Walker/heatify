import NoUserNav from "./components/noUserNav.tsx";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const navigateToLogin = () => {
        window.location.href = "/api/login";
    }
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
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/heat")}
                    >
                        View Heatmap
                    </button>
                    <button className={"btn btn-accent"} onClick={() => navigate("/test")}>Test Page</button>
                </div>
            </div>
        </div>
    );
}