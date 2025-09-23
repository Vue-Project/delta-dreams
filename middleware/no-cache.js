// middleware/no-cache.js
export default function (req, res, next) {
    // Set headers to prevent caching
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Last-Modified', new Date().toUTCString());

    // Add ETag with timestamp to force reload
    res.setHeader('ETag', `"${Date.now()}"`);

    next();
}
