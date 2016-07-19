var exec = require('child_process').execFileSync;
var path = require('path');
var os = require('os');

var npmPath = path.resolve(process.cwd(), 'npm' + (os.platform() === 'win32' ? '.cmd' : '' ));

var npm = function(command, cwd) {
  var opts = {};
  if (cwd) {
    opts.cwd = cwd;
  }
  return exec(npmPath, command.split(' '), opts);
}

console.log(npm('install --no-bin-links fs-extra rimraf'),toString()); 
console.log(npm('install', 'hexo-bin').toString());

