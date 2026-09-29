const express = require("express");
const router =express.Router();
const { z } = require("zod");

const notes = require("../data/notes");

const noteSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.string().min(5, "Content must be at least 5 characters")
});
const updateNoteSchema = noteSchema.partial();

router.get("/", (req, res) => {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;

    const paginatedNotes = notes.slice(
        offset,
        offset + limit
    );

    res.json({
        success: true,
        limit: limit,
        offset: offset,
        total: notes.length,
        data: paginatedNotes
    });
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    const note = notes.find(note => note.id === id);

    if (!note) {
        return res.status(404).json({
            success: false,
            message: "Note not found"
        });
    }

    res.status(200).json({
        success: true,
        data: note
    });
});


router.post("/", (req, res) => {
    const result = noteSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: result.error.issues
        });
    }

    const newNote = {
        id: notes.length + 1,
        title: result.data.title,
        content: result.data.content
    };

    notes.push(newNote);

    res.status(201).json({
        success: true,
        data: newNote
    });
});

router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);

    const note = notes.find(note => note.id === id);

    if (!note) {
        return res.status(404).json({
            success: false,
            message: "Note not found"
        });
    }

    const result = updateNoteSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: result.error.issues
        });
    }

    if (result.data.title !== undefined) {
        note.title = result.data.title;
    }

    if (result.data.content !== undefined) {
        note.content = result.data.content;
    }

    res.status(200).json({
        success: true,
        data: note
    });
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Note not found"
        });
    }

    notes.splice(noteIndex, 1);

    res.status(204).send();
});

module.exports=router;