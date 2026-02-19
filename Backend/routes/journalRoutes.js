import express from 'express';
import journals from '../models/journal.js';
import TokenAuth from '../middlewares/checkTokens.js'

const router = express.Router();


router.post('/journal', TokenAuth, async (req, res) => {
    const { title, desc, content } = req.body;
    const { id } = req.user;
    console.log(id, 'req.user.id');

    try {

        const existJournal = await journals.findOne({ title: title });

        if (existJournal) {
            return res.status(400).json({ msg: 'This journal already exists', success: false })
        }

        const newJournal = await journals.create({
            title,
            desc,
            content,
            userId: req.user._id,
        });

        return res.status(201).json({ msg: 'journal successfully created', success: true, newJournal })

    }
    catch (error) {
        res.status(500).json(error.message)
    }
});




//for rendering journals on dashboard...
router.get('/getjournals', TokenAuth, async (req, res) => {
    try {

        const allJournals = await journals.find({
            userId: req.user._id,
        }).sort({ createdAt: -1 })

        console.log(allJournals, "Fetched Journals");

        if (!allJournals) {
            return res.status(400).json({ msg: 'This user did not created any journal' })
        }


        return res.status(200).json({ msg: 'Found All Journals', success: true, allJournals });


    }
    catch (error) {
        res.status(500).json(error.message)
    }
});



//for updating journal...
router.put('/journal/:id', TokenAuth, async (req, res) => {
    try {
        await journals.findOneAndUpdate({
            _id: req.params.id,   //journal id
            userId: req.user._id  //related user id
        },
            req.body
        )

        res.status(200).json({ msg: "journal updated successfully", success: true })
    }
    catch (error) {
        res.status(500).json(error.message, { msg: 'journal update failed' });
    }
});


//for Deleting journal...
router.delete('/journal/:id', TokenAuth, async (req, res) => {
    try {
        await journals.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        },
            req.body
        )

        res.status(200).json({ msg: "journal deleted successfully", success: true })
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});

export default router