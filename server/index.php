<?php
require_once './vendor/autoload.php';
ini_set('memory_limit', '-1');
use \GetId3\GetId3Core as GetId3;
use \GetId3\Write\Tags as Tags;
// Now let's make a request!
if (isset($_POST['song']))
{

    $URL= "";
    try
    {

        $json = $_POST['song'];
        $song = json_decode($json, true);
        $option = array ('timeout'=>999999999);
        if (true)
        {
            $album = $song['channel'];
        }
        $URL = $song['url'];
        echo $URL;
        $request = Requests::get($song['url'], array(),$option);

        //create folder for the channel
        create_dir($song['channel']);
        chdir($song['channel']);
        $filename = $song['song_name'].".mp3";
        if (file_exists($filename))
        {
            chdir("..");
            return;
        }
        file_put_contents($filename, $request->body);
        $getID3 = new getID3;
        $TagData = array(
            'title'   => array($song['song_name']),
            'artist'  => array($song['artist_name']),
            'album'   => array($album),
            'genre'   => array($song['channel'])
        );
        writeTag($filename, $TagData);
        $ThisFileInfo = $getID3->analyze($filename);
        echo $ThisFileInfo['tags']['id3v2']['title'][0];
        chdir("..");
        echo "done";
    }
    catch (Exception $e)
    {
        error_log( "ERROR: ".$e->getMessage()." ".$URL);
    }
}
else {
    echo "POST is not set";
}

function writeTag($file, $TagData){
    $TaggingFormat = 'UTF-8';
    $getID3 = new getID3;
    $getID3->setOption(array('encoding'=>$TaggingFormat));
    // Initialize getID3 tag-writing module
    $tagwriter = new Tags();
    $tagwriter->filename       = $file;
    $tagwriter->tagformats = array('id3v2.3');
    // set various options (optional)
    $tagwriter->overwrite_tags = true;
    $tagwriter->tag_encoding   = $TaggingFormat;
    $tagwriter->tag_data = $TagData;

    // write tags
    if ($tagwriter->WriteTags()) {
        echo 'Successfully wrote tags<br>';
        if (!empty($tagwriter->warnings)) {
            echo 'There were some warnings:<br>'.implode('<br><br>', $tagwriter->warnings);
        }
    } else {
        echo 'Failed to write tags!<br>'.implode('<br><br>', $tagwriter->errors);
    }

}
function create_dir($dir)
{
    if (!file_exists($dir))
        return mkdir($dir, 0777, true);
    return true;
}