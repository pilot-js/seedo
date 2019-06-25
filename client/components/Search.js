import React, { useState } from 'react';
import MdVolumeMute from 'react-ionicons/lib/MdVolumeMute';
import MdSearch from 'react-ionicons/lib/MdSearch';
import MdRefresh from 'react-ionicons/lib/MdRefresh';

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
    if (term !== '') {
      history.push(`/challenges/search/${term}/filter/${filterStr}`);
    } else {
      history.push(`/challenges/filter/${filterStr}`);
    }
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
    <div id="search" className="search-form row align-items-center justify-content-start mt-2">
      <div className="col-sm-6 d-flex align-items-center">
        <form onSubmit={submitHandler} className="form-inline align-middle">
          <label className="mr-2">Filter difficulty:</label>
          <select
            className="select-difficulty custom-select px-2"
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
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button
            id="btn-filter"
            type="submit"
            disabled={filterIsAll(Object.values(filter))}
            className="btn btn-raised ml-2 mr-2"
          >
            <MdVolumeMute fontSize="1.5rem" color="rgba(0,0,0,.87" />
            Filter
          </button>
          <button
            type="button"
            disabled={filterIsAll(Object.values(filter))}
            onClick={onClear}
            className="btn btn-raised"
          >
            <MdRefresh fontSize="1.3rem" color="rgba(0,0,0,.87" />
            Clear
          </button>
        </form>
      </div>
      <div className="d-flex col-sm-6 align-items-center">
        <form className="form-inline" onSubmit={onSearch}>
          <input
            type="search"
            className="form-control"
            value={term}
            placeholder="Search"
            onChange={e => setTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-raised mx-2" disabled={!term}>
            <MdSearch fontSize="1.3rem" color="rgba(0,0,0,.87" />
            Search
          </button>
          <button type="button" className="btn btn-raised" disabled={!term} onClick={onClear}>
            <MdRefresh fontSize="1.3rem" color="rgba(0,0,0,.87" />
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};
