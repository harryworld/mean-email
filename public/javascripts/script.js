angular.module('emailApp', [])
  .controller('EmailController', ['$scope', '$http', function($scope, $http) {

    $scope.submitForm = function() {

      if ($scope.emailText == '' || $scope.emailText == undefined) {
        return;
      }

      $http.post('/emails/send', {email: $scope.emailText})
        .success(function(data, status) {
          var email = $scope.emailText;
          $('.status').html('Email Sent to ' + email);
          $scope.emailText = '';
        })
        .error(function(data, status) {
          $('.status').html('Fail to send');
        });

    }

  }]);