<template>
  <slide-verify
  id="verify"
   :l="42"
    :r="10"
    :w="350"
    :h="155"
    :imgs="picArray"
    :show="true"
    slider-text="向右滑动完成验证"
    ref="slideverify"
    @success="onSuccess"
    @fail="onFail"
    @refresh="onRefresh"
  ></slide-verify>
</template>

<script>
export default {
  name: "SliderVerify",
  data() {
    return {
      //在data中引入`assets`中的图片可以通过`require`的方式来引入
      picArray: [
        require("@/assets/verify/1.png"),
        require("@/assets/verify/2.png"),
        require("@/assets/verify/3.png")
      ],
    };
  },
  methods: {
    onSuccess() {//往父级传递验证通过的函数
      this.$emit("success");
    },
    onReset() {//重置图片验证组件
      this.$refs.slideverify.reset();
    },
    onFail() {},
    onRefresh() {},
  },
};
</script>
<style  lang="less">
.slide-verify{
  width:100% !important;
  padding: 0 !important;
}
.slide-verify-slider{
  margin-top:0px !important;
}
 

</style>