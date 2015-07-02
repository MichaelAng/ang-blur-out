(function() {
angular.module('ang.blurOut', [])
.directive('angBlurOut', angBlurOut);

/* @ngInject */
function angBlurOut($timeout) {
  return {
    link: link,
    restrict: 'AE',
    scope: {
      angCallback: '&',
      angBlurOut: '=',
      angInclude: '@?'
    }
  };

  function link(scope, elem) {
    scope.$watch('angBlurOut', function() {
      if(scope.angBlurOut) {
        console.log('angBlurOut: ang-blur-out mode is now on.');
        startEventListening();
      } else {
        console.log('angBlurOut: ang-blur-out mode is now off.');
        stopEventListening();
      }
    });

    function clickEvent(event) {
      scope.angCallback({
        continuePropagation: function () {
          $timeout(function () {
            $(event.target).trigger('click');
          });
        }
      });
    }

    function startEventListening() {
      $(document).on('mousedown', clickEvent);
      elem.on('mousedown', stopPropagation);
      if (scope.angInclude) {
        $(scope.angInclude).on('mousedown', stopPropagation);
      }
    }

    function stopEventListening() {
      $(document).off('mousedown', clickEvent);
      elem.off('mousedown', stopPropagation);
      if (scope.angInclude) {
        $(scope.angInclude).off('mousedown', stopPropagation);
      }
    }

    function stopPropagation (event) {
      event.stopPropagation();
    }

    elem.on("$destroy", function() {
      console.log('angBlurOut: element destroyed');
      scope.$destroy();
    });

    scope.$on("$destroy", function() {
      console.log('angBlurOut: scope destroyed');
      stopEventListening();
    });
  }
}

angBlurOut.$inject = ['$timeout'];

})();
