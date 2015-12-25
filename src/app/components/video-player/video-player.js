(function() {
  'use strict';

  angular
    .module('videoPlayer', [
      'com.2fdevs.videogular',
      'com.2fdevs.videogular.plugins.buffering',
      'com.2fdevs.videogular.plugins.controls',
      'com.2fdevs.videogular.plugins.poster',
    ])
    .directive('videoPlayer', ['CONFIG',
      function(CONFIG) {
        return {
          restrict: 'E',
          scope: {
            video: '@',
            subtitles: '@',
            poster: '@'
          },
          templateUrl: 'app/components/video-player/video-player.html',
          link: function(scope) {
            scope.config = {
              'controls': false,
              'loop': false,
              'autoplay': false,
              'preload': 'auto',
              'theme': 'bower_components/videogular-themes-default/videogular.css',
              'sources': [{
                'src': CONFIG.config.cdnUrl + '/videos/' + scope.video + '.mp4',
                'type': 'video/mp4'
              }, {
                'src': CONFIG.config.cdnUrl + '/videos/' + scope.video + '.webm',
                'type': 'video/webm'
              }, {
                'src': CONFIG.config.cdnUrl + '/videos/' + scope.video + '.ogg',
                'type': 'video/ogg'
              }],
              'tracks': [{
                'src': scope.subtitles,
                'kind': 'subtitles',
                'srclang': 'en',
                'label': 'English',
                'default': ''
              }],
              'plugins': {
                'controls': {
                  'autohide': true,
                  'autohideTime': 3000
                },
                'poster': {
                  'url': scope.poster
                }
              }
            };
          }
        };
      }
    ]);
})();
