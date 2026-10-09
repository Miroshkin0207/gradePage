const db = require("./dbScript.js");
const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "*",
    methods: "POST, OPTIONS"
}
app.use(cors(corsOptions));

app.get("/api//getGrades", async (req, res) => 
{
    const countGrades = await db.execute(`SELECT * FROM grades;`);
    res.status(200).send(countGrades.rows[0].count);
});

app.post("/api/newGrade", async (req, res) => 
{
    await db.execute(`UPDATE grades SET count = count + 1;`);
    res.status(200).send();
});