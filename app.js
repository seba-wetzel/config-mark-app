var fs = require("fs");
const {execSync} = require('child_process');
let Config = JSON.parse(fs.readFileSync("./config.json"));

function configTouch() {
  const configurator = 'xinput set-prop ' + Config.touchName + " 'Coordinate Transformation Matrix' " + Config.configTouchSettings;
  try {
    var exec = execSync(configurator);
  } catch (err) {
    console.log("Hubo un problema al configurar el Tactil");

    //Si no puede guardar las configuraciones las sobre escribe con un null
    //porque a veces malos valores de config emiten un error en xinput
    Config.configTouchSettings = null;
    fs.writeFileSync('config.json', JSON.stringify(Config, null, 2));
    return;
  }
  console.log("Tactil configurado");
}

if (!Config.isTouchConfigured || (Config.configTouchSettings == null)) {
  Config.configTouchSettings = execSync('./touchConfigurator/xtcal -geometry 1920x1080').toString().trim();
  Config.isTouchConfigured = true;
  fs.writeFileSync('config.json', JSON.stringify(Config, null, 2));
  console.log("Guardando configuraciones \nTouch Settings= " + Config.configTouchSettings);
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
