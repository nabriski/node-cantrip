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
const sep_uuid = "eb0d83980a0511e98a8dab819760380e";
const headers_sep = `headers_${sep_uuid}`

let bash = function(str){
    return execSync(str,{shell:'/bin/rbash'});
}

// Optionally, you can export the implementation of the command like so:
getStdin().then(script => {

    const write = function(out){
        process.stdout.write(out,{encoding:'utf-8'});
    }

    const writeHeaders = function(headers){

        process.stdout.write(`\n${headers_sep}\n`)
        Object
            .keys(headers)
            .forEach(function(h){
                process.stdout.write([h,headers[h]].join(": ")+"\n")
            });
        process.stdout.write(`${headers_sep}\n`)
    }
    const vm = new NodeVM({
        console: 'inherit',
        sandbox: {
            env:process.env,
            bash:bash,
            write:write,
            headers:writeHeaders
        }
    });
    vm.run(script);

});
