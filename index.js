const express = require('express')
const bodyParser = require ('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();

MongoClient.connect('mongodb://swadmin:swpassword@ds113650.mlab.com:13650/swquotes', (err, database) => {
	if (err) return console.log(err)
	db = database
	// ... start the server swadmin/swpassword
	app.listen(3000, function() {
    	console.log("Listening on 3000")
	})
})

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(error)
		console.log("saved to database")
		res.redirect("/")
	})
	console.log(req.body)
})
