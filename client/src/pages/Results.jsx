import interview from "../fake-data/interview"

export default function ResultsPage() {
    const summaryCard = "bg-yellow-300 py-3 px-6 border-1 rounded"

    return (
         <div className="flex flex-col h-full max-w-4xl mx-auto w-full ">
            <header className="py-2 px-5 flex bg-slate-900 w-full">
                <h1 className="text-md font-semibold text-white">
                    {interview.topic} Interview Result
                </h1>
                <p className="text-md font-semibold text-white ml-auto">{new Date(interview.date).toLocaleDateString()}</p>
            </header>
            <div className="overflow-y-auto">
            <article className="mt-8 mb-4 mx-8 grid grid-cols-2 grid-rows-2 gap-4 ">
                <div className="row-span-2 flex flex-center flex-col border-1 bg-slate-100 rounded">
                    <h1 className="font-bold text-3xl">Overall Score</h1>
                    <p className="font-semibold text-7xl">{interview.score}%</p>
                </div>
                <div className={summaryCard}>
                    <h1 className="font-semibold text-xl mb-1">Strengths</h1>
                    <ul>
                        {interview.strengths.map((items, index) => {
                            return (
                                <li key={index}>{items}</li>
                            );
                        })}
                    </ul>
                </div>
                <div className={`${summaryCard} col-start-2`}>
                    <h1 className="font-semibold text-xl mb-1">Area To Improve</h1>
                    <ul>
                        {interview.improvements.map((items, index) => {
                            return (
                                <li key={index}>{items}</li>
                            );
                        })}
                    </ul>
                </div>
            </article>
            <hr className="border-t-2 border-gray-300 my-4 mx-8"/>
            <article className="my-4 mx-8 space-y-6">
                {interview.questions.map((element, index) => {
                    return (
                        <div key={element.id} className="border-1 rounded overflow-hidden">
                            <div>
                                <h1 className="bg-slate-100 font-semibold text-slate-800 text-lg px-4 py-2 border-b-1">Question {index + 1}</h1>
                                <p className="px-4 py-3 leading-relaxed">{element.question}</p>
                            </div>
                            <div className="border-t-1">
                                <h1 className="bg-sky-100 font-semibold text-sky-900 text-lg px-4 py-2 border-b-1">Answer</h1>
                                <p className="px-4 py-3 leading-relaxed">{element.answer}</p>
                            </div>
                            <div className="border-t-1">
                                <h1 className="bg-yellow-100 font-semibold text-yellow-900 text-lg px-4 py-2 border-b-1">Feedback</h1>
                                <p className="px-4 py-3 leading-relaxed">{element.feedback}</p>
                            </div>
                        </div>
                    );
                })}
            </article>
            </div>
        </div>
    );
}