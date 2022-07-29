import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import { ObjectID } from 'mongodb';
import { getDbConnection } from '../db';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../util/sendEmail';


var router = express.Router();

export const getMatchupsRoute = {
	path: '/api/matchups/:userId',
	method: 'get',
	handler: async (req, res) => {
		
		const { authorization } = req.headers;
		const { userId } = req.params;
		
		if(!authorization) {
			return res.status(401).json({ message: 'No authorization header sent' });
		}
		const token = authorization.split(' ')[1];
		
		//console.log("token split");
		
		
		jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
			if(err) return res.status(401).json({ message: 'Unable to verify token.' });
			
			//console.log('token verified');
			
			const { id, isVerified } = decoded;
			
			//console.log('token decoded');
			
			if(id !== userId) return res.status(403).json({ message: "Not allowed to access that user's data"});
			
			//console.log('token matches');
			
			try{
				console.log('trying db');
				console.log({userId:userId})
				const db = getDbConnection('cri-matchups');
				const matchups = await db.collection('matchups').find({userId: userId}).toArray();
				//console.log(matchups);
				if (matchups.length){
					console.log('matchups found');
					//console.log(matchups[0])
			        //res.setHeader("Access-Control-Allow-Origin", "*");   
				     return res.status(200).send(matchups[0]);				
				} 
				
				//console.log('matchups not found');
				const result = await db.collection('matchups').insertOne({
							userId: userId,
							people: [],
						});
				//console.log(result);
				//console.log('sending 200 ok');
				return res.status(200).send([]);					
			} catch (e) {
				console.log(e);
				return res.status(500).json( { message: "An error occured while trying to access the database" });
			}
		})	

	}
}

export const saveMatchupsRoute = {
	path: '/api/matchups/:userId',
	method: 'post',
	handler: async (req, res) => {
		const { authorization } = req.headers;
		const { userId } = req.params;
		const data = req.body;
		

		//console.log('request body');
		//console.log(data);
		
		if(!authorization) {
			return res.status(401).json({ message: 'No authorization header sent' });
		}
		const token = authorization.split(' ')[1];
		
		
		jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
			if(err) return res.status(401).json({ message: 'Unable to verify token.' });
			

			
			const { id, isVerified } = decoded;

			
			if(id !== userId) return res.status(403).json({ message: "Not allowed to access that user's data"});
			//ALSO NEEDS TO CHECK VERIFIED IN THE FUTURE
			
			
			try{
				const db = getDbConnection('cri-matchups');
				console.log('data');
				console.log(data);
				const people = data.people;
				const date = data.date;
				const email = data.email;
				
				const matchedPeople = people.filter(person => person.matchedWith.length);
				const groups = matchedPeople.map(person => person.matchedWith.map(matched_person => matched_person.name));
				const groupsNoDuplicates = Array.from(new Set(groups.map(JSON.stringify)), JSON.parse);
				
				const saveData = people.map(person => {
					const reducedMatchedWith = person.matchedWith.map(matched_person => ({name:matched_person.name}) );
					const trimmedMatchedWith = reducedMatchedWith.filter(matched_person => matched_person.name !== person.name);
					const matchedWithPlusDates = trimmedMatchedWith.map(trimmed => ({ ...trimmed, date: date }));
					const concatenatedMatchedWith = person.alreadyMet.concat(matchedWithPlusDates);
					return { ...person, alreadyMet: concatenatedMatchedWith, matchedWith: [], omit: false}
				});
				//console.log('saving');
				//console.log(saveData);
				const result = await db.collection('matchups').replaceOne({userId:userId},{ userId: userId, people: saveData}); 
				
				const record = JSON.stringify({[date]:groupsNoDuplicates});
				
		
				await sendEmail({
					to: email,
					from: 'spence.codes@gmail.com',
					subject: 'Weekly meeting matchups',
					text: `
						The weekly matchups for ${date} are as follows:
						${record}
					`
				});
					
				return res.status(200).json(saveData);					
			} catch (e) {
				console.log(e);
				return res.status(500).json( { message: "An error occured while trying to access the database" });
			}
		})
		

	}
}
