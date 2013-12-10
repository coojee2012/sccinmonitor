var oids = {
	windows: {
		host: {
			oid: '1.3.6.1.2.1.25',
			type: 'OBJECT IDENTIFIER',
			access: '',
			syntax: '',
			description: '系统主机信息'
		},
		microsoft: {
			oid: '1.3.6.1.4.1.311',
			type: 'OBJECT IDENTIFIER',
			access: '',
			syntax: '',
			description: '系统软件信息'
		}
	},
	linux: {}
};


oids.windows.host.children = {

	hrSystem: {
		oid: '1.3.6.1.2.1.25.1',
		type: 'GROUP',
		access: '',
		syntax: '',
		description: '系统基础信息',
		children: {
			hrSystemUptime: {
				oid: '1.3.6.1.2.1.25.1.1.0',
				type: 'SCALAR',
				access: 'read-only',
				syntax: 'TimeTicks',
				description: '系统开机时间',
				children: null
			},
			hrSystemDate: {
				oid: '1.3.6.1.2.1.25.1.2.0',
				type: 'SCALAR',
				access: 'read-only',
				syntax: 'TimeTicks',
				description: '系统日期时间',
				children: null
			},
			hrSystemInitialLoadDevice: {
				oid: '1.3.6.1.2.1.25.1.3.0',
				type: 'SCALAR',
				access: 'read-only',
				syntax: 'TimeTicks',
				description: 'The index of the hrDeviceEntry for the device from which this host is configured to load its initial operating system configuration.',
				children: null
			},
			hrSystemInitialLoadParameters: {
				oid: '1.3.6.1.2.1.25.1.4.0',
				type: 'SCALAR',
				access: 'read-only',
				syntax: 'TimeTicks',
				description: '这个对象包含从该设备请求在操作系统初始配置时提供给负载装置的参数（例如，路径名和参数）',
				children: null
			},
			hrSystemNumUsers: {
				oid: '1.3.6.1.2.1.25.1.5.0',
				type: 'SCALAR',
				access: 'read-only',
				syntax: 'TimeTicks',
				description: 'The number of user sessions for which this host is storing state information. A session is a collection of processes requiring a single act of user authentication and possibly subject to collective job control.',
				children: null
			},
			hrSystemProcesses: {
				oid: '1.3.6.1.2.1.25.1.6.0',
				type: 'SCALAR',
				access: 'read-only',
				syntax: 'TimeTicks',
				description: '当前系统运行的进程数。',
				children: null
			},
			hrSystemMaxProcesses: {
				oid: '1.3.6.1.2.1.25.1.7.0',
				type: 'SCALAR',
				access: 'read-only',
				syntax: 'TimeTicks',
				description: '系统可运行的最大进程数。如果没有明确限制值为0.',
				children: null
			}

		}

	},
	//系统存储相关，包括系统内存，硬盘等
	hrStorage: {
		oid: '1.3.6.1.2.1.25.2',
		type: 'GROUP',
		access: '',
		syntax: '',
		description: '系统存储包括硬盘，光驱，内存等',
		children: {
			hrMemorySize: {
				oid: '1.3.6.1.2.1.25.2',
				type: 'SCALAR',
				access: 'read-only',
				syntax: 'KBytes',
				description: '系统内存',
				children: null
			},
			hrStorageTable: {
				oid: '1.3.6.1.2.1.25.2.3',
				type: 'TABLE',
				access: 'not-accessible',
				syntax: 'SEQUENCE OF',
				description: '系统存储列表',
				children: {
					hrStorageEntry: {
						oid: '1.3.6.1.2.1.25.2.3.1',
						type: 'ENTRY',
						access: 'not-accessible',
						syntax: 'HrStorageEntry',
						description: '系统存储列表入口',
						children: {
							hrStorageIndex: {
								oid: '1.3.6.1.2.1.25.2.3.1.1',
								type: 'TABULAR',
								access: 'read-only',
								syntax: 'INTEGER',
								description: '系统存储序号',
								children: null
							},
							hrStorageType: {
								oid: '1.3.6.1.2.1.25.2.3.1.2',
								type: 'TABULAR',
								access: 'read-only',
								syntax: 'OBJECT IDENTIFIER',
								description: '存储空间类型',
								children: null
							},
							hrStorageDescr: {
								oid: '1.3.6.1.2.1.25.2.3.1.3',
								type: 'TABULAR',
								access: 'read-only',
								syntax: 'DisplayString',
								description: '存储空间信息说明',
								children: null
							},
							hrStorageAllocationUnits: {
								oid: '1.3.6.1.2.1.25.2.3.1.4',
								type: 'TABULAR',
								access: 'read-only',
								syntax: 'INTEGER',
								description: '以字节为单位，表示每簇区的大小，也叫每个箸/块的大小',
								children: null
							},
							hrStorageSize: {
								oid: '1.3.6.1.2.1.25.2.3.1.5',
								type: 'TABULAR',
								access: 'read-only',
								syntax: 'INTEGER',
								description: '分区大小以簇为单位，一个磁盘分为多少块/箸, 总大小',
								children: null
							},
							hrStorageUsed: {
								oid: '1.3.6.1.2.1.25.2.3.1.6',
								type: 'TABULAR',
								access: 'read-only',
								syntax: 'INTEGER',
								description: '以hrStorageAllocationUnits表示的簇大小表示的使用量，已经使用的块/箸 ',
								children: null
							},
							hrStorageAllocationFailures: {
								oid: '1.3.6.1.2.1.25.2.3.1.7',
								type: 'TABULAR',
								access: 'read-only',
								syntax: 'Counter',
								description: '系统请求储存空间不足而失败的次数，默认为0.分配失败的块/箸。',
								children: null
							}

						}
					}
				}
			},
		}

	},

	hrStorageTypes: {
		oid: '1.3.6.1.2.1.25.2.1',
		type: 'OBJECT IDENTIFIER',
		access: '',
		syntax: '',
		description: '系统存储类型',
		children: {
			hrStorageOther: {
				oid: '1.3.6.1.2.1.25.2.1.1',
				type: 'OBJ ID',
				access: '',
				syntax: '',
				description: '表示系统其他存储方式',
				children: null
			},
			hrStorageRam: {
				oid: '1.3.6.1.2.1.25.2.1.2',
				type: 'OBJECT IDENTIFIER',
				access: '',
				syntax: '',
				description: '表示系统内存',
				children: null
			},
			hrStorageVirtualMemory: {
				oid: '1.3.6.1.2.1.25.2.1.3',
				type: 'OBJECT IDENTIFIER',
				access: '',
				syntax: '',
				description: '表示系统虚拟内存',
				children: null
			},
			hrStorageFixedDisk: {
				oid: '1.3.6.1.2.1.25.2.1.4',
				type: 'OBJECT IDENTIFIER',
				access: '',
				syntax: '',
				description: '表示系统硬盘',
				children: null
			},
			hrStorageRemovableDisk: {
				oid: '1.3.6.1.2.1.25.2.1.5',
				type: 'OBJECT IDENTIFIER',
				access: '',
				syntax: '',
				description: '表示系统可移动存储',
				children: null
			},
			hrStorageFloppyDisk: {
				oid: '1.3.6.1.2.1.25.2.1.6',
				type: 'OBJECT IDENTIFIER',
				access: '',
				syntax: '',
				description: '表示系统软盘',
				children: null
			},
			hrStorageCompactDisc: {
				oid: '1.3.6.1.2.1.25.2.1.7',
				type: 'OBJECT IDENTIFIER',
				access: '',
				syntax: '',
				description: '表示系统光盘',
				children: null
			},
			hrStorageRamDisk: {
				oid: '1.3.6.1.2.1.25.2.1.8',
				type: 'OBJECT IDENTIFIER',
				access: '',
				syntax: '',
				description: '表示系统内存硬盘（把内存当作硬盘用）',
				children: null
			}

		}
	},
	//系统硬件设备相关，如CPU等
	hrDevice: {
		oid: '1.3.6.1.2.1.25.3',
		type: 'GROUP',
		access: '',
		syntax: '',
		description: '系统硬件设备',
		children: {
			//CPU
			hrProcessorTable: {
				oid: '1.3.6.1.2.1.25.3.3',
				type: 'TABLE',
				access: 'not-accessible',
				syntax: 'SEQUENCE OF',
				description: 'The (conceptual) table of processors contained by the host.',
				children: {
					hrProcessorEntry: {
						oid: '1.3.6.1.2.1.25.3.3.1',
						type: 'ENTRY',
						access: 'not-accessible',
						syntax: 'HrProcessorEntry',
						description: '对于一个处理器包含的主机A（概念）的条目。该hrDeviceIndex在该指数代表了对应于hrProcessorEntry.As本表对象是如何命名的例子在hrDeviceTable的条目，hrProcessorFrwID对象的实例可能被命名为hrProcessorFrwID.3',
						children: {
							hrProcessorFrwID: {
								oid: '1.3.6.1.2.1.25.3.3.1.1',
								type: 'TABULAR',
								access: 'read-only',
								syntax: 'ProductID',
								description: '处理器固件ID',
								children: null
							},
							hrProcessorLoad: {
								oid: '1.3.6.1.2.1.25.3.3.1.2',
								type: 'TABULAR',
								access: 'read-only',
								syntax: 'INTEGER',
								description: 'The average, over the last minute, of the percentage of time that this processor was not idle',
								children: null
							}

						}
					}

				}
			}

		}
	},
	hrDeviceTypes: {
		oid: '1.3.6.1.2.1.25.3.1',
		type: 'OBJECT IDENTIFIER',
		access: '',
		syntax: '',
		description: '系统设备类型',
		children: {}
	},


};

oids.windows.microsoft.children = {

	mssql: {

	},
	http: {

	}
}
exports.oids = oids;