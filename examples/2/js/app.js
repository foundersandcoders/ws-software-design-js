/* global Applet */

(function () {
  'use strict';

  ['Unanswered', 'Answerers']
    .forEach(function (applet) {
      if (window[applet])
        Applet.init(window[applet]);
    });
})();
