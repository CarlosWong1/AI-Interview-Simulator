import { Outlet, Link } from "react-router-dom"

function AuthLayout() {
    return (
        <>
            <Link to="/">
                <h1 className="text-neutral-800 font-bold text-3xl cursor-pointer absolute mt-2 ml-4">PrepFlow</h1>
            </Link>
            <Outlet></Outlet>
        </>
    );
}

export default AuthLayout