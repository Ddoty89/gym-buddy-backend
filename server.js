const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');



app.get('/api/*', (req, res) => {
res.json({ok: true});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app};