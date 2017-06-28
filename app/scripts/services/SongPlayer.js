(function() {
     function SongPlayer($rootScope, Fixtures) {
          /**
          * @desc Empty object that holds properties and methods of SongPlayer
          * @type {Object}
          */
          var SongPlayer = {};

          /**
          * @desc Object to store album information
          * @type {Object}
          */
          var currentAlbum = Fixtures.getAlbum();

          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;

          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
          var setSong = function(song) {
            if (currentBuzzObject) {
              currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
              $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
              });
            });

            SongPlayer.currentSong = song;
          };

          /**
          * @function playSong
          * @desc Starts playing song and updates playing property to true
          * @param {Object} song
          */
          var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
          };

          /**
          * @function stopSong
          * @desc Stops playing song and updates playing property to null
          * @param {Object} song
          */
          var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
          };

          /**
          * @function getSongIndex
          * @desc Gets index of a song from the current album
          * @param {Object} song
          */
          var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
          };

          /**
          * @desc Object to hold currently playing song
          * @type {Object}
          */
          SongPlayer.currentSong = null;

          /**
          * @desc Current playback time (in seconds) of currently playing song
          * @type {Number}
          */
          SongPlayer.currentTime = null;

          /**
          * @desc Current volume (scale of 0 - 100)
          * @type {Number}
          */
          SongPlayer.volume = 80;

          /**
          * @function SongPlayer.play
          * @desc Checks if current song is same as clicked song and changes music/buttons accordingly
          * @param {Object} song
          */
          SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
              setSong(song);
              playSong(song);
            } else if (SongPlayer.currentSong === song) {
              if (currentBuzzObject.isPaused()) {
                playSong(song);
              }
            }
          };

          /**
          * @function SongPlayer.pause
          * @desc Pauses currently playing song and updates playing property to false
          * @param {Object} song
          */
          SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            stopSong(song);
          };

          /**
          * @function SongPlayer.previous
          * @desc Changes to previous song by updating index based upon current song
          */
          SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
          };

          /**
          * @function SongPlayer.next
          * @desc Changes to next song by updating index based upon current song
          */
          SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
          };

          /**
          * @function setCurrentTime
          * @desc Set current time (in seconds) of currently playing song
          * @param {Number} time
          */
          SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
              currentBuzzObject.setTime(time);
            }
          };

          /**
          * @function setVolume
          * @desc Sets current volume based upon mouse click location
          * @param {Object} song
          */
          SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
              currentBuzzObject.setVolume(volume);
            }
          };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
