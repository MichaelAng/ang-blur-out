# ang-blur-out

[DEMO](http://plnkr.co/edit/3t0tluuOjl3fOFMa6CWI?p=preview)

## Purpose
To execute a callback when the user clicks outside of an element.

## Getting Started

include file into index.html

    <script src="angBlurOut.js"></script>

include module into application

    angular.module('MyApp', ['ang.blurOut']);


## ang-blur-out
When ang-blur-out="true", the application will run the callback function
provided by ang-callback when the user clicks outside of the element it
is attached to.

When ang-blur-out="false", the application will not run the function at
all.

The ang-callback is the callback function that executes when the function
clicks outside of the element it is attached to.

In the callback function, the continuePropagation parameter allows the
callback function to call the continuePropagation parameter function to
continue the event propagation of the last clicked event.

The optional ang-include, takes in a string element selector that will
ignore clicks in addition to the element it is attached to.

## How to use

In the HTML:

    <div
      ang-blur-out="boolean"
      ang-callback="function(continuePropagation)"
      ang-include="String">
    </div

In your controller:

    $scope.showModal = function (continuePropagation) {
      // Modal response result
      modal.result.then(function (result) {
        if (result === 'ok') {
          if(continuePropagation) {
            continuePropagation();
          }
        }
      });
    }

