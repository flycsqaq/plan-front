import Dialog from './dialog.vue'
import Switchd from './switch.vue'
import Verify from './verify.vue'
import Alert from './alert.vue'
import Pagination from './pagination.vue'
import RectButton from './rectButton.vue'
import CircleButton from './circleButton.vue'
import connectInfo from './connect.vue'
import InputText from './input.vue'
import Select from './select.vue'
import Textarea from './textarea.vue'
import Paper from './paper.vue'

export default {
  install: vue => {
    vue.component('fy-dialog', Dialog)
    vue.component('fy-switch', Switchd)
    vue.component('fy-verify', Verify)
    vue.component('fy-alert', Alert)
    vue.component('fy-pagination', Pagination)
    vue.component('fy-rect-btn', RectButton)
    vue.component('fy-circle-btn', CircleButton)
    vue.component('fy-connect-info', connectInfo)
    vue.component('fy-input', InputText)
    vue.component('fy-select', Select)
    vue.component('fy-textarea', Textarea)
    vue.component('fy-paper', Paper)
  }
}
