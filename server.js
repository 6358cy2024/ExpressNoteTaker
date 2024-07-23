const express = require('express');
const path = require('path');
const view_routes = require('./routes/view_routes');
const api_routes = require('./routes/api_routes');
const app = express();






//just node server.js
app.listen(6358, () => {//gets server started
    console.log('Server started');
});