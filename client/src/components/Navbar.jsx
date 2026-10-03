import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { UserRound, Settings, Moon, LogOut } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const getUser = async () => {
      const {data: {user}} = await supabase.auth.getUser();

      setUser(user) 
    }
    getUser();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === "/results") {
      return location.pathname.startsWith("/results") ? "active" : "";
    }
    return location.pathname === path ? "active" : "";
  };

  const handleResultsClick = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("interviews")
      .select("id")
      .eq("user_id", user.id)
      .not("feedback", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    
    if (error) {
      if (!data) {
        navigate("/interview");
        return;
      }
      console.error(error.message);
      return;
    }

    navigate(`/results/${data.id}`);
  };

  const navigationLinks = [
    { name: "Home", path: "/dashboard" },
    { name: "Interview", path: "/interview" },
    { name: "Results", path: "/results", onClick: handleResultsClick },
    { name: "History", path: "/history" },
    { name: "Settings", path: "/settings", icon: <UserRound></UserRound> },
  ];

  const menuButtonStyle = "flex items-center gap-2 hover:bg-slate-200 w-full cursor-pointer rounded py-2 px-1 text-sm transition-all duration-200 ease-in-out";

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  const signOut = async () => {
    const {error} = await supabase.auth.signOut();

    if (error) throw error;  
    navigate("/login")
  }

  const handleSettings = () => {
    setShowMenu(false)
    navigate("/settings")
  }

  const renderNavitem = (link) => {
    if (link.icon) {
      return (
        <div className="relative" ref={menuRef} key={link.name}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="border rounded-full p-1 bg-white hover:bg-black hover:text-white cursor-pointer shadow-[0px_0px_8px_-1px_rgba(0,_0,_0,_0.1)] transition-all duration-300 ease-in-out"
          >
            {link.icon}
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 rounded bg-white p-4 shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] text-black/70 w-50">
              <div className="flex items-center gap-3">
                <span className="border p-2 rounded-full bg-yellow-300">{link.icon}</span>
                <p className="font-semibold text-lg">{user.user_metadata.full_name}</p>
              </div>
              <div className="border-b my-3"></div>
              <button className={`${menuButtonStyle}`} onClick={handleSettings}>
                <Settings size={20}></Settings>
                Settings
              </button>
              <div className="flex items-center py-2 px-1 text-sm gap-3 cursor-pointer" onClick={handleDarkMode}>
                <div className="flex-center gap-2">
                  <Moon size={20}></Moon>
                  Dark Theme
                </div>
                <div className={`flex w-9 h-5 rounded-full transition-all duration-300 ${darkMode ? " bg-green-500 justify-end" : " bg-gray-500 justify-start"}`}>
                  <span className="w-5 h-5 bg-white border rounded-full"></span>
                </div>
              </div>
              <div className="border-b my-3"></div>
              <button className={menuButtonStyle} onClick={signOut}>
                <LogOut size={20}></LogOut>
                Log Out
              </button>
            </div>
          )}
        </div>
      );
    }
    if (link.onClick) {
      return (
        <span
          key={link.name}
          onClick={link.onClick}
          className={`nav self-start font-semibold text-neutral-800 text-medium md:text-xl cursor-pointer ${isActive(link.path)}`}
        >
          {link.name}
        </span>
      );
    }
    return (
      <Link key={link.path} to={link.path}>
        <span
          className={`nav font-semibold text-neutral-800 text-medium md:text-xl cursor-pointer ${isActive(link.path)}`}
        >
          {link.name}
        </span>
      </Link>
    );
  };

  return (
    <>
      <nav className="flex bg-yellow-400 block px-10 py-3 items-center justify-between border-b-3 border-amber-400 md:py-5">
        <Link to="/dashboard">
          <span className="font-bold text-xl md:text-3xl">PrepFlow</span>
        </Link>

        <div className="flex gap-5 md:gap-8">
          {navigationLinks.map(renderNavitem)}
        </div>
      </nav>
    </>
  );
}