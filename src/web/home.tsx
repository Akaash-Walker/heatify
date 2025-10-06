import Navbar from "./components/navbar.tsx";
import LoginButton from "./components/loginButton.tsx";

export default function Home() {

    // display the message
    return (
        <>
            <Navbar/>
            <div className={"flex flex-col items-center justify-center"}>
                <LoginButton/>
            </div>
        </>
    );
}