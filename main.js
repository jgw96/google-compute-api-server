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

//get all vms
app.get("/getVMs", (req, res) => {
    gce.getVMs((err, vms) => {
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

//stop a vm
app.post("/stop", (req, res) => {
    const vm = zone.vm(req.body.name);

    vm.stop((err, operation, apiResponse) => {
        // `operation` is an Operation object that can be used to check the status
        // of the request.
        if (err) {
            console.log(err);
        }
        else {
            console.log(operation);
            res.send("VM stopped");
        }
    });
});

//start a vm
app.post("/start", (req, res) => {
    const vm = zone.vm(req.body.name);

    vm.start((err, operation, apiResponse) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(operation);
            res.send("VM started");
        }
    });
});

//create a vm
app.post("/make", (req, res) => {
    const config = {
        os: req.body.os,
        http: req.body.http,
        https: req.body.https
    };
    
    zone.creatVM(req.body.name, config, (err, vm, operation, apiResponse) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(vm);
            res.send(vm);
        }
    });
});

app.listen(8080, () => {
    console.log('Example app listening on port 8080!');
});
