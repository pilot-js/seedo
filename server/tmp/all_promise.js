function All(promises) {
  return new Promise((res, rej) => {
    const results = [];
    let counter = 0;
    promises.forEach((promise, idx) => {
      promise.then(result => {
        results[idx] = result;
        counter += 1;
      });
    });
  });
}
