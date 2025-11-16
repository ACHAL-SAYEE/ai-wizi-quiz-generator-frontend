export async function generateQuiz(url) {
  const response = await fetch("http://localhost:8000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to generate quiz");
  }

  return response.json();
}

export async function fetchQuizHistory() {
  const res = await fetch("http://localhost:8000/history");
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}

export async function fetchQuizDetails(id) {
  const res = await fetch(`http://localhost:8000/detail/${id}`);
  if (!res.ok) throw new Error("Failed to fetch quiz details");
  return res.json();
}
