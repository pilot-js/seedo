import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { addCommentToOneChallenge } from '../store';

const _Review = ({ userId, challengeId, addCommentToOneChallenge }) => {
  const [content, setContent] = useState('');
  useEffect(() => {
    setContent(content);
  });
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="reviewContent">Add Review Here</label>
        <br />
        <textarea
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
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
