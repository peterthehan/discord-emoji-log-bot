const MAX_RETRIES = 5;
const MAX_DELAY = 16000;
const DEFAULT_DELAY = 1000;

const sleep = async duration =>
  new Promise(resolve => setTimeout(resolve, duration));

const backoff = async (
  callback,
  retries = MAX_RETRIES,
  delay = DEFAULT_DELAY
) =>
  callback().catch(error => {
    if (!retries) {
      return Promise.reject(error);
    }

    return sleep(delay).then(() =>
      backoff(callback, retries - 1, Math.min(delay * 2, MAX_DELAY))
    );
  });

module.exports = backoff;
