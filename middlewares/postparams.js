var express = require("express")
var app = module.exports = express()

app.use((req, res, next) => {
	var bodyString = ""

	req.on("data", (chunk) => {
		bodyString += chunk.toString()
	})

	req.on("end", () => {
		var params = bodyString.split("&")
		req.body = {}
		
		for (var i = 0; i < params.length; i++) {
			var param = params[i].split("=")
			var key = param[0]
			var value = param[1]
			req.body[key] = value
		}
		
		next()
	})
})