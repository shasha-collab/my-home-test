import { useState } from "react";

const questions = [
  { id: 1, text: "나의 종잣돈과 대출을 합친 내집마련 예산을 정확히 아나요?", hideLabel: false, tip: "👉 예산을 알아야 후보 단지를 좁힐 수 있어요" },
  { id: 2, text: "대출에서 LTV, DSR, DTI의 차이를 정확히 알고 있나요?", hideLabel: false, tip: "👉 대출 한도는 LTV와 DSR/DTI 중 더 낮은 것으로 결정돼요" },
  { id: 3, text: "내 상황에서 대출 원리금이 얼마여야 영끌이 아닌지 알고 있나요?", hideLabel: false, tip: "👉 영끌 기준은 막연한 느낌이 아니라 내 월 저축액으로 결정돼요" },
  { id: 4, text: "내집마련 후보로 단순히 주변 단지가 아닌 다른 후보 단지가 있나요?", hideLabel: false, oLabel: "다른 후보가 있어요", xLabel: "잘 모르겠어요", tip: "👉 사는 곳 근처가 최선이 아닐 확률이 높아요" },
  { id: 5, text: "지금 보고 있는 아파트가 가장 좋다는 매수 확신이 있나요?", hideLabel: false, oLabel: "확신이 있어요", xLabel: "잘 모르겠어요", tip: "👉 같은 가격, 더 좋은 입지를 골라야 수익이 달라져요" },
  { id: 6, text: "부동산 사장님과 만나서 편안하게 대화가 가능한가요?", hideLabel: false, oLabel: "대화가 가능해요", xLabel: "자신 없어요", tip: "👉 협상 스킬 하나로 몇 천만원을 아낄 수 있어요" },
  { id: 7, text: "부동산 계약하기 위해 꼭 체크해야하는 내용을 알고 있나요?", hideLabel: false, tip: "👉 계약서는 한번 쓰면 돌이킬 수 없어요. 미리 알아두세요" },
];

const levels = [
  {
    min: 0, max: 1,
    level: "Lv 1",
    name: "아직은 꿈꾸는 지렁이",
    title: "지금 사면 큰일나는 지렁이 단계!",
    emoji: "🪱",
    desc: "부동산은 아는 만큼 보여요. 일단 기초부터 차근차근 시작해봐요 😊",
    accent: "#FF6B9D",
  },
  {
    min: 2, max: 3,
    level: "Lv 2",
    name: "대충 알아서 더 위험한 구렁이",
    title: "평생 내집마련, 담 넘어가듯 스윽하려고?",
    emoji: "🐍",
    desc: "어설프게 아는 게 제일 무서워요. 제대로 알고 제대로 삽시다 💪",
    accent: "#FFB347",
  },
  {
    min: 4, max: 5,
    level: "Lv 3",
    name: "고민은 많은데 못 사는 뱀",
    title: "조금만 더 알아보면 내집마련 가능!",
    emoji: "🐉",
    desc: "실행력을 더하면 좋을 똘똘한 뱀! 지식은 충분히 쌓였어요. 이제 행동으로 옮길 때예요 🔥",
    accent: "#4ECDC4",
  },
  {
    min: 6, max: 7,
    level: "Lv 4",
    name: "내집마련 승천 직전, 용",
    title: "지금 바로 내집마련 해도 되겠는데?",
    emoji: "🐲",
    desc: "승천 직전 용! 준비는 다 됐어요. 이제 딱 맞는 집만 찾으면 끝. 같이 찾아봐요 🏠",
    accent: "#5B6AF0",
  },
];

const styles = {
  app: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: "linear-gradient(135deg, #FFF9E6 0%, #E6F9F5 50%, #F0F0FF 100%)", fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif" },
  card: { background: "white", borderRadius: "24px", padding: "24px", marginBottom: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1.5px solid #F0F0F0" },
  container: { maxWidth: "390px", width: "100%" },
  btn: { width: "100%", padding: "16px", borderRadius: "16px", border: "none", color: "white", fontWeight: "900", fontSize: "16px", cursor: "pointer", background: "linear-gradient(135deg, #5B6AF0, #8B5CF6)", marginBottom: "12px" },
  btnGray: { width: "100%", padding: "14px", borderRadius: "16px", border: "1.5px solid #E0E0E0", background: "white", color: "#666", fontWeight: "700", fontSize: "14px", cursor: "pointer" },
  btnBlue: { width: "100%", padding: "22px 20px", borderRadius: "20px", border: "none", color: "white", fontWeight: "900", fontSize: "16px", cursor: "pointer", background: "linear-gradient(135deg, #5B6AF0, #8B5CF6)", marginBottom: "12px", textDecoration: "none", display: "block", textAlign: "center", lineHeight: "1.5" },
  tag: { display: "inline-block", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", background: "#FFE0B2", color: "#E65100", marginBottom: "12px" },
  progressBg: { height: "8px", borderRadius: "8px", background: "#F0F0F0", overflow: "hidden", marginBottom: "24px" },
  optionBase: { width: "100%", padding: "18px 20px", borderRadius: "16px", border: "1.5px solid #F0F0F0", background: "white", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", marginBottom: "12px", textAlign: "left" },
  optionSelected: { border: "2px solid #5B6AF0", background: "linear-gradient(135deg, #EEF0FF, #F3E8FF)", boxShadow: "0 4px 14px rgba(91,106,240,0.15)" },
};

function getLevel(score) {
  return levels.find((l) => score >= l.min && score <= l.max);
}

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const successRate = Math.round((totalScore / 7) * 100);
  const resultLevel = getLevel(totalScore);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = { ...answers, [current]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setScreen("result");
    }
  };

  const handleRestart = () => {
    setScreen("intro"); setCurrent(0); setAnswers({}); setSelected(null);
  };

  const getOptions = (qIndex) => {
    const q = questions[qIndex];
    return [
      { label: q.oLabel || "O — 알고 있어요!", value: 1, emoji: "⭕" },
      { label: q.xLabel || "X — 모르겠어요", value: 0, emoji: "❌" },
    ];
  };

  if (screen === "intro") return (
    <div style={styles.app}>
      <div style={styles.container}>
        <div style={{ ...styles.card, textAlign: "center", padding: "40px 24px" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🏡</div>
          <span style={styles.tag}>3040 필수 자가진단</span>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#1a1a2e", lineHeight: "1.3", margin: "0 0 12px" }}>
            내집마련 준비력 테스트
          </h1>
          <p style={{ fontSize: "14px", color: "#888", lineHeight: "1.7", margin: "0 0 28px" }}>
            7개 질문으로 알아보는 나의 부동산 레벨 🏠<br />결과가 생각보다 충격적일 수도 있어요 👀
          </p>
          <div style={{ background: "#F8F9FF", borderRadius: "16px", padding: "16px", marginBottom: "24px", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <span style={{ fontSize: "20px" }}>📊</span>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#444" }}>총 7문항 · O/X · 7점 만점</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>⏱️</span>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#444" }}>소요시간 약 1분</span>
            </div>
          </div>
          <button style={styles.btn} onClick={() => setScreen("quiz")}>테스트 시작하기 🚀</button>
          <p style={{ fontSize: "12px", color: "#aaa", margin: 0 }}>결과를 인스타 스토리에 공유해보세요 📸</p>
        </div>
      </div>
    </div>
  );

  if (screen === "quiz") {
    const progress = (current / questions.length) * 100;
    const currentOptions = getOptions(current);
    return (
      <div style={styles.app}>
        <div style={styles.container}>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "#aaa", fontWeight: "600" }}>{current + 1} / {questions.length}</span>
              <span style={{ fontSize: "13px", color: "#5B6AF0", fontWeight: "600" }}>{Math.round(progress)}%</span>
            </div>
            <div style={styles.progressBg}>
              <div style={{ height: "100%", borderRadius: "8px", background: "linear-gradient(90deg, #5B6AF0, #8B5CF6)", width: `${progress}%`, transition: "width 0.5s ease" }} />
            </div>
          </div>
          <div style={styles.card}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#EEF0FF", color: "#5B6AF0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "16px", marginBottom: "16px" }}>Q{current + 1}</div>
            <p style={{ fontSize: "16px", fontWeight: "700", color: "#1a1a2e", lineHeight: "1.6", margin: 0 }}>{questions[current].text}</p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            {currentOptions.map((opt) => (
              <button key={opt.value} onClick={() => setSelected(opt.value)}
                style={{ ...styles.optionBase, ...(selected === opt.value ? styles.optionSelected : {}) }}>
                <span style={{ fontSize: "28px" }}>{opt.emoji}</span>
                <span style={{ fontSize: "16px", fontWeight: "700", color: "#333" }}>{opt.label}</span>
                {selected === opt.value && <span style={{ marginLeft: "auto", fontSize: "18px" }}>✅</span>}
              </button>
            ))}
          </div>
          <button onClick={handleNext} style={{ ...styles.btn, opacity: selected === null ? 0.4 : 1, cursor: selected === null ? "not-allowed" : "pointer" }}>
            {current + 1 === questions.length ? "결과 보기 🎉" : "다음 질문 →"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <div style={styles.container}>

        {/* 레벨 카드 */}
        <div style={{ background: `linear-gradient(135deg, ${resultLevel.accent}22, ${resultLevel.accent}11)`, borderRadius: "24px", padding: "28px", marginBottom: "16px", border: `2px solid ${resultLevel.accent}44`, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{ fontSize: "72px", marginBottom: "12px" }}>{resultLevel.emoji}</div>
            <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "800", background: resultLevel.accent, color: "white", marginBottom: "12px" }}>{resultLevel.level}</span>
            <h2 style={{ fontSize: "24px", fontWeight: "900", color: "#1a1a2e", margin: "0 0 6px", lineHeight: "1.3" }}>{resultLevel.name}</h2>
            <p style={{ fontSize: "14px", color: "#888", margin: 0, fontWeight: "600" }}>{resultLevel.title}</p>
          </div>

          {/* 준비도 퍼센트 */}
          <div style={{ background: "white", borderRadius: "20px", padding: "24px 20px", marginBottom: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#aaa", marginBottom: "8px", letterSpacing: "1px" }}>내집마련 준비도</div>
            <div style={{ fontSize: "72px", fontWeight: "900", lineHeight: 1, color: "#E53E3E", marginBottom: "16px" }}>
              {successRate}<span style={{ fontSize: "28px" }}>%</span>
            </div>
            <div style={{ height: "20px", borderRadius: "12px", background: "#F0F0F0", overflow: "hidden", marginBottom: "10px" }}>
              <div style={{ height: "100%", borderRadius: "12px", background: "linear-gradient(90deg, #E53E3E, #FF6B6B)", width: `${successRate}%`, transition: "width 1.2s ease" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#E53E3E" }}>0%</span>
              <span style={{ fontSize: "12px", fontWeight: "800", color: "#E53E3E" }}>현재 {successRate}% 준비됨</span>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#ccc" }}>100%</span>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.8)", borderRadius: "16px", padding: "16px" }}>
            <p style={{ fontSize: "14px", color: "#444", lineHeight: "1.7", textAlign: "center", margin: 0, fontWeight: "500" }}>{resultLevel.desc}</p>
          </div>
        </div>

        {/* 문항별 O/X + 팁 */}
        <div style={styles.card}>
          <div style={{ fontSize: "11px", fontWeight: "800", color: "#aaa", letterSpacing: "1px", marginBottom: "14px" }}>문항별 결과</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {questions.map((q, i) => {
              const score = answers[i] ?? 0;
              return (
                <div key={i}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "18px", flexShrink: 0 }}>{score === 1 ? "⭕" : "❌"}</span>
                    <span style={{ fontSize: "13px", color: "#222", fontWeight: "700", flex: 1, lineHeight: "1.5" }}>{q.text}</span>
                  </div>
                  <div style={{ marginLeft: "28px", fontSize: "12px", color: "#555", lineHeight: "1.6", background: "#F8F9FF", borderRadius: "10px", padding: "8px 12px" }}>
                    {q.tip}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <a href="https://weolbu.com/product/4966" target="_blank" rel="noopener noreferrer" style={styles.btnBlue}>
          <div style={{ fontSize: "13px", fontWeight: "600", opacity: 0.9, marginBottom: "4px" }}>괜찮아요 아직 늦지 않았어요! 🤗</div>
          <div style={{ fontSize: "12px", opacity: 0.85, marginBottom: "10px" }}>지금부터 같이 내집마련 차근차근 시작해봐요</div>
          <div style={{ fontSize: "17px", fontWeight: "900" }}>내집마련 시작하러가기 →</div>
        </a>
        <button onClick={handleRestart} style={styles.btnGray}>🔄 다시 테스트하기</button>
        <p style={{ textAlign: "center", fontSize: "12px", color: "#bbb", marginTop: "12px" }}>📸 결과 캡처해서 인스타 스토리에 공유하세요!</p>
      </div>
    </div>
  );
}