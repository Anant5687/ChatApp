const User = require('../modals/UserSchema')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    const { email } = req.body;
    const password = String(req.body.password)

    try {
        const savedUser = await User.findOne({ email: email })
        if (savedUser) {

            const comparedPassword = await bcrypt.compare(password, savedUser.password) //For comparing hashed password

            if (comparedPassword) {
                const { password, ...others } = savedUser._doc
                res.status(201).json({ message: "Success full login", savedUser: { ...others } })
            }
            else {
                res.status(404).json({ message: "Password didn't match" })
            }
        }
        else {
            res.status(404).json("This user is not registered")
        }

    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getLoginData = async (req, res) => {
    try {
        // const { id } = req.params
        const getIndividualData = await User.find({})
        res.status(200).json(getIndividualData)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getLoginDataByQuery = async(req, res) => {
    const userId = req.query.userId
    const username = req.query.username
    try {
        const user = await User.findById(userId)
            // : await User.findOne({ name: username })

        const { password,  ...others } = user._doc
        res.status(200).json( others )
    } catch (error) {
        res.status(404).json(error)
    }
}
module.exports = {
    login,
    getLoginData,
    getLoginDataByQuery
}