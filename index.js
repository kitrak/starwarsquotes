const express = require('express')
const bodyParser = require ('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();

MongoClient.connect('mongodb://swadmin:swpassword@ds113650.mlab.com:13650/swquotes', (err, database) => {
	if (err) return console.log(err)
	db = database
	app.listen(3000, function() {
    	console.log("Listening on 3000")
	})
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
	db.collection('quotes').find().toArray(function(err, result) {
		if (err) return console.log(err)
		console.log(result)
		res.render('index.ejs', {quotes: result})
	})
})

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(error)
		console.log("saved to database")
		res.redirect("/")
	})
	console.log(req.body)
})

app.put('/quotes', (req, res) => {  
	db.collection('quotes')
	.findOneAndUpdate({name: 'Yoda'}, {
		$set: {
			name: req.body.name,
			quote: req.body.quote
		}
	}, {
		sort: {_id: -1},
		upser0t: true
	}, (err, result) => {
		if (err) return res.send(err)
		res.send(result)	
	})	
})

app.delete('/quotes', (req, res) => {
	db.collection('quotes').findOneAndDelete({name: req.body.name},		
		(err, result) => {
			if (err) return res.send(500, err)
			res.send(result)
		})
})
