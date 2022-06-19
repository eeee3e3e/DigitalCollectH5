import Vue from 'vue'
/*
  按钮防抖动指令
*/
Vue.directive('debounce', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3 * 1500)
      }
    })
  }
})