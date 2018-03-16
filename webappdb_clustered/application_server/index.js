'use strict'

// Load our dependencies
const bodyParser = require('body-parser');
const express = require('express');
const mongo = require('mongodb');

// Setup database and server constants
const DB_NAME = 'word_database';
const DB_HOST = process.env.DB_HOST || 'localhost:27017';
const COLLECTION_NAME = 'words';
const SERVER_PORT = 8000;

// Create our app, database clients, and the word list array
const app = express();
const connection = mongo.MongoClient;
const dbUri = `mongodb://${DB_HOST}`;

// Setup our templating engine and for data parser
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

// Load all words that are in the database
function loadWordsFromDatabase() {
    return connection.connect(dbUri)
        .then((client) => {
            return client.db(DB_NAME).collection(COLLECTION_NAME).find({}).toArray();
        })
        .then((docs) => {
            return docs.map(doc => doc.word);
        });
}

// Our main landing page handler
app.get('/', (req, res) => {
    console.log('Loading data from database...');
    loadWordsFromDatabase().then((words) => {
        console.log('Data loaded, showing the results...');
        res.render('index', { words: words });        
    });
});

// Handler for POSTing a new word
app.post('/new', (req, res) => {
    const word = req.body.word;

    console.info(`Got word: ${word}`);
    if (word) {
        connection.connect(dbUri).then((client) => {
            client.db(DB_NAME).collection(COLLECTION_NAME).insertOne({ word }, () => {
                client.close();
                res.redirect('/');
            });
        });
    }
});

// Start everything by loading words and then starting the server
loadWordsFromDatabase().then((words) => {
    console.info(`Data loaded from database ${dbUri} (${words.length} word${words.length > 0 ? 's' : ''})`);
    app.listen(SERVER_PORT, () => {
        console.info("Server started on port %d...", SERVER_PORT);
    });
});