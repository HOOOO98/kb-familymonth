import React, { useState } from "react";
import "./App.css";

const Roulette = () => {
  const [participants, setParticipants] = useState("");
  const [winners, setWinners] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [showWinners, setShowWinners] = useState(false);

  const startSpin = () => {
    if (!participants.trim()) return;
    setSpinning(true);
    setTimeout(() => {
      const participantArray = participants.split(",").map((item) => item.trim());
      const shuffledParticipants = shuffle(participantArray);
      const selectedWinners = shuffledParticipants.slice(0, 2);
      setWinners(selectedWinners);
      setSpinning(false);
      setShowWinners(true);
    }, 5000); // 5초 후에 추첨 결과 공개
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  return (
    <div className="body">
      <div>
        <h1>5월 가정의달 특별선물</h1>
        <div className="roulette-container">
          {!showWinners && (
            <>
              <textarea
                type="text"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                placeholder="참여자를 콤마로 구분하여 입력해주세요."
                className="text-input"
              />
              <button className="rullet-button" onClick={startSpin} disabled={spinning}>
                {spinning ? "추첨중..." : "랜덤으로 2명 추첨하기"}
              </button>
            </>
          )}
        </div>
      </div>
      {showWinners && (
        <div style={{ fontSize: "24px" }}>
          <div className="congrant-box">
            <p>
              축하합니다!! <br />
              당첨자는 다음과 같습니다.
            </p>
            <ul>
              {winners.map((winner, index) => (
                <div className="winner" key={index}>
                  {winner} 님
                </div>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roulette;
