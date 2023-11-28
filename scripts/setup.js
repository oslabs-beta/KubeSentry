const process = require('process');


( async () => {
  console.log('Setting up databases.');
  // Code for database init goes here.
  /*
  const Database = require('./server/models/database');
  await Database.spinup();
  await Database.disconnect();
  */
  process.exit();
})();