const MAX_RETRIES = 5;
const MAX_BACKOFF_TIME = 16000;
const BACKOFF_TIME = 1000;

const retry = async (
  callback,
  retriesRemaining = MAX_RETRIES,
  backoffTime = BACKOFF_TIME
) => {
  try {
    return await callback();
  } catch (error) {
    if (!retriesRemaining) {
      throw error;
    }

    setTimeout(
      () =>
        retry(
          callback,
          retriesRemaining - 1,
          Math.min(backoffTime * 2, MAX_BACKOFF_TIME)
        ),
      backoffTime
    );
  }
};

module.exports = retry;
