
:root {
    --bg: #080b19;
    --panel: #131a31;
    --panel2: #1a2340;
    --text: #f5f5ff;
    --muted: #aeb8d1;
    --purple: #a78bfa;
    --blue: #38bdf8;
    --border: #303b62;
}
* { box-sizing: border-box; scroll-behavior: smooth; }
body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: Arial, sans-serif;
    transition: .3s;
}
body.light {
    --bg: #eef1ff;
    --panel: #ffffff;
    --panel2: #e5eaff;
    --text: #17203b;
    --muted: #53617e;
    --border: #c5cdea;
}
.topbar {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
    padding: 16px 5%;
    background: var(--panel);
    border-bottom: 1px solid var(--border);
}
.brand { color: var(--purple); font-size: 22px; font-weight: bold; text-decoration: none; }
nav { display: flex; flex-wrap: wrap; gap: 15px; }
nav a { color: var(--text); text-decoration: none; font-size: 13px; }
nav a:hover { color: var(--blue); }
.top-actions { display: flex; gap: 8px; }
button, .primary-btn, .secondary-btn {
    border: 0;
    border-radius: 8px;
    padding: 11px 17px;
    color: white;
    background: linear-gradient(100deg, #7c3aed, #2563eb);
    cursor: pointer;
    font-weight: bold;
    transition: .2s;
}
button:hover, .primary-btn:hover, .secondary-btn:hover { transform: translateY(-2px); opacity: .88; }
button:disabled { opacity: .4; cursor: not-allowed; transform: none; }
.small-btn { padding: 9px 12px; }
.secondary-btn { background: #303b62; }
.hero {
    min-height: 570px;
    padding: 75px 9%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 40px;
    background: radial-gradient(circle at 80% 40%, #30206d, transparent 40%);
}
.hero-content { max-width: 650px; }
.eyebrow { color: var(--blue); font-size: 12px; letter-spacing: 3px; font-weight: bold; }
.hero h1 { font-size: clamp(38px, 6vw, 65px); line-height: 1.15; margin: 20px 0; }
.hero h1 span { color: var(--purple); text-shadow: 0 0 25px #7c3aed; }
.hero p { color: var(--muted); line-height: 1.8; max-width: 550px; }
.hero-stats { display: flex; gap: 35px; margin-top: 35px; }
.hero-stats div { display: grid; gap: 5px; }
.hero-stats strong { font-size: 23px; color: var(--blue); }
.hero-stats small { color: var(--muted); }
.hero-visual { width: 280px; height: 280px; position: relative; display: grid; place-items: center; margin: auto; }
.quantum-core { font-size: 100px; color: var(--purple); text-shadow: 0 0 45px #8b5cf6; z-index: 2; }
.orbit { position: absolute; width: 260px; height: 105px; border: 2px solid var(--blue); border-radius: 50%; transform: rotate(35deg); box-shadow: 0 0 18px #2563eb; }
.orbit-two { transform: rotate(-35deg); border-color: var(--purple); }
.floating { position: absolute; color: var(--blue); font-size: 25px; }
.f-one { top: 0; left: 50px; }
.f-two { right: 0; bottom: 40px; }
.f-three { left: 10px; bottom: 60px; color: var(--purple); }
.section { padding: 75px 8%; }
.alternate { background: var(--panel); }
.section-heading { text-align: center; margin-bottom: 35px; }
.section-heading h2 { font-size: 32px; margin: 12px 0; }
.section-heading p, .hint { color: var(--muted); line-height: 1.7; }
.dashboard-grid, .cards, .algorithm-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 20px;
}
.stat-card, .card, .panel, .progress-card {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 15px;
    padding: 23px;
}
.stat-card span { font-size: 26px; }
.stat-card h3 { font-size: 26px; color: var(--purple); margin: 10px 0; overflow-wrap: anywhere; }
.stat-card p, .card p, .panel p { color: var(--muted); line-height: 1.7; }
.progress-card { margin-top: 20px; }
.row-between { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
.progress-track { height: 9px; background: var(--border); border-radius: 20px; overflow: hidden; margin: 12px 0; }
.progress-track div { height: 100%; width: 0; background: linear-gradient(90deg, #8b5cf6, #38bdf8); transition: .3s; }
.card { background: var(--panel2); }
.card h3 { color: var(--purple); }
.card-icon { font-size: 30px; }
.card button { margin-top: 12px; }
.search, input, select {
    width: 100%;
    padding: 12px;
    margin: 10px 0 18px;
    background: var(--panel2);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 8px;
}
.lab-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
.panel h3 { margin-top: 5px; }
.panel label { display: block; margin-top: 20px; }
.panel input[type=range] { accent-color: var(--purple); }
.sphere-panel { text-align: center; }
.bloch { width: 240px; height: 240px; margin: 30px auto; position: relative; border: 1px solid var(--blue); border-radius: 50%; background: radial-gradient(circle at 35% 30%, #303d80, #12152c 65%); box-shadow: inset -15px -12px 35px #080b19, 0 0 30px #5434a5; }
.sphere-ball { position: absolute; inset: 12%; border: 1px solid #8794f7; border-radius: 50%; }
.sphere-equator { position: absolute; top: 39%; left: 0; width: 100%; height: 22%; border: 1px solid var(--blue); border-radius: 50%; transform: rotate(-25deg); }
.sphere-axis { position: absolute; background: #aeb8d1; opacity: .65; }
.axis-x { height: 1px; width: 100%; top: 50%; }
.axis-y { width: 1px; height: 100%; left: 50%; }
.axis-z { width: 1px; height: 100%; left: 50%; transform: rotate(55deg); }
.state-arrow { position: absolute; height: 85px; width: 3px; background: #f472b6; left: 50%; top: 50%; transform-origin: top; transform: rotate(0deg); box-shadow: 0 0 12px #f472b6; z-index: 3; }
.state-arrow:after { content: ""; position: absolute; top: 0; left: -5px; border-left: 6px solid transparent; border-right: 6px solid transparent; border-bottom: 12px solid #f472b6; }
.sphere-label { position: absolute; color: white; font-size: 13px; }
.label-zero { top: 5px; left: 48%; }
.label-one { bottom: 5px; left: 48%; }
.label-x { top: 50%; right: 5px; }
.label-y { top: 50%; left: 5px; }
.probability-box { margin: 22px 0; }
.probability-box p { display: flex; justify-content: space-between; }
.probability-box strong { color: var(--blue); }
.gate-panel { max-width: 900px; margin: auto; }
.gate-buttons { display: flex; flex-wrap: wrap; gap: 10px; margin: 22px 0; }
.circuit-line { display: flex; align-items: center; gap: 12px; padding: 22px 0; border-bottom: 2px solid var(--blue); flex-wrap: wrap; }
.circuit-gates { display: flex; gap: 8px; flex-wrap: wrap; }
.gate-chip { padding: 12px; background: #6d40bd; border-radius: 7px; min-width: 42px; text-align: center; }
.state-output { background: var(--panel2); padding: 20px; border-radius: 10px; margin-top: 20px; overflow-wrap: anywhere; }
.state-output h3 { color: var(--blue); }
.entangle-panel { text-align: center; max-width: 700px; margin: auto; }
.bell-circuit { display: flex; align-items: center; justify-content: center; gap: 25px; margin: 30px; }
.particle { background: #4c1d95; border: 2px solid var(--purple); padding: 28px 18px; border-radius: 50%; box-shadow: 0 0 25px #7c3aed; }
.entangle-link { color: var(--blue); font-size: 35px; }
.algorithm-grid .panel { min-width: 0; }
.result { color: var(--blue); font-weight: bold; margin: 18px 0; line-height: 1.7; }
.bar-row { display: grid; grid-template-columns: 60px 1fr 50px; align-items: center; gap: 8px; margin: 12px 0; }
.bar-track { background: var(--border); height: 12px; border-radius: 20px; overflow: hidden; }
.bar-track div { height: 100%; background: linear-gradient(90deg, #8b5cf6, #38bdf8); }
.quiz-panel { max-width: 700px; margin: auto; }
.quiz-panel h3 { margin: 25px 0; }
.answer-options { display: grid; gap: 12px; }
.answer-options button { text-align: left; background: var(--panel2); border: 1px solid var(--border); }
.answer-options button.selected { outline: 2px solid var(--blue); }
.answer-options button.correct { background: #166534; }
.answer-options button.wrong { background: #991b1b; }
.certificate-panel { text-align: center; max-width: 650px; margin: auto; }
.certificate-panel h3 { color: var(--purple); font-size: 25px; }
footer { text-align: center; padding: 45px 20px; background: #060916; color: white; line-height: 2; }
.modal { display: none; position: fixed; inset: 0; z-index: 40; background: #000b; align-items: center; justify-content: center; padding: 20px; }
.modal.show { display: flex; }
.modal-box { background: var(--panel); border: 1px solid var(--border); padding: 30px; border-radius: 15px; width: min(420px, 100%); position: relative; }
.close-btn { position: absolute; right: 12px; top: 12px; padding: 7px 11px; }
@media(max-width: 800px) {
    .topbar { justify-content: center; }
    nav { justify-content: center; }
    .hero { text-align: center; justify-content: center; }
    .hero-stats { justify-content: center; }
    .section { padding: 55px 5%; }
}
@media(max-width: 480px) {
    .hero-stats { gap: 15px; }
    .hero-visual { transform: scale(.85); }
    .section-heading h2 { font-size: 26px; }
    .bell-circuit { gap: 10px; margin: 20px 0; }
    .particle { padding: 20px 12px; }
}
