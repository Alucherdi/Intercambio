var elegirPapel = function () {
	var usr = document.getElementById("usersSelect").value
	if (usr == "NONE") {
		alert("Elige quien eres (Y no hagas trampa >:C)")
	} else {
		fetch("/regalo", {
			method: "POST",
			headers: { "Content-type": "application/x-www-form-urlencoded" },
			body: "user=" + usr
		}).then(function (r) { return r.text() }).then(function (data) {
			console.log(data)
		})
	}
}