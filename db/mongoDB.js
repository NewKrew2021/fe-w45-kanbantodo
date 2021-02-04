const {MongoClient,ObjectId} = require('mongodb');
const uri = "mongodb+srv://root:root@cluster0.bb0ip.mongodb.net/todoDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

let database;
let collection;
let activityCollection;
let sectionCollection

async function init() {
    await client.connect();
    database = client.db("todoDB");
    collection= database.collection("taskCollection");
    activityCollection=database.collection("activityCollection");
    sectionCollection=database.collection('sectionCollection');
};
init();

async function findAll(sectionID) {
    if(typeof collection === 'undefined') return;
    console.log("db:findAll...",sectionID);

    // query for movies that have a runtime less than 15 minutes
    const query={type:sectionID}
    const cursor = collection.find(query);
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
        console.log("No documents found!");
    }
    const result = [];
    await cursor.forEach(({ _id, title, author,type }) => {
        result.push({ _id, title, author,type });
    }); // map함수가 동작하지않음
    return result;

}
module.exports.findAll = findAll;

async function insertTodo({ sectionID,title, author }) {
    console.log("db:insert...");

    // create a document to be inserted
    const doc = { type:sectionID, title, author};
    const result = await collection.insertOne(doc);
    console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );

}
module.exports.insertTodo = insertTodo;

async function updateTodo({ id,newTitle }) {
    console.log("db:updating...",id,newTitle);
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {$set: {title:newTitle}};
    const result = await collection.updateOne(filter, updateDoc);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );

}
module.exports.updateTodo = updateTodo;

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



async function findAllActivities(sectionID) {
    if(typeof collection === 'undefined') return;
    console.log("db:findAll...",sectionID);

    // query for movies that have a runtime less than 15 minutes
    const cursor = activityCollection.find();
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
        console.log("No documents found!");
    }
    const result = [];
    await cursor.forEach(activity => {
        result.push(activity);
    }); // map함수가 동작하지않음
    return result;

}
module.exports.findAllActivities = findAllActivities;


async function insertActivity(activityData) {
    console.log("db:inserting activity...");
    const {title,author,sectionID,action,newTitle,newSectionName,time}=activityData;
    //// create a document to be inserted

    const doc = {title, author, sectionName:sectionID, action,time};
    if(typeof newTitle !== `undefined`){
        doc.newTitle=newTitle;
    }
    if(typeof newSectionName !== `undefined`){
        doc.newSectionName=newSectionName;
    }
    const result = await activityCollection.insertOne(doc);
    console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );

}
module.exports.insertActivity = insertActivity;

async function insertSection() {
    console.log("db:inserting section...");

    const query={}
    const cursor = sectionCollection.find(query);
    // print a message if no documents were found
    const count=await cursor.count();
    if ((count) === 0) {
        console.log("No documents found!");
    }

    const doc = {sectionID:`section${count+1}`,title:"새 칼럼"};
    
    const result = await sectionCollection.insertOne(doc);
    console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );
    return doc;
}
module.exports.insertSection = insertSection;


async function findSections() {
    if(typeof sectionCollection === 'undefined') return;
    console.log("db:findAll sections...");

    // query for movies that have a runtime less than 15 minutes
    const cursor = sectionCollection.find();
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
        console.log("No documents found!");
    }
    const result = [];
    await cursor.forEach(activity => {
        result.push(activity);
    }); // map함수가 동작하지않음
    return result;

}
module.exports.findSections = findSections;

async function deleteSection(sectionID){

    console.log("db:delete target:",sectionID);
    const query = { sectionID };
    const result = await sectionCollection.deleteOne(query);
    if (result.deletedCount === 1) {
        console.dir("Successfully deleted one document.");
        return true;
    } else {
        console.log("No documents matched the query. Deleted 0 documents.");
        return false;
    }

}
module.exports.deleteSection = deleteSection;