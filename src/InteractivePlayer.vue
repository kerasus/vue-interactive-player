<template>
  <div class="InteractivePlayer">
    <player
          ref="interactivePlayer"
          :sources="sources"
          :poster="poster"
          :over-player="overPlayer"
          @ready="onPlayerReady"
          @ended="onPlayerEnded"
          @timeupdate="onPlayerTimeUpdate"
      >
        <template #overPlayer>
          <over-player :data="overPlayData" :over-play-component="overPlayComponent" @action="onAction"/>
        </template>
      </player>
  </div>
</template>

<script>
import Player from './components/Player'
import OverPlayer from './components/OverPlayer'
import {Task, TaskList} from './models/Task'
import { TimePointList, TimePoint } from './models/TimePoint'
import { PlayerSourceList } from './models/PlayerSource'
import { mixinQuestionOfKnowingSubject, mixinExam, mixinGoToTime, mixinGoToTimePoint, mixinPlayer, mixinOverPlayer } from './mixins/Mixins'

export default {
  name: 'InteractivePlayer',
  components: { Player, OverPlayer },

  mixins: [mixinQuestionOfKnowingSubject, mixinGoToTime, mixinGoToTimePoint, mixinPlayer, mixinOverPlayer, mixinExam],

  props: {
    timePoints: {
      type: Array,
      default() {
        return []
      },
    },
  },

  watch: {
    playerCurrentTime (newValue) {
      if (this.watchingEndTime > newValue) {
        return
      }

      const nextTaskOfCurrentTask = this.getNextTaskOfCurrentTask()
      if (nextTaskOfCurrentTask) {
        this.doTask(nextTaskOfCurrentTask)
        return
      }

      const postShowTask = this.currentTimePoint.tasks.getPostShow()
      if (!postShowTask) {
        this.loadNextTimePont()
        return
      }

      if (!postShowTask.done) {
        this.doTask(postShowTask)
        return
      }

      this.loadNextTimePont()
    }
  },

  computed: {
    elapsedTimeOfTimePoint () {
      return (Date.now() - this.startTimePointTime) / 1000
    }
  },

  data() {
    return {
      startPlanTime: 0,
      startTimePointTime: 0,
      watchingEndTime: 0,
      playerCurrentTime: 0,
      currentTimePoint: new TimePoint(),
      currentTask: new Task(),
      localTimePoints : new TimePointList(),
      overPlayData: null,
      overPlayComponent: '',
      overPlayer: false,
      sources: new PlayerSourceList(),
      poster: '',
    }
  },

  created() {
    this.initPage()
  },

  methods: {
    initPage () {
      this.localTimePoints = new TimePointList(this.timePoints)
      this.loadFirstTimePont()
    },

    loadFirstTimePont() {
      this.startPlanTime = Date.now()
      const firstTimePoint = this.getFirstTimePont()
      this.runTimePoint(firstTimePoint)
    },

    getFirstTimePont() {
      return this.localTimePoints.list[0]
    },

    runTimePoint(timePoint) {
      this.currentTimePoint = timePoint
      this.startTimePointTime = Date.now()
      const elapsedTimeOfPlan = this.getElapsedTimeOfPlan()
      if (!this.currentTimePoint.isOnTheLegalTime(elapsedTimeOfPlan)) {
        this.loadNextTimePont()
        return
      }

      this.setWatchingEndTime(this.currentTimePoint.end)
      this.changeSources(timePoint.sources, timePoint.poster)
      if (timePoint.hasTasks() && timePoint.tasks.hasPreShow()) {
        const preShowTask = timePoint.tasks.getPreShow()
        this.doTask(preShowTask)
      }
    },

    getElapsedTimeOfPlan () {
      return (Date.now() - this.startPlanTime) / 1000
    },

    loadNextTimePont() {
      const nextTimePoint = this.localTimePoints.getNextTimePont(this.currentTimePoint)
      if (!nextTimePoint) {
        this.finish()
        return
      }
      this.runTimePoint(nextTimePoint)
    },

    finish () {
      this.hideOverPlayer()
      this.pause()
    },

    setWatchingEndTime (endTime) {
      this.watchingEndTime = endTime
    },

    getElapsedTimeOfTimePoint () {
      return (Date.now() - this.startTimePointTime) / 1000
    },


    getNextTaskOfCurrentTask () {

      return this.currentTimePoint.getNextTask(this.currentTask)

      // const taskId = this.currentTask?.data?.next_task_id
      // const taskAutoPlay = this.currentTask?.data?.next_task_auto_play
      // if (typeof taskId !== 'undefined' && taskId !== null && taskAutoPlay) {
      // // if (typeof taskId !== 'undefined' && taskId !== null) {
      //   return this.getTaskOfTimePoint(taskId)
      // }
      //
      // return null
    },

    getTaskOfTimePoint (taskId) {
      return this.currentTimePoint.tasks.getItem('id', taskId)
    },

    onAction (data) {
      this.doTaskAction(this.currentTask, data)
    },

    setCurrentTask (task) {
      this.currentTask = task
    },




    doTaskAction(task, actionData) {
      switch (task.type) {
        case 'QuestionOfKnowingSubject':
          this.doActionOfQuestionOfKnowingSubject(actionData)
          break
        case 'Exam':
          this.doActionOfExam(actionData)
          break
        default:
          break
      }
    },

    doTask(task) {
      // console.trace('doTask: ', task)
      this.setCurrentTask(task)

      this.currentTask.setChecked()
      if (!this.currentTask.canDoBasedOnLegalTime(this.getElapsedTimeOfTimePoint())) {
        return
      }
      switch (task.type) {
        case 'QuestionOfKnowingSubject':
          this.doQuestionOfKnowingSubject(task)
          break
        case 'goToTime':
          this.doGoToTime(task)
          break
        case 'goToTimePoint':
          this.doGoToTimePoint(task)
          break
        case 'Exam':
          this.doExam(task)
          break
        default:
          break
      }
    },

    doTaskSequence (taskIds, taskAfterSequenceId) {

      let newTask = taskIds[0]
      if (typeof newTask === 'undefined') {
        if (typeof taskAfterSequenceId === 'undefined' || taskAfterSequenceId === null) {
          this.loadNextTimePont()
          return
        }

        newTask = taskAfterSequenceId
      }

      this.loadTaskSequence(taskIds, taskAfterSequenceId)

      const firstTask = this.currentTimePoint.tasks.getItem('id', newTask)

      this.doTask(firstTask)
    },

    loadTaskSequence (taskIds, taskAfterSequenceId) {
      taskIds.forEach( (taskId, taskIdIndex) => {
        const taskIndex = this.currentTimePoint.tasks.getIndex('id', taskId)
        if (taskIndex === -1) {
          // ToDo:go to ?
          return
        }

        const nextTaskId = taskIds[taskIdIndex + 1]
        if (typeof nextTaskId === 'undefined') {
          this.setNextTaskId(this.currentTimePoint.tasks.list[taskIndex], taskAfterSequenceId)
          return
        }

        const nextTaskIndex = this.currentTimePoint.tasks.getIndex('id', nextTaskId)
        if (typeof nextTaskIndex === 'undefined') {
          return
        }

        this.setNextTaskId(this.currentTimePoint.tasks.list[taskIndex], this.currentTimePoint.tasks.list[nextTaskIndex].id)
      })
    },

    setNextTaskId (task, nextTaskId, autoPlay) {
      if (typeof task.data === 'undefined' || !task.data) {
        task.data = {}
      }
      if (typeof autoPlay === 'undefined') {
        autoPlay = true
      }

      task.data.next_task_id = nextTaskId

      task.data.next_task_auto_play = autoPlay
    }
  },
}
</script>

<style lang="scss" scoped>
.InteractivePlayer {
  direction: rtl;
}
</style>
