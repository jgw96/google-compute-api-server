"use strict";

const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Authenticating on a global basis.
const projectId = "cloud-node-server"; // E.g. 'grape-spaceship-123'
const gcloud = require('gcloud')({
    projectId: projectId
});

const gce = gcloud.compute();
const zone = gce.zone('us-central1-a');

//test
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get("/getVMs", (req, res) => {
    gce.getVMs( (err, vms) => {
        // `vms` is an array of `VM` objects.
        if (err) {
            console.log(err);
        }
        else {
            console.log(vms);
            res.send(vms);
        }
    });
});

app.listen(8080, () => {
    console.log('Example app listening on port 8080!');
});
