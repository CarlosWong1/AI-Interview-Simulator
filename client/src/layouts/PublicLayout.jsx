import { Outlet } from "react-router-dom";
import Footer from '../components/Footer'

function PublicLayout() {
    return (
        <div className='min-h-screen flex flex-col'>
            <main className='flex-grow'>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
      </div>
    );
}

export default PublicLayout