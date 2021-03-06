#!/usr/bin/env node

"use strict";

var util = require("util");
var path = require("path");
var fs = require("fs");
var getStdin = require("get-stdin");

var args = require("minimist")( process.argv.slice(2), {
    boolean: [ "help", "in"],
    string: [ "file" ]
});
if(args.help) {
    printHelp();
} else if(
    args.in ||
    args._.includes("-")
) {
    processFile(process.stdin)
} else if(args.file) {
    let stream = fs.createReadStream(path.join(BASE_PATH, args));
    processFile(stream);
} else {
    error("Incorrect usage.", true);
}


function processFile(inStream) {
    var outStream = inStream;
    var targetStream = process.stdout;
    outStream.pipe(targetStream);
}

function error(msg, includeHelp = false) {
    console.error(msg);
    if(includeHelp) {
        console.log("");
        printHelp();
    }
}
// printHelp()

// console.log("Hello world");
// process.stdout.write("Hello World");

// console.log("hello world")
// console.error("Oops")

// node ex1.js 2> /dev/null  # the 2 redirects standard error
// 1> is standard out

//*******************
function printHelp() {
    console.log("ex1 usage");
    console.log("ex1.js --help");
    console.log("");
    console.log("--help             print this help");
    console.log("--file={FILENAME}  print file name");
    console.log("")
}