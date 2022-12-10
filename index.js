const express = require('express');
const config = require('./config');
const _ = require('lodash');
const dirStruct = require('./dirStruct');
var cors = require('cors');

var app = express();
app.use(cors({origin: `http://${config.app.host}:3000`}));

app.get('/path/*', function (req, res) {
    let content = _.cloneDeep(dirStruct) ;
    let mypath = req.params[0] !== ''  ? req.params[0].split('/') : [];
    while(mypath.length > 0){
            content = content.children[mypath[0]]
            if(!content ){
                res.status(500).json({"error":"Index not found"})
                return;
            }
            mypath.shift();

    }
   
    if(content && content.children ){
        let childrenArr = []
        for (const key in content.children) {
            const element = content.children[key];
            childrenArr.push({"name" : key , "type" : element.type})
        }
        content.children = childrenArr;
    }
    res.json(content)
});


app.listen(config.app.port, config.app.host, () => {
    console.log("App running at http://" + config.app.host + ":" + config.app.port + "/");
});


