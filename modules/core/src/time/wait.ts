/**
 * Promise version of setTimeout().
 */
export const wait = (delay: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
