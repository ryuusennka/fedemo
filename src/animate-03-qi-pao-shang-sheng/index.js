/*
 * @Author: ryuusennka
 * @Date: 2020-06-05 16:38:43
 * @LastEditors: ryuusennka
 * @LastEditTime: 2020-06-05 16:49:15
 * @FilePath: /fedemo/src/animate-03-qi-pao-shang-sheng/index.js
 * @Description:
 */

function generateBubbles(num) {
  const width = document.documentElement.clientWidth;
  const fragment = document.createDocumentFragment();
  const ctn = document.querySelector('.bubbels');
  for (let i = 0; i < num; i++) {
    const bubbel = document.createElement('div');
    bubbel.className = 'bubbel';
    const radius = Math.max(10, Math.round(Math.random() * 40));
    const duration = Math.max(1, Math.round(Math.random() * num));
    const delay = Math.max(1, Math.round(Math.random() * 5));
    const left = Math.round(Math.random() * width);
    bubbel.style.cssText = `width: ${radius}px; height: ${radius}px; animation-delay: ${delay}s; animation-duration: ${duration}s; left: ${left}px`;
    fragment.appendChild(bubbel);
  }
  ctn.appendChild(fragment);
}
generateBubbles(100);
