const shell = require('shelljs');
const tap = require('tap');

let ret = shell.exec("echo \"console.log(1)\" | ./index.js").stdout;
tap.equal(ret,"1\n","value is 1");

ret = shell.exec("echo \"shell.echo('hello')\" | ./index.js").stdout;
tap.equal(ret,"hello\n","echo value is hello");


ret = shell.exec("echo \"shell.curl('-s','https://api.datashim.com/pseudo-heroism')\" | ./index.js").stdout;
tap.ok(JSON.parse(ret).name,"JSON with a name attribute");
