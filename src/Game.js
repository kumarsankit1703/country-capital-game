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
    if (selectedOption.length === 2) return; // if Array length is more than 2 ['India', 'Delhi']
    if (selectedOption.includes(option)) return; // if value is already existing in selectedOption ["Delhi"] 
                                                //(Agar selected value pehle se hi added hai selectedOption mein to wo array mein add nahi hogi)
    setSelectedOption((prev) => [...prev, option]);
  };

  useEffect(() => {
    if (selectedOption.length === 2) {                                        // Agar Array ki length 2 hai
      const [first, second] = selectedOption;                                 // Destructure array values ['India', 'Delhi'] = selectedOption
      console.log(first, second, data[first], data[second])
      const match = data[first] === second || data[second] === first;         // data[Delhi] === India || data[India] === Delhi

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
