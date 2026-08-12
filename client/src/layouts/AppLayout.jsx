import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function AppLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <nav>
                <Navbar></Navbar>
            </nav>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    );
}

export default AppLayout