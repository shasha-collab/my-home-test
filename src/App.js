import { useState } from "react";

const questions = [
  { id:1, text:"지금 당장 집을 사야 한다면, 내 예산이 얼마인지 5분 안에 말할 수 있나요?", oLabel:"말할 수 있어요", xLabel:"잘 모르겠어요", shock:"예산을 모르면 어떤 집도 '내 집 후보'가 될 수 없어요. 모든 것의 출발점이에요.", tip:"대출 포함 내 정확한 예산을 알아야 후보 단지를 좁힐 수 있어요" },
  { id:2, text:"은행 상담 예약했어요. LTV, DSR, DTI가 뭔지 담당자에게 바로 설명할 수 있나요?", oLabel:"설명할 수 있어요", xLabel:"잘 모르겠어요", shock:"이 세 가지를 모르면 내 대출 한도가 왜 그 금액인지 이해할 수 없어요.", tip:"대출 한도는 LTV와 DSR/DTI 중 더 낮은 것으로 결정돼요" },
  { id:3, text:"내 월급으로 얼마까지 대출받아야 '영끌'인지, 기준이 있나요?", oLabel:"기준이 있어요", xLabel:"막연하게 느껴요", shock:"영끌 기준은 막연한 느낌이 아니라 내 월 저축액으로 정확히 계산돼요.", tip:"내집마련은 대출을 잘 활용하는 게 핵심이에요" },
  { id:4, text:"지금 사는 동네 말고, 다른 후보 단지를 구체적으로 떠올릴 수 있나요?", oLabel:"후보가 있어요", xLabel:"잘 모르겠어요", shock:"지금 사는 곳 기준으로만 보면 더 좋은 선택지를 놓칠 확률이 높아요.", tip:"같은 예산으로 더 좋은 선택지가 있을 수 있어요" },
  { id:5, text:"'이 집이 최선이다' 확신하며 계약서에 도장 찍을 수 있나요?", oLabel:"확신이 있어요", xLabel:"아직 모르겠어요", shock:"기준 없이 도장 찍으면 '더 좋은 집이 있었는데…' 하는 후회가 남아요.", tip:"같은 가격, 더 좋은 입지를 골라야 수익이 달라져요" },
  { id:6, text:"부동산 사장님 앞에서 가격 협상을 먼저 꺼낼 수 있나요?", oLabel:"할 수 있어요", xLabel:"자신 없어요", shock:"협상 스킬 하나로 몇 천만원을 아낄 수 있어요. 모르면 그냥 다 내는 거예요.", tip:"대화와 협상은 내집마련에서 실전 무기가 돼요" },
  { id:7, text:"계약서 쓰기 전, 반드시 확인해야 할 3가지를 말할 수 있나요?", oLabel:"알고 있어요", xLabel:"잘 모르겠어요", shock:"모르고 계약서에 사인하면 나중에 고치기가 정말 어려워요. 미리 아는 게 전부예요.", tip:"꼭 넣어야 할 특약과 확인 사항을 미리 알아둬야 해요" },
];

const levels = [
  { min:0, max:1, level:"Lv 1", name:"아직은 꿈꾸는 지렁이", title:"지금 사면 큰일나는 단계!", emoji:"🪱", accent:"#FF6B9D",
    sympathy:"이 테스트를 해본 분들의 대부분이 비슷한 결과를 받았어요. 당신만 모르는 게 아니에요.",
    desc:"내집마련은 순서가 있어요. ① 예산 파악 → ② 지역 후보 → ③ 단지 비교 → ④ 계약. 지금 ①도 모른다면, 딱 지금이 내집마련 기초반을 시작할 타이밍이에요." },
  { min:2, max:3, level:"Lv 2", name:"대충 알아서 더 위험한 구렁이", title:"평생 내집마련, 담 넘어가듯 스윽?", emoji:"🐍", accent:"#FFB347",
    sympathy:"'아는 것 같은데 막상 물어보면 모르는' 상태가 제일 위험해요. 지금 정확히 알아야 할 때예요.",
    desc:"아는 듯 모르는 듯한 지식이 제일 위험해요. 대출, 예산, 입지 — 이 세 가지를 내집마련 기초반에서 딱 잡아드려요." },
  { min:4, max:5, level:"Lv 3", name:"고민은 많은데 못 사는 뱀", title:"조금만 더 알아보면 내집마련 가능!", emoji:"🐍", accent:"#4ECDC4",
    sympathy:"지식은 충분히 쌓였어요. 이제 필요한 건 결정할 수 있는 기준이에요.",
    desc:"지식은 충분해요. 이제 필요한 건 '이 집이 맞다'는 확신이에요. 내집마련 기초반에서 매수 기준을 잡고 나면 고민이 결정으로 바뀌어요." },
  { min:6, max:7, level:"Lv 4", name:"내집마련 승천 직전, 용", title:"지금 바로 내집마련 해도 되겠는데?", emoji:"🐉", accent:"#5B6AF0",
    sympathy:"이미 준비가 많이 됐어요. 이제 딱 맞는 집만 찾으면 끝이에요.",
    desc:"준비는 거의 다 됐어요. 내집마련 기초반에서 계약 프로세스와 협상 스킬까지 챙기면 진짜 내집마련 완성이에요." },
];

const styles = {
  app: { minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", background:"linear-gradient(135deg, #FFF9E6 0%, #E6F9F5 50%, #F0F0FF 100%)", fontFamily:"'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif" },
  container: { maxWidth:"390px", width:"100%" },
  card: { background:"white", borderRadius:"24px", padding:"24px", marginBottom:"16px", boxShadow:"0 4px 20px rgba(0,0,0,0.08)", border:"1.5px solid #F0F0F0" },
  tag: { display:"inline-block", padding:"4px 12px", borderRadius:"20px", fontSize:"12px", fontWeight:"700", background:"#FFE0B2", color:"#E65100", marginBottom:"12px" },
  btn: { width:"100%", padding:"16px", borderRadius:"16px", border:"none", color:"white", fontWeight:"900", fontSize:"16px", cursor:"pointer", background:"linear-gradient(135deg, #5B6AF0, #8B5CF6)", marginBottom:"12px" },
  btnGray: { width:"100%", padding:"14px", borderRadius:"16px", border:"1.5px solid #E0E0E0", background:"white", color:"#666", fontWeight:"700", fontSize:"14px", cursor:"pointer" },
  progressBg: { height:"8px", borderRadius:"8px", background:"#F0F0F0", overflow:"hidden", marginBottom:"24px" },
  optionBase: { width:"100%", padding:"16px 18px", borderRadius:"16px", border:"1.5px solid #F0F0F0", background:"white", display:"flex", alignItems:"center", gap:"12px", cursor:"pointer", marginBottom:"10px", textAlign:"left", transition:"all 0.15s" },
};

function getLevel(score) { return levels.find(l => score >= l.min && score <= l.max); }

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [showShock, setShowShock] = useState(false);

  const totalScore = Object.values(answers).reduce((a,b) => a+b, 0);
  const successRate = Math.round((totalScore / 7) * 100);
  const resultLevel = getLevel(totalScore);

  const handleSelect = (val) => {
    setSelected(val);
    setShowShock(val === 0);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = { ...answers, [current]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    setShowShock(false);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setScreen("result");
    }
  };

  const handleRestart = () => {
    setScreen("intro"); setCurrent(0); setAnswers({}); setSelected(null); setShowShock(false);
  };

  if (screen === "intro") return (
    <div style={styles.app}>
      <div style={styles.container}>
        <div style={{ ...styles.card, textAlign:"center", padding:"40px 24px" }}>
          <div style={{ fontSize:"64px", marginBottom:"16px" }}>🏡</div>
          <span style={styles.tag}>3040 필수 자가진단</span>
          <h1 style={{ fontSize:"28px", fontWeight:"900", color:"#1a1a2e", lineHeight:"1.3", margin:"0 0 12px" }}>
            내집마련<br /><span style={{ color:"#5B6AF0" }}>준비력 테스트</span>
          </h1>
          <p style={{ fontSize:"14px", color:"#888", lineHeight:"1.7", margin:"0 0 28px" }}>
            7개 질문으로 알아보는 나의 부동산 레벨 🏠<br />결과가 생각보다 충격적일 수도 있어요 👀
          </p>
          <div style={{ background:"#F8F9FF", borderRadius:"16px", padding:"16px", marginBottom:"24px", textAlign:"left" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px" }}>
              <span style={{ fontSize:"20px" }}>📊</span>
              <span style={{ fontSize:"14px", fontWeight:"600", color:"#444" }}>총 7문항 · O/X · 7점 만점</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ fontSize:"20px" }}>⏱️</span>
              <span style={{ fontSize:"14px", fontWeight:"600", color:"#444" }}>소요시간 약 1분</span>
            </div>
          </div>
          <button style={styles.btn} onClick={() => setScreen("quiz")}>테스트 시작하기 🚀</button>
          <p style={{ fontSize:"12px", color:"#aaa", margin:0 }}>결과를 인스타 스토리에 공유해보세요 📸</p>
        </div>
      </div>
    </div>
  );

  if (screen === "quiz") {
    const progress = (current / questions.length) * 100;
    const q = questions[current];
    return (
      <div style={styles.app}>
        <div style={styles.container}>
          <div style={{ marginBottom:"20px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
              <span style={{ fontSize:"13px", color:"#aaa", fontWeight:"600" }}>{current + 1} / {questions.length}</span>
              <span style={{ fontSize:"13px", color:"#5B6AF0", fontWeight:"600" }}>{Math.round(progress)}%</span>
            </div>
            <div style={styles.progressBg}>
              <div style={{ height:"100%", borderRadius:"8px", background:"linear-gradient(90deg, #5B6AF0, #8B5CF6)", width:`${progress}%`, transition:"width 0.5s ease" }} />
            </div>
          </div>
          <div style={styles.card}>
            <div style={{ width:"40px", height:"40px", borderRadius:"12px", background:"#EEF0FF", color:"#5B6AF0", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"900", fontSize:"16px", marginBottom:"16px" }}>Q{current + 1}</div>
            <p style={{ fontSize:"16px", fontWeight:"700", color:"#1a1a2e", lineHeight:"1.6", margin:0 }}>{q.text}</p>
          </div>

          <div style={{ marginBottom:"4px" }}>
            {[{ label: q.oLabel, value: 1, emoji: "⭕" }, { label: q.xLabel, value: 0, emoji: "❌" }].map(opt => (
              <button key={opt.value} onClick={() => handleSelect(opt.value)}
                style={{
                  ...styles.optionBase,
                  border: selected === opt.value ? (opt.value === 1 ? "2px solid #5B6AF0" : "2px solid #E53E3E") : "1.5px solid #F0F0F0",
                  background: selected === opt.value ? (opt.value === 1 ? "#F3F4FF" : "#FFF5F5") : "white",
                }}>
                <span style={{ fontSize:"24px" }}>{opt.emoji}</span>
                <span style={{ fontSize:"15px", fontWeight:"600", color:"#333" }}>{opt.label}</span>
                {selected === opt.value && <span style={{ marginLeft:"auto", fontSize:"18px" }}>✅</span>}
              </button>
            ))}
          </div>

          {showShock && (
            <div style={{ background:"#FFF8F0", border:"1px solid #FFCC80", borderRadius:"14px", padding:"12px 16px", marginBottom:"14px", display:"flex", alignItems:"flex-start", gap:"8px" }}>
              <span style={{ fontSize:"16px", flexShrink:0 }}>💡</span>
              <p style={{ fontSize:"13px", color:"#E65100", fontWeight:"600", lineHeight:"1.6", margin:0 }}>{q.shock}</p>
            </div>
          )}

          <button onClick={handleNext}
            style={{ ...styles.btn, opacity: selected === null ? 0.4 : 1, cursor: selected === null ? "not-allowed" : "pointer", marginTop:"6px" }}>
            {current + 1 === questions.length ? "결과 보기 🎉" : "다음 질문 →"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <div style={{ background:`linear-gradient(135deg, ${resultLevel.accent}22, ${resultLevel.accent}11)`, borderRadius:"24px", padding:"28px", marginBottom:"16px", border:`2px solid ${resultLevel.accent}33`, boxShadow:"0 8px 32px rgba(0,0,0,0.1)" }}>
          <div style={{ textAlign:"center", marginBottom:"20px" }}>
            <div style={{ width:"100px", height:"100px", borderRadius:"50%", background:`${resultLevel.accent}33`, border:`2px solid ${resultLevel.accent}66`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", fontSize:"52px" }}>
              {resultLevel.emoji}
            </div>
            <span style={{ display:"inline-block", padding:"4px 14px", borderRadius:"20px", fontSize:"12px", fontWeight:"800", background:resultLevel.accent, color:"white", marginBottom:"10px" }}>{resultLevel.level}</span>
            <h2 style={{ fontSize:"22px", fontWeight:"900", color:"#1a1a2e", margin:"0 0 6px", lineHeight:"1.3" }}>{resultLevel.name}</h2>
            <p style={{ fontSize:"13px", color:"#888", margin:0 }}>{resultLevel.title}</p>
          </div>

          <div style={{ background:"white", borderRadius:"20px", padding:"24px 20px", marginBottom:"16px", textAlign:"center" }}>
            <div style={{ fontSize:"11px", fontWeight:"700", color:"#aaa", marginBottom:"8px", letterSpacing:"1px" }}>내집마련 준비도</div>
            <div style={{ fontSize:"72px", fontWeight:"900", lineHeight:1, color:"#E53E3E", marginBottom:"16px" }}>
              {successRate}<span style={{ fontSize:"28px" }}>%</span>
            </div>
            <div style={{ height:"20px", borderRadius:"12px", background:"#F0F0F0", overflow:"hidden", marginBottom:"10px" }}>
              <div style={{ height:"100%", borderRadius:"12px", background:"linear-gradient(90deg, #E53E3E, #FF6B6B)", width:`${successRate}%`, transition:"width 1.2s ease" }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:"11px", fontWeight:"700", color:"#E53E3E" }}>0%</span>
              <span style={{ fontSize:"12px", fontWeight:"800", color:"#E53E3E" }}>현재 {successRate}% 준비됨</span>
              <span style={{ fontSize:"11px", fontWeight:"700", color:"#ccc" }}>100%</span>
            </div>
          </div>

          <div style={{ background:`${resultLevel.accent}15`, borderRadius:"14px", padding:"14px 16px", marginBottom:"16px", border:`1px solid ${resultLevel.accent}33` }}>
            <p style={{ fontSize:"13px", fontWeight:"700", color:resultLevel.accent, lineHeight:"1.7", textAlign:"center", margin:0 }}>{resultLevel.sympathy}</p>
          </div>

          <div style={{ background:"rgba(255,255,255,0.8)", borderRadius:"16px", padding:"16px" }}>
            <p style={{ fontSize:"14px", color:"#444", lineHeight:"1.7", textAlign:"center", margin:0, fontWeight:"500" }}>{resultLevel.desc}</p>
          </div>
        </div>

        <div style={styles.card}>
          <div style={{ fontSize:"13px", fontWeight:"800", color:"#333", marginBottom:"16px" }}>📝 오답노트 다시보기</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            {questions.map((q, i) => {
              const score = answers[i] ?? 0;
              return (
                <div key={i}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:"10px", marginBottom:"6px" }}>
                    <span style={{ fontSize:"18px", flexShrink:0 }}>{score === 1 ? "⭕" : "❌"}</span>
                    <span style={{ fontSize:"13px", fontWeight:"700", color:"#222", flex:1, lineHeight:"1.5" }}>{q.text}</span>
                  </div>
                  <div style={{ marginLeft:"28px", fontSize:"12px", color:"#555", background:"#F8F9FF", borderRadius:"10px", padding:"8px 12px", lineHeight:"1.6" }}>
                    👉 {q.tip}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <a href="https://weolbu.com/product/4966" target="_blank" rel="noopener noreferrer"
          style={{ width:"100%", padding:"22px 20px", borderRadius:"20px", border:"none", color:"white", fontWeight:"900", fontSize:"16px", cursor:"pointer", background:"linear-gradient(135deg, #5B6AF0, #8B5CF6)", marginBottom:"12px", textDecoration:"none", display:"block", textAlign:"center", lineHeight:"1.6" }}>
          <div style={{ fontSize:"13px", fontWeight:"600", opacity:0.9, marginBottom:"4px" }}>괜찮아요 아직 늦지 않았어요! 🤗</div>
          <div style={{ fontSize:"12px", opacity:0.85, marginBottom:"10px" }}>지금부터 같이 내집마련 차근차근 시작해봐요</div>
          <div style={{ fontSize:"17px", fontWeight:"900" }}>내집마련 시작하러가기 →</div>
        </a>
        <button onClick={handleRestart} style={styles.btnGray}>🔄 다시 테스트하기</button>
        <p style={{ textAlign:"center", fontSize:"12px", color:"#bbb", marginTop:"12px" }}>📸 결과 캡처해서 인스타 스토리에 공유하세요!</p>
      </div>
    </div>
  );
}