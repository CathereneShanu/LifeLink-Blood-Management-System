const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 5000;

const client = new MongoClient("mongodb://localhost:27017");

app.use(cors());
app.use(express.json());

async function startServer() {
    try {
        await client.connect();

        const db = client.db("lifelinkDB");
        const donorsCollection = db.collection("donors");
        const requestsCollection = db.collection("bloodRequests");

        console.log("Connected to MongoDB");

        app.get("/", (req, res) => {
            res.send("LifeLink backend is running!");
        });

        app.post("/api/donors", async (req, res) => {
            try {
                const donor = req.body;

                const result = await donorsCollection.insertOne(donor);

                res.status(201).json({
                    message: "Donor registered successfully!",
                    id: result.insertedId
                });

            } catch (error) {
                console.error("Donor error:", error);

                res.status(500).json({
                    message: "Failed to register donor."
                });
            }
        });

        app.get("/api/donors", async (req, res) => {
            try {
                const donors = await donorsCollection.find().toArray();

                res.json(donors);

            } catch (error) {
                console.error("Donor retrieval error:", error);

                res.status(500).json({
                    message: "Failed to retrieve donors."
                });
            }
        });

        app.get("/api/requests", async (req, res) => {
            try {
                const requests = await requestsCollection.find().toArray();

                res.json(requests);

            } catch (error) {
                console.error("Request retrieval error:", error);

                res.status(500).json({
                    message: "Failed to retrieve blood requests."
                });
            }
        });

        app.post("/api/requests", async (req, res) => {
            try {
                const request = req.body;

                const result = await requestsCollection.insertOne(request);

                res.status(201).json({
                    message: "Blood request submitted successfully!",
                    id: result.insertedId
                });

            } catch (error) {
                console.error("Blood request error:", error);

                res.status(500).json({
                    message: "Failed to submit blood request."
                });
            }
        });

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

startServer();