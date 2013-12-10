var mibtojson = require('./common/mib-to-json.js').mibtojson; 

var mibSkel=
    "RFC1213-MIB DEFINITIONS ::= BEGIN\n"+
    "\n"+
    "IMPORTS\n+"
    "    experimental, OBJECT-TYPE, Counter\n"+
    "                           FROM RFC1155-SMI;\n"+
    "\n"+
    "-- contact IANA for actual number\n"+
    "root    OBJECT IDENTIFIER ::= { experimental xx } -- REMOVEME\n"+
    "\n"+
    "END\n";
var parseEmpty = mibtojson.parse(""); //parse function from mib-to-json.js
console.log(parseEmpty);

var parseSkel = mibtojson.parse(mibSkel);

console.log(parseSkel);