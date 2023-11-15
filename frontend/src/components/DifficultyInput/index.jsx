import React, { useState } from 'react';
import './style.scss';

function DifficultyInput({ setDifficulty, difficulty: parentDifficulty = '' }) {
  const [difficulty, setInternalDifficulty] = useState(parentDifficulty);

  const difficultyOptions = [
    { value: '1', label: 'Muito fácil' },
    { value: '2', label: 'Fácil' },
    { value: '3', label: 'Médio' },
    { value: '4', label: 'Difícil' },
    { value: '5', label: 'Muito difícil' },
  ];

  function handleInputChange(e) {
    setInternalDifficulty(e.target.value);
    setDifficulty(e.target.value);
  }

  return (
    <fieldset className='difficulty'>
      <legend>Selecione a dificuldade:</legend>

      {difficultyOptions.map(option => (
        <label key={option.value} htmlFor={`difficulty-${option.value}`}>
          {option.label}
          <input
            id={`difficulty-${option.value}`}
            type="radio"
            value={option.value}
            checked={difficulty === option.value}
            onChange={handleInputChange}
            name="difficulty"
          />
        </label>
      ))}
    </fieldset>
  );
}

export default DifficultyInput;
