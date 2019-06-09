import React, { useState } from 'react';

export const Filter = props => {
  const [difficulty, setDifficulty] = useState('');

  const submitHanlder = event => {
    event.preventDefault();
    props.history.push(`/challenges/filter/${difficulty}`);
  };

  const onClear = () => {
    setDifficulty('');
    props.history.push('/challenges');
  };

  return (
    <form onSubmit={submitHanlder}>
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
