'use strict';

/**
 * @ngdoc function
 * @name homepageApp.controller:DragAndDropCtrl
 * @description
 * # DragAndDropCtrl
 * Controller of the homepageApp
 */
angular.module('homepageApp')
  .controller('DragAndDropCtrl', function ($scope) {

    $scope.items = [
        { name: "First Name" },
        { name: "Last Name" },
        { name: "Email" },
        { name: "Image", type: "image" }
    ];

    // Drag and Drop logic
    interact('.draggable')
        .resizable(true)
        .on('resizemove', function (event) {
            var target = event.target;

            // add the change in coords to the previous width of the target element
            var
              newWidth  = parseFloat(target.style.width ) + event.dx,
              newHeight = parseFloat(target.style.height) + event.dy;

            // update the element's style
            target.style.width  = newWidth + 'px';
            target.style.height = newHeight + 'px';

            // target.textContent = newWidth + '×' + newHeight;
          })
        .draggable({
            // allow dragging of multple elements at the same time
            max: Infinity,

            // call this function on every dragmove event
            onmove: function (event) {
                var target = event.target,
                    // keep the dragged position in the data-x/data-y attributes
                    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                // translate the element
                target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';

                // update the posiion attributes
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            // call this function on every dragend event
            onend: function (event) {
                // var textEl = event.target.querySelector('p');
                
                // textEl && (textEl.textContent =
                //     'moved a distance of '
                //     + (Math.sqrt(event.dx * event.dx +
                //                  event.dy * event.dy)|0) + 'px');
            }
        })
        // enable inertial throwing
        // .inertia(true)
        // keep the element within the area of it's parent
        .restrict({
            drag: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        });

        // allow more than one interaction at a time
        interact.maxInteractions(Infinity);
  });
