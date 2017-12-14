var express = require("express"),
	hbs = require("express-handlebars"),
	app = express(),
	model = require("./models/papeles_model"),
	MongoClient = require("mongodb").MongoClient,
	assert = require("assert"),
	url = "mongodb://alucherdi:mundoweb@ds137826.mlab.com:37826/alucherdi"

app.engine("hbs", hbs({
	extname: "hbs",
	defaultLayout: "main"
}))

app.use(express.static("public"))

app.use(require("./middlewares/postparams"))

app.set("view engine", "hbs")

app.get("/", (req, res) => {
	res.render("home")
})

app.post("/regalo", (req, res) => {
	var b = req.body
	console.log("Llegando a servicio")
	MongoClient.connect(url, (errorBD, db) => {
		if (errorBD) console.log("ERROR: " + errorBD)
		assert.equal(null, errorBD)
		var collection = db.collection("papeles")

		collection.findOne({code: b.code}, (errFindGifter, gifter) => {
			assert.equal(null, errFindGifter)

			resCode = {
				ok: false,
				gifTo: ""
			}

			if (gifter) {
				resCode.ok = true
				if(!gifter.gifter) {
					collection.find({code: {$ne: b.code}}).toArray((errFindAll, papers) => {
						assert.equal(null, errFindAll)
						var rand = Math.floor(Math.random() * papers.length)
						for (var i = 0; i < 1000; i++) {
							if (!papers[rand].used) {
								var asgn = papers[rand]
								resCode.gifTo = asgn.name
								console.log(gifter._id)
								collection.updateOne({ _id: gifter._id }, {$set: {gifter: true, giftBy: asgn.name}})
								collection.updateOne({ _id: asgn._id }, {$set: {used: true}})
								res.send(resCode)
								return
							}
						}
						
					})
				} else {
					resCode.gifTo = gifter.giftBy
					res.send(resCode)
					return
				}
			}
		})
		
	}) 
})

app.listen(process.env.PORT || 4200, () => console.log("Server up in 4200"))