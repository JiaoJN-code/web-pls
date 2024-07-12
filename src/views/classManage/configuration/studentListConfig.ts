export const studentListColumn = [
  {
    title: '序号',
    dataIndex: 'index',
    slotName: 'index',
    width: '40px',
  },
  {
    title: '姓名',
    dataIndex: 'realName',
  },
  {
    title: '班级',
    dataIndex: 'className',
  },
  {
    title: '学号',
    dataIndex: 'userId',
  },
  {
    title: '手机号',
    dataIndex: 'userMobile',
  },
  {
    title: '邮箱',
    dataIndex: 'userEmail',
  },
  {
    title: '添加时间',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    slotName: 'optional',
  },
];

export const studentListSearch = [
  {
    type: 'input',
    label: '学号',
    prop: 'userId',
    placeholder: '请输入学号',
  },
  {
    type: 'input',
    label: '姓名',
    prop: 'realName',
    placeholder: '请输入姓名',
  },
  {
    type: 'input',
    label: '班级',
    prop: 'className',
  },
];
