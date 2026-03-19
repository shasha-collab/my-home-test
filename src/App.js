import { useState } from "react";

const questions = [
  { id: 1, text: "내가 집을 사려면 대출을 얼마나 받을 수 있는지 대략이라도 알고 있다." },
  { id: 2, text: "요즘 관심 있는 동네 아파트가 얼마 정도 하는지 알고 있다." },
  { id: 3, text: "집 살 때 집값 말고도 세금이나 복비 같은 추가 비용이 든다는 걸 알고 있다." },
  { id: 4, text: "전세, 월세, 매매의 차이를 다른 사람에게 설명할 수 있다." },
  { id: 5, text: "정부에서 집 사는 걸 도와주는 대출이나 혜택이 있다는 걸 알고 있다." },
];

const options = [
  { label: "전혀 몰라요", value: 0, emoji: "😅" },
  { label: "들어본 것 같아요", value: 1, emoji: "🤔" },
  { label: "어느 정도 알아요", value: 2, emoji: "😊" },
  { label: "잘 알고 있어요", value: 3, emoji: "🔥" },
];

const levels = [
  {
    min: 0, max: 4,
    level: "Lv 1",
    title: "내집마련 무지렁이",
    emoji: "🪱",
    desc: "지금 사면 큰일나는 지렁이 단계! 부동산은 아는 만큼 보여요. 일단 기초부터 차근차근 시작해봐요 😊",
    accent: "#FF6B9D",
  },
  {
    min: 5, max: 9,
    level: "Lv 2",
    title: "평생 내집마련, 담 넘어가듯 스윽하려고?",
    emoji: "🐍",
    desc: "대충 알아서 더 위험한 구렁이! 어설프게 아는 게 제일 무서워요. 제대로 알고 제대로 삽시다 💪",
    accent: "#FFB347",
  },
  {
    min: 10, max: 13,
    level: "Lv 3",
    title: "조금만 더 알아보면 내집마련 가능!",
    emoji: "🐉",
    desc: "실행력을 더하면 좋을 똘똘한 뱀! 지식은 충분히 쌓였어요. 이제 행동으로 옮길 때예요 🔥",
    accent: "#4ECDC4",
  },
  {
    min: 14, max: 15,
    level: "Lv 4",
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
  btnOrange: { width: "100%", padding: "16px", borderRadius: "16px", border: "none", color: "white", fontWeight: "900", fontSize: "16px", cursor: "pointer", background: "linear-gradient(135deg, #FF6B6B, #FF8E53)", marginBottom: "12px", textDecoration: "none", display: "block", textAlign: "center", lineHeight: "1.5" },
  tag: { display: "inline-block", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", background: "#FFE0B2", color: "#E65100", marginBottom: "12px" },
  progressBg: { height: "8px", borderRadius: "8px", background: "#F0F0F0", overflow: "hidden", marginBottom: "24px" },
  optionBase: { width: "100%", padding: "14px 16px", borderRadius: "16px", border: "1.5px solid #F0F0F0", background: "white", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", marginBottom: "10px", textAlign: "left" },
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
  const successRate = Math.round((totalScore / 15) * 100);
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

  if (screen === "intro") return (
    <div style={styles.app}>
      <div style={styles.container}>
        <div style={{ ...styles.card, textAlign: "center", padding: "40px 24px" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🏡</div>
          <span style={styles.tag}>3040 필수 자가진단</span>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#1a1a2e", lineHeight: "1.3", margin: "0 0 12px" }}>
            내 집 마련<br /><span style={{ color: "#5B6AF0" }}>메타인지 테스트</span>
          </h1>
          <p style={{ fontSize: "14px", color: "#888", lineHeight: "1.7", margin: "0 0 28px" }}>
            나는 지렁이일까, 용일까? 🐲<br />5개 질문으로 알아보는 나의 부동산 레벨
          </p>
          <div style={{ background: "#F8F9FF", borderRadius: "16px", padding: "16px", marginBottom: "24px", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <span style={{ fontSize: "20px" }}>📊</span>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#444" }}>총 5문항 · 각 0~3점 · 15점 만점</span>
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
            {options.map((opt) => (
              <button key={opt.value} onClick={() => setSelected(opt.value)}
                style={{ ...styles.optionBase, ...(selected === opt.value ? styles.optionSelected : {}) }}>
                <span style={{ fontSize: "22px" }}>{opt.emoji}</span>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#333" }}>{opt.label}</span>
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
        <div style={{ background: `linear-gradient(135deg, ${resultLevel.accent}22, ${resultLevel.accent}11)`, borderRadius: "24px", padding: "28px", marginBottom: "16px", border: `2px solid ${resultLevel.accent}33`, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{ fontSize: "72px", marginBottom: "12px" }}>{resultLevel.emoji}</div>
            <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "800", background: resultLevel.accent, color: "white", marginBottom: "10px" }}>{resultLevel.level}</span>
            <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#1a1a2e", margin: "0 0 8px", lineHeight: "1.4" }}>{resultLevel.title}</h2>
          </div>
          <div style={{ background: "rgba(255,255,255,0.8)", borderRadius: "16px", padding: "16px", textAlign: "center", marginBottom: "16px" }}>
            <div style={{ fontSize: "48px", fontWeight: "900", color: resultLevel.accent }}>{totalScore}<span style={{ fontSize: "18px", color: "#aaa" }}>/15</span></div>
            <div style={{ fontSize: "12px", color: "#888", fontWeight: "600" }}>내 집 마련 메타인지 점수</div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#555" }}>내 집 마련 준비도</span>
              <span style={{ fontSize: "14px", fontWeight: "900", color: resultLevel.accent }}>{successRate}%</span>
            </div>
            <div style={{ height: "14px", borderRadius: "10px", background: "rgba(255,255,255,0.6)", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: "10px", background: `linear-gradient(90deg, ${resultLevel.accent}, #8B5CF6)`, width: `${successRate}%`, transition: "width 1s ease" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
              <span style={{ fontSize: "11px", color: "#bbb" }}>🪱 지렁이</span>
              <span style={{ fontSize: "11px", color: "#bbb" }}>🐍 구렁이</span>
              <span style={{ fontSize: "11px", color: "#bbb" }}>🐉 뱀</span>
              <span style={{ fontSize: "11px", color: "#bbb" }}>🐲 용</span>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.8)", borderRadius: "16px", padding: "16px" }}>
            <p style={{ fontSize: "14px", color: "#444", lineHeight: "1.7", textAlign: "center", margin: 0, fontWeight: "500" }}>{resultLevel.desc}</p>
          </div>
        </div>

        <div style={styles.card}>
          <div style={{ fontSize: "11px", fontWeight: "800", color: "#aaa", letterSpacing: "1px", marginBottom: "12px" }}>문항별 점수</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px" }}>
            {questions.map((_, i) => {
              const score = answers[i] ?? 0;
              const colors = ["#FFB5C8", "#FFD580", "#A8E6CF", "#B5D5FF"];
              return (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ height: "6px", borderRadius: "4px", background: "#F0F0F0", marginBottom: "4px", overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: "4px", background: colors[score], width: `${(score / 3) * 100}%` }} />
                  </div>
                  <span style={{ fontSize: "11px", color: "#bbb" }}>Q{i + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        <a href="/#" style={styles.btnOrange}>
          📚 내집마련 커리큘럼 살펴보기<br />
          <span style={{ fontSize: "12px", opacity: 0.9 }}>부족한 부분 지금 바로 채우러 가기 →</span>
        </a>
        <button onClick={handleRestart} style={styles.btnGray}>🔄 다시 테스트하기</button>
        <p style={{ textAlign: "center", fontSize: "12px", color: "#bbb", marginTop: "12px" }}>📸 결과 캡처해서 인스타 스토리에 공유하세요!</p>
      </div>
    </div>
  );
}