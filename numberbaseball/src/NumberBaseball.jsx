import React, { useRef, useState, memo } from "react";
import Try from "./Try";

//숫자 4개를 겹치지 않고 랜덤으로 뽑는 함수
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = memo( () => {
  const [answer, setAnswer] = useState(getNumbers());
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [tries, setTries] = useState([]);
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
      e.preventDefault();
      const guess = value;
      if (guess === "") {
        alert("숫자를 입력하세요");
        return;
      }
      if (guess.length !== 4) {
        alert("4자리 숫자를 입력하세요");
        return;
      }
      if (guess.match(/[^0-9]/g)) {
        alert("숫자만 입력하세요");
        return;
      }
      if (guess === answer.join("")) {
        setResult("홈런!");
        setTries((prevTries) => {
          return [...prevTries, { try: guess, result: "홈런!" }];
        });
        alert("게임을 다시 시작합니다.");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
        inputRef.current.focus();
      } else {
        const answerArray = answer.map((v) => parseInt(v));
        const tryArray = guess.split("").map((v) => parseInt(v));
        let strike = 0;
        let ball = 0;
        if (tries.length >= 9) {
          setResult("실패!");
          alert("게임을 다시 시작합니다.");
          setValue("");
          setAnswer(getNumbers());
          setTries([]);
        } else {
          for (let i = 0; i < 4; i += 1) {
            if (answerArray[i] === tryArray[i]) {
              strike += 1;
            } else if (answerArray.includes(tryArray[i])) {
              ball += 1;
            }
          }

          setTries((prevTries) => {
            return [...prevTries, { try: guess, result: `${strike} 스트라이크, ${ball} 볼` }];
          });
        }
        inputRef.current.focus();
      }
    };

    const onChangeInput = (e) => {
      setValue(e.target.value);
    };
  
  return (
    <>
      <h1>NumberBaseball</h1>
      <div>정답: {answer}</div>
      <div>{result}</div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputRef}
          maxLength={4}
          value={value}
          onChange={onChangeInput}
        />
        <button>입력!</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return (
            <Try key={`${i+1}차 시도:`} tryInfo={v} index={i} />
          );
        })}
      </ul>
    </>
  );
});

export default NumberBaseball;