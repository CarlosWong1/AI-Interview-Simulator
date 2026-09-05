import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    const navigationLinks = [
      {name: "Home", path: "/dashboard"},
      {name: "Interview", path: "/interview"},
      {name: "Results", path: "/results"},
      {name: "History", path: "/history"},
      {name: "Account", path: "/account"},
    ]

    return (
        <>
            <nav className='flex bg-yellow-400 block px-10 py-3 items-center justify-between border-b-3 border-amber-400 md:py-5'>
                <Link to="/dashboard">
                    <span className='font-bold text-xl md:text-3xl'>PrepFlow</span>
                </Link>

                <div className='flex gap-5 md:gap-8'>
                    {navigationLinks.map((link) => (
                      <Link key={link.path} to={link.path}>
                        <span className={`nav font-semibold text-neutral-800 md:text-xl ${isActive(link.path)}`}>{link.name}</span>
                      </Link>
                    ))}
                </div>
            </nav>
        </>
    );
}