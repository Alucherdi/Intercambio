var elegirPapel = function () {
	var usr = document.getElementById("usersSelect").value
	if (usr == "") {
		alert("Elige quien eres (Y no hagas trampa >:C)")
	} else {
		fetch("/regalo", {
			method: "POST",
			headers: { "Content-type": "application/x-www-form-urlencoded" },
			body: "code=" + usr
		}).then(function (r) { return r.json() }).then(function (data) {
			if (data.ok)
				document.body.innerHTML += `
					<div class="modal">
						<div class="container">
							Tu regalo es para: ${data.gifTo}
						</div>
					</div>
				`
			else
				alert("Codigo incorrecto")
		})
	}
}