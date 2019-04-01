import React from 'react'
import CustomMenu from "../CustomMenu/index";

const menus = [
  {
    title: '博客首页',
    icon: 'home',
    key: '/home'
  },
  {
    title: '统计图表',
    icon: 'line-chart',
    key: '/home/charts'
  },
  {
    title: '博客模块',
    icon: 'file-text',
    key: '/home/article/list',
    subs: [
      {key: '/home/article/list', title: '文章管理', icon: ''},
      {key: '/home/article/write', title: '写文章', icon: ''},
      {key: '/home/article/category', title: '技术分类', icon: ''},
    ]
  },
  {
    title: '展示信息',
    icon: 'edit',
    key: '/home/display/author',
    subs: [
      {key: '/home/display/author', title: '个人信息', icon: ''},
      {key: '/home/display/carousel', title: '首页轮播图', icon: ''},
    ]
  },
  {
    title: '访客模块',
    icon: 'user',
    key: '/home/visitor/record',
    subs: [
      {key: '/home/visitor/record', title: '访客记录', icon: '',},
      {key: '/home/visitor/statistical', title: '访客统计', icon: ''},
      {key: '/home/visitor/blacklist', title: '黑名单', icon: '',}
    ]
  },
  {
    title: '友情链接',
    icon: 'paper-clip',
    key: '/home/links',
  },
  {
    title: '关于博客',
    icon: 'question-circle',
    key: '/home/about'
  }
]


class SiderNav extends React.Component {
  render() {

    return (
      <div style={{height: '100vh',overflowY:'scroll'}}>
        <div style={styles.logo}></div>
        <CustomMenu menus={menus}/>
      </div>
    )
  }
}

const styles = {
  logo: {
    height: '32px',
    background: 'rgba(255, 255, 255, .2)',
    margin: '16px',
  }
}

export default SiderNav