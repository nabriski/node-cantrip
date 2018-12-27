const shell = require('shelljs');
const tap = require('tap');

let ret = shell.exec("echo \"console.log(1)\" | ./index.js",{silent:true}).stdout;
tap.equal(ret,"1\n","value is 1");

ret = shell.exec("echo \"console.log(bash('echo -n hello'))\" | ./index.js",{silent:true}).stdout;
tap.equal(ret,"hello\n","echo value is hello");


ret = shell.exec("echo \"console.log(bash('curl -s https://api.datashim.com/pseudo-heroism'))\" | ./index.js",{silent:true}).stdout;
tap.ok(JSON.parse(ret).name,"JSON with a name attribute");
