const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:root@cluster0.bb0ip.mongodb.net/todoDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

let database;
let collection;

async function init() {
    await client.connect();
    database = client.db("todoDB");
    collection = database.collection("todoCollection");
};
init();

async function findAll() {
    console.log("db:findAll...");

    // query for movies that have a runtime less than 15 minutes
    const query = {};
    const cursor = collection.find();
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
        console.log("No documents found!");
    }
    const result = [];
    await cursor.forEach((d) => { result.push({ title: d.title, author: d.author }); }); // map함수가 동작하지않음
    console.log(result);
    return result;

}
module.exports.findAll = findAll;

async function insert({ title, author }) {
    console.log("db:insert...");

    // create a document to be inserted
    const doc = { title: title, author: author };
    const result = await collection.insertOne(doc);
    console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );

}
module.exports.insert = insert;