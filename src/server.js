import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';

const app = express();

app.use(bodyParser.json());
app.use(express.static('/home/pi/matchups_generator/public/'));

app.get('/api/matchups', async (req, res) => {
    try {
        //const articleName = req.params.name;

        const client = await MongoClient.connect('mongodb://10.0.1.58:27017', { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('cri-matchups');
        const matchups = await db.collection('matchups').find({"season":1}).toArray(); 
        res.setHeader("Access-Control-Allow-Origin", "*");   
	    res.status(200).send(matchups ? matchups : []);
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
    
})


app.post('/api/matchups', async (req, res) => {
    try {
	   // console.log("start");
        const client = await MongoClient.connect('mongodb://10.0.1.58:27017', { useNewUrlParser: true, useUnifiedTopology: true });
        //console.log("client yes");
        const db = client.db('cri-matchups');
        //console.log("db yes");
        //console.log(req.body);
        const data = req.body;
        
        //console.log("data yes");
        const matchups = await db.collection('matchups').replaceOne({"season":1},{ people: data, "season": 1 },{ upsert: true });   
        //res.setHeader("Access-Control-Allow-Origin", "http://10.0.1.69:3000/");   
        //console.log("matchups yes");
	    res.status(200).json(matchups ? matchups : []);
        client.close();
        //console.log("complete");
    } catch (error) {
	    //res.setHeader("Access-Control-Allow-Origin", "http://10.0.1.69:3000/");   
        res.status(500).json({ message: 'Error connecting to db2', error });
    }
    
})

app.get('/dist/bundle.js', (req, res) => {
	//console.log("bundle")
	//res.set('Content-Type', 'text/html');
    res.sendFile('/home/pi/matchups_generator/dist/bundle.js');
});

app.get('*', (req, res) => {
	res.set('Content-Type', 'text/html');
    res.sendFile('/home/pi/matchups_generator/public/index.html');
});


app.listen(8000, () => console.log('Listening on port 8000'));