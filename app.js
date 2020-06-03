
const http = require('http');
var fs = require('fs');
var url = require('url');
var events = require('events');
var eventEmitter = new events.EventEmitter();

const hostname = '127.0.0.1';
const port = 3001;

// show HTML file if page is able to load without errors
fs.readFile('./index.html', function (err, html) {
    if (err) {
        res.writeHead(404);
        res.write('The content you are looking for could not be found.');
        res.end();
    }
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();
    }).listen(port);
});
console.log('Server started listening on port 3001.');

// create Youtube iFrame player to display on HTML page
var player;
var currVideoId = 'bCgLa25fDHM';
var numRandVideosInRow = 0;
var randomVideoIds = []

// Callback for when the YouTube iFrame player is ready
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    // Set Player height and width
    height: '720',
    width: '1280',
    // Set the id of the video to be played
    videoId: 'bCgLa25fDHM',
    // Setup event handlers
    events: {
      'onReady': onPlayerReady,
      'onError': onError,
    //   'onStateChange': onPlayerStateChange,
    }
  });
};

// Event Handlers 
function onPlayerReady(event) {
    // Update page after player is ready
    var embedCode = event.target.getVideoEmbedCode();
    var embedId = embedCode.slice(69,80);
    event.target.playVideo();
    setNextTimeout(embedId);
}
function onError(error){
    // Update errors on page
    console.log("Error!");
}

// Functions to invoke user requested action through the iFrame API
function loadNewVideo(videoId){
    // load new video
    player.loadVideoById(videoId);
    currVideoId = videoId;
};
function playVideo(){
    player.playVideo();
};
function setNextTimeout(embedId) {
    if(embedId == 'bCgLa25fDHM')
    {
        // playing main video. Set longer timeout and then play unrelated video  (currently placeholder amount of time)
        var currTimeout = setTimeout(loadNewVideo, 6000, '9hvmPJByJy4');
        numRandVideosInRow++;
    }
    else
    {
        // playing random video. Set shorter timeout and then play main video  (currently placeholder amount of time)
        // currently just a static video to make sure embedId is accurate
        var currTimeout = setTimeout(loadNewVideo, 6000, '-egbs4284gU');
        numRandVideosInRow++;
    }
}

