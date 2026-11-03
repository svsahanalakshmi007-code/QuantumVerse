
// QUBIT LAB
const probability = document.getElementById("probability");

probability.addEventListener("input", function () {
    let p = Number(this.value);

    document.getElementById("probValue").innerText = p + "%";
    document.getElementById("zeroProb").innerText = "P(0) = " + p + "%";
    document.getElementById("oneProb").innerText = "P(1) = " + (100 - p) + "%";

    document.getElementById("measurement").innerText =
        "Ready to measure";
});

function measureQubit() {
    let p = Number(probability.value);
    let result = Math.random() * 100 < p ? "0" : "1";

    document.getElementById("measurement").innerText =
        "Measurement Result: |" + result + "⟩";
}

// QUANTUM GATE SIMULATOR
let gateState = "|0⟩";

function applyGate(gate) {
    let result = "";

    if (gate === "X") {
        gateState = gateState === "|0⟩" ? "|1⟩" : "|0⟩";
        result = "X Gate flips the qubit state.";
    }

    if (gate === "Y") {
        result = "Y Gate applies a quantum bit and phase flip.";
    }

    if (gate === "Z") {
        result = "Z Gate changes the phase of the |1⟩ state.";
    }

    if (gate === "H") {
        gateState = "Superposition";
        result = "H Gate creates an equal superposition of |0⟩ and |1⟩.";
    }

    document.getElementById("gateState").innerText =
        "Current State: " + gateState;

    document.getElementById("gateResult").innerText = result;
}

function resetGate() {
    gateState = "|0⟩";
    document.getElementById("gateState").innerText =
        "Current State: |0⟩";
    document.getElementById("gateResult").innerText =
        "Qubit has been reset.";
}

// ENTANGLEMENT LAB
function measureBell() {
    let result = Math.random() < 0.5 ? "00" : "11";

    document.getElementById("bellResult").innerText =
        "Measurement Result: |" + result + "⟩";
}

// GROVER ALGORITHM DEMO
function runGrover() {
    document.getElementById("groverResult").innerText =
        "Demo complete! Grover's algorithm amplifies the probability of finding a target item.";
}

// QUIZ
const questions = [
    {
        q: "1. What is the basic unit of quantum information?",
        a: ["Bit", "Qubit", "Byte"],
        correct: 1
    },
    {
        q: "2. Which gate creates superposition from |0⟩?",
        a: ["X Gate", "Z Gate", "Hadamard Gate"],
        correct: 2
    },
    {
        q: "3. What is quantum entanglement?",
        a: ["Connected quantum states", "Computer memory", "A classical bit"],
        correct: 0
    },
    {
        q: "4. Which algorithm is used for quantum search?",
        a: ["Bubble Sort", "Grover's Algorithm", "Linear Search"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
    let q = questions[currentQuestion];

    document.getElementById("question").innerText = q.q;

    document.getElementById("answers").innerHTML =
        q.a.map((answer, index) =>
            `<button onclick="checkAnswer(${index})">${answer}</button>`
        ).join("");

    document.getElementById("quizResult").innerText = "";
    answered = false;
}

function checkAnswer(selected) {
    if (answered) return;

    answered = true;
    let correct = questions[currentQuestion].correct;

    if (selected === correct) {
        score++;
        document.getElementById("quizResult").innerText =
            "Correct Answer! 🎉";
    } else {
        document.getElementById("quizResult").innerText =
            "Wrong Answer! Correct answer: " +
            questions[currentQuestion].a[correct];
    }

    document.getElementById("score").innerText =
        "Score: " + score + " / " + questions.length;
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion >= questions.length) {
        document.getElementById("question").innerText =
            "Quiz Completed!";

        document.getElementById("answers").innerHTML = "";

        document.getElementById("quizResult").innerText =
            "Your Final Score: " + score + " / " + questions.length;

        return;
    }

    showQuestion();
}
