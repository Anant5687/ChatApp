const User = require('../modals/UserSchema')
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt')

cloudinary.config({
    cloud_name: 'dbdtk77uc',
    api_key: "863992813938763",
    api_secret: 'CN6B_iWE_BXmRbeAX7tAXMJVFYc',
    secure: true
});


const signup = async (req, res) => {
    const imageFile = req.files.file.path
    try {
        cloudinary.uploader.upload(imageFile, async function (error, result) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            if (error) {
                console.log(error)
            } else {

                const preUser = await User.findOne({ email: req.body.email })
                if (preUser) { res.status(404).json({ message: "User already registered" }) }
                else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPassword,
                        file: result.url
                    })
                    await newUser.save()
                    res.status(200).json(newUser)
                }

            }
        });

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = {
    signup
}