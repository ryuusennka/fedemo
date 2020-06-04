"use strict";

/*
 * @Author: ryuusennka
 * @Date: 2020-06-04 17:11:11
 * @LastEditors: ryuusennka
 * @LastEditTime: 2020-06-04 17:30:53
 * @FilePath: /fedemo/src/animate-02-di-qiu-he-tai-yang/index.js
 * @Description:
 */
function displayStars(count) {
  var canvas = document.querySelector('.stars');
  var fragment = document.createDocumentFragment();
  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;

  for (var i = 0; i < count; i++) {
    var left = Math.round(Math.random() * width);
    var top = Math.round(Math.random() * height);
    var radius = Math.max(1, Math.round(Math.random() * 6));
    var star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = "width: ".concat(radius, "px; height: ").concat(radius, "px; left: ").concat(left, "px; top: ").concat(top, "px; animation-delay: ").concat(Math.round(Math.random() * 10), "s;");
    fragment.appendChild(star);
  }

  canvas.appendChild(fragment);
}

displayStars(100);