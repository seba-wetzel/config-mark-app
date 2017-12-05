var fs = require("fs");
const {execSync} = require('child_process');
let Config = JSON.parse(fs.readFileSync("./config.json"));

funtion save() {
  fs.writeFileSync('config.json', JSON.stringify(Config, null, 2));
}

function calibrate() {
  Config.configTouchSettings = execSync('./touchConfigurator/xtcal -geometry 1920x1080').toString().trim();
  console.log("Guardando configuraciones \nTouch Settings= " + Config.configTouchSettings);
}

function configTouch() {
  const configurator = 'xinput set-prop ' + Config.touchName + " 'Coordinate Transformation Matrix' " + Config.configTouchSettings;
  try {
    var exec = execSync(configurator);
  } catch (err) {
    console.log("Hubo un problema al configurar el Tactil");
    Config.configTouchSettings = null;
    calibrate();
  }
  console.log("Tactil configurado!");
}

if (!Config.isTouchConfigured || (Config.configTouchSettings == null)) {

  calibrate();
}

configTouch();

if (Config.isAutoStart) {
  const app = 'node ' + Config.appDir;
  try {
    var exec = execSync(app);
  } catch (err) {
    console.log("Hubo un problema al iniciar la app" + err);
  }

}
