<template>
  <div id="app">
    <interactive-player :time-points="timePoints" />
  </div>
</template>

<script>
import InteractivePlayer from './InteractivePlayer.vue'
import { TimePointList } from './models/TimePoint'

export default {
  name: 'App',
  components: { InteractivePlayer },
  data() {
    return {
      timePoints: new TimePointList([
        {
          id: 0,
          poster: 'https://nodes.alaatv.com/media/thumbnails/969/969007kbnt.jpg',
          sources: [
            {
              src: 'https://nodes.alaatv.com/media/969/HD_720p/969007kbnt.mp4',
              type: 'video/mp4',
              res: '720p',
              label: 'کیفیت عالی',
            },
            {
              src: 'https://nodes.alaatv.com/media/969/hq/969007kbnt.mp4',
              type: 'video/mp4',
              res: '480p',
              label: 'کیفیت بالا',
            },
            {
              src: 'https://nodes.alaatv.com/media/969/240p/969007kbnt.mp4',
              type: 'video/mp4',
              res: '240p',
              label: 'کیفیت متوسط',
              selected: true,
            },
          ],
          start: 0,
          end: 2,
          tasks: [
            {
              id: 0,
              type: 'QuestionOfKnowingSubject',
              preShow: true,
              data: {
                statement: 'می خوایم مبحث فیلان رو تدریس کنیم، می خوای ببینی؟',
                choices: [
                  {
                    label: 'بلدم و می خوام ببینم',
                    value: 0,
                    task_id: 3
                  },
                  {
                    label: 'بلدم و نمی خوام ببینم',
                    value: 1,
                    task_id: 4
                  },
                  {
                    label: 'بلد نیستم و می خوام ببینم',
                    value: 2,
                    task_id: 3
                  },
                ],
              },
            },
            {
              id: 1,
              type: 'StabilizationTest',
              postShow: true,
              data: {
                legalTime: 50,
                next_task_id: 2,
                next_task_auto_play: false,
                questions: [
                  {
                    id: 0,
                    task_id: 5,
                    statement: '۱-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
                    choices: [
                      {
                        label: 'گزینه های یکپارچه',
                        value: false
                      },
                      {
                        label: 'گزینه های درهم',
                        value: false,
                      },
                      {
                        label: 'گزینه های متفرقه',
                        value: false,
                      },
                      {
                        label: 'گزینه درست',
                        value: true,
                      },
                    ],
                  },
                  {
                    id: 1,
                    task_id: 5,
                    statement: '۲-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
                    choices: [
                      {
                        label: 'گزینه های یکپارچه',
                        value: false,
                      },
                      {
                        label: 'گزینه های درهم',
                        value: false,
                      },
                      {
                        label: 'گزینه های متفرقه',
                        value: false,
                      },
                      {
                        label: 'گزینه درست',
                        value: true,
                      },
                    ],
                  },
                  {
                    id: 2,
                    task_id: 5,
                    statement: '۳-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
                    choices: [
                      {
                        label: 'گزینه های یکپارچه',
                        value: false,
                      },
                      {
                        label: 'گزینه های درهم',
                        value: false,
                      },
                      {
                        label: 'گزینه های متفرقه',
                        value: false,
                      },
                      {
                        label: 'گزینه درست',
                        value: true,
                      },
                    ],
                  },
                  {
                    id: 3,
                    task_id: 5,
                    statement: '۴-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
                    choices: [
                      {
                        label: 'گزینه های یکپارچه',
                        value: false,
                      },
                      {
                        label: 'گزینه های درهم',
                        value: false,
                      },
                      {
                        label: 'گزینه های متفرقه',
                        value: false,
                      },
                      {
                        label: 'گزینه درست',
                        value: true,
                      },
                    ],
                  },
                  {
                    id: 4,
                    task_id: 5,
                    statement: '۵-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
                    choices: [
                      {
                        label: 'گزینه های یکپارچه',
                        value: false,
                      },
                      {
                        label: 'گزینه های درهم',
                        value: false,
                      },
                      {
                        label: 'گزینه های متفرقه',
                        value: false,
                      },
                      {
                        label: 'گزینه درست',
                        value: true,
                      },
                    ],
                  },
                ]
              },
            },
            {
              id: 2,
              type: 'SpecialTest',
              data: [
                {
                  statement: '۱-به عنوان یک سوال ویژه، جواب این سوال ساده کدام گزینه هست؟',
                  choices: [
                    {
                      label: 'گزینه های یکپارچه',
                      value: false,
                    },
                    {
                      label: 'گزینه های درهم',
                      value: false,
                    },
                    {
                      label: 'گزینه های متفرقه',
                      value: false,
                    },
                    {
                      label: 'گزینه درست',
                      value: true,
                    },
                  ],
                },
                {
                  statement: '۲-به عنوان یک سوال ویژه، جواب این سوال ساده کدام گزینه هست؟',
                  choices: [
                    {
                      label: 'گزینه های یکپارچه',
                      value: false,
                    },
                    {
                      label: 'گزینه های درهم',
                      value: false,
                    },
                    {
                      label: 'گزینه های متفرقه',
                      value: false,
                    },
                    {
                      label: 'گزینه درست',
                      value: true,
                    },
                  ],
                },
                {
                  statement: '۳-به عنوان یک سوال ویژه، جواب این سوال ساده کدام گزینه هست؟',
                  choices: [
                    {
                      label: 'گزینه های یکپارچه',
                      value: false,
                    },
                    {
                      label: 'گزینه های درهم',
                      value: false,
                    },
                    {
                      label: 'گزینه های متفرقه',
                      value: false,
                    },
                    {
                      label: 'گزینه درست',
                      value: true,
                    },
                  ],
                },
              ],
            },
            {
              id: 3,
              type: 'gotToTime'
            },
            {
              id: 4,
              type: 'gotToTimePoint',
              data: {
                timePoint_id: 1
              },
            },

            {
              id: 5,
              type: 'gotToTime',
              data: {
                start: 50,
                end: 55,
              },
            },
            {
              id: 6,
              type: 'gotToTimePoint',
              data: {
                timePoint_id: 0
              },
            },
          ],
        },
        {
          id: 1,
          poster: 'https://nodes.alaatv.com/media/thumbnails/1374/1374000asdf.jpg',
          sources: [
            {
              src: 'https://nodes.alaatv.com/media/1374/HD_720p/1374000asdf.mp4',
              type: 'video/mp4',
              res: '720p',
              label: 'کیفیت عالی',
            },
            {
              src: 'https://nodes.alaatv.com/media/1374/hq/1374000asdf.mp4',
              type: 'video/mp4',
              res: '480p',
              label: 'کیفیت بالا',
            },
            {
              src: 'https://nodes.alaatv.com/media/1374/240p/1374000asdf.mp4',
              type: 'video/mp4',
              res: '240p',
              label: 'کیفیت متوسط',
              selected: true,
            },
          ],
          start: 90,
          end: 100,
          tasks: [
            {
              type: 'QuestionOfKnowingSubject',
              data: {
                statement: 'می خوایم مبحث فیلان رو تدریس کنیم، می خوای ببینی؟',
                choices: [
                  {
                    label: 'بلدم و می خوام ببینم',
                    value: 0,
                  },
                  {
                    label: 'بلدم و نمی خوام ببینم',
                    value: 1,
                  },
                  {
                    label: 'بلد نیستم و می خوام ببینم',
                    value: 2,
                  },
                ],
              },
            },
            {
              type: 'StabilizationTest',
              data: [
                {
                  statement: '۱-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
                  choices: [
                    {
                      label: 'گزینه های یکپارچه',
                      value: false,
                    },
                    {
                      label: 'گزینه های درهم',
                      value: false,
                    },
                    {
                      label: 'گزینه های متفرقه',
                      value: false,
                    },
                    {
                      label: 'گزینه درست',
                      value: true,
                    },
                  ],
                },
                {
                  statement: '۲-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
                  choices: [
                    {
                      label: 'گزینه های یکپارچه',
                      value: false,
                    },
                    {
                      label: 'گزینه های درهم',
                      value: false,
                    },
                    {
                      label: 'گزینه های متفرقه',
                      value: false,
                    },
                    {
                      label: 'گزینه درست',
                      value: true,
                    },
                  ],
                },
                {
                  statement: '۳-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
                  choices: [
                    {
                      label: 'گزینه های یکپارچه',
                      value: false,
                    },
                    {
                      label: 'گزینه های درهم',
                      value: false,
                    },
                    {
                      label: 'گزینه های متفرقه',
                      value: false,
                    },
                    {
                      label: 'گزینه درست',
                      value: true,
                    },
                  ],
                },
                {
                  statement: '۴-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
                  choices: [
                    {
                      label: 'گزینه های یکپارچه',
                      value: false,
                    },
                    {
                      label: 'گزینه های درهم',
                      value: false,
                    },
                    {
                      label: 'گزینه های متفرقه',
                      value: false,
                    },
                    {
                      label: 'گزینه درست',
                      value: true,
                    },
                  ],
                },
                {
                  statement: '۵-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
                  choices: [
                    {
                      label: 'گزینه های یکپارچه',
                      value: false,
                    },
                    {
                      label: 'گزینه های درهم',
                      value: false,
                    },
                    {
                      label: 'گزینه های متفرقه',
                      value: false,
                    },
                    {
                      label: 'گزینه درست',
                      value: true,
                    },
                  ],
                },
              ],
            },
            {
              type: 'SpecialTest',
              data: [
                {
                  statement: '۱-به عنوان یک سوال ویژه، جواب این سوال ساده کدام گزینه هست؟',
                  choices: [
                    {
                      label: 'گزینه های یکپارچه',
                      value: false,
                    },
                    {
                      label: 'گزینه های درهم',
                      value: false,
                    },
                    {
                      label: 'گزینه های متفرقه',
                      value: false,
                    },
                    {
                      label: 'گزینه درست',
                      value: true,
                    },
                  ],
                },
                {
                  statement: '۲-به عنوان یک سوال ویژه، جواب این سوال ساده کدام گزینه هست؟',
                  choices: [
                    {
                      label: 'گزینه های یکپارچه',
                      value: false,
                    },
                    {
                      label: 'گزینه های درهم',
                      value: false,
                    },
                    {
                      label: 'گزینه های متفرقه',
                      value: false,
                    },
                    {
                      label: 'گزینه درست',
                      value: true,
                    },
                  ],
                },
                {
                  statement: '۳-به عنوان یک سوال ویژه، جواب این سوال ساده کدام گزینه هست؟',
                  choices: [
                    {
                      label: 'گزینه های یکپارچه',
                      value: false,
                    },
                    {
                      label: 'گزینه های درهم',
                      value: false,
                    },
                    {
                      label: 'گزینه های متفرقه',
                      value: false,
                    },
                    {
                      label: 'گزینه درست',
                      value: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]),
    }
  },
  created() {
    this.changeSources(this.sampleSources3, this.samplePoster3)
  },
  methods: {
    onPlayerReady() {
      // eslint-disable-next-line
      console.log('onPlayerReady')
    },
    onPlayerEnded() {
      // eslint-disable-next-line
      console.log('onPlayerEnded')
    },
    onPlayerTimeUpdate(data) {
      // eslint-disable-next-line
      console.log('onPlayerTimeUpdate', data)
    },
    goToTime(time) {
      this.$refs.interactivePlayer.goToTime(time)
      this.play()
      this.focus()
    },
    play() {
      this.$refs.interactivePlayer.play()
    },
    focus() {
      this.$refs.interactivePlayer.focus()
    },
    changeSources(sources, poster) {
      this.sources = sources
      this.poster = poster
    },
  },
}
</script>
