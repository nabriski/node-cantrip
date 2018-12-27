#!/usr/bin/env node
const getStdin  = require("get-stdin");
const {NodeVM}  = require('vm2');
const shell     = require('shelljs');
/*
// This exposes the plugin utilities
const plugin = require('shelljs/plugin');

// Implement your command in a function, which accepts `options` as the
// first parameter, and other arguments after that
function curlImp(options,url) {
    let params = Object.keys(options).join(" ");
    let cmd = ["curl",params,`\"${url}\"`].join(" ");
    return shell.exec(cmd).stdout;
}

// Register the new plugin as a ShellJS command
plugin.register('curl', curlImp, {
    canReceivePipe : true,
    cmdOptions: {"s":"-s"},
});
*/

let bash = function(str){
    return shell.exec(str,{silent:true,shell:'/bin/rbash'}).stdout;
}

// Optionally, you can export the implementation of the command like so:
getStdin().then(script => {

    const vm = new NodeVM({
        console: 'inherit',
        sandbox: {env:process.env,bash:bash}
    });
    vm.run(script);

});
