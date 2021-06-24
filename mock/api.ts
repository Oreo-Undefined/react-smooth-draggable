export default {
  '/user': {
    code: 1,
    success: true,
    msg: '',
    data: {
      name: '靓仔',
      id: 1,
      avatar: '',
      routers: ['all'],
    },
  },
  'POST /login': {
    code: 1,
    success: true,
    msg: '',
    data: null,
  },
  '/chart': {
    code: 1,
    success: true,
    msg: '',
    data: {
      total: 6,
      list: [
        {
          name: '一月',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: '二月',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: '三月',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: '四月',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: '五月',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: '六月',
          uv: 1850,
          pv: 4700,
          amt: 2081,
        },
      ],
    },
  },
};
