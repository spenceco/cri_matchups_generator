import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import { getDbConnection } from '../db.js';


var router = express.Router();

export const getMatchupsRoute = {
	path: '/api/matchups',
	method: 'get',
	handler: async (req, res) => {
	    try {
	        //const articleName = req.params.name;
	
	        const client = await MongoClient.connect('mongodb://10.0.1.58:27017', { useNewUrlParser: true, useUnifiedTopology: true });
	        const db = getDbConnection('cri-matchups');
	        const matchups = await db.collection('matchups').find({"season":1}).toArray(); 
	        res.setHeader("Access-Control-Allow-Origin", "*");   
		    res.status(200).send(matchups ? matchups : []);
	        client.close();
	    } catch (error) {
	        res.status(500).json({ message: 'Error connecting to db', error });
	    }
	}
}

export const saveMatchupsRoute = {
	path: '/api/matchups',
	method: 'post',
	handler: async (req, res) => {
		try {
	        const client = await MongoClient.connect('mongodb://10.0.1.58:27017', { useNewUrlParser: true, useUnifiedTopology: true });
	        const db = getDbConnection('cri-matchups');
	        const data = req.body;
	        const matchups = await db.collection('matchups').replaceOne({"season":1},{ people: data, "season": 1 },{ upsert: true });   
		    res.status(200).json(matchups ? matchups : []);
	        client.close();
	    } catch (error) {  
	        res.status(500).json({ message: 'Error connecting to db2', error });
	    }
	}
}
