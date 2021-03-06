const path = require('path')
const getMime = require('./mime-processor')
const handler = require('./handler');
const fs = require('fs');
const router = {
    '': handler.defaultPage
};

router.handleFiles = (reqPayload, res)=>{
    const file = path.resolve(__dirname, '../', 'public', reqPayload.reqPath);
    fs.stat(file, (err, stats)=>{
        if(!err && stats.isFile) {
            const mimeType = getMime(reqPayload.reqPath);
            try {
            const fsReadStream = fs.createReadStream(path.resolve(__dirname, '../', 'public', reqPayload.reqPath));
                res.writeHead(200, {'Content-Type': mimeType})
                
                fsReadStream.pipe(res);
            }catch(error){
                console.log(error);
            }
        }else {
            res.writeHead(404)
            res.end(JSON.stringify({error: `Could not find the path or file '${reqPayload.reqPath}'`}));
        }
    })
}


module.exports = router;