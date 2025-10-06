import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./loginButton.tsx";

export default function NoUserNav() {
    const { isLoading } = useAuth0();

    return (
        <div className="navbar bg-base-100 shadow-sm px-8">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Heatify</a>
            </div>
            <div className="navbar-end">
                {isLoading ? null : <LoginButton/>}
            </div>
        </div>
    );
}