const url = require('url');

module.exports = function (device) {      
  const prepareUrl = (srcUrl) => {
    let prefixs = ['http://', 'https://', 'ftp://', 'rtsp://', 'tcp://'];
    if (!prefixs.some(element => srcUrl.includes(element))) srcUrl = prefixs[0] + srcUrl;
    return url.parse(srcUrl);
  }

  if (device.id && device.relay.uri) {
    if (!device.relay.type) device.relay.type = device.device.type;
    let urlObj = prepareUrl(device.relay.uri);
    let hostnamewp = urlObj.hostname + (urlObj.port ? ':' + urlObj.port : '')
    if (device.relay.type == 'Beward_DS06M') {
      device.relay.uri = 'http://' + hostnamewp + '/onvif/device_service';
      device.relay.token = "RelayOutput0";
    } else if (device.relay.type == 'Beward' || device.relay.type == 'Beward_DKS15120' || device.relay.type == 'Beward_DKS15122') {
      device.relay.uri = 'http://' + urlObj.hostname + ':2000/onvif/device_service';
      device.relay.token = 'RelayOutputs0';
    } else if (device.relay.type == 'Dahua' || device.relay.type == 'TrueIP') {
      device.relay.uri = urlObj.protocol + '//' + hostnamewp;
    } else if (device.relay.type == 'Nateks') {
      device.relay.uri = urlObj.hostname;
    } else if (device.relay.type == 'ТЕТА') {
      device.relay.uri = 'http://' + hostnamewp + '/onvif/device_service';
      device.relay.token = '000';
    }
    return device;
  } else {
    let params = {
      device: {},      
      relay: {},
      videoRecording: {}
    };

    let urlObj = prepareUrl(device.url);

    let hostnamewp = '';
    if (device.url != '') hostnamewp = urlObj.hostname + (urlObj.port ? ':' + urlObj.port : '');

    params.device.name = device.name;
    params.device.type = device.device;
    params.relay.type = device.device;

    if (device.objectType == null) device.objectType = 0;
    params.objectDetection.objectType = device.objectType;

    if (params.device.type == 'Beward_DS06M') {
      params.device.uri = 'http://' + hostnamewp + '/cgi-bin/images_cgi?channel=0&user=' + device.login + '&pwd=' + device.password;
      params.relay.uri = 'http://' + hostnamewp + '/onvif/device_service';
      params.relay.username = device.login;
      params.relay.password = device.password;
      params.relay.token = "RelayOutput0";
      params.videoRecording.uri = 'rtsp://'  + device.login + ':' + device.password + '@' + urlObj.hostname + ':554/av0_0';
    } else if (params.device.type == 'Beward' || params.device.type == 'Beward_DKS15120' || params.device.type == 'Beward_DKS15122') {
      params.device.uri = 'http://' + hostnamewp + '/cgi-bin/images_cgi?channel=0&user=' + device.login + '&pwd=' + device.password;
      params.relay.uri = 'http://' + urlObj.hostname + ':2000/onvif/device_service';
      if (params.device.type == 'Beward_DKS15120' || params.device.type == 'Beward_DKS15122')
        params.relay.uri = 'http://' + urlObj.hostname;
      params.videoRecording.uri = 'rtsp://'  + device.login + ':' + device.password + '@' + urlObj.hostname + ':554/av0_0';
      params.relay.username = device.login;
      params.relay.password = device.password;
      params.relay.token = 'RelayOutputs0';
    } else if (params.device.type == 'Dahua' || params.device.type == 'TrueIP') {
      params.device.uri = 'rtsp://' + device.login + ':' + device.password + '@' + hostnamewp;
      params.relay.uri = urlObj.protocol + '//' + hostnamewp;
      params.relay.username = device.login;
      params.relay.password = device.password;
      params.videoRecording.uri = 'rtsp://' + device.login + ':' + device.password + '@' + hostnamewp;
    } else if (params.device.type == 'Nateks') {
      params.device.uri = 'rtsp://' + urlObj.hostname + ':554/live.cam';
      params.relay.uri = urlObj.hostname;        
      params.relay.username = device.login;
      params.relay.password = device.password;
      params.videoRecording.uri = 'rtsp://' + urlObj.hostname + ':554/live.cam';
    } else if (params.device.type == 'ТЕТА') {
      params.device.uri = 'rtsp://' + device.login + ':' + device.password + '@' + hostnamewp + '/cam/realmonitor?channel=1&subtype=1';
      params.relay.uri = 'http://' + hostnamewp + '/onvif/device_service';
      params.relay.username = device.login;
      params.relay.password = device.password;
      params.relay.token = '000';
      params.videoRecording.uri = 'rtsp://' + device.login + ':' + device.password + '@' + hostnamewp + '/cam/realmonitor?channel=1&subtype=1';
    } else if (params.device.type == 'TRASSIR_Cloud') {
      params.device.uri = device.url;
      params.videoRecording.uri = device.url;
    } else if (params.device.type == 'WebSocket') {
      params.device.uri = 'webcam';
      params.device.uri = 'ws:' + device.deviceID;
    } else if (params.device.type == 'Webcam') {
      params.device.uri = 'webcam';
    } else {
      params.device.uri = 'rtsp://' + device.login + ':' + device.password + '@' + hostnamewp;
      params.videoRecording.uri = 'rtsp://' + device.login + ':' + device.password + '@' + hostnamewp;
    }

    return params;
  }
}
