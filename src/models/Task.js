import { Model, Collection } from 'js-abstract-model'

class Task extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      { key: 'type' }, // question of knowing subject
      { key: 'data' },
    ])
  }
}

class TaskList extends Collection {
  model() {
    return Task
  }
}
export { Task, TaskList }
