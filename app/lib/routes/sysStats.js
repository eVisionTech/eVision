var si = require('systeminformation');

async function getInfo() {
	try {
		const currentLoad = await si.currentLoad();
		const mem = await si.mem();
		const fsSize = await si.fsSize();
		let sysInfo = {
			'currentLoad': currentLoad,
			'mem': mem,
			'fsSize': fsSize
		};
		return sysInfo;
	} catch (e) {
		console.error('sysInfo error:', e)
	}
}

module.exports = function (app) {
	setInterval(function () {
		getInfo().then((sysInfo) => {
			app.wss.broadcast('sysInfo|' + JSON.stringify(sysInfo), {
				binary: false
			});
		})
	}, 5000);

}
