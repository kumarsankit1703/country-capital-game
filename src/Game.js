import React, { useEffect, useState } from "react";

const Game = ({ data }) => {
  const [item] = useState(() =>
    Object.entries(data)
      .flat()
      .sort(() => Math.random() - 0.5),
  );
  const [selectedOption, setSelectedOption] = useState([]);
  const [isMatched, setIsMatched] = useState([]);
  const [wrong, setWrong] = useState([]);

   const handleClick = (e, option) => {
    if (selectedOption.length === 2) return;
    if (selectedOption.includes(option)) return;
    setSelectedOption((prev) => [...prev, option]);
  };

  useEffect(() => {
    if (selectedOption.length === 2) {
      const [first, second] = selectedOption;
      const match = data[first] === second || data[second] === first;

      if (match) {
        setIsMatched((prev) => [...prev, first, second]);
      } else {
        setWrong([first, second]);
      }

      setTimeout(() => {
        setSelectedOption([]);
        setWrong([]);
      }, 1000);
    }
  }, [selectedOption]);
 

  if (isMatched.length === item.length) {
    return <h1>Congratulation</h1>;
  }

  return (
    <div>
      <h1>Game</h1>
      {item.map((t) => {
        if (isMatched.includes(t)) return null;
        let className = "btn";
        if (selectedOption.includes(t)) className = "btn-blue";
        if (isMatched.includes(t)) className = "btn-green";
        if (wrong.includes(t)) className = "btn-red";
        return (
          <button
            className={className}
            key={t}
            value={t}
            onClick={(e) => handleClick(e, t)}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
};

export default Game;
