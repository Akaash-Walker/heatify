import {useNavigate} from "react-router";

export default function NoUserNav() {
    const navigate = useNavigate();

    return (
        <div className="navbar bg-base-100 shadow-sm px-8">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl" onClick={() => navigate("/")}>Heatify</a>
            </div>
        </div>
    );
}