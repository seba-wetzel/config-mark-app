var fs = require("fs");
const {execSync} = require('child_process');
let Config = JSON.parse(fs.readFileSync("./config.json"));

if (!Config.isTouchConfigured) {
  Config.configTouchSettings = execSync('./touchConfigurator/xtcal -geometry 1920x1080').toString().trim();
  let configurator = 'xinput set-prop ' + Config.touchName + " 'Coordinate Transformation Matrix' " + Config.configTouchSettings;
  execSync(configurator);
  Config.isTouchConfigured = true;
  fs.writeFileSync('config.json', JSON.stringify(Config, null, 2));
}

console.log(Config.isTouchConfigured);
