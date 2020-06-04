/*
 * @Author: ryuusennka
 * @Date: 2020-06-01 15:24:22
 * @LastEditors: ryuusennka
 * @LastEditTime: 2020-06-04 17:48:42
 * @FilePath: /fedemo/src/loading-02-wave/index.js
 * @Description:
 */

var ripple = document.querySelector('.ripple');
var rate = document.querySelector('.rate');

const setBottomPosition = num => {
  ripple.dataset.loading = num;
  ripple.style.cssText = `bottom: ${num}%`;
  rate.innerHTML = num + '%';
};

setBottomPosition(Number(ripple.dataset.loading));

let loading = ripple.dataset.loading * 1;

const timer = setInterval(() => {
  loading = Math.min(100, ++loading);
  setBottomPosition(loading);
  if (loading === 100) {
    clearInterval(timer);
    ripple.style.cssText = 'animation: none;';
  }
}, 100);
