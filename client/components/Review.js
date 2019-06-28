import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addCommentToOneChallenge } from '../store';

const _Review = ({ userId, challengeId, addCommentToOneChallenge }) => {
  const [content, setContent] = useState('');
  const handleSubmit = ev => {
    ev.preventDefault();
    const comment = {
      text: content,
      userId,
      challengeId,
    };
    addCommentToOneChallenge(challengeId, comment).then(() => setContent(''));
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <br />
        <textarea
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows="4"
          cols="50"
        />
        <br />
        <button className="btn btn-raised btn-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addCommentToOneChallenge: (challengeId, comment) =>
      dispatch(addCommentToOneChallenge(challengeId, comment)),
  };
};

export const Review = connect(
  null,
  mapDispatchToProps,
)(_Review);
