import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';

import routes from './routes/index.js'

import { initializeDbConnection } from './db';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
//app.use(express.static(__dirname+'/public/'));
console.log('public dir');
console.log(path.join(__dirname, '..', '..', 'public'));


routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

app.get('/dist/bundle.js', (req, res) => {
	//console.log("bundle")
	//res.set('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'bundle.js'));
});

app.use('/public', express.static(path.join(__dirname, '..', '..', 'public')))

app.get('*', (req, res) => {
	res.set('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    });