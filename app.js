var fs = require("fs");
const {execSync} = require('child_process');
let Config = JSON.parse(fs.readFileSync("./config.json"));
let error = false;


function configTouch() {
  const configurator = 'xinput set-prop ' + Config.touchName + " 'Coordinate Transformation Matrix' " + Config.configTouchSettings;
  try {
    var exec = execSync(configurator);
  } catch (err) {
    console.log("Hubo un problema al configurar el Tactil");
    error = true; 
    
    return;
  }
  error = true;
  console.log("Tactil configurado");
}

function calibrator(){
  const calibrator = './touchConfigurator/xtcal -geometry '+ Config.screenGeometry;
  console.log(calibrator);
  Config.configTouchSettings = execSync(calibrator).toString().trim();
  Config.isTouchConfigured = true;
  fs.writeFileSync('config.json', JSON.stringify(Config, null, 2));
  console.log("Guardando configuraciones \nTouch Settings= " + Config.configTouchSettings);
}




if (!Config.isTouchConfigured || (Config.configTouchSettings == null)) {
    calibrator();
}

configTouch();

if (error){
//Si no puede guardar las configuraciones las sobre escribe con un null
    //porque a veces malos valores de config emiten un error en xinput
    //Config.configTouchSettings = null;
    fs.writeFileSync('config.json', JSON.stringify(Config, null, 2));
    calibrator();

}

if (Config.isAutoStart) {
  const app = 'cd ' + Config.appDir + ' && npm start';
  try {
    var exec = execSync(app);
  } catch (err) {
    console.log("Hubo un problema al iniciar la app" + err);
  }

}
