//controllers/main.js

  chatApp.controller('mainCtrl', ['$scope', '$http', '$timeout', 'Socket', function($scope, $http, $timeout, Socket) {

    // Hold the users messages.
    $scope.messages = [];

    // Hold the message.
    $scope.message = '';

    $scope.cleanMessage = function() {
      $scope.message = '';
    }

    $scope.getMessages = function() {
      $http.get('/api/messages').success(function(data) {

        $scope.messages = data;

        goToBottom('chatBody', 100);

      }).error(function(data) {
        console.log(data);
      });
    }

    $scope.getMessages();

    $scope.sendMessage = function(message) {
      var data = {
        message: message
      };

      $http({
        method: 'POST',
        url: 'api/message',
        data: jQuery.param(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
        serverPredefined: true
      }).success(function(data){

        $scope.cleanMessage();

      }).error(function(data) {

        console.log("error");
        console.log(data);

      });

    }

    var goToBottom = function(elmId, speed) {
        $timeout(function() {
        var elm = jQuery('#' + elmId);
        var scrollTo = parseInt(elm.prop('scrollHeight'));
        elm.animate({scrollTop: scrollTo}, angular.isDefined(speed) ? speed : 1000);
      }, 100);

    }

    // Listen to the socket with the event "chat-message".
    Socket.on('chat-message', function (socket) {
      if (socket.message) {
        $scope.messages.push(socket.message);
        goToBottom('chatBody');
      }
    });


  }]);