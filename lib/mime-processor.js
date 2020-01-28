const getFileExtension = require('./get-extension');
const mimeProcessor = (requestPath)=>{
    const extension = getFileExtension(requestPath);
    switch(extension) {
        case 'js': 
            return 'text/javascript';
        case 'ico':
            return 'image/x-icon';
        case 'png':
            return 'image/png';
        case 'jpeg':
        case 'jpg':
            return 'image/jpeg';
        case 'html':
            return 'text/html';
        case 'txt':
            return 'text/plain';
        case 'css':
            return 'text/css';
        case 'json': 
            return 'text/json';
        default:
            return 'text/plain'
    };
};


module.exports = mimeProcessor;