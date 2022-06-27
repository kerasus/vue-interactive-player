import { Model, Collection } from 'js-abstract-model'
import { TaskList } from './Task'
import { PlayerSourceList } from './PlayerSource'

class TimePoint extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      {
        key: 'sources',
        relatedModel: PlayerSourceList,
      },
      { key: 'poster' },
      {
        key: 'start',
        default: 0,
      },
      {
        key: 'end',
        default: 0,
      },
      { key: 'legal_time' },
      {
        key: 'tasks',
        relatedModel: TaskList,
      }
    ])
  }

  getNextTask (currentTask) {
    const taskId = currentTask?.data?.next_task_id
    const taskAutoPlay = currentTask?.data?.next_task_auto_play
    if (typeof taskId !== 'undefined' && taskId !== null && taskAutoPlay) {
      return this.tasks.getItem('id', taskId)
    }

    return null
  }

  isOnTheLegalTime (elapsedTimeOfPlan) {
    return (
        typeof this.legal_time === 'undefined' ||
        this.legal_time === null ||
        isNaN(this.legal_time) ||
        this.legal_time >= elapsedTimeOfPlan
    )
  }

  hasTasks () {
    return this.tasks.list.length > 0
  }
}

class TimePointList extends Collection {
  model() {
    return TimePoint
  }

  getNextTimePont (currentTimePoint) {
    const currentTimePointIndex = this.getIndex('id', currentTimePoint.id)
    const nextTimePoint = this.list[currentTimePointIndex + 1 ]
    if (typeof nextTimePoint === 'undefined') {
      return null
    }

    return nextTimePoint
  }

}
export { TimePoint, TimePointList }
