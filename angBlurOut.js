/*
  The MIT License (MIT)

  Copyright (c) 2015 Michael Ang

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/

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
        startEventListening();
      } else {
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
      scope.$destroy();
    });

    scope.$on("$destroy", function() {
      stopEventListening();
    });
  }
}

angBlurOut.$inject = ['$timeout'];

})();
