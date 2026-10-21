import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import useTheme from "../lib/useTheme";
import { AudioLines, Settings, Moon, LogOut, UserRound, Menu, X } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isDark: darkMode, toggleTheme: toggleDarkMode } = useTheme();

  const menuRef = useRef();
  const mobileButtonRef = useRef();
  const mobilePanelRef = useRef();

  // Close the account menu whenever the route changes
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setShowMenu(false);
    setShowMobileMenu(false);
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
      const onMobileMenu =
        mobileButtonRef.current?.contains(e.target) ||
        mobilePanelRef.current?.contains(e.target);
      if (!onMobileMenu) {
        setShowMobileMenu(false)
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

  const menuButtonStyle = "flex items-center gap-3 hover:bg-hover w-full cursor-pointer rounded-[10px] py-2 px-3 text-sm text-ink transition-colors duration-200 ease-in-out";

  const navLinkBaseStyle = "cursor-pointer rounded-[10px] px-5 py-[11px] text-sm transition-colors duration-200 ease-in-out";
  const navLinkActiveStyle = "bg-accent-tint text-on-accent dark:text-ink";
  const navLinkIdleStyle = "font-medium text-muted hover:bg-hover hover:text-ink dark:text-ink dark:text-muted";

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

  const renderMobileNavItem = (link) => {
    const linkStyle = `w-full cursor-pointer rounded-[10px] px-5 py-3 text-left text-sm transition-colors duration-200 ease-in-out ${
      isActive(link.path) ? navLinkActiveStyle : navLinkIdleStyle
    }`;

    const handleClick = () => {
      setShowMobileMenu(false);
      if (link.onClick) {
        link.onClick();
        return;
      }
      navigate(link.path);
    };

    return (
      <button key={link.name} onClick={handleClick} className={linkStyle}>
        {link.name}
      </button>
    );
  };

  return (
    <nav className="relative flex h-16 items-center justify-between border-b border-line bg-surface px-4 sm:px-8 md:px-12 lg:px-16">
      {/* Brand */}
      <div className="flex flex-1 items-center">
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <span className="flex-center size-8 shrink-0 rounded-lg bg-accent">
            <AudioLines size={21} color="#ffffff" strokeWidth={2.25} />
          </span>
          <span className="whitespace-nowrap text-[23px] leading-normal text-ink">
            PrepFlow
          </span>
        </Link>
      </div>

      {/* Primary navigation */}
      <div className="hidden items-center gap-2 md:flex">
        {navigationLinks.map(renderNavItem)}
      </div>

      {/* Account controls */}
      <div className="flex flex-1 items-center justify-end gap-2.5">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Account menu"
            className="flex-center size-9 cursor-pointer rounded-full border border-line bg-hover text-[12px] font-semibold text-ink transition-colors duration-200 ease-in-out hover:bg-hover-strong"
          >
            {getInitials() ?? <UserRound size={18} />}
          </button>

          {showMenu && (
            <div className="absolute right-0 z-10 mt-3 w-56 rounded-xl border border-line bg-surface p-3 shadow-[0px_4px_16px_0px_rgba(32,34,31,0.08)]">
              <div className="flex items-center gap-3 px-3 py-2">
                <span className="flex-center size-9 shrink-0 rounded-full bg-accent text-[12px] font-semibold text-on-accent">
                  {getInitials() ?? <UserRound size={18} />}
                </span>
                <p className="truncate text-sm font-semibold text-ink">
                  {user?.user_metadata?.full_name ?? "Guest"}
                </p>
              </div>
              <div className="my-2 border-b border-line"></div>
              <button className={menuButtonStyle} onClick={handleSettings}>
                <Settings size={20} />
                Settings
              </button>
              <div className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm text-ink" onClick={toggleDarkMode}>
                <div className="flex items-center gap-3">
                  <Moon size={20} />
                  Dark Theme
                </div>
                <div className={`flex h-5 w-9 rounded-full transition-all duration-300 ${darkMode ? "justify-end bg-green-500" : "justify-start bg-gray-500"}`}>
                  <span className="h-5 w-5 rounded-full border bg-surface"></span>
                </div>
              </div>
              <div className="my-2 border-b border-line"></div>
              <button className={menuButtonStyle} onClick={signOut}>
                <LogOut size={20} />
                Log Out
              </button>
            </div>
          )}
        </div>

        {/* Hamburger toggle (mobile / small tablet only) */}
        <button
          ref={mobileButtonRef}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Navigation menu"
          aria-expanded={showMobileMenu}
          className="flex-center size-9 cursor-pointer rounded-[10px] border border-line bg-hover text-ink transition-colors duration-200 ease-in-out hover:bg-hover-strong md:hidden"
        >
          {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile navigation panel */}
      {showMobileMenu && (
        <div
          ref={mobilePanelRef}
          className="absolute left-0 right-0 top-full z-20 flex flex-col gap-1 border-b border-line bg-surface p-3 md:hidden"
        >
          {navigationLinks.map(renderMobileNavItem)}
        </div>
      )}
    </nav>
  );
}
