#!/usr/bin/env node
const getStdin  = require("get-stdin");
const {NodeVM}  = require('vm2');

// Optionally, you can export the implementation of the command like so:
getStdin().then(stdin => {

    const write = function(out){
        process.stdout.write(out,{encoding:'utf-8'});
    }

    const vm = new NodeVM({
        console: 'inherit',
        sandbox: {
            env:process.env,
            stdin : stdin,
            write:write
        }
    });
    vm.run(process.argv[2]);

});
