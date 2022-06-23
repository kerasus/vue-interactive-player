import {PlayerSourceList} from '../models/PlayerSource'

const mixinGoToTime = {
  methods: {
    doGoToTime(task) {
      task.done = true
      const start = (typeof task.data?.start !== 'undefined') ? task.data.start : this.currentTimePoint.start
      const end = (typeof task.data?.end !== 'undefined') ? task.data.end : this.currentTimePoint.end
      const sources = (typeof task.data?.sources !== 'undefined') ? task.data.sources : this.currentTimePoint.sources
      const poster = (typeof task.data?.poster !== 'undefined') ? task.data.poster : this.currentTimePoint.poster
      if (sources.list.length > 0) {
        this.changeSources(sources, poster)
      }
      this.setWatchingEndTime(end)
      this.$nextTick(() => {
        this.play()
        this.goToTime(start)
      })
    }
  }
}

export default mixinGoToTime
