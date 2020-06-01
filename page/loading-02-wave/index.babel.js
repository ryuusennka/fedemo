/*
 * @Author: ryuusennka
 * @Date: 2020-06-01 15:24:22
 * @LastEditors: ryuusennka
 * @LastEditTime: 2020-06-01 17:44:34
 * @FilePath: /fedemo/page/loading-02/index.babel.js
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
  console.log(123);

  loading = Math.min(100, ++loading);
  setBottomPosition(loading);
  if (loading === 100) {
    clearInterval(loading);
    ripple.style.cssText = 'animation: none;';
  }
}, 100);
