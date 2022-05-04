import Vue from "vue";
import { UnderDevelopmentTip } from "@/components";

const box = Vue.extend(UnderDevelopmentTip)

function underDevelopmentTip() {
  let ins = new box().$mount()
  document.body.appendChild(ins.$el)
  setTimeout(() => {
    document.body.removeChild(ins.$el)
  }, 1500)
}

export default underDevelopmentTip
