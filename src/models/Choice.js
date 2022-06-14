import { Model, Collection } from 'js-abstract-model'

class Choice extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      { key: 'label' },
      { key: 'value' },
      { key: 'task_id' },
    ])
  }
}

class ChoiceList extends Collection {
  model() {
    return Choice
  }
}
export { Choice, ChoiceList }
