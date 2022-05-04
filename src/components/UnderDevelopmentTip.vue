<template>
  <div class="app-under-development-tip">
    <div class="body">
      <div class="icon">
        <img src="/static/images/under-development.png" alt="">
      </div>
      <p class="text">功能正在开发中，近期上线！</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnderDevelopmentTip"
}
</script>

<style scoped lang="less">
@keyframes Overturn {
  from {
    transform: rotateX(-80deg);
  }
  to {
    transform: rotateX(0deg);
  }
}

.app-under-development-tip {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 99999;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);

  .body {
    padding: 30px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: Overturn 0.5s;

    .icon {
      width: 160px;

      img {
        width: 100%;
        object-fit: cover;
      }
    }

    .text {
      font-size: 15px;
      margin-top: 15px;
      color: #ffffff;
    }
  }
}
</style>
