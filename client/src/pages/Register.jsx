import { Link } from 'react-router-dom'

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex-center">
            <div className="w-3/4 bg-yellow-400 backdrop-blur-md rounded-xl p-10 shadow-[-1px_0px_16px_-1px_#e6e6e6] flex-center flex-col">
                <h1 className="text-3xl font-bold cursor-default">Sign Up</h1>
                <div className="flex-center flex-col gap-3 mt-5">
                    <input type="text" name="name" id="name" placeholder="Full Name" className="bg-white/75 py-2 w-100 rounded-2xl pl-5"/>
                    <input type="email" name="email" id="email" placeholder="Email Address" className="bg-white/75 py-2 w-100 rounded-2xl pl-5"/>
                    <input type="password" name="password" id="password" placeholder="Password" className="bg-white/75 py-2 w-100 rounded-2xl pl-5"/>
                    <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" className="bg-white/75 py-2 w-100 rounded-2xl pl-5"/>
                </div>
                <Link to="/dashboard">
                    <button className="bg-neutral-900 text-neutral-100 font-semibold text-1xl mt-5 w-100 py-2 rounded-2xl cursor-pointer hover:bg-white/90 hover:text-black hover:ring-1">Sign Up</button>
                </Link>
                <p className="text-sm text-neutral-700 mt-5 cursor-default">Already have an account? <Link to="/login"><span className='text-blue-500 font-semibold'>Log In</span></Link></p>
            </div>            
        </div>
    );
}