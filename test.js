
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tushar:tushar101@cluster0.1uktq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect()
.then(() => console.log('connected'))
.catch(err => console.log('Connection failed', err))
