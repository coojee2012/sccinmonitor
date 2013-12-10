var oids = {};
oids.windows = {
	host: {
		oid: '1.3.6.1.2.1.25',
		DESCRIPTION: '关于主机信息',
		children: [
			hrSystem: {
				oid: '1.3.6.1.2.1.25.1',
				children: [
					hrSystemUptime: {
						oid: '1.3.6.1.2.1.25.1.1.0',
						SYNTAX: 'TimeTicks',
						ACCESS: 'read-only',
						DESCRIPTION: 'The amount of time since this host was last initialized. Note that this is different from
sysUpTime in MIB-II [3] because sysUpTime is the
uptime of the network management portion of the
system.'
					},
					hrSystemDate: {
						oid: '1.3.6.1.2.1.25.1.2.0',
						SYNTAX: 'DateAndTime',
						ACCESS: 'read-only',
						DESCRIPTION: 'The hosts notion of the local date and time of day'
					},
					hrSystemInitialLoadDevice: {
						oid: '1.3.6.1.2.1.25.1.3.0',
						SYNTAX: 'INTEGER',
						ACCESS: 'read-only',
						DESCRIPTION: 'The index of the hrDeviceEntry for the device from which this host is configured to load its initial operating system configuration.'
					},
					hrSystemInitialLoadParameters: {
						oid: '1.3.6.1.2.1.25.1.4.0',
						SYNTAX: 'DateAndTime',
						ACCESS: 'read-only',
						DESCRIPTION: 'This object contains the parameters (e.g. a pathname and parameter) supplied to the load device when requesting the initial operating system configuration from that device.'
					},
					hrSystemInitialLoadParameters: {
						oid: '1.3.6.1.2.1.25.1.4.0',
						SYNTAX: 'InternationalDisplayString',
						ACCESS: 'read-only',
						DESCRIPTION: 'This object contains the parameters (e.g. a pathname and parameter) supplied to the load device when requesting the initial operating system configuration from that device.'
					},
					hrSystemNumUsers: {
						oid: '1.3.6.1.2.1.25.1.5.0',
						SYNTAX: 'Gauge',
						ACCESS: 'read-only',
						DESCRIPTION: 'The number of user sessions for which this host is
storing state information. A session is a
collection of processes requiring a single act of
user authentication and possibly subject to
collective job control.'
					},
					hrSystemProcesses: {
						oid: '1.3.6.1.2.1.25.1.6.0',
						SYNTAX: 'Gauge',
						ACCESS: 'read-only',
						DESCRIPTION: 'The number of process contexts currently loaded or running on this system.'
					},
					hrSystemMaxProcesses: {
						oid: '1.3.6.1.2.1.25.1.7.0',
						SYNTAX: 'INTEGER',
						ACCESS: 'read-only',
						DESCRIPTION: 'The maximum number of process contexts this system
can support. If there is no fixed maximum, the
value should be zero. On systems that have a fixed
maximum, this object can help diagnose failures
that occur when this maximum is reached.'
					}
				]
			},
			hrStorage: {
				oid: '1.3.6.1.2.1.25.2',
				children:[
				hrMemorySize:{
					oid: '1.3.6.1.2.1.25.2.2.0',
						SYNTAX: 'KBytes',
						ACCESS: 'read-only',
						DESCRIPTION: 'The amount of physical main memory contained by the host.'
				},
				
				]
			},
			hrDevice: {
				oid: '1.3.6.1.2.1.25.3',
			},
			hrSWRun: {
				oid: '1.3.6.1.2.1.25.4',
			},
			hrSWRunPerf: {
				oid: '1.3.6.1.2.1.25.5',
			},
			hrSWInstalled: {
				oid: '1.3.6.1.2.1.25.6',
			},
			hrFSTypes: {
				oid: '1.3.6.1.2.1.25.9',
			}
		]

	},
	lanmanager: {
		'lanmgr-2': {
			common: {
				comVersionMaj: {
					oid: '1.3.6.1.4.1.77.1.1.1.0',
					SYNTAX: 'object string',
					ACCESS: 'read-only '
					DESCRIPTION: 'The major release version number of the software.',
				}
			}
		}
	}
}