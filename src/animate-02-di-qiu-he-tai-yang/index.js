/*
 * @Author: ryuusennka
 * @Date: 2020-06-04 17:11:11
 * @LastEditors: ryuusennka
 * @LastEditTime: 2020-06-04 17:30:53
 * @FilePath: /fedemo/src/animate-02-di-qiu-he-tai-yang/index.js
 * @Description:
 */

function displayStars(count) {
  const canvas = document.querySelector('.stars');
  const fragment = document.createDocumentFragment();
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  for (let i = 0; i < count; i++) {
    const left = Math.round(Math.random() * width);
    const top = Math.round(Math.random() * height);
    const radius = Math.max(1, Math.round(Math.random() * 6));
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `width: ${radius}px; height: ${radius}px; left: ${left}px; top: ${top}px; animation-delay: ${Math.round(Math.random() * 10)}s;`;
    fragment.appendChild(star);
  }
  canvas.appendChild(fragment);
}
displayStars(100);
