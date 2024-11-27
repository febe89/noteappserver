import express from 'express'
import Note from '../models/Note.js'
import middleware from '../middleware/middleware.js'
const router = express.Router()

router.post('/add', middleware, async (req, res) => {
  const { title, description } = req.body
  try {
    const newNote = new Note({
      title,
      description,
      userId: req.user.id
    })
    await newNote.save()

    res.status(200).json({ success: true, message: 'Note created', newNote })
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ success: true, message: 'Error in adding Note ' })
  }
})
router.get('/', middleware, async (req, res) => {
  try {
    const notes = await Note.find({userId:req.user.id})
    return res.status(200).json({ success: true, notes })
  } catch (e) {
    res.status(500).json({ success: false, message: 'note not found' })
  }
})
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateNote = await Note.findByIdAndUpdate(id, req.body)
    return res.status(200).json({ success: true, updateNote })
  } catch (e) {
    res.status(500).json({ success: false, message: 'cant update note' })
  }
})
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateNote = await Note.findByIdAndDelete(id)
    return res.status(200).json({ success: true })
  } catch (e) {
    res.status(500).json({ success: false, message: 'cant update note' })
  }
})
export default router
