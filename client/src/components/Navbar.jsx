import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <nav className='flex bg-yellow-400 block px-10 py-3 items-center justify-between border-b-3 border-amber-400'>
                <Link to="/dashboard">
                    <span className='font-bold text-xl'>PrepFlow</span>
                </Link>
    
                <div className='flex gap-5'>
                    <Link to="/dashboard">
                        <span className='nav font-semibold text-neutral-800'>Home</span>
                    </Link>
                    <Link to="/interview">
                        <span className='nav font-semibold text-neutral-800'>Interview</span>
                    </Link>
                    <Link to="/results">
                        <span className='nav font-semibold text-neutral-800'>Results</span>
                    </Link>
                    <Link to="/history">
                        <span className='nav font-semibold text-neutral-800'>History</span>
                    </Link>
                </div>
            </nav>
        </>
    );
}