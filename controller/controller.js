
exports.home = (req, res) => {
    res.render("main")
}

exports.uploads = (req, res, next) => {
    const files = req.files;

    if(!files){
        const err = new Error("Please choose files")
        err.httpStatusCode = 400;
        return next(err)
    }

    res.json(files)
}

module.exports = controller