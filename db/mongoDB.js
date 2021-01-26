const {MongoClient,ObjectId} = require('mongodb');
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
    await cursor.forEach(({ _id, title, author }) => {
        result.push({ _id: _id, title: title, author: author });
    }); // map함수가 동작하지않음
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

async function deleteTodo(id){

    // Query for a movie that has a title of type string
    console.log("db:delete target:",id);
    const query = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 1) {
        console.dir("Successfully deleted one document.");
    } else {
        console.log("No documents matched the query. Deleted 0 documents.");
    }

}
module.exports.deleteTodo = deleteTodo;