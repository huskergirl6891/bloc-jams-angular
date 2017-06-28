(function() {
     function SongPlayer(Fixtures) {
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
            currentBuzzObject.pause();
            song.playing = false;
          };

          /**
          * @function SongPlayer.previous
          * @desc Changes to previous song by updating index based upon current song
          */
          SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
          };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
