import { useState } from "react";

const questions = [
  { id: 1, text: "내 연봉과 자산으로 가능한 최대 대출액(DSR)을 5분 안에 계산할 수 있다." },
  { id: 2, text: "최근 3개월간 관심 지역의 실거래가 추이를 확인한 적이 있다." },
  { id: 3, text: "좋은 아파트를 고르는 나만의 우선순위(직장, 학군 등)가 점수로 정해져 있다." },
  { id: 4, text: "취득세, 복비 등 부대비용으로 얼마가 필요한지 구체적으로 안다." },
  { id: 5, text: '"지금 집 사면 상꼭대기다"라는 말에 흔들리지 않을 나만의 기준이 있다.' },
  { id: 6, text: "내가 가고 싶은 지역의 '대장 아파트'가 어디인지 바로 말할 수 있다." },
  { id: 7, text: "나에게 유리한 정부 정책 대출(특공 등) 상품 이름을 2개 이상 안다." },
  { id: 8, text: "아파트 연식에 따른 가치 차이를 객관적으로 비교할 수 있다." },
  { id: 9, text: "네이버 부동산 호가와 실제 급매 가격의 차이를 확인해 본 적이 있다." },
  { id: 10, text: "'무조건 싼 집'보다 '가치 대비 저평가된 집'을 찾는 법을 안다." },
];

const options = [
  { label: "전혀 못해요", value: 0, emoji: "😅" },
  { label: "조금은 알아요", value: 1, emoji: "🤔" },
  { label: "어느 정도 해요", value: 2, emoji: "😊" },
  { label: "완벽하게 해요", value: 3, emoji: "🔥" },
];

const levels = [
  { min: 0, max: 10, level: "Lv 1", title: "랜선 모델하우스 투어러", emoji: "🛋️", desc: "집 꾸미기만 좋아하는 귀여운 몽상가! 현실 등기부등본보다 인테리어 잡지에 더 밝아요.", accent: "#FF6B9D" },
  { min: 11, max: 20, level: "Lv 2", title: "임장 운동화 컬렉터", emoji: "👟", desc: "단지 근처 맛집만 섭렵한 열정파! 발품은 팔았지만 기준이 없어 지도 위에 하트만 가득해요.", accent: "#FFB347" },
  { min: 21, max: 27, level: "Lv 3", title: "청약 통장과 밀당 중", emoji: "💚", desc: "결정적 순간에 망설이는 고민러! 기준은 생겼지만 확신 한 스푼이 더 필요해요.", accent: "#4ECDC4" },
  { min: 28, max: 30, level: "Lv 4", title: "등기 친 마이홈 지킴이", emoji: "🏠", desc: "이 구역의 평화는 내가 지킨다! 기준이 확고한 실천가. 상급지 갈아타기 전략이 필요한 단계.", accent: "#5B6AF0" },
];

const styles = {
  app: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: "linear-gradient(135deg, #FFF9E6 0%, #E6F9F5 50%, #F0F0FF 100%)", fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif" },
  card: { background: "white", borderRadius: "24px", padding: "24px", marginBottom: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1.5px solid #F0F0F0" },
  container: { maxWidth: "390px", width: "100%" },
  btn: { width: "100%", padding: "16px", borderRadius: "16px", border: "none", color: "white", fontWeight: "900", fontSize: "16px", cursor: "pointer", background: "linear-gradient(135deg, #5B6AF0, #8B5CF6)", marginBottom: "12px" },
  btnGray: { width: "100%", padding: "14px", borderRadius: "16px", border: "1.5px solid #E0E0E0", background: "white", color: "#666", fontWeight: "700", fontSize: "14px", cursor: "pointer" },
  btnOrange: { width: "100%", padding: "16px", borderRadius: "16px", border: "none", color: "white", fontWeight: "900", fontSize: "16px", cursor: "pointer", background: "linear-gradient(135deg, #FF6B6B, #FF8E53)", marginBottom: "12px", textDecoration: "none", display: "block", textAlign: "center" },
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
  const successRate = Math.round((totalScore / 30) * 100);
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
            나는 진짜 집을 살 준비가 됐을까? 🤔<br />10개 질문으로 알아보는 나의 부동산 IQ
          </p>
          <div style={{ background: "#F8F9FF", borderRadius: "16px", padding: "16px", marginBottom: "24px", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <span style={{ fontSize: "20px" }}>📊</span>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#444" }}>총 10문항 · 각 0~3점 · 30점 만점</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>⏱️</span>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#444" }}>소요시간 약 3분</span>
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
            <div style={{ fontSize: "56px", marginBottom: "12px" }}>{resultLevel.emoji}</div>
            <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "800", background: resultLevel.accent, color: "white", marginBottom: "10px" }}>{resultLevel.level}</span>
            <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#1a1a2e", margin: "0 0 8px" }}>{resultLevel.title}</h2>
          </div>
          <div style={{ background: "rgba(255,255,255,0.8)", borderRadius: "16px", padding: "16px", textAlign: "center", marginBottom: "16px" }}>
            <div style={{ fontSize: "48px", fontWeight: "900", color: resultLevel.accent }}>{totalScore}<span style={{ fontSize: "18px", color: "#aaa" }}>/30</span></div>
            <div style={{ fontSize: "12px", color: "#888", fontWeight: "600" }}>내 집 마련 메타인지 점수</div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#555" }}>내 집 마련 성공 확률</span>
              <span style={{ fontSize: "14px", fontWeight: "900", color: resultLevel.accent }}>{successRate}%</span>
            </div>
            <div style={{ height: "14px", borderRadius: "10px", background: "rgba(255,255,255,0.6)", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: "10px", background: `linear-gradient(90deg, ${resultLevel.accent}, #8B5CF6)`, width: `${successRate}%`, transition: "width 1s ease" }} />
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
        <a href="/#"style={styles.btnOrange}>
          🔑 부족한 부분 채우러 가기<br />
          <span style={{ fontSize: "12px", opacity: 0.9 }}>(비밀 채팅방 입장)</span>
        </a>
        <button onClick={handleRestart} style={styles.btnGray}>🔄 다시 테스트하기</button>
        <p style={{ textAlign: "center", fontSize: "12px", color: "#bbb", marginTop: "12px" }}>📸 결과 캡처해서 인스타 스토리에 공유하세요!</p>
      </div>
    </div>
  );
}