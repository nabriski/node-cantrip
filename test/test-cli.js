const shell = require('shelljs');
const tap = require('tap');

let ret = shell.exec("./index.js \"write('1')\" < /dev/null",{silent:true}).stdout;
tap.equal(ret,"1","value is 1");


ret = shell.exec("echo '{\"name\": \"Aaron Saunders\"}' | ./index.js \"let name = JSON.parse(stdin).name;write(name)\"",{silent:true}).stdout;
tap.equals(ret,"Aaron Saunders","JSON with a name attribute");


