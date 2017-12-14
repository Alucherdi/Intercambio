var MongoClient = require("mongodb").MongoClient
var assert = require("assert")

var url = "mongodb://localhost:27017"


var papeles = {
	getAll: () => {
		return new Promise ((resolve, reject) => {
			MongoClient.connect(url, (err, client) => {
				assert.equal(null, err)
				var db = client.db("intercambio")
				var collection = db.collection("papeles")

				collection.find({}).toArray((errr, papel) => {
					assert.equal(null, errr)
					resolve(papel)
				})
				client.close()
			})
		})
	}
}

module.exports = papeles