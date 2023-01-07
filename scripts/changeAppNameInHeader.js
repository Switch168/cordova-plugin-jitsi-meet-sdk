
module.exports = function(context) {
    const fs = require('fs');
    const path = require('path');

    const { ConfigParser } = context.requireCordovaModule("cordova-common");
    const appConfig = new ConfigParser(path.resolve(context.opts.projectRoot, "config.xml"));
    const appName = appConfig.name()
    const destIosFiles = `${context.opts.projectRoot}/platforms/ios/${appName}/Plugins/cordova-plugin-jitsi-meet-sdk`;

    const headerFile = `${destIosFiles}/CDVJitsiMeet.h`;
    const sourceFile = `${destIosFiles}/CDVJitsiMeet.m`;

    fs.readFile(headerFile, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace(/APP_NAME/g, appName);

      fs.writeFile(headerFile, result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });

    fs.readFile(sourceFile, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace(/APP_NAME/g, appName);

      fs.writeFile(sourceFile, result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
}
