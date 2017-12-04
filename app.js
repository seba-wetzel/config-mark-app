var fs = require("fs");
const {execSync} = require('child_process');
let Config = JSON.parse(fs.readFileSync("./config.json"));

function configTouch() {
  const configurator = 'xinput set-prop ' + Config.touchName + " 'Coordinate Transformation Matrix' " + Config.configTouchSettings;
  execSync(configurator);
  Config.isTouchConfigured = true;
}

if (!Config.isTouchConfigured | (Config.configTouchSettings == null)) {
  Config.configTouchSettings = execSync('./touchConfigurator/xtcal -geometry 1920x1080').toString().trim();
  fs.writeFileSync('config.json', JSON.stringify(Config, null, 2));
}

console.log(Config.isTouchConfigured);
