const mongoose = require('mongoose')

const Db = process.env.MONGOOSE_URL

mongoose.connect(Db).then(() => console.log("Db is connected")).catch((err) => console.log(err))