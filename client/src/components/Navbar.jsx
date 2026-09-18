import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === "/results") {
      return location.pathname.startsWith("/results") ? "active" : "";
    }
    return location.pathname === path ? "active" : "";
  };

  const handleResultsClick = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("interviews")
      .select("id")
      .eq("user_id", user.id)
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
    { name: "Account", path: "/account" },
  ];

  const renderNavitem = (link) => {
    if (link.onClick) {
      return (
        <span
          key={link.name}
          onClick={link.onClick}
          className={`nav font-semibold text-neutral-800 text-medium md:text-xl cursor-pointer ${isActive(link.path)}`}
        >
          {link.name}
        </span>
      );
    }
    return (
      <Link key={link.path} to={link.path}>
        <span
          className={`nav font-semibold text-neutral-800 text-medium md:text-xl ${isActive(link.path)}`}
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