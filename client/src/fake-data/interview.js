const interviews = [
  {
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
  },

  {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    topic: "React",
    score: 85,

    strengths: [
      "Solid grasp of component lifecycle",
      "Uses hooks idiomatically",
    ],

    improvements: [
      "Discuss memoization trade-offs",
      "Explain state management alternatives",
    ],

    questions: [
      {
        id: 1,
        question: "What is the difference between state and props in React?",
        answer:
          "Props are read-only inputs passed down from a parent component, while state is internal data managed by the component itself that can change over time.",
        feedback:
          "Clear distinction. You could also mention that state changes trigger re-renders and props flow one way, top-down.",
        score: 9,
      },
      {
        id: 2,
        question: "Can you explain what the useEffect hook is used for?",
        answer:
          "useEffect lets you run side effects in function components, like fetching data, subscribing to events, or manually updating the DOM. It runs after render and can clean up with a return function.",
        feedback:
          "Good answer. Adding the dependency array behavior — empty means run once, missing means run every render — would make it complete.",
        score: 8,
      },
      {
        id: 3,
        question: "What does the key prop do when rendering a list?",
        answer:
          "Keys help React identify which items have changed, been added, or removed. They should be stable and unique among siblings, usually an ID rather than the index.",
        feedback:
          "Excellent. You preemptively covered the index caveat, which is exactly what interviewers look for.",
        score: 9,
      },
    ],

    messages: [
      {
        id: 1,
        sender: "AI",
        message: "Welcome to your React interview. Let's get started.",
      },
      {
        id: 2,
        sender: "AI",
        message: "What is the difference between state and props in React?",
      },
      {
        id: 3,
        sender: "User",
        message:
          "Props are read-only inputs passed down from a parent component, while state is internal data managed by the component itself that can change over time.",
      },
      {
        id: 4,
        sender: "AI",
        message: "Nice. Can you explain what the useEffect hook is used for?",
      },
      {
        id: 5,
        sender: "User",
        message:
          "useEffect lets you run side effects in function components, like fetching data, subscribing to events, or manually updating the DOM. It runs after render and can clean up with a return function.",
      },
      {
        id: 6,
        sender: "AI",
        message: "Great. Last one: What does the key prop do when rendering a list?",
      },
      {
        id: 7,
        sender: "User",
        message:
          "Keys help React identify which items have changed, been added, or removed. They should be stable and unique among siblings, usually an ID rather than the index.",
      },
    ],
  },

  {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    topic: "CSS",
    score: 68,

    strengths: [
      "Knows flexbox well",
      "Understands the cascade",
    ],

    improvements: [
      "Practice CSS Grid layouts",
      "Learn modern layout alternatives to floats",
    ],

    questions: [
      {
        id: 1,
        question: "What is the difference between inline, block, and inline-block elements?",
        answer:
          "Block elements take the full width and start on a new line. Inline elements only take the space they need and flow with text. Inline-block is like inline but respects width and height.",
        feedback:
          "Good summary. Mentioning vertical margin behavior differences would strengthen it.",
        score: 7,
      },
      {
        id: 2,
        question: "How does position: absolute work?",
        answer:
          "An absolutely positioned element is removed from the normal flow and positioned relative to its nearest positioned ancestor, or the initial containing block if none exists.",
        feedback:
          "Correct. Adding how it interacts with z-index and stacking contexts would show deeper knowledge.",
        score: 7,
      },
      {
        id: 3,
        question: "How would you center a div both horizontally and vertically?",
        answer:
          "I'd use flexbox: set the parent to display flex, justify-content center, and align-items center.",
        feedback:
          "Solid go-to. Mentioning CSS Grid's place-items center or absolute positioning as alternatives would round it out.",
        score: 7,
      },
    ],

    messages: [
      {
        id: 1,
        sender: "AI",
        message: "Hi, welcome to your CSS interview.",
      },
      {
        id: 2,
        sender: "AI",
        message:
          "What is the difference between inline, block, and inline-block elements?",
      },
      {
        id: 3,
        sender: "User",
        message:
          "Block elements take the full width and start on a new line. Inline elements only take the space they need and flow with text. Inline-block is like inline but respects width and height.",
      },
      {
        id: 4,
        sender: "AI",
        message: "Good. How does position: absolute work?",
      },
      {
        id: 5,
        sender: "User",
        message:
          "An absolutely positioned element is removed from the normal flow and positioned relative to its nearest positioned ancestor, or the initial containing block if none exists.",
      },
      {
        id: 6,
        sender: "AI",
        message:
          "Last question: How would you center a div both horizontally and vertically?",
      },
      {
        id: 7,
        sender: "User",
        message:
          "I'd use flexbox: set the parent to display flex, justify-content center, and align-items center.",
      },
    ],
  },

  {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    topic: "Node.js",
    score: 74,

    strengths: [
      "Understands the event loop",
      "Familiar with Express patterns",
    ],

    improvements: [
      "Discuss error handling in async code",
      "Explain streams with use cases",
    ],

    questions: [
      {
        id: 1,
        question: "What is Node.js and how is it different from browser JavaScript?",
        answer:
          "Node.js is a JavaScript runtime built on Chrome's V8 engine. Unlike the browser, it has no DOM or window object, but provides APIs for the filesystem, networking, and process access.",
        feedback:
          "Accurate comparison. Mentioning global objects like process and Buffer would add detail.",
        score: 8,
      },
      {
        id: 2,
        question: "Can you explain the event loop in Node.js?",
        answer:
          "The event loop allows Node to do non-blocking I/O by offloading operations to the system. It continuously checks for completed operations and runs their callbacks in phases like timers, poll, and check.",
        feedback:
          "Good phasing overview. Naming microtasks vs macrotasks and how promises jump the queue would deepen the answer.",
        score: 8,
      },
      {
        id: 3,
        question: "What is middleware in Express?",
        answer:
          "Middleware are functions that run in the request-response cycle. They get req, res, and next, and can modify the request, end the response, or pass control to the next middleware.",
        feedback:
          "Clear and correct. Giving an example like auth checks or body parsing would illustrate it nicely.",
        score: 7,
      },
    ],

    messages: [
      {
        id: 1,
        sender: "AI",
        message: "Hello and welcome to your Node.js interview.",
      },
      {
        id: 2,
        sender: "AI",
        message:
          "What is Node.js and how is it different from browser JavaScript?",
      },
      {
        id: 3,
        sender: "User",
        message:
          "Node.js is a JavaScript runtime built on Chrome's V8 engine. Unlike the browser, it has no DOM or window object, but provides APIs for the filesystem, networking, and process access.",
      },
      {
        id: 4,
        sender: "AI",
        message: "Great. Can you explain the event loop in Node.js?",
      },
      {
        id: 5,
        sender: "User",
        message:
          "The event loop allows Node to do non-blocking I/O by offloading operations to the system. It continuously checks for completed operations and runs their callbacks in phases like timers, poll, and check.",
      },
      {
        id: 6,
        sender: "AI",
        message: "Last question: What is middleware in Express?",
      },
      {
        id: 7,
        sender: "User",
        message:
          "Middleware are functions that run in the request-response cycle. They get req, res, and next, and can modify the request, end the response, or pass control to the next middleware.",
      },
    ],
  },

  {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    topic: "TypeScript",
    score: 91,

    strengths: [
      "Strong grasp of generics",
      "Explains type inference clearly",
    ],

    improvements: [
      "Explore utility types more",
      "Practice conditional types",
    ],

    questions: [
      {
        id: 1,
        question: "What is the difference between an interface and a type alias?",
        answer:
          "Interfaces describe object shapes and can be extended or merged with declarations. Type aliases can represent any type, including unions and primitives, but can't be re-opened like interfaces.",
        feedback:
          "Well covered. Mentioning declaration merging as the key differentiator and performance-neutral choice would be the finishing touch.",
        score: 9,
      },
      {
        id: 2,
        question: "What are generics and why would you use them?",
        answer:
          "Generics let you write reusable code that works with multiple types while keeping type safety. You define a type parameter like function identity<T>(value: T): T and it adapts to whatever type is passed.",
        feedback:
          "Great answer with a practical example. Explaining constraints with extends would show mastery.",
        score: 9,
      },
      {
        id: 3,
        question: "What does the 'unknown' type do compared to 'any'?",
        answer:
          "unknown is a type-safe alternative to any. You can assign anything to unknown, but you must narrow it before using it, whereas any skips all type checking.",
        feedback:
          "Excellent distinction. This is exactly the mindset that prevents runtime bugs.",
        score: 9,
      },
    ],

    messages: [
      {
        id: 1,
        sender: "AI",
        message: "Welcome to your TypeScript interview. Ready to begin?",
      },
      {
        id: 2,
        sender: "AI",
        message: "What is the difference between an interface and a type alias?",
      },
      {
        id: 3,
        sender: "User",
        message:
          "Interfaces describe object shapes and can be extended or merged with declarations. Type aliases can represent any type, including unions and primitives, but can't be re-opened like interfaces.",
      },
      {
        id: 4,
        sender: "AI",
        message: "Good. What are generics and why would you use them?",
      },
      {
        id: 5,
        sender: "User",
        message:
          "Generics let you write reusable code that works with multiple types while keeping type safety. You define a type parameter like function identity<T>(value: T): T and it adapts to whatever type is passed.",
      },
      {
        id: 6,
        sender: "AI",
        message:
          "Last question: What does the 'unknown' type do compared to 'any'?",
      },
      {
        id: 7,
        sender: "User",
        message:
          "unknown is a type-safe alternative to any. You can assign anything to unknown, but you must narrow it before using it, whereas any skips all type checking.",
      },
    ],
  },
];

export default interviews;
