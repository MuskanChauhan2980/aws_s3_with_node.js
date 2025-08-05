const express = require("express");
const {
    generateUploadUrl,
    generateDownloadUrl,
    listFiles,
    deleteFile
} = require("../s3");
const router = express.Router();

router.get("/upload-url", async (req, res) => {
    const { fileName, contentType } = req.query;
    if (!fileName || !contentType) {
        return res.status(400).json({ error: "FileName and contentType required" })
    }

    try {
        const url = await generateUploadUrl(fileName, contentType);
        res.json({ url });
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.get("/download-url/:key", async (req, res) => {
    try {
        const url = await generateDownloadUrl(req.params.key);
        res.json({ url })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})


router.get("/list", async (req, res) => {
    try {
        const files = await listFiles();
        res.json({ files });
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete("/delete/:key", async (req, res) => {
    try {
        await deleteFile(req.params.key);
        res.json({ message: "File Deleted" })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router;