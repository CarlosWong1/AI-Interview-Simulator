const interview = {
  id: crypto.randomUUID(),
  date: new Date().toISOString(),
  topic: "JavaScript",
  score: 79,

  strengths: [
    "Good understanding of arrays",
    "Clear communication",
  ],

  improvements: [
    "Explain time complexity",
    "Provide more examples",
  ],

  questions: [
    {
      id: 1,
      question: "Can you explain the difference between let, const, and var?",
      answer:
        "Sure. var is function-scoped and can be redeclared. let is block-scoped and can be reassigned. const is also block-scoped but cannot be reassigned after initialization.",
      feedback:
        "Good explanation of scope and reassignment. You could also mention that 'var' declarations are hoisted differently and can lead to unexpected behavior.",
      score: 8,
    },
    {
      id: 2,
      question: "Can you tell me what a closure is in JavaScript?",
      answer:
        "A closure happens when a function remembers variables from its outer scope even after the outer function has finished executing.",
      feedback:
        "Nice definition. Including a practical example would demonstrate a stronger understanding.",
      score: 9,
    },
    {
      id: 3,
      question: "What is the difference between map() and forEach()?",
      answer:
        "map() returns a new array after transforming each element, while forEach() just loops through the array and doesn't return a new array.",
      feedback:
        "Correct comparison. You could also mention that map() is intended for transformations while forEach() is mainly used for side effects.",
      score: 8,
    },
  ],

  messages: [
    {
      id: 1,
      sender: "AI",
      message: "Hello, welcome to your JavaScript interview.",
    },
    {
      id: 2,
      sender: "AI",
      message: "Can you explain the difference between let, const, and var?",
    },
    {
      id: 3,
      sender: "User",
      message:
        "Sure. var is function-scoped and can be redeclared. let is block-scoped and can be reassigned. const is also block-scoped but cannot be reassigned after initialization.",
    },
    {
      id: 4,
      sender: "AI",
      message:
        "Good explanation. Can you tell me what a closure is in JavaScript?",
    },
    {
      id: 5,
      sender: "User",
      message:
        "A closure happens when a function remembers variables from its outer scope even after the outer function has finished executing.",
    },
    {
      id: 6,
      sender: "AI",
      message:
        "Great. Last question: What is the difference between map() and forEach()?",
    },
    {
      id: 7,
      sender: "User",
      message:
        "map() returns a new array after transforming each element, while forEach() just loops through the array and doesn't return a new array.",
    },
  ],
};

export default interview;