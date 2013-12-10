var log4js = require('log4js');
var oids=require('./usefuloids.js').oids;
console.log(oids.windows.microsoft);
//log the cheese logger messages to a file, and the console ones as well.
log4js.configure({
    appenders: [
        {
            type: "file",
            filename: "cheese.log",
            category: [ 'cheese','console' ]
        },
        {
            type: "console"
        }
    ],
    replaceConsole: true
});

var logger = log4js.getLogger('cheese');
//only errors and above get logged.
//you can also set this log level in the config object
//via the levels field.
logger.setLevel('ERROR');

var snmp = require ("net-snmp");
var version=snmp.Version1;
var options={
    port: 161,
    retries: 1,
    timeout: 5000,
    transport: "udp4",
    trapPort: 162,
    version: snmp.Version1
};
var session = snmp.createSession ("127.0.0.1", "public",options);

console.log(session);







oids = ["1.3.6.1.4.1.311.1.7.3.1.51.0", "1.3.6.1.2.1.1.2.0","1.3.6.1.2.1.1.3.0","1.3.6.1.2.1.1.7.0","1.3.6.1.2.1.4.1.0"];
oids=["1.3.6.1.3.60.1.1.2.1"];
oids=["1.3.6.1.2.1.25.1.1.0","1.3.6.1.2.1.25.1.2.0","1.3.6.1.2.1.25.1.3.0",
"1.3.6.1.2.1.25.1.4.0","1.3.6.1.2.1.25.1.5.0","1.3.6.1.2.1.25.1.6.0","1.3.6.1.2.1.25.1.7.0",
"1.3.6.1.2.1.25.2.2.0"];
//oids=["1.3.6.1.2.1.1.1.0","1.3.6.1.2.1.1.2.0","1.3.6.1.2.1.1.3.0","1.3.6.1.2.1.1.4.0","1.3.6.1.2.1.1.5.0","1.3.6.1.2.1.1.6.0","1.3.6.1.2.1.1.7.0"];
session.get (oids, function (error, varbinds) {
    if (error) {
        console.log (error);
    } else {
        for (var i = 0; i < varbinds.length; i++)
            if (snmp.isVarbindError(varbinds[i]))
                console.log (snmp.varbindError (varbinds[i]));
            else
            {
                console.log(varbinds[i]);
                console.log (varbinds[i].oid + " = " + varbinds[i].value);
            }
    }
});

session.trap (snmp.TrapType.LinkDown, function (error) {
    if (error)
        console.log (error);
});

function doneCb (error) {
    if (error)
        console.error (error.toString ());
}

function feedCb (varbinds) {
    for (var i = 0; i < varbinds.length; i++) {
        if (snmp.isVarbindError (varbinds[i]))
            console.error (snmp.varbindError (varbinds[i]));
        else
            logger.error (varbinds[i].oid + "|" + varbinds[i].value);
    }
}

var maxRepetitions = 20;
//session.walk (oids[1], maxRepetitions, feedCb, doneCb);


 oids = ["1.3.6.1.2.1.311"];

//session.getNext (oids, getnext);

function getnext (error, varbinds) {
    if (error) {
        console.error (error.toString ());
    } else {
        for (var i = 0; i < varbinds.length; i++) {
            // for version 1 we can assume all OIDs were successful
            console.log (varbinds[i].oid + "|" + varbinds[i].value);

            // for version 2c we must check each OID for an error condition
            if (snmp.isVarbindError (varbinds[i]))
                console.error (snmp.varbindError (varbinds[i]));
            else{
                 console.log("类型：",varbinds[i].type);
                 console.log("type:",snmp.ObjectType.OID);
                 console.log("值：",varbinds[i].value);  
                if(varbinds[i].type==snmp.ObjectType.OID){
                console.log("type:",snmp.ObjectType.OID);
                 //session.getNext (varbinds[i].value, getnext);
                }else{
                console.log (varbinds[i].oid + "|" + varbinds[i].value);
            }
            }
        }
    }
}



var oid = "1.3.6.1.2.1.1";
    oid="1.3.6.1.4";
    oid="1.3.6.1.4.1.311.1";
    oid="1.3.6.1.4.1.77.1.1";
    oid="1.3.6.1";
    oid="1.3.6.1.4.1.311.1.7.3.1"; //httpd
    oid="1.3.6.1.4.1.311"//mssql
    oid="1.3.6.1.2.1.25.1";
    oid="1.3.6.1.2.1.25.2";
    oid="1.3.6.1.2.1.25.2.2.0";
    oid="1.3.6.1.2.1.25.3.3.1";//cpu 列表
   // oid="1.3.6.1.2.1.25.2.3.1";
    //oid="1.3.6.1.2.1.25.2.3.1.6";//磁盘使用列表
    //oid="1.3.6.1.2.1.25.2.3.1.5";//磁盘大小列表
    //oid="1.3.6.1.2.1.25.2.3.1.3";//磁盘信息列表
    //oid="1.3.6.1.2.1.25.2.3.1.1";//磁盘序号
    //oid="1.3.6.1.2.1.25.2.1.4";
var mywindows={
    oid:'1.3.6.1',
    value:'',
    children:[]
};

function doneCbsubTree (error) {
    if (error)
        console.error (error.toString ());
}

function feedCbsubTree (varbinds) {
    for (var i = 0; i < varbinds.length; i++) {
        if (snmp.isVarbindError (varbinds[i]))
            logger.error (snmp.varbindError (varbinds[i]));
        else{

        if(varbinds[i].type==snmp.ObjectType.OID){
         //console.log("类型：",varbinds[i].type);
         // console.log("值：",varbinds[i].value);  
         // var session2 = snmp.createSession ("127.0.0.1", "public",options);
         logger.error(varbinds[i].value);
         logger.error("==>");
          session.subtree (varbinds[i].value, maxRepetitions, feedCbsubTree, doneCbsubTree);
          var newoid={};
            newoid.oid=varbinds[i].oid;
            newoid.value=varbinds[i].value;
            newoid.children=[];
            mywindows.children.push(newoid);
        }
        else
        {
            var newoid={};
            newoid.oid=varbinds[i].oid;
            newoid.value=varbinds[i].value;
            newoid.children=[];
            mywindows.children.push(newoid);
            logger.error(varbinds[i].oid + "|" + varbinds[i].value);
        }
    }
   // if(i == varbinds.length-1 ){
    //    logger.error(mywindows);
    //}
    }
}



// The maxRepetitions argument is optional, and will be ignored unless using
// SNMP verison 2c
//session.subtree (oid, maxRepetitions, feedCbsubTree, doneCbsubTree);







 oids = [
    "1.3.6.1.2.1.1.4.0",
    "1.3.6.1.2.1.1.5.0",
    "1.3.6.1.2.1.2.2.1.2",
    "1.3.6.1.2.1.2.2.1.3"
];

var nonRepeaters = 0;

/*session.getBulk (oids, nonRepeaters, function (error, varbinds) {
    if (error) {
        console.error (error.toString ());
    } else {
        // step through the non-repeaters which are single varbinds
        for (var i = 0; i < nonRepeaters; i++) {
            if (i >= varbinds.length)
                break;

            if (snmp.isVarbindError (varbinds[i]))
                console.error (snmp.varbindError (varbinds[i]));
            else
                console.log (varbinds[i].oid + "|" + varbinds[i].value);
        }

        // then step through the repeaters which are varbind arrays
        for (var i = nonRepeaters; i < varbinds.length; i++) {
            for (var j = 0; j < varbinds[i].length; j++) {
                if (snmp.isVarbindError (varbinds[i][j]))
                    console.error (snmp.varbindError (varbinds[i][j]));
                else
                    console.log (varbinds[i][j].oid + "|"
                            + varbinds[i][j].value);
            }
    }
}
});*/




oid = "1.3.6.1.2.1.2.2";
oid = "1.3.6.1.4.1.2021.10";

function sortInt (a, b) {
    if (a > b)
        return 1;
    else if (b > a)
        return -1;
    else
        return 0;
}

function responseCb (error, table) {
    
    if (error) {
        console.error (error.toString ());
    } else {
        // This code is purely used to print rows out in index order,
        // ifIndex's are integers so we'll sort them numerically using
        // the sortInt() function above
        var indexes = [];
        for (index in table)
            indexes.push (parseInt (index));
        indexes.sort (sortInt);

        // Use the sorted indexes we've calculated to walk through each
        // row in order
        for (var i = 0; i < indexes.length; i++) {
            // Like indexes we sort by column, so use the same trick here,
            // some rows may not have the same columns as other rows, so
            // we calculate this per row
            var columns = [];
            for (column in table[indexes[i]])
                columns.push (parseInt (column));
            columns.sort (sortInt);

            // Print index, then each column indented under the index
            logger.error("row for index = " + indexes[i]);
            for (var j = 0; j < columns.length; j++) {
                logger.error ("   column " + columns[j] + " = "
                        + table[indexes[i]][columns[j]]);
            }
        }
    }
}


// The maxRepetitions argument is optional, and will be ignored unless using
// SNMP verison 2c
//session.table ("1.3.6.1.4.1.0", maxRepetitions, responseCb);



 oid = "1.3.6.1.2.1.2.2";
var columns = [2, 6];



function responseCb1 (error, table) {
    if (error) {
        console.error (error.toString ());
    } else {
        // This code is purely used to print rows out in index order,
        // ifIndex's are integers so we'll sort them numerically using
        // the sortInt() function above
        var indexes = [];
        for (index in table)
            indexes.push (parseInt (index));
        indexes.sort (sortInt);

        // Use the sorted indexes we've calculated to walk through each
        // row in order
        for (var i = 0; i < indexes.length; i++) {
            // Like indexes we sort by column, so use the same trick here,
            // some rows may not have the same columns as other rows, so
            // we calculate this per row
            var columns = [];
            for (column in table[indexes[i]])
                columns.push (parseInt (column));
            columns.sort (sortInt);

            // Print index, then each column indented under the index
            logger.debug ("row for index = " + indexes[i]);
            for (var j = 0; j < columns.length; j++) {
                logger.debug("   column " + columns[j] + " = "
                        + table[indexes[i]][columns[j]]);
                //console.log ("   column " + columns[j] + " = "
                 //       + table[indexes[i]][columns[j]]);
            }
        }
    }
}



// The maxRepetitions argument is optional, and will be ignored unless using
// SNMP verison 2c
//session.tableColumns (oid, columns, maxRepetitions, responseCb1);

