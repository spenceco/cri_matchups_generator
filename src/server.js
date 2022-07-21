import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';

import routes from './routes/index.js'

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname+'/public/'));


app.get('/dist/bundle.js', (req, res) => {
	//console.log("bundle")
	//res.set('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, '..', 'dist', 'bundle.js'));
});

routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

app.get('*', (req, res) => {
	res.set('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


app.listen(8000, () => console.log('Listening on port 8000'));