
// QUANTUMVERSE - MAIN JAVASCRIPT

const $ = id => document.getElementById(id);
const load = (key, fallback) => {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
};
const save = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));

// DASHBOARD AND LEARNING PROGRESS
let completed = load("qvCompleted", []);
let bestScore = load("qvBest", 0);
let gateCount = load("qvGates", 0);
let learner = load("qvLearner", null);
let quizPassed = load("qvQuizPassed", false);

function updateDashboard() {
    $("completedCount").textContent = completed.length;
    $("quizBest").textContent = bestScore;
    $("gateCount").textContent = gateCount;
    $("userName").textContent = learner ? learner.name : "Guest";

    let percent = Math.round(completed.length / 6 * 100);
    $("progressText").textContent = percent + "%";
    $("progressBar").style.width = percent + "%";

    $("certificateBtn").disabled = !quizPassed;
    $("certificateStatus").textContent = quizPassed
        ? "Quiz completed! Your certificate is ready."
        : "Complete the quiz to unlock your certificate.";

    document.querySelectorAll(".topic").forEach(card => {
        let name = card.dataset.title;
        let btn = card.querySelector("button");
        if (completed.includes(name)) {
            btn.textContent = "✓ Completed";
            btn.disabled = true;
        }
    });
}

function completeTopic(name) {
    if (!completed.includes(name)) {
        completed.push(name);
        save("qvCompleted", completed);
        updateDashboard();
    }
}

// TOPIC SEARCH
$("topicSearch").addEventListener("input", function () {
    let query = this.value.toLowerCase();
    document.querySelectorAll(".topic").forEach(card => {
        card.style.display =
            card.dataset.title.toLowerCase().includes(query)
                ? "" : "none";
    });
});

// ACCOUNT DEMO
$("accountBtn").addEventListener("click", () => {
    $("accountModal").classList.add("show");
});

function closeAccount() {
    $("accountModal").classList.remove("show");
}

function saveAccount() {
    let name = $("accountName").value.trim();
    let email = $("accountEmail").value.trim();

    if (!name || !email || !email.includes("@")) {
        alert("Enter a valid name and email address.");
        return;
    }

    learner = { name, email };
    save("qvLearner", learner);
    $("accountBtn").textContent = "My Account";
    closeAccount();
    updateDashboard();
}

function openAccountIfNeeded() {
    if (!learner) {
        $("accountModal").classList.add("show");
    } else {
        $("accountName").value = learner.name;
        $("accountEmail").value = learner.email;
        $("accountModal").classList.add("show");
    }
}
$("accountBtn").addEventListener("dblclick", openAccountIfNeeded);

// THEME SWITCH
$("themeBtn").addEventListener("click", () => {
    document.body.classList.toggle("light");
    let light = document.body.classList.contains("light");
    $("themeBtn").textContent = light ? "🌙" : "☀️";
    save("qvTheme", light);
});

if (load("qvTheme", false)) {
    document.body.classList.add("light");
    $("themeBtn").textContent = "🌙";
}

// QUBIT LAB
function updateQubit() {
    let theta = Number($("theta").value);
    let phi = Number($("phi").value);

    $("thetaValue").textContent = theta + "°";
    $("phiValue").textContent = phi + "°";

    let p0 = Math.cos(theta * Math.PI / 360) ** 2;
    let p1 = 1 - p0;

    $("pZero").textContent = (p0 * 100).toFixed(1) + "%";
    $("pOne").textContent = (p1 * 100).toFixed(1) + "%";
    $("pZeroBar").style.width = (p0 * 100) + "%";
    $("pOneBar").style.width = (p1 * 100) + "%";

    $("stateArrow").style.transform =
        `rotate(${theta}deg) rotateY(${phi}deg)`;
    $("measureResult").textContent = "State updated. Ready to measure.";
}

$("theta").addEventListener("input", updateQubit);
$("phi").addEventListener("input", updateQubit);

function measureQubit() {
    let p0 = Number($("pZero").textContent.replace("%", "")) / 100;
    let outcome = Math.random() < p0 ? "0" : "1";
    $("measureResult").textContent =
        "Measurement result: |" + outcome + "⟩";
}

function resetQubit() {
    $("theta").value = 0;
    $("phi").value = 0;
    updateQubit();
    $("measureResult").textContent = "Reset to |0⟩.";
}

// COMPLEX NUMBER HELPERS FOR GATE SIMULATOR
const C = (re, im = 0) => ({ re, im });

function add(a, b) {
    return C(a.re + b.re, a.im + b.im);
}
function mul(a, b) {
    return C(a.re * b.re - a.im * b.im,
             a.re * b.im + a.im * b.re);
}
function scale(a, n) {
    return C(a.re * n, a.im * n);
}
function magnitude(a) {
    return Math.hypot(a.re, a.im);
}
function formatComplex(a) {
    return a.re.toFixed(2) +
        (a.im >= 0 ? " + " : " - ") +
        Math.abs(a.im).toFixed(2) + "i";
}

let alpha = C(1);
let beta = C(0);
let circuit = [];

function applyMatrix(gate, a, b) {
    let s = 1 / Math.sqrt(2);

    if (gate === "X") return [b, a];

    if (gate === "Y") {
        return [C(b.im, -b.re), C(-a.im, a.re)];
    }

    if (gate === "Z") {
        return [a, C(-b.re, -b.im)];
    }

    if (gate === "H") {
        return [
            scale(add(a, b), s),
            scale(add(a, C(-b.re, -b.im)), s)
        ];
    }

    return [a, b];
}

function addGate(name) {
    [alpha, beta] = applyMatrix(name, alpha, beta);
    circuit.push(name);
    gateCount++;
    save("qvGates", gateCount);
    updateCircuit();
    updateDashboard();
}

function updateCircuit() {
    $("circuitGates").innerHTML = circuit.length
        ? circuit.map(g => `<span class="gate-chip">${g}</span>`).join("")
        : "No gates added";

    let p0 = magnitude(alpha) ** 2;
    let p1 = magnitude(beta) ** 2;

    $("circuitState").textContent =
        "|ψ⟩ = (" + formatComplex(alpha) + ")|0⟩ + (" +
        formatComplex(beta) + ")|1⟩";

    $("circuitProb").textContent =
        "P(0) = " + (p0 * 100).toFixed(1) +
        "% | P(1) = " + (p1 * 100).toFixed(1) + "%";

    $("circuitExplanation").textContent =
        circuit.length
        ? circuit.join(" → ") + " applied successfully."
        : "Initial state is |0⟩.";
}

function resetCircuit() {
    alpha = C(1);
    beta = C(0);
    circuit = [];
    updateCircuit();
}

// BELL STATE ENTANGLEMENT DEMO
let bellCount = 0, bell00 = 0, bell11 = 0;

function measureBell() {
    let result = Math.random() < 0.5 ? "00" : "11";

    bellCount++;
    if (result === "00") bell00++;
    else bell11++;

    $("bellResult").textContent =
        "Measurement result: |" + result + "⟩";

    $("bellStats").textContent =
        `Measurements: ${bellCount} | 00: ${bell00} | 11: ${bell11}`;
}

function resetBell() {
    bellCount = bell00 = bell11 = 0;
    $("bellResult").textContent = "Waiting for measurement...";
    $("bellStats").textContent = "Measurements: 0 | 00: 0 | 11: 0";
}

// GROVER SEARCH: TWO-QUBIT STATE VECTOR
function runGrover() {
    let target = Number($("targetItem").value);
    let state = [0.5, 0.5, 0.5, 0.5];

    // Oracle phase flip
    state[target] *= -1;

    // Diffusion operator
    let mean = state.reduce((sum, x) => sum + x, 0) / 4;
    state = state.map(x => 2 * mean - x);

    let probabilities = state.map(x => x * x);
    let success = probabilities[target] * 100;

    $("groverResult").textContent =
        `Target: Item ${target}. Success probability: ${success.toFixed(1)}%`;

    $("groverBars").innerHTML = probabilities.map((p, i) => `
        <div class="bar-row">
            <span>Item ${i}</span>
            <div class="bar-track">
                <div style="width:${p * 100}%"></div>
            </div>
            <strong>${(p * 100).toFixed(0)}%</strong>
        </div>
    `).join("");
}

// SMALL INTEGER FACTORIZATION DEMO
function factorNumber() {
    let n = Number($("factorNumber").value);

    if (!Number.isInteger(n) || n < 4 || n > 100) {
        $("factorResult").textContent =
            "Enter a whole number between 4 and 100.";
        return;
    }

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            $("factorResult").textContent =
                `${n} = ${i} × ${n / i}`;
            return;
        }
    }

    $("factorResult").textContent =
        `${n} is a prime number. No smaller factors found.`;
}

// 20 QUESTION QUIZ
const questions = [
    ["What is the basic unit of quantum information?", ["Bit", "Qubit", "Byte", "Pixel"], 1],
    ["Which gate creates equal superposition from |0⟩?", ["X", "Z", "H", "Y"], 2],
    ["Which gate flips |0⟩ and |1⟩?", ["X", "H", "Z", "S"], 0],
    ["What does measurement produce?", ["Only a graph", "Classical outcome", "New qubit", "A gate"], 1],
    ["Which symbol represents a qubit state?", ["ψ", "HTML", "SQL", "CPU"], 0],
    ["What is entanglement?", ["File sharing", "Quantum correlation", "Sorting", "Encryption key"], 1],
    ["Which gate changes the phase of |1⟩?", ["X", "H", "Z", "CNOT"], 2],
    ["What is the output of X applied to |0⟩?", ["|0⟩", "|1⟩", "|+⟩", "|−⟩"], 1],
    ["What is the Hadamard gate commonly used for?", ["Deleting data", "Superposition", "Cooling", "Sorting"], 1],
    ["What is a quantum circuit?", ["A sequence of quantum gates", "A battery", "A web page", "A file"], 0],
    ["What does a Bloch sphere represent?", ["Qubit state", "CPU speed", "Network", "Database"], 0],
    ["What is P(0) for an equal superposition?", ["0%", "25%", "50%", "100%"], 2],
    ["Which algorithm is associated with quantum search?", ["Grover", "Bubble sort", "Dijkstra", "Merge sort"], 0],
    ["Which algorithm is associated with integer factoring?", ["Grover", "Shor", "DFS", "BFS"], 1],
    ["Can an unknown quantum state be perfectly copied?", ["Yes", "No", "Always", "Only on a laptop"], 1],
    ["What is a classical bit?", ["0 or 1", "All numbers at once", "A quantum gate", "A circuit"], 0],
    ["Which gate is its own inverse?", ["H", "S", "T", "None"], 0],
    ["What does a CNOT gate use?", ["Control and target qubits", "One file", "A database", "A sensor"], 0],
    ["What does a quantum simulator do?", ["Models quantum behaviour", "Creates a real atom", "Repairs hardware", "Stores passwords"], 0],
    ["What is the main purpose of this QuantumVerse lab?", ["Educational simulation", "Real quantum hardware", "Banking", "Gaming only"], 0]
];

let questionIndex = 0;
let score = 0;
let answered = false;
let finished = false;

function showQuestion() {
    let q = questions[questionIndex];
    $("questionNumber").textContent =
        `Question ${questionIndex + 1} / ${questions.length}`;
    $("questionText").textContent = q[0];
    $("liveScore").textContent = "Score: " + score;
    $("quizProgress").style.width =
        (questionIndex / questions.length * 100) + "%";
    $("answerFeedback").textContent = "";
    $("nextQuestion").disabled = true;
    $("nextQuestion").textContent =
        questionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question →";

    $("answerOptions").innerHTML = "";

    q[1].forEach((option, index) => {
        let btn = document.createElement("button");
        btn.textContent = option;
        btn.addEventListener("click", () => chooseAnswer(index, btn));
        $("answerOptions").appendChild(btn);
    });

    answered = false;
}

function chooseAnswer(index, selectedButton) {
    if (answered || finished) return;
    answered = true;

    let correct = questions[questionIndex][2];
    let buttons = $("answerOptions").querySelectorAll("button");

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correct) btn.classList.add("correct");
    });

    if (index === correct) {
        score++;
        $("answerFeedback").textContent = "Correct answer! 🎉";
    } else {
        selectedButton.classList.add("wrong");
        $("answerFeedback").textContent =
            "Incorrect. Correct answer: " + questions[questionIndex][1][correct];
    }

    $("liveScore").textContent = "Score: " + score;
    $("nextQuestion").disabled = false;
}

function nextQuestion() {
    if (!answered || finished) return;

    questionIndex++;

    if (questionIndex >= questions.length) {
        finished = true;
        let percent = Math.round(score / questions.length * 100);

        if (score > bestScore) {
            bestScore = score;
            save("qvBest", bestScore);
        }

        quizPassed = percent >= 60;
        save("qvQuizPassed", quizPassed);

        $("questionNumber").textContent = "Quiz completed";
        $("questionText").textContent = "Your final score";
        $("answerOptions").innerHTML = "";
        $("answerFeedback").textContent =
            `${score} / ${questions.length} (${percent}%)`;
        $("quizProgress").style.width = "100%";
        $("nextQuestion").disabled = true;
        $("quizFinal").textContent = quizPassed
            ? "Congratulations! You unlocked your certificate."
            : "Try again to score at least 60% and unlock your certificate.";

        updateDashboard();
        return;
    }

    showQuestion();
}

// QUIZ RESTART
function restartQuiz() {
    questionIndex = 0;
    score = 0;
    answered = false;
    finished = false;
    $("quizFinal").textContent = "";
    showQuestion();
}

// CERTIFICATE DOWNLOAD
function downloadCertificate() {
    if (!quizPassed) return;

    let name = learner ? learner.name : "QuantumVerse Learner";
    let date = new Date().toLocaleDateString();

    let certificate = `
    <html>
    <head><title>QuantumVerse Certificate</title>
    <style>
    body { font-family: Georgia, serif; background: #10152b; color: white;
           display: grid; place-items: center; min-height: 90vh; }
    .cert { border: 7px double #a78bfa; padding: 55px; text-align: center;
            width: 75%; background: #171e3a; }
    h1 { color: #a78bfa; font-size: 38px; }
    h2 { color: #38bdf8; }
    p { font-size: 18px; line-height: 2; }
    </style></head>
    <body><div class="cert">
    <h2>⚛ QuantumVerse</h2>
    <h1>Certificate of Achievement</h1>
    <p>This certificate is presented to</p>
    <h2>${escapeHTML(name)}</h2>
    <p>For completing the Quantum Computing Knowledge Quiz.</p>
    <p>Achievement: ${score} / 20</p>
    <p>Date: ${date}</p>
    <p>Educational Demo Certificate</p>
    </div></body></html>`;

    let blob = new Blob([certificate], { type: "text/html" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "QuantumVerse-Certificate.html";
    a.click();
    URL.revokeObjectURL(url);
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;",
        '"': "&quot;", "'": "&#39;"
    })[char]);
}

// INITIALIZE
updateQubit();
updateCircuit();
updateDashboard();
showQuestion();

if (learner) {
    $("accountBtn").textContent = "My Account";
}
