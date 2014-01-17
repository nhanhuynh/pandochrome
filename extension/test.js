navigator.webkitPersistentStorage.requestQuota (1024*1024*1024, function(grantedBytes) {
    console.log ('requestQuota: ', arguments);
    requestFS(grantedBytes);
}, errorHandler);
function requestFS(grantedBytes) {
    window.webkitRequestFileSystem(window.PERSISTENT, grantedBytes, function(fs) {
        fs.root.getFile('log.txt', {create: true}, function(fileEntry) {
            fileEntry.file(function(file) {
                var reader = new FileReader();

                reader.onloadend = function(e) {
                    console.log(this.result);
                };

                reader.readAsText(file);
            }, errorHandler);


        // Create a FileWriter object for our FileEntry (log.txt).
//            fileEntry.createWriter(function(fileWriter) {
//
//                fileWriter.onwriteend = function(e) {
//                    console.log('Write completed.');
//                };
//
//                fileWriter.onerror = function(e) {
//                    console.log('Write failed: ' + e.toString());
//                };
//
//                // Create a new Blob and write it to log.txt.
//                var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
//
//                fileWriter.write(blob);
//
//            }, errorHandler);

        }, errorHandler);
    }, errorHandler);
}
function initFS(grantedBytes) {
        window.requestFileSystem(webkitStorageInfo.PERSISTENT, grantedBytes, onInitFs,
            errorHandler);
    };
function onInitFs(fs)
{
    fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
            console.log(fileEntry.name);
//        // fileEntry.isFile === true
//        // fileEntry.name == 'log.txt'
//        // fileEntry.fullPath == '/log.txt'
//
        }, errorHandler);
}

function errorHandler(e) {
    var msg = '';

    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
        case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
        default:
            msg = 'Unknown Error';
            break;
    };

    console.log('Error: ' + msg);
};
//$.ajax({
//    url: "http://localhost/t.txt",
////    url: "http://localhost/t.mp3",
//    context: document.body
//}).done(function( data) {
//        console.log(data.length);
//    });
