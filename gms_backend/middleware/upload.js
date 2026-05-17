import multer from 'multer';
import path from 'path';
import fs from 'fs';

// ─── Make sure uploads folder exists ─────────────────────────────────────────
const uploadDir = 'uploads/profile_pictures';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ─── Storage config ───────────────────────────────────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // e.g. user_12_1716000000000.jpg  or  trainer_5_1716000000000.png
        const role  = req.body.role || 'user';
        const id    = req.params.id || Date.now();
        const ext   = path.extname(file.originalname).toLowerCase();
        cb(null, `${role}_${id}_${Date.now()}${ext}`);
    }
});

// ─── File type validation ─────────────────────────────────────────────────────
const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const isValid = allowed.test(path.extname(file.originalname).toLowerCase())
                 && allowed.test(file.mimetype);
    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpg, png, webp)'));
    }
};

// ─── Export configured multer instance ───────────────────────────────────────
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }  // 2MB max
});

export default upload;