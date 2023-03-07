const express = require('express');
const chalk = require('chalk');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

const static_path = path.join(__dirname, './web/public');
app.use(express.static(static_path));

app.listen(port);
console.log(chalk.green('[SERVER] - server is online.'));

require('module-alias/register');
require('./bot/bot');
require('./bot/database/mongo');
