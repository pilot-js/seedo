import React, { useState } from 'react';

export const Search = props => {
  const [term, setTerm] = useState(props.term ? props.term : '');

  const onSearch = ev => {
    ev.preventDefault();
    props.history.push(`/challenges/search/${term}`);
  };

  const clearTerm = () => {
    setTerm('');
    props.history.push('/challenges');
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
