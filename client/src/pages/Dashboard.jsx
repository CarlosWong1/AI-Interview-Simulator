import { Link } from 'react-router-dom';

export { Link } from 'react-router-dom'

export default function DashboardPage() {
    return (
        <article className="flex-center flex-col min-h-screen">
            <h1 className='font-bold text-4xl mb-1'>WELCOME TO PREPFLOW</h1>
            <p className='font-semibold text-xl'>Ready to practice your first AI interview?</p>
            <p className='font-semibold text-2xl mt-15 mb-3'>Here's how it works:</p>
            <div className='bg-amber-400/70 p-4 rounded-lg p-10 border-2 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]'>
                <ol className='flex flex-col gap-3'>
                    <li className='text-xl'>1. Choose a topic.</li>  
                    <li className='text-xl'>2. Answer AI-generated questions.</li>   
                    <li className='text-xl'>3. Receive instant feedback.</li>
                    <li className='text-xl'>4. Track your progress over time.</li>             
                </ol>
            </div>
            <Link to="/interview">
                <button className='mt-15 bg-yellow-400 px-4 py-2 text-slate-900 rounded cursor-pointer rounded border-2 border-black hover:bg-black hover:text-white hover:border-black focus:outline-none focus:ring-2 focus:ring-sky-300 transition-colors transition duration-300 ease-in-out hover:scale-105 font-semibold'>Start Your First Interview</button>
            </Link>
        </article>
    );
};