const rout = require('express').Router();
const uploadSchema = require('../schema/schema')
const fs = require('fs')
const store = require('../middleware/multer')
const mongoose = require("mongoose")

const UploadModel = mongoose.model("myDB", uploadSchema)

rout.get("/", async (req, res) => {
    const all_images = await UploadModel.find()
    res.render("main", {images: all_images})
})

const uploads = (req, res, next) => {
    const files = req.files;

    if(!files){
        const err = new Error("Please choose files")
        err.httpStatusCode = 400;
        return next(err)
    }

    let imageArray = files.map((file) => {
        let img = fs.readFileSync(file.path)

        return encode_image = img.toString('base64')
    })

    let result = imageArray.map((src, index) => {
        let finalImg = {
            filename: files[index].originalname,
            contentType: files[index].mimetype,
            imageBase64: src
        }

        let newUpload = new UploadModel(finalImg)
    
        return newUpload
        .save()
        .then(() => {
            return {msg: `${files[index].originalname} Uploaded Successfully...!`}
        })
        .catch(err => {
            if(err.name == 'MongoError' &&  error.code == 11000){
                return Promise.reject({err: `Duplicate ${files[index].originalname}.File`})
            }
            return Promise.reject({err: err.message || `Cant Upload${files[index].originalname}.File`})
        })
    });

    Promise.all(result)
    .then(msg => {
        res.redirect("/")
    })
    .catch(err => {
        res.json(err)
    })
}
rout.post("/uploadmultiple", store.array('myFile'), uploads)
module.exports = rout 