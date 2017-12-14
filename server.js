var express = require("express"),
	hbs = require("express-handlebars"),
	app = express(),
	model = require("./models/papeles_model")

app.engine("hbs", hbs({
	extname: "hbs",
	defaultLayout: "main"
}))

app.use(express.static("public"))

app.set("view engine", "hbs")

app.get("/", (req, res) => {
	model.getAll().then((users) =>  {
		console.log(users)
		res.render("home", {users: users})
	})
	
})

app.post("/regalo", (req, res) => {
	res.render("regalo")
})

app.listen(4200, () => console.log("Server up in 4200"))