'use strict';

chatApp.controller('mainCtrl', ['$scope', '$http', '$location', '$anchorScroll', function($scope, $http, $location, $anchorScroll) {

    // Hold the message.
    $scope.message = '';

    $scope.messages = [];

    $scope.getMessages = function() {
      $http.get('/api/messages').success(function(data) {

        $scope.messages = data;

        goToBottom('chatBody', 100);

      }).error(function(data) {
        console.log(data);
      });
    }

    $scope.getMessages();

    /**
     * Send a message to the server.
     *
     * @param message
     */
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
            $scope.messages.push(data);
            goToBottom('chatBody');
            clearMessage();
        }).error(function(data) {
            console.log("error");
            console.log(data);
        });

    };

    /**
     * Clear the message.
     */
    var clearMessage = function() {
        $scope.message = '';
    };

    /**
     * Go to the bottom of the chat.
     *
     * @param elmId
     * @param speed
     */
    var goToBottom = function(elmId, speed) {
        var elm = jQuery('#' + elmId);
        var scrollTo = parseInt(elm.prop('scrollHeight'));
        elm.animate({scrollTop: scrollTo}, angular.isDefined(speed) ? speed : 1000);
    }

}]);