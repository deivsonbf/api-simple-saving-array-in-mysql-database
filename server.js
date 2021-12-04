const app = require('./index');
const port = process.env.PORT || 5000

app.listen(port, (req, res) => {

	if (port == 5000) {
		console.log("Desenvolvimento")

	} else {
		console.log("produção")
	}
	
})

