const express = require("express")
const router = express.Router();
const Note = require("../models/Notes")
const fetchuser = require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all the notes     
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
  
})

//ROUTE 2: Add a new notes     
router.post("/addnote", fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 5 }),
    body("description", "Description must be atleast 5 charcters").isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured") 
    }
})

//ROUTE 3: Update an existing notes
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //Creating a new note object
        const newNote = {}
        if(title){
            newNote.title = title
        }
        if(description){
            newNote.description = description
        }
        if(tag){
            newNote.tag = tag
        }
        //Find the note to be updated and update it
        let  note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not found")
        }
        if(note.user.toString()!== req.user.id){
            return res.status(404).send("Not found")
        }
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true})
        res.json({note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured") 
    }
})

//ROUTE 4: Delete an existing note 
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        
        //Find the note to be deleted and delete it
        let  note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not found")
        }

        //Allow deletion only if user owns this note.
        if(note.user.toString()!== req.user.id){
            return res.status(404).send("Not found")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted."})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured") 
    }
})

module.exports = router;