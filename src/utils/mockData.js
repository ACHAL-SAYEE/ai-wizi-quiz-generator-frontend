// Mock data for demonstration
export const mockQuizData = {
  id: 1,
  url: "https://en.wikipedia.org/wiki/Alan_Turing",
  title: "Alan Turing",
  summary: "Alan Turing was a British mathematician and computer scientist who is widely considered to be the father of theoretical computer science and artificial intelligence. During World War II, he played a crucial role in breaking German codes, particularly the Enigma code.",
  key_entities: {
    people: ["Alan Turing", "Alonzo Church", "Christopher Morcom"],
    organizations: ["University of Cambridge", "Bletchley Park", "National Physical Laboratory"],
    locations: ["United Kingdom", "London", "Manchester"]
  },
  sections: ["Early life and education", "World War II cryptanalysis", "Post-war work", "Mathematical contributions", "Legacy and honors"],
  quiz: [
    {
      id: 1,
      question: "Where did Alan Turing study?",
      options: [
        "Harvard University",
        "Cambridge University",
        "Oxford University",
        "Princeton University"
      ],
      answer: "Cambridge University",
      difficulty: "easy",
      explanation: "Alan Turing studied at King's College, Cambridge, where he was awarded first-class honours in mathematics."
    },
    {
      id: 2,
      question: "What was Alan Turing's main contribution during World War II?",
      options: [
        "Atomic research",
        "Breaking the Enigma code",
        "Inventing radar",
        "Developing jet engines"
      ],
      answer: "Breaking the Enigma code",
      difficulty: "medium",
      explanation: "Turing worked at Bletchley Park during World War II, where he led the team that broke the German Enigma code, significantly contributing to the Allied victory."
    },
    {
      id: 3,
      question: "What test did Alan Turing propose to determine machine intelligence?",
      options: [
        "The Turing Test",
        "The Intelligence Quotient",
        "The Logic Test",
        "The Computing Test"
      ],
      answer: "The Turing Test",
      difficulty: "easy",
      explanation: "The Turing Test, proposed in 1950, is a test of a machine's ability to exhibit intelligent behavior equivalent to, or indistinguishable from, that of a human."
    },
    {
      id: 4,
      question: "In which year was Alan Turing born?",
      options: [
        "1910",
        "1912",
        "1914",
        "1916"
      ],
      answer: "1912",
      difficulty: "medium",
      explanation: "Alan Turing was born on June 23, 1912, in Maida Vale, London."
    },
    {
      id: 5,
      question: "What concept did Turing introduce that became fundamental to computer science?",
      options: [
        "The Internet Protocol",
        "The Turing Machine",
        "Binary Code",
        "The Database"
      ],
      answer: "The Turing Machine",
      difficulty: "hard",
      explanation: "The Turing Machine is a mathematical model of computation that defines an abstract machine, which became a fundamental concept in the theory of computation."
    },
    {
      id: 6,
      question: "Which prestigious award in computer science is named after Turing?",
      options: [
        "The Nobel Prize in Computing",
        "The Turing Award",
        "The Computing Medal",
        "The ACM Prize"
      ],
      answer: "The Turing Award",
      difficulty: "medium",
      explanation: "The Turing Award, established in 1966, is often called the 'Nobel Prize of Computing' and is awarded annually by the Association for Computing Machinery."
    },
    {
      id: 7,
      question: "What field of mathematics did Turing make significant contributions to?",
      options: [
        "Geometry",
        "Number Theory",
        "Mathematical Logic",
        "Algebra"
      ],
      answer: "Mathematical Logic",
      difficulty: "hard",
      explanation: "Turing made groundbreaking contributions to mathematical logic, particularly in computability theory and the foundations of computer science."
    }
  ],
  related_topics: [
    "Cryptography",
    "Enigma machine",
    "Computer science history",
    "Artificial Intelligence",
    "Bletchley Park",
    "Computability theory"
  ],
  created_at: new Date().toISOString()
};

export const mockHistoryData = [
  {
    id: 1,
    url: "https://en.wikipedia.org/wiki/Alan_Turing",
    title: "Alan Turing",
    created_at: "2024-01-15T10:30:00Z",
    question_count: 7
  },
  {
    id: 2,
    url: "https://en.wikipedia.org/wiki/Marie_Curie",
    title: "Marie Curie",
    created_at: "2024-01-14T15:20:00Z",
    question_count: 8
  },
  {
    id: 3,
    url: "https://en.wikipedia.org/wiki/Isaac_Newton",
    title: "Isaac Newton",
    created_at: "2024-01-13T09:45:00Z",
    question_count: 6
  },
  {
    id: 4,
    url: "https://en.wikipedia.org/wiki/Albert_Einstein",
    title: "Albert Einstein",
    created_at: "2024-01-12T14:10:00Z",
    question_count: 9
  },
  {
    id: 5,
    url: "https://en.wikipedia.org/wiki/Ada_Lovelace",
    title: "Ada Lovelace",
    created_at: "2024-01-11T11:00:00Z",
    question_count: 5
  }
];

// Simulate API delay
export const simulateApiDelay = (ms = 2000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Simulate API call to generate quiz
export const generateQuiz = async (url) => {
  await simulateApiDelay(2000);
  
  // Validate URL
  if (!url.includes('wikipedia.org/wiki/')) {
    throw new Error('Please provide a valid Wikipedia article URL');
  }
  
  // Return mock data with updated URL and title
  const articleName = url.split('/wiki/')[1].replace(/_/g, ' ');
  return {
    ...mockQuizData,
    url,
    title: articleName,
    id: Date.now()
  };
};

// Simulate API call to get history
export const getQuizHistory = async () => {
  await simulateApiDelay(500);
  return mockHistoryData;
};

// Simulate API call to get quiz details
export const getQuizDetails = async (id) => {
  await simulateApiDelay(500);
  return mockQuizData;
};
