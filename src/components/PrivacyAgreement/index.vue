<template>
  <div class="app-privacy-agreement" ref="wordViewRef">
  </div>
</template>

<script>
import request from "axios";
import { renderAsync } from 'docx-preview'

export default {
  data() {
    return {
      wordHtml: ''
    }
  },
  created() {
    this.readWordFromRemoteFile()
  },
  methods: {
    // 在线查看word文件
    readWordFromRemoteFile() {
      request({
        method: 'get',
        responseType: 'blob',
        url: './static/files/privacy-agreement.docx'
      })
          .then(result => {
            console.log(result)
            // 渲染到页面
            this.$nextTick(() => {
              renderAsync(result.data, this.$refs.wordViewRef).then(a => console.log(a));
            })
          })
    },
  }
}
</script>

<style scoped lang="less">
.app-privacy-agreement {
  ::v-deep {
    .docx-wrapper {
      padding: 0;
      width: auto;
      background-color: transparent !important;

      .docx {
        padding: 0 !important;
        width: auto !important;
        box-shadow: none !important;
        background-color: transparent;
        color: #FFFFFF !important;
        line-height: 1.5 !important;
        font-family: PingFangSC, PingFangSC-Semibold;
        min-height: 100% !important;
        margin-bottom: 0 !important;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
