import { Model, Collection } from 'js-abstract-model'
import { ChoiceList } from './Choice'

class Question extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      { key: 'type' }, // question of knowing subject
      { key: 'statement' },
      {
        key: 'choices',
        relatedModel: ChoiceList,
      },
    ])
  }
}

class QuestionList extends Collection {
  model() {
    return Question
  }
}
export { Question, QuestionList }
