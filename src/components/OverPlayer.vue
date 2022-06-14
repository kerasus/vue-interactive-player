<template>
  <div class="OverPlayerWrapper">
    <div class="OverPlayer">
      OverPlayer
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverPlayer',
}
</script>

<style lang="scss" scoped>
.OverPlayerWrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .OverPlayer {
    background-color: white;
    border-radius: 5px;
    width: 70%;
    height: 70%;
  }
}
</style>
