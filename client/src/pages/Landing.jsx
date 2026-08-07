import logo from '../assets/ai-interview-sim-logo.png'

export default function LandingPage() {
    return (
        <>
            <nav className='flex bg-yellow-400 block px-10 py-3 items-center justify-between border-b-3 border-amber-400'>
                <a href="#">
                    <span className='font-bold text-xl'>PrepFlow</span>
                </a>
    
                <div>
                    <a href="#" className="flex justify-center w-22 bg-white text-black font-semibold px-2 py-1 rounded border-2 border-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-200">Log In</a>
                </div>
            </nav>
    
            <article className="flex flex-col justify-center items-center w-full mt-20 gap-2">
                <h1 className="font-semibold text-3xl">The New Standard For</h1>
                <h1 className="font-semibold text-3xl bg-gradient-to-bl from-amber-100 to-yellow-400">Interview Prep</h1>
                <p className="text-center px-10 mt-5 opacity-75">
                    Practice real interviews with AI, get instant feedback, and walk in ready — the platform built specifically for job seekers who want to stop guessing and start improving.
                </p>
                <button className="mt-6 bg-yellow-400 px-4 py-2 text-slate-900 rounded cursor-pointer rounded border-2 border-black hover:bg-black hover:text-white hover:border-black focus:outline-none focus:ring-2 focus:ring-sky-300 transition-colors transition duration-300 ease-in-out hover:scale-105 "><span className="font-semibold">Get Started</span> ➔</button>
            </article>
        </>
    );
}