import React, { useState } from 'react';

export const Filter = ({ history }) => {
  const [difficulty, setDifficulty] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    history.push(`/challenges/filter/${difficulty}`);
  };

  const onClear = () => {
    setDifficulty('');
    history.push('/challenges');
  };

  return (
    <form onSubmit={submitHandler}>
      <label>Difficulty:</label>
      <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
        <option>--</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
      </select>
      <button type="submit" disabled={!difficulty.length}>
        Filter
      </button>
      <button type="button" onClick={onClear}>
        Clear
      </button>
    </form>
  );
};
