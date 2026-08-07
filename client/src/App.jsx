import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound.jsx'
import LandingPage from './pages/Landing.jsx'
import DashboardPage from './pages/Dashboard.jsx'
import HistoryPage from './pages/History.jsx'
import InterviewPage from './pages/Interview.jsx'
import LoginPage from './pages/Login.jsx'
import RegisterPage from './pages/Register.jsx'
import ResultsPage from './pages/Results.jsx'
import FooterPage from './components/Footer.jsx'
import NavbarPage from './components/Navbar.jsx'

const router = createBrowserRouter([
  {path: "/", element: <LandingPage />},
  {path: "*", element: <PageNotFound />},
  {path: "/dashboard", element: <DashboardPage />},
  {path: "/history", element: <HistoryPage />},
  {path: "/interview", element: <InterviewPage />},
  {path: "/login", element: <LoginPage />},
  {path: "/register", element: <RegisterPage />},
  {path: "/results", element: <ResultsPage />},
  {path: "/footer", element: <FooterPage />},
  {path: "/navbar", element: <NavbarPage />},
]);

function App() {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <main className='flex-grow'>
          <RouterProvider router={router} />
        </main>
        <FooterPage />
      </div>
    </>
  )
}

export default App
