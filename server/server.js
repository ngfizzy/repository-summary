import express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDomServer from 'react-dom/server';

import App from '../src/App';

const app = express();

app.use('^/$', (req, res, next) => {
    fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Something Went Wrong')
        }

        return res.send(data.replace(data.replace(
            '<div id="root"></div>',
            `<div id="root">${ReactDomServer.renderToString(<App />)}</div>`
            )
         ));
    })
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(8080, () => console.log('App Running on Port 8080')); 