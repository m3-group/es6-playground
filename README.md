es6-playground
==============

A sandbox for testing out ES6 Harmony (JavaScript) with a transpiler, and a collection of resources about it.

The default grunt task will take everything in the src/js/ folder and transpile it to a JavaScript file included in index.html.

## Quick Start
Firstly, make sure you have Nodejs, npm, and grunt-cli installed.
```
node --version && npm --version && grunt --version

// Output should be something like:
// v0.10.21
// 1.3.11
// grunt-cli v0.1.11
```
If you're missing node, you can get it via homebrew or otherpackage managers:
```
brew install node
```
If you're missing grunt-cli, you can get it via npm:
```
npm install -g grunt-cli
```
Next, and lastly, you must install local packages via npm:
```
npm install
```
Once you have satisfied these dependencies, Copy and Paste the following code into terminal
```
grunt build && grunt serve
```
Now open your browser and navigate to http://127.0.0.1:8089 or http://localhost:8089

## Building the Code
Simply run
```
grunt
```
or 
```
grunt build
```

## Resources
- Initial inspiration for this repo came from [globaldev](http://globaldev.co.uk/2013/09/es6-part-1/)
- [Addy Osmani's collection of ES6 articles](http://addyosmani.com/blog/ecmascript-6-resources-for-the-curious-javascripter/)
- [es6fiddle](http://www.es6fiddle.net/) is a cute in-browser way to play with ES6
