const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

const publicPath = path.join(__dirname, "public");

// Don't let browsers cache the main HTML or JavaScript files
app.use((req, res, next) => {
    if (
        req.path === "/" ||
        req.path.endsWith(".html") ||
        req.path.endsWith(".js") ||
        req.path.endsWith(".css")
    ) {
        res.setHeader(
            "Cache-Control",
            "no-cache, no-store, must-revalidate"
        );
    }

    next();
});

app.use(express.static(publicPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, () => {
    console.log(`VOID running on port ${PORT}`);
});
