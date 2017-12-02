var fs = require("fs");
const {exec} = require('child_process');
var Config = require("./config.json");

exec('ls', (err, stdout, stderr) => {
  if (err) {
    console.log("Error trying to exec");
    return;
  }
  console.log(stdout);
})

console.log(Config.isTouchConfigured);
