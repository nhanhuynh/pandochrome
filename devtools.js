chrome.devtools.network.getHAR(function(result) {
    var entries = result.entries;
    console.log(entries);
});