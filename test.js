
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
window.requestFileSystem(PERSISTENT, 50*1024*1024, initFS, errorHandler);

function initFS(fs){
    console.log("called");
    fs.root.getDirectory('nhandir', {create: true}, function(dirEntry) {
        //alert('You have just created the ' + dirEntry.name + ' directory.');
    }, errorHandler);
    window.webkitStorageInfo.queryUsageAndQuota(webkitStorageInfo.PERSISTENT, //the type can be either TEMPORARY or PERSISTENT
        function(used, remaining) {
            console.log("Used quota: " + used + ", remaining quota: " + remaining);
        }, function(e) {
            console.log('Error', e);
        } );
    // place the functions you will learn bellow here
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
}
//$.ajax({
//    url: "http://localhost/t.txt",
////    url: "http://localhost/t.mp3",
//    context: document.body
//}).done(function( data) {
//        console.log(data.length);
//    });
