import { Link } from 'react-router-dom'

export default function LoginPage() {
    return (
        <>
            <h1 className="text-neutral-800 font-bold text-3xl cursor-default absolute mt-2 ml-4">PrepFlow</h1>
            <div className="flex-center min-h-screen flex-col">
                <div className="w-3/4 bg-yellow-400 backdrop-blur-md rounded-xl p-10 shadow-[-1px_0px_16px_-1px_#e6e6e6]">
                    <h1 className="font-bold text-3xl cursor-default">Welcome Back</h1>
                    <p className="text-neutral-600 text-md cursor-default">Please enter your details</p>
                    <div className="flex-center flex-col gap-3 mt-5">
                        <input type="email" name="email" id="email" placeholder="Email Address" className="bg-white/75 py-2 w-80 rounded-2xl pl-5"/>
                        <input type="password" name="password" id="password" placeholder="Password" className="bg-white/75 py-2 w-80 rounded-2xl pl-5"/>
                    </div>
                    <button className="bg-neutral-900 text-neutral-100 font-semibold text-1xl mt-5 w-80 py-2 rounded-2xl cursor-pointer">Log In</button>
                    <p className="text-sm text-neutral-700 mt-5 cursor-default">Don't have an account?<Link to="/register"><span className='text-blue-500 font-semibold'> Sign Up</span></Link></p>
                </div>
            </div>
        </>
    );
}