import { Link } from 'react-router-dom';

export default function DashboardPage() {
    return (
        <article className="flex-center flex-col mt-20 md:mt-40 w-full max-w-4xl mx-auto px-4">
            <h1 className='font-bold text-4xl mb-1 md:text-5xl text-center'>WELCOME TO PREPFLOW</h1>
            <p className='font-semibold text-xl md:text-2xl text-center'>Ready to practice your first AI interview?</p>
            <p className='font-semibold text-2xl mt-15 mb-3 md:text-3xl text-center'>Here's how it works:</p>
            <div className='bg-yellow-300 p-4 rounded-lg p-10 border-1 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] max-w-2xl'>
                <ul className='flex flex-col gap-3 flex-center'>
                    <li className='text-xl md:text-2xl'>1. Choose a topic.</li>
                    <li className='text-xl md:text-2xl'>2. Answer AI-generated questions.</li>
                    <li className='text-xl md:text-2xl'>3. Receive instant feedback.</li>
                    <li className='text-xl md:text-2xl'>4. Track your progress over time.</li>
                </ul>
            </div>
            <Link to="/interview">
                <button className='mt-15 bg-yellow-300 px-4 py-2 text-slate-900 rounded cursor-pointer rounded border-2 border-black hover:bg-black hover:text-white hover:border-black focus:outline-none focus:ring-2 focus:ring-sky-300 transition-colors transition duration-300 ease-in-out hover:scale-105 font-semibold md:text-2xl md:py-4 md:px-8'>Start Your First Interview</button>
            </Link>
        </article>
    );
};