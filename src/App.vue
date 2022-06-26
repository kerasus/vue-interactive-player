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
              data: {
                legal_time: 4,
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
                    statement: '۲-سن پسر علی؟',
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
        },


        // {
        //   id: 30,
        //   poster: 'https://nodes.alaatv.com/media/thumbnails/1374/1374000asdf.jpg',
        //   sources: [
        //     {
        //       src: 'https://nodes.alaatv.com/media/1374/HD_720p/1374000asdf.mp4',
        //       type: 'video/mp4',
        //       res: '720p',
        //       label: 'کیفیت عالی',
        //     },
        //     {
        //       src: 'https://nodes.alaatv.com/media/1374/hq/1374000asdf.mp4',
        //       type: 'video/mp4',
        //       res: '480p',
        //       label: 'کیفیت بالا',
        //     },
        //     {
        //       src: 'https://nodes.alaatv.com/media/1374/240p/1374000asdf.mp4',
        //       type: 'video/mp4',
        //       res: '240p',
        //       label: 'کیفیت متوسط',
        //       selected: true,
        //     },
        //   ],
        //   start: 2,
        //   end: 4,
        //   legal_time: 2640,
        //   tasks: [
        //     {
        //       id: 0,
        //       type: 'QuestionOfKnowingSubject',
        //       pre_show: true,
        //       data: {
        //         statement: 'می خوایم مبحث فیلان رو تدریس کنیم، می خوای ببینی؟',
        //         choices: [
        //           {
        //             label: 'بلد نیستم و می خوام ببینم',
        //             value: 2,
        //             task_id: 3
        //           },
        //           {
        //             label: 'بلدم و نمی خوام ببینم',
        //             value: 1,
        //             task_id: 4
        //           },
        //           {
        //             label: 'بلدم و می خوام ببینم',
        //             value: 0,
        //             task_id: 3
        //           },
        //         ],
        //       },
        //     },
        //     {
        //       id: 1,
        //       type: 'Exam',
        //       post_show: true,
        //       data: {
        //         examTitle:'تست ۱ (چهارگزینه ای)',
        //         next_task_id: 2,
        //         next_task_auto_play: false,
        //         questions: [
        //           {
        //             id: 0,
        //             task_id: 5,
        //             statement: '۱-رزمنده ای گلوله ای با سرعت فیلان به طرف هدف شلیک می کند و ۶s پس از شلیک صدای انفجار را می شنود. گلر سرعت ۳۴۰ باشد، فاصله شخص از هدف چند متر است؟',
        //             choices: [
        //               {
        //                 id: 0,
        //                 label: 'یک متر',
        //                 value: false
        //               },
        //               {
        //                 id: 1,
        //                 label: 'یک دو',
        //                 value: false,
        //               },
        //               {
        //                 id: 2,
        //                 label: 'یک سه',
        //                 value: false,
        //               },
        //               {
        //                 id: 3,
        //                 label: 'یک چهار',
        //                 value: true,
        //               },
        //             ],
        //           },
        //           {
        //             id: 1,
        //             task_id: 6,
        //             statement: '۲-شخصی بین دو رشته کوه موازی گلوله ای را شلیک می کند و دو پزواک صوت با اختلاف ۵ ثانیه به وی می رسد. اگر سرعت صوت ۳۴۰ باشد اختلاف فاصله شخص از دو رشته کوه چند متر است؟',
        //             choices: [
        //               {
        //                 id: 0,
        //                 label: 'ده متر',
        //                 value: false
        //               },
        //               {
        //                 id: 1,
        //                 label: 'دوازده دو',
        //                 value: false,
        //               },
        //               {
        //                 id: 2,
        //                 label: 'شانزده سه',
        //                 value: false,
        //               },
        //               {
        //                 id: 3,
        //                 label: 'پانزده چهار',
        //                 value: true,
        //               },
        //             ],
        //           },
        //           {
        //             id: 2,
        //             task_id: 7,
        //             statement: '۳-قایقی اگر در جهت آب پارو بزند، فاصله بین دو نقطه را در t ثانیه و اگر در خلاف جهت جریان آب پارو بزند، فاثله بین همان دو نقطه را در 5s طی می کند. سرعت قایق چقدر است؟',
        //             choices: [
        //               {
        //                 id: 0,
        //                 label: 'یک متر بر ثانیه',
        //                 value: false,
        //               },
        //               {
        //                 id: 1,
        //                 label: 'دوازده متر بر ثانیه',
        //                 value: false,
        //               },
        //               {
        //                 id: 2,
        //                 label: 'شانزده متر بر ثانیه',
        //                 value: false,
        //               },
        //               {
        //                 id: 3,
        //                 label: 'پانزده متر بر ثانیه',
        //                 value: true,
        //               },
        //             ],
        //           },
        //           {
        //             id: 3,
        //             task_id: 8,
        //             statement: '۴-رودخانه ای به عرض ۱۲۰ متر دارای جریان آب با سرعت ۳ می باشد. قایقی می خواهد با سرعت ثابت ۵ به نقطه مقابل در طرف دیگر برسد. حداقل زمان ممکن چقدر است؟',
        //             choices: [
        //               {
        //                 id: 0,
        //                 label: 'یک ثانیه',
        //                 value: false,
        //               },
        //               {
        //                 id: 1,
        //                 label: 'دوازده ثانیه',
        //                 value: false,
        //               },
        //               {
        //                 id: 2,
        //                 label: 'شانزده ثانیه',
        //                 value: false,
        //               },
        //               {
        //                 id: 3,
        //                 label: 'پانزده ثانیه',
        //                 value: true,
        //               },
        //             ],
        //           },
        //           {
        //             id: 4,
        //             task_id: 9,
        //             statement: '۵-رودخانه ای به عرض ۱۲۰ متر دارای جریان آب با سرعت ۳ می باشد. قایقی می خواهد با سرعت ثابت ۵ به طرف دیگر رودخانه برود. حداقل زمان ممکن چقدر است؟',
        //             choices: [
        //               {
        //                 id: 0,
        //                 label: 'شانزده ثانیه',
        //                 value: false,
        //               },
        //               {
        //                 id: 1,
        //                 label: 'دوازده ثانیه',
        //                 value: false,
        //               },
        //               {
        //                 id: 2,
        //                 label: 'یک ثانیه',
        //                 value: false,
        //               },
        //               {
        //                 id: 3,
        //                 label: 'پانزده ثانیه',
        //                 value: true,
        //               },
        //             ],
        //           },
        //         ]
        //       },
        //     },
        //     {
        //       id: 2,
        //       type: 'Exam',
        //       data: {
        //         examTitle:'تست های تسلط',
        //         legal_time: 50,
        //         next_task_id: 10,
        //         next_task_auto_play: false,
        //         questions: [
        //           {
        //             id: 0,
        //             task_id: 5,
        //             statement: '۱-رزمنده ای گلوله ای با سرعت فیلان به طرف هدف شلیک می کند و ۶s پس از شلیک صدای انفجار را می شنود. گلر سرعت ۳۴۰ باشد، فاصله شخص از هدف چند متر است؟',
        //             choices: [
        //               {
        //                 label: 'یک متر',
        //                 value: false
        //               },
        //               {
        //                 label: 'یک دو',
        //                 value: false,
        //               },
        //               {
        //                 label: 'یک سه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'یک چهار',
        //                 value: true,
        //               },
        //             ],
        //           },
        //           {
        //             id: 1,
        //             task_id: 6,
        //             statement: '۲-شخصی بین دو رشته کوه موازی گلوله ای را شلیک می کند و دو پزواک صوت با اختلاف ۵ ثانیه به وی می رسد. اگر سرعت صوت ۳۴۰ باشد اختلاف فاصله شخص از دو رشته کوه چند متر است؟',
        //             choices: [
        //               {
        //                 label: 'ده متر',
        //                 value: false
        //               },
        //               {
        //                 label: 'دوازده دو',
        //                 value: false,
        //               },
        //               {
        //                 label: 'شانزده سه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'پانزده چهار',
        //                 value: true,
        //               },
        //             ],
        //           },
        //           {
        //             id: 2,
        //             task_id: 7,
        //             statement: '۳-قایقی اگر در جهت آب پارو بزند، فاصله بین دو نقطه را در t ثانیه و اگر در خلاف جهت جریان آب پارو بزند، فاثله بین همان دو نقطه را در 5s طی می کند. سرعت قایق چقدر است؟',
        //             choices: [
        //               {
        //                 label: 'یک متر بر ثانیه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'دوازده متر بر ثانیه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'شانزده متر بر ثانیه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'پانزده متر بر ثانیه',
        //                 value: true,
        //               },
        //             ],
        //           },
        //         ]
        //       },
        //     },
        //     {
        //       id: 3,
        //       type: 'goToTime'
        //     },
        //     {
        //       id: 4,
        //       type: 'goToTimePoint',
        //       data: {
        //         time_point_id: 1
        //       },
        //     },
        //
        //     {
        //       id: 5,
        //       type: 'goToTime',
        //       data: {
        //         poster: 'https://nodes.alaatv.com/media/thumbnails/1374/1374008uhvf.jpg',
        //         sources: [
        //           {
        //             src: 'https://nodes.alaatv.com/media/1374/HD_720p/1374008uhvf.mp4',
        //             type: 'video/mp4',
        //             res: '720p',
        //             label: 'کیفیت عالی',
        //           },
        //           {
        //             src: 'https://nodes.alaatv.com/media/1374/hq/1374008uhvf.mp4',
        //             type: 'video/mp4',
        //             res: '480p',
        //             label: 'کیفیت بالا',
        //           },
        //           {
        //             src: 'https://nodes.alaatv.com/media/1374/240p/1374008uhvf.mp4',
        //             type: 'video/mp4',
        //             res: '240p',
        //             label: 'کیفیت متوسط',
        //             selected: true,
        //           },
        //         ],
        //         start: 79,
        //         end: 380,
        //       },
        //     },
        //     {
        //       id: 6,
        //       type: 'goToTime',
        //       data: {
        //         poster: 'https://nodes.alaatv.com/media/thumbnails/1374/1374008uhvf.jpg',
        //         sources: [
        //           {
        //             src: 'https://nodes.alaatv.com/media/1374/HD_720p/1374008uhvf.mp4',
        //             type: 'video/mp4',
        //             res: '720p',
        //             label: 'کیفیت عالی',
        //           },
        //           {
        //             src: 'https://nodes.alaatv.com/media/1374/hq/1374008uhvf.mp4',
        //             type: 'video/mp4',
        //             res: '480p',
        //             label: 'کیفیت بالا',
        //           },
        //           {
        //             src: 'https://nodes.alaatv.com/media/1374/240p/1374008uhvf.mp4',
        //             type: 'video/mp4',
        //             res: '240p',
        //             label: 'کیفیت متوسط',
        //             selected: true,
        //           },
        //         ],
        //         start: 380,
        //         end: 982,
        //       },
        //     },
        //     {
        //       id: 7,
        //       type: 'goToTime',
        //       data: {
        //         poster: 'https://nodes.alaatv.com/media/thumbnails/1374/1374008uhvf.jpg',
        //         sources: [
        //           {
        //             src: 'https://nodes.alaatv.com/media/1374/HD_720p/1374008uhvf.mp4',
        //             type: 'video/mp4',
        //             res: '720p',
        //             label: 'کیفیت عالی',
        //           },
        //           {
        //             src: 'https://nodes.alaatv.com/media/1374/hq/1374008uhvf.mp4',
        //             type: 'video/mp4',
        //             res: '480p',
        //             label: 'کیفیت بالا',
        //           },
        //           {
        //             src: 'https://nodes.alaatv.com/media/1374/240p/1374008uhvf.mp4',
        //             type: 'video/mp4',
        //             res: '240p',
        //             label: 'کیفیت متوسط',
        //             selected: true,
        //           },
        //         ],
        //         start: 982,
        //         end: 1231,
        //       },
        //     },
        //     {
        //       id: 8,
        //       type: 'goToTime',
        //       data: {
        //         poster: 'https://nodes.alaatv.com/media/thumbnails/1374/1374008uhvf.jpg',
        //         sources: [
        //           {
        //             src: 'https://nodes.alaatv.com/media/1374/HD_720p/1374008uhvf.mp4',
        //             type: 'video/mp4',
        //             res: '720p',
        //             label: 'کیفیت عالی',
        //           },
        //           {
        //             src: 'https://nodes.alaatv.com/media/1374/hq/1374008uhvf.mp4',
        //             type: 'video/mp4',
        //             res: '480p',
        //             label: 'کیفیت بالا',
        //           },
        //           {
        //             src: 'https://nodes.alaatv.com/media/1374/240p/1374008uhvf.mp4',
        //             type: 'video/mp4',
        //             res: '240p',
        //             label: 'کیفیت متوسط',
        //             selected: true,
        //           },
        //         ],
        //         start: 1231,
        //         end: 1435,
        //       },
        //     },
        //     {
        //       id: 9,
        //       type: 'goToTime',
        //       data: {
        //         poster: 'https://nodes.alaatv.com/media/thumbnails/1374/1374008uhvf.jpg',
        //         sources: [
        //           {
        //             src: 'https://nodes.alaatv.com/media/1374/HD_720p/1374008uhvf.mp4',
        //             type: 'video/mp4',
        //             res: '720p',
        //             label: 'کیفیت عالی',
        //           },
        //           {
        //             src: 'https://nodes.alaatv.com/media/1374/hq/1374008uhvf.mp4',
        //             type: 'video/mp4',
        //             res: '480p',
        //             label: 'کیفیت بالا',
        //           },
        //           {
        //             src: 'https://nodes.alaatv.com/media/1374/240p/1374008uhvf.mp4',
        //             type: 'video/mp4',
        //             res: '240p',
        //             label: 'کیفیت متوسط',
        //             selected: true,
        //           },
        //         ],
        //         start: 1435,
        //         end: 1627,
        //       },
        //     },
        //
        //     {
        //       id: 10,
        //       type: 'goToTimePoint',
        //       data: {
        //         time_point_id: 1
        //       },
        //     },
        //   ],
        // },
        // {
        //   id: 1,
        //   poster: 'https://nodes.alaatv.com/media/thumbnails/769/769001zone.jpg',
        //   sources: [
        //     {
        //       src: 'https://nodes.alaatv.com/media/769/HD_720p/769001zone.mp4',
        //       type: 'video/mp4',
        //       res: '720p',
        //       label: 'کیفیت عالی',
        //     },
        //     {
        //       src: 'https://nodes.alaatv.com/media/769/hq/769001zone.mp4',
        //       type: 'video/mp4',
        //       res: '480p',
        //       label: 'کیفیت بالا',
        //     },
        //     {
        //       src: 'https://nodes.alaatv.com/media/769/240p/769001zone.mp4',
        //       type: 'video/mp4',
        //       res: '240p',
        //       label: 'کیفیت متوسط',
        //       selected: true,
        //     },
        //   ],
        //   start: 0,
        //   end: 2,
        //   tasks: [
        //     {
        //       id: 0,
        //       type: 'QuestionOfKnowingSubject',
        //       pre_show: true,
        //       data: {
        //         statement: 'می خوایم مبحث فیلان رو تدریس کنیم، می خوای ببینی؟',
        //         choices: [
        //           {
        //             label: 'بلدم و می خوام ببینم',
        //             value: 0,
        //             task_id: 3
        //           },
        //           {
        //             label: 'بلدم و نمی خوام ببینم',
        //             value: 1,
        //             task_id: 4
        //           },
        //           {
        //             label: 'بلد نیستم و می خوام ببینم',
        //             value: 2,
        //             task_id: 3
        //           },
        //         ],
        //       },
        //     },
        //     {
        //       id: 1,
        //       type: 'Exam',
        //       post_show: true,
        //       data: {
        //         examTitle:'تست های تسلط',
        //         next_task_id: 2,
        //         next_task_auto_play: false,
        //         questions: [
        //           {
        //             id: 0,
        //             task_id: 5,
        //             statement: '۱-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
        //             choices: [
        //               {
        //                 label: 'گزینه های یکپارچه',
        //                 value: false
        //               },
        //               {
        //                 label: 'گزینه های درهم',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه های متفرقه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه درست',
        //                 value: true,
        //               },
        //             ],
        //           },
        //           {
        //             id: 1,
        //             task_id: 6,
        //             statement: '۲-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
        //             choices: [
        //               {
        //                 label: 'گزینه های یکپارچه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه های درهم',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه های متفرقه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه درست',
        //                 value: true,
        //               },
        //             ],
        //           },
        //           {
        //             id: 2,
        //             task_id: 7,
        //             statement: '۳-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
        //             choices: [
        //               {
        //                 label: 'گزینه های یکپارچه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه های درهم',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه های متفرقه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه درست',
        //                 value: true,
        //               },
        //             ],
        //           },
        //           {
        //             id: 3,
        //             task_id: 8,
        //             statement: '۴-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
        //             choices: [
        //               {
        //                 label: 'گزینه های یکپارچه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه های درهم',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه های متفرقه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه درست',
        //                 value: true,
        //               },
        //             ],
        //           },
        //           {
        //             id: 4,
        //             task_id: 9,
        //             statement: '۵-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
        //             choices: [
        //               {
        //                 label: 'گزینه های یکپارچه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه های درهم',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه های متفرقه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه درست',
        //                 value: true,
        //               },
        //             ],
        //           },
        //         ]
        //       },
        //     },
        //     {
        //       id: 2,
        //       type: 'Exam',
        //       data: {
        //         examTitle:'تست های تسلط',
        //         legal_time: 10,
        //         next_task_id: 10,
        //         next_task_auto_play: false,
        //         questions: [
        //           {
        //             id: 0,
        //             task_id: 5,
        //             statement: '۱-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
        //             choices: [
        //               {
        //                 label: 'گزینه های یکپارچه',
        //                 value: false
        //               },
        //               {
        //                 label: 'گزینه های درهم',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه های متفرقه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه درست',
        //                 value: true,
        //               },
        //             ],
        //           },
        //           {
        //             id: 1,
        //             task_id: 6,
        //             statement: '۲-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
        //             choices: [
        //               {
        //                 label: 'گزینه های یکپارچه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه های درهم',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه های متفرقه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه درست',
        //                 value: true,
        //               },
        //             ],
        //           },
        //           {
        //             id: 2,
        //             task_id: 7,
        //             statement: '۳-به عنوان یک سوال ساده، جواب این سوال ساده کدام گزینه هست؟',
        //             choices: [
        //               {
        //                 label: 'گزینه های یکپارچه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه های درهم',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه های متفرقه',
        //                 value: false,
        //               },
        //               {
        //                 label: 'گزینه درست',
        //                 value: true,
        //               },
        //             ],
        //           },
        //         ]
        //       },
        //     },
        //     {
        //       id: 3,
        //       type: 'goToTime'
        //     },
        //     {
        //       id: 4,
        //       type: 'goToTimePoint',
        //       data: {
        //         time_point_id: 1
        //       },
        //     },
        //
        //     {
        //       id: 5,
        //       type: 'goToTime',
        //       data: {
        //         start: 50,
        //         end: 52,
        //       },
        //     },
        //     {
        //       id: 6,
        //       type: 'goToTime',
        //       data: {
        //         start: 62,
        //         end: 64,
        //       },
        //     },
        //     {
        //       id: 7,
        //       type: 'goToTime',
        //       data: {
        //         start: 94,
        //         end: 96,
        //       },
        //     },
        //     {
        //       id: 8,
        //       type: 'goToTime',
        //       data: {
        //         start: 102,
        //         end: 104,
        //       },
        //     },
        //     {
        //       id: 9,
        //       type: 'goToTime',
        //       data: {
        //         start: 120,
        //         end: 122,
        //       },
        //     },
        //
        //     {
        //       id: 10,
        //       type: 'goToTimePoint',
        //       data: {
        //         time_point_id: 1
        //       },
        //     },
        //   ],
        // },
      ],
    }
  }
}
</script>
