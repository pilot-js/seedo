import React, { useState } from 'react';

export const Search = ({ searchTerm, history }) => {
  const [term, setTerm] = useState(searchTerm ? searchTerm : '');
  const [filter, setFilter] = useState({ difficulty: 'all' });

  const onSearch = ev => {
    ev.preventDefault();
    const filterStr = JSON.stringify(filter);
    history.push(`/challenges/search/${term}/filter/${filterStr}`);
  };

  const onClear = () => {
    setTerm('');
    setFilter({ difficulty: 'all' });
    history.push('/challenges');
  };

  const submitHandler = event => {
    event.preventDefault();
    const filterStr = JSON.stringify(filter);
    history.push(`/challenges/filter/${filterStr}`);
  };

  const filterIsAll = arr => {
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i] !== 'all') {
        return false;
      }
    }
    return true;
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
        <label>Filter difficulty:</label>
        <select
          name="difficulty"
          value={filter.difficulty}
          onChange={e => {
            const val = e.target.value;
            setFilter(prevState => {
              return { ...prevState, difficulty: val };
            });
          }}
        >
          <option value="all">All</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
        <button type="submit" disabled={filterIsAll(Object.values(filter))}>
          Filter
        </button>
        <button type="button" onClick={onClear}>
          Clear
        </button>
      </form>
    </div>
  );
};
