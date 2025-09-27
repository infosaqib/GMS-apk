
const multer = require("multer");
const path = require("path");

const allowedImageExt = [".png", ".jpg", ".jpeg", ".webp"];
const allowedDocExt = [".pdf", ".doc", ".docx", ".txt"];

const storage = multer.memoryStorage();

const fileFilter = (allowedExt) => (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExt.includes(ext)) {
    return cb(new Error(`Only ${allowedExt.join(", ")} files are allowed`), false);
  }
  cb(null, true);
};
const uploadImage = (req, res, next) => {
  multer({
    storage,
    fileFilter: fileFilter(allowedImageExt),
  }).single("image")(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

const uploadDoc = (req, res, next) => {
  const upload = multer({
    storage,
    fileFilter: fileFilter(allowedDocExt),
    limits: { files: 10 }
  }).array("doc", 10);

  upload(req, res, function (err) {
    if (err) {
      if (err.code === "LIMIT_FILE_COUNT" || err.code === "LIMIT_UNEXPECTED_FILE") {
        return res
          .status(400)
          .json({ error: "File limit exceeded. Max 10 files allowed." });
      }
      return res.status(400).json({ error: err.message });
    }

    next();
  });
};


module.exports = { uploadImage, uploadDoc };
