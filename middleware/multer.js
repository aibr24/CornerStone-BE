const multer = require("multer");

//Media
const storage = multer.diskStorage({
    destination: "./media",
    filename: (req, file, cb) => {
        cb(null, `${+new Date()}${file.originalname}`);
    },
});
const upload = multer({ storage, });

module.exports = upload;