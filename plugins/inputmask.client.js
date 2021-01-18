import Vue from 'vue'
import Inputmask from 'inputmask'

Vue.directive('mask', {
    bind(el, binding) {
        Inputmask(binding.value).mask(el)
    }
})
