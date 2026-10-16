import { useLocation } from "react-router-dom";

export default function PageNotFound() {
  const location = useLocation();

    return (
        <div>
            <h3>WE HAVE A PROBLEM</h3>
            <h1>404</h1>
            <h2>Oops, page not found</h2>
            <p>The resource requested could not be found on this server!</p>
            <p>{location.pathname}</p>
        </div>
    );
}
