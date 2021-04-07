const http = "http://";
const https = "https://";

const urlsEnum = {
	"website": https + "stryde.app",
	"ios": https + "apps.apple.com/us/genre/ios/id36",
	"android": https + "play.google.com/store",
};

Object.freeze(urlsEnum);



module.exports = (function()
{
	return urlsEnum;
})();
