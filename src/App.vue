<template>
  <div id="app">
    <interactive-player :time-points="timePoints" />
  </div>
</template>

<script>
import InteractivePlayer from './InteractivePlayer.vue'

export default
{
  name: 'App',
  components: { InteractivePlayer },
  data() {
    return {
      timePoints: [
        {
          id: 0, // 00:00
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
          start: 0,
          end: 2, // 01:00
          legal_time: 2
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
          start: 2, // 01:00
          end: 4, // 05:00
          tasks: [
            {
              id: 0,
              type: 'QuestionOfKnowingSubject',
              pre_show: true,
              before_do: () => { console.log('QuestionOfKnowingSubject before_do') },
              before_action: () => { console.log('QuestionOfKnowingSubject before_action') },
              data: {
                statement: 'می خوایم مبحث فیلان رو تدریس کنیم، می خوای ببینی؟',
                choices: [
                  {
                    label: 'بلد نیستم و می خوام ببینم',
                    value: 2,
                    task_id: 3
                  },
                  {
                    label: 'بلدم و نمی خوام ببینم',
                    value: 1,
                    task_id: 4
                  },
                  {
                    label: 'بلدم و می خوام ببینم',
                    value: 0,
                    task_id: 3
                  },
                ],
              },
            },
            {
              id: 3,
              type: 'goToTime'
            },
            {
              id: 4,
              type: 'goToTimePoint',
              data: {
                time_point_id: 2
              },
            },

            {
              id: 1,
              type: 'Exam',
              post_show: true,
              data: {
                examTitle:'تست ۱ (چهارگزینه ای)',
                next_task_id: 2,
                next_task_auto_play: true,
                questions: [
                  {
                    id: 0,
                    task_id: 5,
                    statement: '۱-این متن سوال یک هستش؟',
                    choices: [
                      {
                        id: 0,
                        label: 'یک متر',
                        value: false
                      },
                      {
                        id: 1,
                        label: 'یک دو',
                        value: false,
                      },
                      {
                        id: 2,
                        label: 'یک سه',
                        value: false,
                      },
                      {
                        id: 3,
                        label: 'یک چهار',
                        value: true,
                      },
                    ],
                  },
                ]
              },
            },
            {
              id: 5,
              type: 'goToTime',
              data: {
                start: 4, // 05:00
                end: 6, // 07:00
              },
            },

            {
              id: 2,
              type: 'Exam',
              data: {
                examTitle:'تست ۲ (چهارگزینه ای)',
                questions: [
                  {
                    id: 0,
                    task_id: 6,
                    statement: '۱-اما این یکی متن سوال شماره دو هستش؟',
                    choices: [
                      {
                        id: 0,
                        label: 'یک متر',
                        value: false
                      },
                      {
                        id: 1,
                        label: 'یک دو',
                        value: false,
                      },
                      {
                        id: 2,
                        label: 'یک سه',
                        value: false,
                      },
                      {
                        id: 3,
                        label: 'یک چهار',
                        value: true,
                      },
                    ],
                  },
                ]
              },
            },
            {
              id: 6,
              type: 'goToTime',
              data: {
                start: 6, // 07:00
                end: 8, // 15:00
              },
            },
          ],
        },
          // 12

        {
          id: 2,
          poster: 'https://nodes.alaatv.com/media/thumbnails/769/769001zone.jpg',
          sources: [
            {
              src: 'https://nodes.alaatv.com/media/769/HD_720p/769001zone.mp4',
              type: 'video/mp4',
              res: '720p',
              label: 'کیفیت عالی',
            },
            {
              src: 'https://nodes.alaatv.com/media/769/hq/769001zone.mp4',
              type: 'video/mp4',
              res: '480p',
              label: 'کیفیت بالا',
            },
            {
              src: 'https://nodes.alaatv.com/media/769/240p/769001zone.mp4',
              type: 'video/mp4',
              res: '240p',
              label: 'کیفیت متوسط',
              selected: true,
            },
          ],
          start: 0, // 00:00
          end: 2, // 01:00
          tasks: [
            {
              id: 21,
              type: 'Exam',
              pre_show: true,
              data: {
                examTitle:'تست های تسلط',
                next_task_id: 22,
                questions: [
                  {
                    id: 0,
                    task_id: 23,
                    statement: '۱-از اینجا تا اونجا چند متره؟',
                    choices: [
                      {
                        id: 0,
                        label: 'یک متر',
                        value: false
                      },
                      {
                        id: 1,
                        label: 'دو متر',
                        value: false,
                      },
                      {
                        id: 2,
                        label: 'سه متر',
                        value: false,
                      },
                      {
                        id: 3,
                        label: 'چهار متر',
                        value: true,
                      },
                    ],
                  },
                  {
                    id: 1,
                    task_id: 24,
                    statement: '۲-آلو کیلو چند؟',
                    choices: [
                      {
                        id: 0,
                        label: '۱تومن',
                        value: false
                      },
                      {
                        id: 1,
                        label: 'دو تومن',
                        value: false,
                      },
                      {
                        id: 2,
                        label: 'سه تومن',
                        value: false,
                      },
                      {
                        id: 3,
                        label: 'چهار تومن',
                        value: true,
                      },
                    ],
                  },
                  {
                    id: 2,
                    task_id: 25,
                    statement: '3-سن پسر علی؟',
                    choices: [
                      {
                        id: 0,
                        label: '10',
                        value: false
                      },
                      {
                        id: 1,
                        label: 'دوازده',
                        value: false,
                      },
                      {
                        id: 2,
                        label: 'شانزده ',
                        value: false,
                      },
                      {
                        id: 3,
                        label: 'پانزده',
                        value: true,
                      },
                    ],
                  }
                ]
              },
            },

            {
              id: 22,
              type: 'goToTimePoint',
              data: {
                time_point_id: 3
              },
            },

            {
              id: 23,
              type: 'goToTime',
              data: {
                start: 2, //05:00
                end: 4, //10:00
              }
            },
            {
              id: 24,
              type: 'goToTime',
              data: {
                start: 4, //05:00
                end: 6, //10:00
              }
            },
            {
              id: 25,
              type: 'goToTime',
              data: {
                start: 6, //10:00
                end: 8,  //14:00
              }
            },

          ],
        },

          //41

        {
          id: 3,
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
          start: 0, // 00:00
          end: 2, // 2:00
          legal_time: 50,
          tasks: [
            {
              id: 31,
              type: 'Exam',
              pre_show: true,
              data: {
                examTitle:'تست های ویژه',
                next_task_id: 36,
                next_task_auto_play: false,
                questions: [
                  {
                    id: 0,
                    task_id: 32,
                    statement: '۱-از اینجا تا اونجا چند متره؟',
                    choices: [
                      {
                        id: 0,
                        label: 'یک متر',
                        value: false
                      },
                      {
                        id: 1,
                        label: 'دو متر',
                        value: false,
                      },
                      {
                        id: 2,
                        label: 'سه متر',
                        value: false,
                      },
                      {
                        id: 3,
                        label: 'چهار متر',
                        value: true,
                      },
                    ],
                  },
                  {
                    id: 1,
                    task_id: 33,
                    statement: '۲-آلو کیلو چند؟',
                    choices: [
                      {
                        id: 0,
                        label: '۱تومن',
                        value: false
                      },
                      {
                        id: 1,
                        label: 'دو تومن',
                        value: false,
                      },
                      {
                        id: 2,
                        label: 'سه تومن',
                        value: false,
                      },
                      {
                        id: 3,
                        label: 'چهار تومن',
                        value: true,
                      },
                    ],
                  },
                  {
                    id: 2,
                    task_id: 34,
                    statement: '۳-سن پسر علی؟',
                    choices: [
                      {
                        id: 0,
                        label: 'ده',
                        value: false
                      },
                      {
                        id: 1,
                        label: 'دوازده',
                        value: false,
                      },
                      {
                        id: 2,
                        label: 'شانزده ',
                        value: false,
                      },
                      {
                        id: 3,
                        label: 'پانزده',
                        value: true,
                      },
                    ],
                  },
                  {
                    id: 3,
                    task_id: 35,
                    statement: '۴-سن پدر علی؟',
                    choices: [
                      {
                        id: 0,
                        label: 'پنجاه',
                        value: false
                      },
                      {
                        id: 1,
                        label: 'چهل',
                        value: false,
                      },
                      {
                        id: 2,
                        label: 'شصت ',
                        value: false,
                      },
                      {
                        id: 3,
                        label: 'هفتاد',
                        value: true,
                      },
                    ],
                  },
                ]
              },
            },
            {
              id: 32,
              type: 'goToTime',
            },
            {
              id: 33,
              type: 'goToTime',
             data: {
               start: 2, //2:00
               end: 4, //3:00
             }
            },
            {
              id: 34,
              type: 'goToTime',
             data: {
               start: 4, //3:00
               end: 6,  //7:00
             }
            },
            {
              id: 35,
              type: 'goToTime',
             data: {
               start: 8, //7:00
               end: 10,  //10:00
             }
            },
            {
              id: 36,
              type: 'goToTimePoint',
              data: {
                time_point_id: null
              },
            },

          ],
        }
      ],
    }
  },
}
</script>
