import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const middleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' })
    }
    const decoded = jwt.verify(token, 'secretkey')
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Unauthorized wrong token' })
    }
    const user = await User.findById({ _id: decoded.id })
    if (!user) {
      return res.status(401).json({ success: false, message: 'no user' })
    }
    const newUser = { name: user.name, id: user._id }
    req.user = newUser
    next()
  } catch (e) {
    return res.status(500).json({ success: false, error: e.message, message: 'please login' })
  }
}
export default middleware
