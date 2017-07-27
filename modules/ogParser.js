var request = require('request');
var cheer = require('cheerio');

exports.opParser = function (req, res, next){
	logger.info("Got the url to ogParser : "+ req.body.url);
	if (!req.body.url) {
		logger.error("URL is not defined");
		res.send("URL is a mandatory parameter");
	}
	
	request(req.body.url, function (err, response, body) {
		var metaData = {}
		var ogData = {}
		var resData = {}
		if (err || response.statusCode != 200 ) {
			logger.error('error:', err); // Print the error if one occurred
			res.status(500).send("Error while geting the URL response"); 
		} else {
			var $ = cheer.load(body)
			var meta = $('meta') || {}
			var keys = Object.keys(meta)
			
			keys.forEach(function (key) {

				if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.content) {

					var property = meta[key].attribs.property,
						content = meta[key].attribs.content
					if (content.length !== 0) {

						if (property === 'og:title')
							ogData.title = content

						if (property === 'og:description')
							ogData.description = content.substring(0, 69)
						
						if (property === 'og:url')
							ogData.url = content

						if (property === 'og:image') {
							if (!ogData.images)
								ogData.images = [content]
							else if (Array.isArray(ogData.images))
								ogData.images.push(content)
						}
					}
				} else if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.content ) {

				  //if og parameters aren't set
					var name = meta[key].attribs.name,
						content = meta[key].attribs.content

					if (content.length !== 0) {

						if (name === 'title')
							metaData.title = content

						if (name === 'description')
							metaData.description = content.substring(0, 69)
						
						if (name === 'image') {
							if (!metaData.images)
								metaData.images = [content]
							else if (Array.isArray(metaData.images))
								metaData.images.push(content)
						}
					}
				}
			})
			logger.silly("Metadata of the URL : ",JSON.stringify(metaData));
			logger.silly("OG data of the URL : ",JSON.stringify(ogData));
			res.send(ogData);
		}
	});
}
