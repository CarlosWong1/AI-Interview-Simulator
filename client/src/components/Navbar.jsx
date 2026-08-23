import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <>
            <nav className='flex bg-yellow-400 block px-10 py-3 items-center justify-between border-b-3 border-amber-400 md:py-5'>
                <Link to="/dashboard">
                    <span className='font-bold text-xl md:text-3xl'>PrepFlow</span>
                </Link>

                <div className='flex gap-5 md:gap-8'>
                    <Link to="/dashboard">
                        <span className={`nav font-semibold text-neutral-800 md:text-xl ${isActive('/dashboard')}`}>Home</span>
                    </Link>
                    <Link to="/interview">
                        <span className={`nav font-semibold text-neutral-800 md:text-xl ${isActive('/interview')}`}>Interview</span>
                    </Link>
                    <Link to="/results">
                        <span className={`nav font-semibold text-neutral-800 md:text-xl ${isActive('/results')}`}>Results</span>
                    </Link>
                    <Link to="/history">
                        <span className={`nav font-semibold text-neutral-800 md:text-xl ${isActive('/history')}`}>History</span>
                    </Link>
                </div>
            </nav>
        </>
    );
}