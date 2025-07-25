// Multer configuration
// const storage = multer.memoryStorage(); // Store file content as Buffer
// const fileFilter = (req, file, cb) => {
//   console.log("File Mimetype:", file.mimetype);
//   // Filter file types, for example, allow only PDF files
//   if (file.mimetype === "application/pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type. Only PDF files are allowed."), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
// });

// export default upload;

import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
export default upload;
