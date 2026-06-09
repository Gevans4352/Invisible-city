const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res)=>{
    const buildings = db.prepare("SELECT * FROM buildings ORDER BY created_at DESC").all()
    res.json(buildings)
});

router.post("/", (req, res)=>{
    const { name, object, fragment, vibe } = req.body;
    if(!name || !object || !fragment || !vibe){
        return res.status(400).json({
            error: "All fields required"
        })
    }
    const result = db.prepare(
        "INSERT INTO buildings (name, vibe, object, fragment) VALUES (?, ?, ?, ?)"
    ).run(name, vibe, object, fragment);
    res.json({
        id: result.lastInsertRowid,
        name,
        vibe,
        object,
        fragment
    })
})

module.exports = router