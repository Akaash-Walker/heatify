import Navbar from "./components/navbar.tsx";

export default function Home() {
    return (
        <div className="h-screen flex flex-col">
            <Navbar/>
            <div className="flex-1 relative">
                <video
                    src={"world_map.mp4"}
                    autoPlay
                    muted
                    className={"w-full h-full object-cover absolute top-0 left-0"}
                />
                <div className="absolute inset-0 flex flex-col items-start justify-center w-1/3 ml-12 animate-fade-in">
                    <span className="text-white text-8xl font-bold mb-8">Visualize Your Music</span>
                    <button className="btn btn-primary">Try Now</button>
                </div>
            </div>
        </div>
    );
}