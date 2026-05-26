import Vue from 'vue'

Vue.prototype.$btoa = (text) => window.btoa(text)

Vue.prototype.$atob = (base64) => window.atob(base64)
