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
tap.equal(ret.length,273,"image size is 273 bytes");

//headers
ret = shell.exec("echo \"writeHeaders({some_header:123});write('1\\\n')\" | ./index.js",{silent:true}).stdout;
let expected = [
    "--headers BEGIN",
    "some_header: 123",
    "--headers END",
    "1"
].join("\n");

tap.equal(ret,expected,"value is 1 with custom header");


