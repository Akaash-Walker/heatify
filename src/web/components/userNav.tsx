import LogoutButton from "./logoutButton.tsx";
import {useAuth0} from "@auth0/auth0-react";

export default function UserNav() {
    const { user } = useAuth0();

    return (
        <div className="navbar bg-base-100 shadow-sm px-8">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Heatify</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 z-50 relative">
                    <li>
                        <details>
                            <summary>Welcome, {user?.name}</summary>
                            <ul className="bg-base-100 rounded-t-none p-2 w-full">
                                <li><LogoutButton/></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
}