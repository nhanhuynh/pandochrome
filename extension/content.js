/**
 *
 * Created by zac on 12/15/13.
 */
console.log("start");
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "getinfo")
        {
            song = {};
            song.song_name=document.getElementsByClassName("songTitle")[0].innerText
            song.artist_name=document.getElementsByClassName("artistSummary")[0].innerText
            song.album_name=document.getElementsByClassName("albumTitle")[0].innerText
            song.channel= document.getElementsByClassName("textWithArrow").item(0).innerText.replace("\n", "");

            console.log(JSON.stringify(song));
            sendResponse({song:song});
//            sendResponse({song:song_name,artist:artist_name,album:album_name,farewell: "Nhan"});
        }

    });
