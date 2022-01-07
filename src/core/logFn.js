export default (logPrefix) => (message) =>
    // eslint-disable-next-line no-console
    console.log(`${logPrefix}: ${message}`);
