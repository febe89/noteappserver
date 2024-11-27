import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import middleware from '../middleware/middleware.js'
const router = express.Router()

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      return res.status(404).json({ success: false, message: 'user exist' })
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new User({ name, email, password: hashPassword })
    await newUser.save()
    res.status(200).json({ success: true, message: 'user created', newUser })
  } catch (e) {
    console.log(e.message)
  }
})
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ success: false, message: 'wrong email' })
    }
    const checkpassword = await bcrypt.compare(password, user.password)
    if (!checkpassword) {
      return res.status(404).json({ success: false, message: 'wrong password' })
    }

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '5h' })

    res.status(200).json({ success: true, message: 'Login Successfully', token, user: { name: user.name } })
  } catch (e) {
    console.log(e.message)
  }
})

router.get('/users', async (req, res) => {
  const users = await User.find({})
  res.status(200).json({
    success: true,
    users
  })
})
router.get('/verify', middleware, async (req, res) => {
  return res.status(200).json({ success: true, user: req.user })
})
export default router
