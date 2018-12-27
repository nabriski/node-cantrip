const shell = require('shelljs');
const tap = require('tap');

let ret = shell.exec("echo \"write('1')\" | ./index.js",{silent:true}).stdout;
tap.equal(ret,"1","value is 1");

ret = shell.exec("echo \"write(bash('echo -n hello').toString())\" | ./index.js",{silent:true}).stdout;
tap.equal(ret,"hello","echo value is hello");


ret = shell.exec("echo \"write(bash('curl -s https://api.datashim.com/pseudo-heroism').toString())\" | ./index.js",{silent:true}).stdout;
tap.ok(JSON.parse(ret).name,"JSON with a name attribute");

//image
ret = shell.exec("echo \"let img=bash('convert -size 100x100 xc:white png:-');write(img)\" | ./index.js",{silent:true,encoding:'buffer'}).stdout;
console.log(ret.length);
