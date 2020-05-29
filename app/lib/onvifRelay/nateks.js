const url = require('url');
const spawn = require('child_process').spawn;

module.exports = function (params) {

  const snmp_client = spawn('python3.6', [__dirname + '/snmp_V3.py', '-host', params.relay.uri, '-user', params.relay.username, '-password', params.relay.password]);
  snmp_client.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  snmp_client.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
}
