const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use("/hls", express.static(path.join(__dirname, "hls")));

// ✅ Convert remote URL -> unique M3U8 output
app.get("/convert", (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).send("❌ Please provide ?url=");

  // Generate unique ID
  const id = crypto.randomBytes(6).toString("hex");
  const outputDir = path.join(__dirname, "hls", id);
  fs.mkdirSync(outputDir, { recursive: true });

  const outputM3U8 = path.join(outputDir, "index.m3u8");

  const cmd = `ffmpeg -i "${videoUrl}" -profile:v baseline -level 3.0 -start_number 0                -hls_time 10 -hls_list_size 0 -f hls "${outputM3U8}"`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).send("❌ Conversion failed");
    }
    res.send({
      message: "✅ Converted!",
      m3u8_url: `/hls/${id}/index.m3u8`
    });
  });
});

// ✅ Upload MP4 file -> convert to unique M3U8
const upload = multer({ dest: "uploads/" });
app.post("/upload", upload.single("video"), (req, res) => {
  const inputFile = req.file.path;

  const id = crypto.randomBytes(6).toString("hex");
  const outputDir = path.join(__dirname, "hls", id);
  fs.mkdirSync(outputDir, { recursive: true });

  const outputM3U8 = path.join(outputDir, "index.m3u8");

  const cmd = `ffmpeg -i "${inputFile}" -profile:v baseline -level 3.0 -start_number 0                -hls_time 10 -hls_list_size 0 -f hls "${outputM3U8}"`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).send("❌ Conversion failed");
    }
    res.send({
      message: "✅ Converted from upload!",
      m3u8_url: `/hls/${id}/index.m3u8`
    });
  });
});

// ✅ Simple HTML UI
app.get("/", (req, res) => {
  res.send(`
    <h2>Convert Video to M3U8</h2>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="video" accept="video/*" />
      <button type="submit">Upload & Convert</button>
    </form>
    <br>
    <form action="/convert" method="get">
      <input type="text" name="url" placeholder="Enter video URL (MP4/MKV)" size="50"/>
      <button type="submit">Convert from URL</button>
    </form>
  `);
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log("Server running on port " + port));
