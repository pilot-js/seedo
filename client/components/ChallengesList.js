import React from 'react';

export const ChallengesList = () => {
  const questions = ['easy Q1', 'medium Q1', 'hard Q1']
  return (
    <div>
      {questions.map(question => (
        <div>{question}</div>
      ))}
    </div>
  );
};