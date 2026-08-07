export default function Footer() {
    return (
        <>
            <article className="w-full px-20 bg-neutral-900 mt-20">
                <div className="grid grid-cols-3 gap-10 py-10">
                    <div>
                        <h1 className="text-white font-semibold text-xl">Credits</h1>
                        <p className="text-neutral-400 text-sm">
                            Built by one person who really doesn't want you to bomb your next interview. Still early, still growing — but every session helps you (and this) get a little better. Thanks for practicing with us.
                        </p>
                    </div>
                    <div>
                        <h1 className="text-white font-semibold text-xl">Why it exists</h1>
                        <p className="text-neutral-400 text-sm">
                            Most interview prep is either a book nobody finishes or a friend who's "too busy" to run a mock round with you. PrepFlow is neither — just you, an AI that actually asks follow-ups, and as many reps as you need before the real thing.
                        </p>
                    </div>
                    <div>
                        <h1 className="text-white font-semibold text-xl">What's coming</h1>
                        <p className="text-neutral-400 text-sm">
                            This is version one, not the finished product. Industry-specific question banks, deeper feedback, and progress tracking are all on the way — built based on what actual users ask for, not guesswork.
                        </p>
                    </div>
                </div>
                <div className="border-b-3 border-neutral-400"></div>
                <div className="flex items-center py-10">
                    <h1 className="text-white font-bold text-3xl cursor-default">PrepFlow</h1>

                    <div className="flex ml-auto gap-10">
                        <a href="#">
                            <span className="text-neutral-400 text-sm ">About</span>
                        </a>
                        <a href="#">
                            <span className="text-neutral-400 text-sm ">Contact</span>
                        </a>
                    </div>
                </div>
                <p className="text-neutral-400 text-center text-sm mb-2 cursor-default"><span>&#169;</span> 2026 PrepFlow</p>
            </article>
        </>
    );
}