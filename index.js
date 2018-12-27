#!/usr/bin/env node
const getStdin  = require("get-stdin");
const {NodeVM}  = require('vm2');
const { execSync } = require('child_process');
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
    return execSync(str,{shell:'/bin/rbash'});
}

// Optionally, you can export the implementation of the command like so:
getStdin().then(script => {

    const write = function(out){
        process.stdout.write(out,{encoding:'utf-8'});
    }

    const writeHeaders = function(headers){

        process.stdout.write("\n--headers BEGIN eb0d8398-0a05-11e9-8a8d-ab819760380e\n")
        Object
            .keys(headers)
            .forEach(function(h){
                process.stdout.write([h,headers[h]].join(": ")+"\n")
            });
        process.stdout.write("--headers END eb0d8398-0a05-11e9-8a8d-ab819760380e\n")
    }
    const vm = new NodeVM({
        console: 'inherit',
        sandbox: {
            env:process.env,
            bash:bash,
            write:write,
            writeHeaders:writeHeaders
        }
    });
    vm.run(script);

});
