import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Clock3,
  FileCheck2,
  Radar,
  Scale,
  Target,
  UsersRound,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useLessonAudio } from "../../shared/useLessonAudio";
import "./styles.css";
const files = import.meta.glob("./assets/illustrations/*.png", {
    eager: true,
    query: "?url",
    import: "default",
  }),
  img = (n) => files[`./assets/illustrations/${n}.png`];
const tabs = [
  "The convoy",
  "Strategy",
  "Three components",
  "Risk & lifecycle",
  "Traditional vs. Agile",
  "Exam lens",
];
const d = {
  hook: {
    title: "A well-executed project can fail exactly the same way.",
    text: "When critical materials, services, or expertise don’t arrive as planned, the delay doesn’t stay contained — it ripples across the entire project. In complex initiatives, success often depends as much on how effectively external contributions are sourced and managed as it does on internal performance. Whether you’re securing specialized equipment, hiring consultants, or contracting time-sensitive services, the procurement strategy has to be proactive, flexible, and tightly aligned with the project’s actual goals.",
    image: "convoy-ripple-modal",
  },
  meaning: {
    title: "Plan and manage a procurement strategy.",
    text: "This enabler asks the project manager to plan and manage a procurement strategy — intentionally defining how, when, and from whom the project will obtain goods and services from outside the organization. That means deciding what to outsource versus what to keep in-house, which contract types best balance cost and risk, the criteria for selecting vendors, how procurement risk will be mitigated, and how contracts will actually be managed for the life of the project. Done well, this ensures external partnerships support the project’s cost, quality, and timeline goals — rather than quietly working against them.",
    image: "five-decisions-modal",
  },
  contract: {
    title: "Choose the Right Contract Type",
    text: "Every project is different, and so is the contract that fits it best. Fixed-price contracts suit well-defined scope but carry more risk for the seller. Cost-reimbursable contracts offer flexibility for changing requirements but risk cost overruns landing on the buyer. Time-and-materials contracts fit unclear scope well, but demand close, ongoing monitoring to keep from running away.",
    image: "contract-type-detail",
  },
  timing: {
    title: "Time Procurement Activities Wisely",
    text: "Timing is everything. Goods or services need to arrive exactly when the project needs them — not so early that unnecessary storage costs pile up, and not so late that the project itself gets delayed waiting. Example: ordering specialized solar inverters for a rural electrification project three months before the site is ready means paying to store and secure expensive equipment the project can’t yet use. Ordering them a week after the installation crew has already arrived means the crew stands idle, fully staffed, with nothing to install.",
    image: "procurement-timing-detail",
  },
  criteria: {
    title: "Set Supplier Selection Criteria",
    text: "Once the need and timing are clear, the next question is who actually delivers it. That means deciding upfront what matters most — cost, technical expertise, past performance, delivery speed — and using tools like weighted scoring models or bidder conferences to evaluate and rank suppliers on consistent criteria, rather than picking based on whichever pitch sounded most confident.",
    image: "supplier-criteria-detail",
  },
  risk: {
    title: "Managing Procurement Risk",
    text: "Identifying risks early — scrutinizing vendor stability, the geopolitical climate, and the complexity of what’s actually being delivered. Assessing impact honestly — asking whether a given disruption would cause a minor hiccup or a genuine catastrophe. Developing contingency plans in advance — backup suppliers already identified, flexible clauses already built into the contract, rather than improvised after the disruption hits.",
    image: "procurement-risk-detail",
  },
  lifecycle: {
    title: "Managing the Contract Lifecycle",
    text: "Procurement doesn’t end the moment a contract gets signed — that’s actually where strategy meets execution. Administering the contract: confirming both buyer and seller are genuinely following its terms, not just assuming they are. Controlling changes: using formal change control for any shift in price, scope, or delivery, rather than letting adjustments happen informally. Closing out properly: completing performance reviews, resolving outstanding issues, and archiving lessons learned for the next procurement effort. The Contract Management Plan is the playbook that keeps all of this compliant, on budget, and on track.",
    image: "contract-lifecycle-detail",
  },
  exam: {
    title:
      "Procurement isn’t just a box to check — it’s a strategic pillar holding up the entire project.",
    text: "A procurement strategy outlines how goods and services will actually be sourced. Contract types need to align with risk levels and scope certainty. Managing procurement risk means identifying, assessing, and preparing for disruption before it arrives. And effective contract management — administering, controlling changes, closing out properly — ensures deliverables actually meet the standards and terms everyone agreed to. Agile and traditional methodologies demand genuinely different procurement mindsets, and the right approach adapts to which one the project is actually running.",
    image: "convoy-success-exam",
    bullets: [
      "Three core components: choosing the right contract type, timing procurement activities wisely, setting supplier selection criteria",
      "Procurement risk management: identify, assess impact honestly, build contingencies in advance",
      "Contract lifecycle after signing: administer, control changes formally, close out properly — governed by the Contract Management Plan",
      "Traditional procurement: upfront, fixed, predictable. Agile procurement: iterative, collaborative, adjustable — different risks, different strengths",
    ],
  },
};
const quiz = {
  q: "You’re managing a renewable energy project in Kenya. One vendor is supplying solar panels under a fixed-price contract, while another is providing on-site installation under a time-and-materials contract. The installation is delayed due to weather, and the installation vendor requests a contract extension. Which action best demonstrates sound procurement strategy management?",
  a: [
    "Accept the delay as an unavoidable part of working with external vendors",
    "Renegotiate both contracts to convert them into cost-reimbursable types",
    "Use the Contract Management Plan to evaluate the delay and follow formal change procedures",
    "Immediately terminate the vendor’s contract and find another supplier",
  ],
  c: 2,
  g: "Correct! This is exactly what the Contract Management Plan exists for — assessing the real impact of the delay and routing the requested extension through formal change control, rather than reacting on instinct in either direction.",
  b: "Reconsider — passively accepting the delay, converting an uninvolved contract, or jumping straight to termination all skip the actual tool built for exactly this situation: formal, evaluated change control.",
};
function Modal({ x, close, read }) {
  const [step, setStep] = useState(0);
  return createPortal(
    <div className="modal-backdrop" onClick={close}>
      <section className="focus-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={close}>
          <X />
        </button>
        {step === 0 ? (
          <>
            <img className="modal-illustration" src={img(x.image)} alt="" />
            <h3>{x.title}</h3>
            <div className="modal-copy">
              <p>{x.text}</p>
            </div>
          </>
        ) : (
          <div className="memory-step">
            <h3>Exam-Relevant Enablers to Remember</h3>
            <ul>
              {x.bullets.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
        )}
        {x.bullets && step === 0 ? (
          <button className="modal-action" onClick={() => setStep(1)}>
            Next <ArrowRight />
          </button>
        ) : (
          <button
            className="modal-action"
            onClick={() => {
              read();
              close();
            }}
          >
            Mark as read <Check />
          </button>
        )}
      </section>
    </div>,
    document.body,
  );
}
function Quiz({ finish }) {
  const [p, setP] = useState(null);
  return createPortal(
    <div className="knowledge-backdrop">
      <section className="knowledge-modal">
        <p className="quiz-label">
          <Target /> MICRO KNOWLEDGE CHECK
        </p>
        <h3>{quiz.q}</h3>
        <div className="answers">
          {quiz.a.map((a, i) => (
            <button
              key={a}
              className={p === i ? (i === quiz.c ? "correct" : "wrong") : ""}
              onClick={() => setP(i)}
            >
              <span>{String.fromCharCode(65 + i)}</span>
              {a}
            </button>
          ))}
        </div>
        {p !== null && (
          <>
            <p className={`feedback ${p === quiz.c ? "good" : "bad"}`}>
              {p === quiz.c ? quiz.g : quiz.b}
            </p>
            <button className="finish-check" onClick={finish}>
              Finish check <ArrowRight />
            </button>
          </>
        )}
      </section>
    </div>,
    document.body,
  );
}
function App() {
  const [s, setS] = useState(0),
    [done, setDone] = useState(Array(6).fill(false)),
    [modal, setModal] = useState(null),
    [seen3, setSeen3] = useState([]),
    [seen4, setSeen4] = useState([]),
    [method, setMethod] = useState("traditional"),
    [methodsSeen, setMethodsSeen] = useState(["traditional"]),
    [quizOpen, setQuizOpen] = useState(false),
    [sound, setSound] = useState(true);
  useLessonAudio(sound);
  const mark = (i = s) => setDone((v) => v.map((x, j) => (j === i ? true : x))),
    go = (i) => i >= 0 && i < 6 && (i <= s + 1 || done[i - 1]) && setS(i),
    open = (key) => setModal(d[key]);
  let c;
  if (s === 0)
    c = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">
            LESSON 4.7.3 · PLAN AND MANAGE THE PROCUREMENT STRATEGY
          </p>
          <h1>
            The team was ready. <span>The trucks weren’t.</span>
          </h1>
          <p className="lead">
            A relief organization can have the best-trained field team in the
            world, a flawless distribution plan, and full community buy-in — and
            still fail, if the trucks carrying emergency supplies never show up
            on time. The team didn’t do anything wrong. The procurement did.
          </p>
          <button className="primary-cta" onClick={() => open("hook")}>
            Reveal the procurement impact <ArrowRight />
          </button>
        </div>
        <img className="lesson-art" src={img("relief-convoy-hero")} alt="" />
      </div>
    );
  if (s === 1)
    c = (
      <div className="hero-layout">
        <div>
          <h2>What This Enabler Means</h2>
          <p className="lead">
            This isn’t about placing an order and hoping it arrives. It’s about
            deciding, deliberately, how the project will reach outside itself
            for what it can’t produce alone.
          </p>
          <button className="primary-cta" onClick={() => open("meaning")}>
            Reveal the strategy <ArrowRight />
          </button>
        </div>
        <img
          className="lesson-art"
          src={img("procurement-strategy-screen")}
          alt=""
        />
      </div>
    );
  const cards3 = [
    ["contract", "Choose the Right Contract Type", Scale],
    ["timing", "Time Procurement Activities Wisely", Clock3],
    ["criteria", "Set Supplier Selection Criteria", UsersRound],
  ];
  if (s === 2)
    c = (
      <div className="wide-page">
        <h2>Three Core Components</h2>
        <p className="lead">
          A smart procurement strategy rests on three core components. Click
          each to explore.
        </p>
        <img
          className="section-illustration"
          src={img("three-components-screen")}
          alt=""
        />
        <div className="direct-card-grid three">
          {cards3.map(([k, t, I], i) => (
            <button
              key={k}
              className={`direct-detail-card ${seen3.includes(k) ? "visited" : ""}`}
              onClick={() => {
                setSeen3((v) => (v.includes(k) ? v : [...v, k]));
                open(k);
              }}
            >
              <span className="major-icon">
                <I />
              </span>
              <span className="direct-card-copy">
                <small>
                  {seen3.includes(k) ? (
                    <>
                      <Check /> READ
                    </>
                  ) : (
                    `0${i + 1}`
                  )}
                </small>
                <strong>{t}</strong>
              </span>
              <ArrowRight />
            </button>
          ))}
        </div>
      </div>
    );
  const cards4 = [
    ["risk", "Managing Procurement Risk", Radar],
    ["lifecycle", "Managing the Contract Lifecycle", FileCheck2],
  ];
  if (s === 3)
    c = (
      <div className="wide-page">
        <h2>Managing Procurement Risks and Contracts</h2>
        <p className="lead">
          Even the best-laid procurement plan meets real uncertainty. Staying
          ahead of it, and staying on top of it after the contract is signed,
          splits into two connected disciplines. Click each to explore.
        </p>
        <img
          className="section-illustration"
          src={img("risk-contract-screen")}
          alt=""
        />
        <div className="direct-card-grid">
          {cards4.map(([k, t, I], i) => (
            <button
              key={k}
              className={`direct-detail-card ${seen4.includes(k) ? "visited" : ""}`}
              onClick={() => {
                setSeen4((v) => (v.includes(k) ? v : [...v, k]));
                open(k);
              }}
            >
              <span className="major-icon">
                <I />
              </span>
              <span className="direct-card-copy">
                <small>
                  {seen4.includes(k) ? (
                    <>
                      <Check /> READ
                    </>
                  ) : (
                    `0${i + 1}`
                  )}
                </small>
                <strong>{t}</strong>
              </span>
              <ArrowRight />
            </button>
          ))}
        </div>
      </div>
    );
  const traditional =
      "Traditional Procurement is planned upfront, contracts tend to be detailed and fixed-price, RFQs and RFPs are carefully crafted before any vendor engagement begins, and control and predictability are prioritized above almost everything else. The challenge: when requirements shift mid-project, there’s limited room to adjust the procurement without significant rework.",
    agile =
      "This model flips entirely. Procurement is iterative rather than a single upfront event, contracts tend to be more collaborative and adjustable, and value gets delivered continuously through an ongoing vendor-team partnership rather than one fixed handoff. The challenge here: predicting exact costs and timelines becomes genuinely harder. But with close communication and shared goals between buyer and vendor, Agile procurement can become a real enabler of innovation rather than a constraint fighting against it.";
  if (s === 4)
    c = (
      <div className="wide-page">
        <h2>Traditional vs. Agile Procurement</h2>
        <p className="lead">
          How all of this actually gets applied depends heavily on the project’s
          methodology. Toggle between the two to compare.
        </p>
        <div className="mode-tabs">
          <button
            className={method === "traditional" ? "active" : ""}
            onClick={() => {
              setMethod("traditional");
              setMethodsSeen((v) =>
                v.includes("traditional") ? v : [...v, "traditional"],
              );
            }}
          >
            Traditional
          </button>
          <button
            className={method === "agile" ? "active" : ""}
            onClick={() => {
              setMethod("agile");
              setMethodsSeen((v) =>
                v.includes("agile") ? v : [...v, "agile"],
              );
            }}
          >
            Agile
          </button>
        </div>
        <div className="mode-panel">
          <div>
            <small>
              {method === "traditional"
                ? "UPFRONT AND PREDICTABLE"
                : "ITERATIVE AND COLLABORATIVE"}
            </small>
            <h3>
              {method === "traditional" ? "Traditional Procurement" : "Agile"}
            </h3>
            <p>{method === "traditional" ? traditional : agile}</p>
          </div>
          <img
            className="mode-art"
            src={img(
              method === "traditional"
                ? "traditional-procurement"
                : "agile-procurement",
            )}
            alt=""
          />
        </div>
        {methodsSeen.length === 2 && (
          <button
            className="knowledge-cta centered"
            onClick={() => setQuizOpen(true)}
          >
            <Target /> Start knowledge check <ArrowRight />
          </button>
        )}
      </div>
    );
  if (s === 5)
    c = (
      <div className="exam-layout">
        <div className="exam-visual">
          <img src={img("convoy-success-exam")} alt="" />
        </div>
        <div>
          <h2>Synthesis (Exam Lens)</h2>
          <p className="lead">
            Back to that relief convoy one more time — because the mission was
            never at risk from the field team. It was at risk from the trucks.
          </p>
          <button className="primary-cta" onClick={() => open("exam")}>
            Reveal the exam lens <ArrowRight />
          </button>
        </div>
      </div>
    );
  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="course-select">
          <Award />
          <span>PMP Project Management Professional</span>
          <ChevronDown />
        </button>
        <div className="module-progress">
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <span
                className={`progress-dot ${i < 9 ? "done" : i === 9 ? "active" : ""}`}
                key={i}
              >
                {i < 9 ? <Check size={10} /> : <span />}
              </span>
            ))}
          </div>
        </div>
        <div className="top-actions">
          <button className="ghost-button" onClick={() => setSound(!sound)}>
            {sound ? <Volume2 /> : <VolumeX />}
            <span>{sound ? "Sound on" : "Sound off"}</span>
          </button>
          <button className="ghost-button">
            <X />
            <span>Quit</span>
          </button>
        </div>
      </header>
      <main className="workspace">
        <section className="lesson-stage">
          <article className="lesson-card">
            <div className="section-tabs">
              <p>SECTION {s + 1} OF 6</p>
              <div>
                {tabs.map((x, i) => (
                  <button
                    className={`${done[i] ? "done" : ""} ${s === i ? "active" : ""}`}
                    key={x}
                    onClick={() => go(i)}
                  >
                    {done[i] && <Check />}
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <div className="lesson-content">{c}</div>
            {done[s] && (
              <p className="completion">
                <Check /> Interaction complete — continue when ready.
              </p>
            )}
            <footer className="nav-footer">
              <button
                className="secondary-button"
                disabled={!s}
                onClick={() => go(s - 1)}
              >
                <ArrowLeft /> Previous
              </button>
              <button
                className={`primary-button ${done[s] ? "unlocked" : ""}`}
                disabled={!done[s]}
                onClick={() => s < 5 && go(s + 1)}
              >
                Continue <ArrowRight />
              </button>
            </footer>
          </article>
        </section>
      </main>
      {modal && (
        <Modal
          x={modal}
          close={() => setModal(null)}
          read={() => {
            if (s === 2 && seen3.length < 3) return;
            if (s === 3 && seen4.length < 2) return;
            mark();
          }}
        />
      )}
      {quizOpen && (
        <Quiz
          finish={() => {
            mark(4);
            setQuizOpen(false);
          }}
        />
      )}
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
