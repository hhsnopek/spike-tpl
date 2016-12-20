/* global ga */

window.onload = function () {
  document.querySelector('p a').onclick = function () {
    ga('send', 'event', 'index page', 'category', 'User clicks spike URL')
  }
}
