import { useState, useRef, useEffect } from 'react';

const topics = [
    { value: '', label: 'Choose a topic', disabled: true },
    { value: 'html', label: 'HTML' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'css', label: 'CSS' },
    { value: 'python', label: 'Python' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'typescript', label: 'TypeScript' },
];

export default function CustomSelect({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const selectedTopic = topics.find(t => t.value === value);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={selectRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-64 min-w-[200px] bg-yellow-400 text-slate-900 rounded border-2 border-black
                         px-4 py-3 font-semibold text-lg cursor-pointer
                         hover:bg-black hover:text-white hover:border-black
                         focus:outline-none focus:ring-2 focus:ring-sky-300
                         transition-all duration-300 ease-in-out
                         flex items-center justify-between gap-2
                         hover:scale-[1.02] active:scale-[0.98]"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="truncate">{selectedTopic?.label || 'Choose a topic'}</span>
                <svg
                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <ul
                    className="absolute z-50 w-full mt-2 bg-white rounded-lg border-2 border-black shadow-lg
                               overflow-hidden max-h-60 overflow-y-auto"
                    role="listbox"
                >
                    {topics.map((topic) => (
                        <li
                            key={topic.value}
                            onClick={() => {
                                if (!topic.disabled) {
                                    onChange(topic.value);
                                    setIsOpen(false);
                                }
                            }}
                            className={`px-4 py-3 cursor-pointer transition-all duration-200
                                       ${topic.disabled
                                           ? 'text-gray-400 cursor-not-allowed'
                                           : 'hover:bg-yellow-400 hover:text-slate-900 hover:font-semibold'
                                       }
                                       ${value === topic.value ? 'bg-yellow-400 font-semibold' : ''}
                                       ${!topic.disabled ? 'active:scale-[0.98]' : ''}`}
                            role="option"
                            aria-selected={value === topic.value}
                            aria-disabled={topic.disabled}
                        >
                            {topic.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
