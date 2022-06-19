<template>
  <div class="OverPlayerWrapper">
    <div class="OverPlayer">
      <component :is="overPlayComponent" :data="data" @action="onAction" />
    </div>
  </div>
</template>

<script>

import QuestionOfKnowingSubject from './QuestionTemplates/QuestionOfKnowingSubject'

export default {
  name: 'OverPlayer',
  components: { QuestionOfKnowingSubject },
  props: {
    overPlayComponent: {
      type: String,
      default: '',
    },
    data: {
      default: null,
    },
  },
  methods: {
    onAction (data) {
      this.$emit('action', data)
    }
  }
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
    border-radius: 30px;
  }
}
</style>
