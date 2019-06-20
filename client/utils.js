export const convertBufferToImgSrc = imageBuffer => {
  const base64String = btoa(String.fromCharCode(...new Uint8Array(imageBuffer.data)));
  return `data:image/png;base64,${base64String}`;
};

/******** CHALLENGES LIST ******/

// export const solutionByChallengeId = challengeId => {
//   if (userchallenge instanceof Array) {
//     const solutions = userchallenge.filter(
//       solution => solution.challengeId === challengeId && solution.submitted,
//     );
//     return solutions;
//   }
// };

export const attemptedTimes = arr => {
  if (arr instanceof Array) {
    return arr.length;
  }
};

export const attemptedByUsers = arr => {
  if (arr instanceof Array) {
    const userIds = arr.reduce((acc, solution) => {
      if (!acc.includes(solution.userId)) {
        acc.push(solution.userId);
      }
      return acc;
    }, []);
    return userIds.length;
  }
};

export const avgScore = arr => {
  if (arr instanceof Array) {
    const totalScore = arr.reduce((acc, solution) => {
      acc += solution.grade;
      return acc;
    }, 0);
    const avgScore = totalScore / arr.length ? Math.round(totalScore / arr.length) : 0;
    return avgScore;
  }
};

export const solutionCompleted = (arr, userId) => {
  if (arr instanceof Array) {
    return arr.reduce((acc, solution) => {
      if (solution.userId === userId) {
        acc = true;
      }
      return acc;
    }, false);
  }
};
