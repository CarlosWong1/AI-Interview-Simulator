import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function AppLayout() {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <nav>
                <Navbar></Navbar>
            </nav>
            <main className="flex-1 overflow-hidden">
                <Outlet></Outlet>
            </main>
        </div>
    );
}

export default AppLayout