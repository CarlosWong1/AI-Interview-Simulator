import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { AudioLines, Settings, Moon, LogOut, UserRound } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const menuRef = useRef();

  // Close the account menu whenever the route changes
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setShowMenu(false);
  }

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

  const isActive = (path) => {
    if (path === "/results") {
      return location.pathname.startsWith("/results");
    }
    return location.pathname === path;
  };

  const handleResultsClick = async () => {
    if (!user) {
      navigate("/");
      return;
    }

    const { data, error } = await supabase
      .from("interviews")
      .select("id")
      .eq("user_id", user.id)
      .not("feedback", "is", null)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error(error.message);
      return;
    }

    if (!data || data.length === 0) {
      navigate("/results");
      return;
    }

    navigate(`/results/${data[0].id}`);
  };

  const navigationLinks = [
    { name: "Home", path: "/dashboard" },
    { name: "Interview", path: "/interview" },
    { name: "Results", path: "/results", onClick: handleResultsClick },
    { name: "History", path: "/history" },
  ];

  const menuButtonStyle = "flex items-center gap-3 hover:bg-[#f3f4ef] w-full cursor-pointer rounded-[10px] py-2 px-3 text-sm text-[#20221f] transition-colors duration-200 ease-in-out";

  const navLinkBaseStyle = "cursor-pointer rounded-[10px] px-5 py-[11px] text-sm transition-colors duration-200 ease-in-out";
  const navLinkActiveStyle = "bg-[#fffbe9] text-[#20221f]";
  const navLinkIdleStyle = "font-medium text-[#686b64] hover:bg-[#f3f4ef] hover:text-[#20221f]";

  const getInitials = () => {
    const name = user?.user_metadata?.full_name?.trim();
    if (!name) return null;
    return name
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

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

  const renderNavItem = (link) => {
    const linkStyle = `${navLinkBaseStyle} ${isActive(link.path) ? navLinkActiveStyle : navLinkIdleStyle}`;

    if (link.onClick) {
      return (
        <button
          key={link.name}
          onClick={link.onClick}
          className={linkStyle}
        >
          {link.name}
        </button>
      );
    }
    return (
      <Link key={link.path} to={link.path} className={linkStyle}>
        {link.name}
      </Link>
    );
  };

  return (
    <nav className="flex h-16 items-center justify-between border-b border-[#e4e5df] bg-white px-4 sm:px-8 md:px-12 lg:px-16">
      {/* Brand */}
      <div className="flex flex-1 items-center">
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <span className="flex-center size-8 shrink-0 rounded-lg bg-[#f4ce38]">
            <AudioLines size={21} color="#ffffff" strokeWidth={2.25} />
          </span>
          <span className="whitespace-nowrap text-[23px] leading-normal text-[#20221f]">
            PrepFlow
          </span>
        </Link>
      </div>

      {/* Primary navigation */}
      <div className="flex items-center gap-2">
        {navigationLinks.map(renderNavItem)}
      </div>

      {/* Account controls */}
      <div className="flex flex-1 items-center justify-end">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Account menu"
            className="flex-center size-9 cursor-pointer rounded-full border border-[#e4e5df] bg-[#f3f4ef] text-[12px] font-semibold text-[#20221f] transition-colors duration-200 ease-in-out hover:bg-[#e9ebe4]"
          >
            {getInitials() ?? <UserRound size={18} />}
          </button>

          {showMenu && (
            <div className="absolute right-0 z-10 mt-3 w-56 rounded-xl border border-[#e4e5df] bg-white p-3 shadow-[0px_4px_16px_0px_rgba(32,34,31,0.08)]">
              <div className="flex items-center gap-3 px-3 py-2">
                <span className="flex-center size-9 shrink-0 rounded-full bg-[#f4ce38] text-[12px] font-semibold text-[#20221f]">
                  {getInitials() ?? <UserRound size={18} />}
                </span>
                <p className="truncate text-sm font-semibold text-[#20221f]">
                  {user?.user_metadata?.full_name ?? "Guest"}
                </p>
              </div>
              <div className="my-2 border-b border-[#e4e5df]"></div>
              <button className={menuButtonStyle} onClick={handleSettings}>
                <Settings size={20} />
                Settings
              </button>
              <div className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm text-[#20221f]" onClick={handleDarkMode}>
                <div className="flex items-center gap-3">
                  <Moon size={20} />
                  Dark Theme
                </div>
                <div className={`flex h-5 w-9 rounded-full transition-all duration-300 ${darkMode ? "justify-end bg-green-500" : "justify-start bg-gray-500"}`}>
                  <span className="h-5 w-5 rounded-full border bg-white"></span>
                </div>
              </div>
              <div className="my-2 border-b border-[#e4e5df]"></div>
              <button className={menuButtonStyle} onClick={signOut}>
                <LogOut size={20} />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
