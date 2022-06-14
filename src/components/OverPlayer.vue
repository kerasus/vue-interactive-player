<template>
  <div class="OverPlayerWrapper">
    <div class="OverPlayer">
      <component :is="overPlayComponent" :data="data"  />
    </div>
  </div>
</template>

<script>

export default {
  name: 'OverPlayer',
  props: {
    overPlayComponent: {
      type: String,
      default: '',
    },
    data: {
      default: null,
    },
  },
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
