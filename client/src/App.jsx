import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound.jsx'
import LandingPage from './pages/Landing.jsx'
import DashboardPage from './pages/Dashboard.jsx'
import HistoryPage from './pages/History.jsx'
import InterviewPage from './pages/Interview.jsx'
import LoginPage from './pages/Login.jsx'
import RegisterPage from './pages/Register.jsx'
import ResultsPage from './pages/Results.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import PublicLayout from './layouts/PublicLayout.jsx'
import AppLayout from './layouts/AppLayout.jsx'
import Navbar from './components/Navbar.jsx'

const router = createBrowserRouter([
  {path: "*", element: <PageNotFound />},
  {path: "/navbar", element: <Navbar />},

  {element: <AuthLayout />,
    children: [
      {path: "/register", element: <RegisterPage />},
      {path: "/login", element: <LoginPage />}
    ]
  },

  {element: <PublicLayout />,
    children: [
      {path: "/", element: <LandingPage />}
    ]
  },
  
  {element: <AppLayout />,
    children: [
      {path: "/dashboard", element: <DashboardPage />},
      {path: "/history", element: <HistoryPage />},
      {path: "/interview", element: <InterviewPage />},
      {path: "/results", element: <ResultsPage />},
    ]
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
