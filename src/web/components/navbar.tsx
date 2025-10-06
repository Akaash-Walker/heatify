import LoginButton from "./loginButton.tsx";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 shadow-sm px-8">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Heatify</a>
            </div>
            <div className="navbar-end">
                <LoginButton/>
            </div>
        </div>
    );
}