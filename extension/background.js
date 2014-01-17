document.addEventListener('DOMContentLoaded', function () {
    alert("hello1");
});

function interceptRequest(request) {
    url  = request.url;
    if (url.indexOf("access")!= -1 && url.indexOf("pandora")!= -1 )
    {
        chrome.tabs.query({}, function(tabs) {
            var message =  {greeting: "getinfo"};
            for (var i=0; i<tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, message,function (response)
                {
                    if ( typeof response == 'undefined')
                        return ;
                    song = response.song;
                    song.url = request.url;
                    var json = JSON.stringify(song);

                    request = makeHttpObject();
                    var url = "http://localhost/pandochrome/server/index.php";
                    request.open("POST",url, true);
                    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                    request.send('song='+encodeURIComponent(json));

                    request.onreadystatechange = function() {
                        if (request.readyState == 4)
                            console.log(request.responseText);
                    };
                });
            }
        });
//        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//            chrome.tabs.sendMessage(tabs[0].id, {greeting: "getinfo"}, function(response) {
//                console.log(response);
//                song = response.song;
//                song.url = request.url;
//                var json = JSON.stringify(song);
//
//                request = makeHttpObject();
//                var url = "http://localhost/pandochrome/server/index.php";
////                console.log(url+"?song="+json);
//                request.open("POST",url, true);
//                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
//                request.send('song='+encodeURIComponent(json));
//
//                request.onreadystatechange = function() {
//                    if (request.readyState == 4)
//                        console.log(request.responseText);
//                };
//            });
//        });
    }
}

chrome.webRequest.onCompleted.addListener(
    interceptRequest,
    { urls: [ '*://*.pandora.com/*' ] }
);
function makeHttpObject() {
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");}
    catch (error) {}

    throw new Error("Could not create HTTP request object.");
}