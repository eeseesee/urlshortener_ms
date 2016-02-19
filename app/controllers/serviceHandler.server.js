'use strict';

var ServiceController = require(process.cwd()+'/app/controllers/serviceController.js');

function ServiceHandler () {

	this.convertURL = function (req, res) {

		var serviceController = new ServiceController();

		var url = req.params[0];
		//var baseUrl = "://" + req.headers.host;

		serviceController.shortenUrl(url, function(newUrl){
			if (!newUrl){
				return res.json({"error": "Invalid URL"})
			}
			res.json({"original_url": newUrl.url, "alternative_url": "/" + newUrl.extension});
		});
	}

	this.getURL = function (req, res) {

		var serviceController = new ServiceController();

		var extension = req.params[0];

		serviceController.getUrl(extension, function(oldUrl){
			if (!oldUrl){
				return res.json({"error": "No url found for given input"})
			}

			res.redirect('http://' + oldUrl.url);
		});

	}
}

module.exports = ServiceHandler;
