const fetch = require("fetch");
const fs = require("fs");

const controlsList = JSON.parse(fs.readFileSync("./github-filefetcher/snippets.json", "utf-8"));

function getDowndloadURL(control, file){
    let path = '';
    if(!controlsList[control]){
        return false;
    }
    if(file == "docs"){
        path = controlsList[control].docs;
    }
    if(file == "example"){
        path = controlsList[control].example;

    }
    
    let promise = new Promise(function(resolve, reject){
            fetch.fetchUrl(`https://api.github.com/repos/pwa-builder/pwabuilder-snippits/contents/src/${path}?`, (error, meta, body) => {
                if(error){
                    console.log(error);
                    process.exit();
                }
                const file_metadata = JSON.parse(body.toString());
                resolve( file_metadata.download_url);
            })
        }).then((res) => {
            return res;
        }) 
   
    return promise;

}

module.exports = getDowndloadURL;