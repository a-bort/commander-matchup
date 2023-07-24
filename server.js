// Require the framework and instantiate it
require('dotenv').config();
const fastify = require('fastify')({ logger: true })
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoUri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
});

fastify.get('/add', async (request, reply) => {
  try {
    await client.connect();
    let deckId = await client.db("NSSiteVisit").collection('deck').insertOne({player: "Andrew", commander: "Bahamut", w:true, u: false, b: false, r: false, g: false, strategy:["Initiative", "Tokens"], power: 5});
    return { deckId: deckId }
  } finally {
    await client.close();
  }
});

/****
* Start DB Connection
****/

async function runDb() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
runDb().catch(console.dir);

/**
 * Run the webserver!
 */
const startWebServer = async () => {
  try {
    await fastify.listen({ port: process.env.port })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
startWebServer()