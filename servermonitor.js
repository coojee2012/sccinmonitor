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
console.error(session);
var oids = ["1.3.6.1.2.1.1.5.0", "1.3.6.1.2.1.1.2.0","1.3.6.1.2.1.1.3.0","1.3.6.1.2.1.1.7.0","1.3.6.1.2.1.4.1.0"];
session.get (oids, function (error, varbinds) {
    if (error) {
        console.log (error);
    } else {
        for (var i = 0; i < varbinds.length; i++)
            if (snmp.isVarbindError(varbinds[i]))
                console.log (snmp.varbindError (varbinds[i]));
            else
                console.log (varbinds[i].oid + " = " + varbinds[i].value);
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
            console.log (varbinds[i].oid + "|" + varbinds[i].value);
    }
}

var maxRepetitions = 20;
//session.walk (oids[1], maxRepetitions, feedCb, doneCb);

var oids = [
    "1.3.6.1.2.1.1.1.0",
    "1.3.6.1.2.1.1.4.0"
];

session.getNext (oids, function (error, varbinds) {
    if (error) {
        console.error (error.toString ());
    } else {
        for (var i = 0; i < varbinds.length; i++) {
            // for version 1 we can assume all OIDs were successful
            console.log (varbinds[i].oid + "|" + varbinds[i].value);

            // for version 2c we must check each OID for an error condition
            if (snmp.isVarbindError (varbinds[i]))
                console.error (snmp.varbindError (varbinds[i]));
            else
                console.log (varbinds[i].oid + "|" + varbinds[i].value);
        }
    }
});


console.log("getBulk:\n");
var oids = [
    "1.3.6.1.2.1.1.4.0",
    "1.3.6.1.2.1.1.5.0",
    "1.3.6.1.2.1.2.2.1.2",
    "1.3.6.1.2.1.2.2.1.3"
];

var nonRepeaters = 2;

session.getBulk(oids, nonRepeaters, function (error, varbinds) {
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
});



var oid = "1.3.6.1.2.1.1.1";
var columns = [1,2,3, 6];

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
            console.log ("row for index = " + indexes[i]);
            for (var j = 0; j < columns.length; j++) {
                console.log ("   column " + columns[j] + " = "
                        + table[indexes[i]][columns[j]]);
            }
        }
    }
}

var maxRepetitions = 20;

// The maxRepetitions argument is optional, and will be ignored unless using
// SNMP verison 2c
session.tableColumns (oid, columns, maxRepetitions, responseCb);
