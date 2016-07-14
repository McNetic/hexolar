
var xhr = new ActiveXObject('MSXML2.XMLHTTP');
var fso = new ActiveXObject('Scripting.FileSystemObject');
var wsh = new ActiveXObject('Wscript.shell');

WScript.StdOut.Write('Downloading latest node.exe...');
var urlNodeExe = 'https://nodejs.org/dist/latest-argon/win-x64/node.exe';
xhr.open('GET', urlNodeExe, false);
xhr.onReadyStateChange = function() {
  if (xhr.readyState !== 'DONE') {
    WScript.StdOut.Write('.');
  }
}
xhr.send();

if (xhr.Status !== 200) {
  WScript.StdOut.WriteLine('failed.');
  WScript.StdErr.WriteLine("Error downloading node.exe, exiting.");
  WScript.Quit(1);
} else {
  WScript.StdOut.Write(' done. Writing to file...');
}
  
var adoStream = new ActiveXObject('ADODB.Stream');
adoStream.Open();
adoStream.Type = 1;
adoStream.Write(xhr.ResponseBody);
adoStream.Position = 0;
if (fso.FileExists('node.exe')) {
  fso.DeleteFile('node.exe');
}
adoStream.SaveToFile('node.exe');
adoStream.Close();
WScript.StdOut.WriteLine(' done.');

WScript.StdOut.Write('Copying npm.cmd...');
fso.CopyFile('node_modules/npm/bin/npm.cmd', 'npm.cmd');
WScript.StdOut.WriteLine(' done.');
WScript.StdOut.Write('Installing dependencies via npm...');
wsh.Run('npm install');
WScript.StdOut.WriteLine(' done.');

