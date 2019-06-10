import React, { useState } from 'react';

export const Search = ({ searchTerm, history }) => {
  const [term, setTerm] = useState(searchTerm ? searchTerm : '');

  const onSearch = ev => {
    ev.preventDefault();
    history.push(`/challenges/search/${term}`);
  };

  const clearTerm = () => {
    setTerm('');
    history.push('/challenges');
  };

  return (
    <form className="m-2" onSubmit={onSearch}>
      <input
        type="text"
        className="form-control"
        value={term}
        placeholder="Search"
        onChange={e => setTerm(e.target.value)}
      />
      <button type="submit" disabled={!term.length}>
        Search
      </button>
      <button type="button" disabled={!term.length} onClick={clearTerm}>
        Clear
      </button>
    </form>
  );
};
