const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res)=>{
    const fragments = db.prepare("SELECT * FROM fragments ORDER BY created_at DESC").all()
    res.json(fragments)
});

router.post("/", (req, res)=>{
    const { text } = req.body;
    if(!text){
        return res.status(400).json({
            error: "Text is required"
        })
    }
    const result = db.prepare(
        "INSERT INTO fragments (text) VALUES (?)"
    ).run(text);
    res.json({
        id: result.lastInsertRowid,
        text
    })
})

module.exports = router