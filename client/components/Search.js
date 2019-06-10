import React, { useState } from 'react';

export const Search = ({ searchTerm, history }) => {
  const [term, setTerm] = useState(searchTerm ? searchTerm : '');
  const [difficulty, setDifficulty] = useState('all');

  const onSearch = ev => {
    ev.preventDefault();
    history.push(`/challenges/filter/${difficulty}/search/${term}`);
  };

  const onClear = () => {
    setTerm('');
    setDifficulty('all');
    history.push('/challenges');
  };

  const submitHandler = event => {
    event.preventDefault();
    history.push(`/challenges/filter/${difficulty}`);
  };

  return (
    <div>
      <form className="m-2" onSubmit={onSearch}>
        <input
          type="text"
          className="form-control"
          value={term}
          placeholder="Search"
          onChange={e => setTerm(e.target.value)}
        />
        <button type="submit" disabled={!term}>
          Search
        </button>
        <button type="button" disabled={!term} onClick={onClear}>
          Clear
        </button>
      </form>
      <form onSubmit={submitHandler}>
        <label>Difficulty:</label>
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option value="all">All</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
        <button type="submit" disabled={difficulty === 'all'}>
          Filter
        </button>
        <button type="button" onClick={onClear}>
          Clear
        </button>
      </form>
    </div>
  );
};
