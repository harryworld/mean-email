angular.module('emailApp', [])
  .controller('EmailController', ['$scope', '$http', function($scope, $http) {

    $scope.submitForm = function() {

      if ($scope.emailText == '' || $scope.emailText == undefined) {
        return;
      }

      $http.post('/emails/send', {email: $scope.emailText})
        .success(function(data, status) {
          $('.status').html('Email Sent to ' + $scope.emailText);
        })
        .error(function(data, status) {
          $('.status').html('Fail to send');
        });

    }

  }]);