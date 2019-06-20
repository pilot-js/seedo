import React from 'react';
import { Link } from 'react-router-dom';
import { userchallenge } from '../store';

const UserCompletedChallenges = ({
  userChallenges,
  individualChallenge,
  isAdminUser,
  firstName,
}) => {
  const nameText = isAdminUser ? `${firstName}'s` : 'My';

  return (
    <div id="user-completed-challenges" className="d-flex flex-column align-items-center">
      <h1>{nameText} Completed Challenges</h1>
      <ul className="">
        {userChallenges
          .filter(chal => chal.userchallenges[0].submitted)
          .map(challenge => {
            return (
              <li key={challenge.id} className="challenge-name">
                {challenge.name}
                <ul className="">
                  {challenge.userchallenges.map(userchallenge => {
                    return (
                      <li key={userchallenge.id}>
                        <Link to={`/solutions/${userchallenge.id}/challenges/${challenge.id}`}>
                          {userchallenge.updatedAt}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export { UserCompletedChallenges };
