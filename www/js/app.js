angular.module('starter', ['ionic', 'ionic-timepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('timeCtrl', function($scope){
  $scope.hour = new Date().getHours();
  $scope.minute = new Date().getMinutes();
  $scope.meridian = "AM";

  $scope.currentTime = function(){
    $scope.hour = new Date().getHours();
    $scope.minute = new Date().getMinutes();
    $scope.meridian = "AM";
  }

  $scope.timePickerObject = {
    inputEpochTime: ((new Date()).getHours() * 60 * 60),
    step: 1,
    format: 12,
    titleLabel: '12-hour Format',
    setLabel: 'Set',
    closeLabel: 'Close',
    setButtonType: 'button-positive',
    closeButtonType: 'button-assertive',
    callback: function (val) {
      timePickerCallback(val);
    }
  };

  function timePickerCallback(val) {
    if (typeof (val) === 'undefined') {
      console.log('Time not selected');
    } else {
      var selectedTime = new Date(val * 1000);
      if (val < 43200) {
        $scope.meridian = "AM";
      }else $scope.meridian = "PM"
      $scope.hour = selectedTime.getUTCHours();
      $scope.minute = selectedTime.getUTCMinutes();
      console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
    }
  }

})