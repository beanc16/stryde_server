const DeviceDetector = require("node-device-detector");
const detector = new DeviceDetector();
const userAgent = "Mozilla/5.0 (Linux; Android 5.0; NX505J Build/KVT49L) " + 
				  "AppleWebKit/537.36 (KHTML, like Gecko) " + 
				  "Chrome/43.0.2357.78 " + 
				  "Mobile Safari/537.36";
const result = detector.detect(userAgent);


// Device Types
const DEVICE_TYPE = require('node-device-detector/parser/const/device-type');
const isTabled  = result.device && [DEVICE_TYPE.TABLET].indexOf(result.device.type) !== -1;
const isMobile = result.device && [DEVICE_TYPE.SMARTPHONE, DEVICE_TYPE.FEATURE_PHONE].indexOf(result.device.type) !== -1;
const isPhablet = result.device && [DEVICE_TYPE.PHABLET].indexOf(result.device.type) !== -1;
const isIOS = result.os && result.os.family === 'iOS';
const isWearable = result.device.type === DEVICE_TYPE.WEARABLE;
const isAndroid = result.os && result.os.family === 'Android';
const isDesktop = !isTabled && !isMobile && !isPhablet && !isWearable;

//console.log("result:\n", result);
//console.log("\nDEVICE_TYPE:\n", DEVICE_TYPE);


// Enum
const deviceDetectorEnum = {
	"DEVICE_TYPE": DEVICE_TYPE,
	"isTabled": isTabled,
	"isMobile": isMobile,
	"isPhablet": isPhablet,
	"isIOS": isIOS,
	"isWearable": isWearable,
	"isAndroid": isAndroid,
	"isDesktop": isDesktop,
};

Object.freeze(deviceDetectorEnum);



module.exports = (function()
{
	return deviceDetectorEnum;
})();
