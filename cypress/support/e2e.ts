// Import custom commands and global setup before every spec.
import './commands';

// Fail fast on uncaught app errors, but surface them in the log first.
Cypress.on('uncaught:exception', (err) => {
  // eslint-disable-next-line no-console
  console.error('Uncaught exception in app under test:', err.message);
  return false;
});
