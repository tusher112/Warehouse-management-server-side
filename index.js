const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running Car warehouse!!");
});



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1uktq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect()
    .then(() => {
      console.log('db connected!')
    })
  
    const productCollection = client.db('carWarehouse').collection('product')

    app.get("/product", async (req, res) => {
     
      
      const query = {};
      
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      console.log(products)

      res.send(products);
    });


    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
    });

    // POST
    app.post("/product", async (req, res) => {
      const newProduct = req.body;
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    });

    // DELETE
    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });

    //update user
    app.put("/product/:id", async (req, res) => {
        const id = req.params.id;
        const updatedQuantity = req.body;
        console.log(updatedQuantity);
        const filter = { _id: ObjectId(id) };
        const options = { upsert: true };
        const updatedDoc = {
          $set: {
            quantity: updatedQuantity.quantity,
          },
        };
        const result = await productCollection.updateOne(
          filter,
          updatedDoc,
          options
        );
        res.send(result);
      });

    


  } 
  finally {
  }
}


run().catch(console.dir);


app.listen(port, () => {
  console.log("Listening to port", port);
});




