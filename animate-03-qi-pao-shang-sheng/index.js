"use strict";

/*
 * @Author: ryuusennka
 * @Date: 2020-06-05 16:38:43
 * @LastEditors: ryuusennka
 * @LastEditTime: 2020-06-05 16:49:15
 * @FilePath: /fedemo/src/animate-03-qi-pao-shang-sheng/index.js
 * @Description:
 */
function generateBubbles(num) {
  var width = document.documentElement.clientWidth;
  var fragment = document.createDocumentFragment();
  var ctn = document.querySelector('.bubbels');

  for (var i = 0; i < num; i++) {
    var bubbel = document.createElement('div');
    bubbel.className = 'bubbel';
    var radius = Math.max(10, Math.round(Math.random() * 40));
    var duration = Math.max(1, Math.round(Math.random() * num));
    var delay = Math.max(1, Math.round(Math.random() * 5));
    var left = Math.round(Math.random() * width);
    bubbel.style.cssText = "width: ".concat(radius, "px; height: ").concat(radius, "px; animation-delay: ").concat(delay, "s; animation-duration: ").concat(duration, "s; left: ").concat(left, "px");
    fragment.appendChild(bubbel);
  }

  ctn.appendChild(fragment);
}

generateBubbles(100);