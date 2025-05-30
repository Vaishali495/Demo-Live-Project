const multer = require("multer");
const path = require("path");
//multer used for profile image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // Save to the 'uploads' folder
    },
    filename: async function (req, file, cb) {
        const img = await file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, img); // Define the file name
    }
});

const upload = multer({ storage: storage });
module.exports = upload;