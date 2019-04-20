import React from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'
import PrivateRoute from '../PrivateRoute'

const Home = LoadableComponent(()=>import('../../routes/Home/index'))  //参数一定要是函数，否则不会懒加载，只会代码拆分

//文章管理
const ArticleManage = LoadableComponent(()=>import('../../routes/Article/Manage/index'))
const ArticleWrite = LoadableComponent(()=>import('../../routes/Article/Write/index'))
const ArticleCategory = LoadableComponent(()=>import('../../routes/Article/Category/index'))

//页面展示
const Personal = LoadableComponent(()=>import('../../routes/Show/Personal/index'))
const Carousel = LoadableComponent(()=>import('../../routes/Show/Carousel/index'))

//友情链接
const FriendLink = LoadableComponent(()=>import('../../routes/FriendLink/index'))

//访客页面
const VisitorRecord = LoadableComponent(()=>import('../../routes/Visitor/Record/index'))
const BlackList = LoadableComponent(()=>import('../../routes/Visitor/BlackList/index'))

//显示组件Demo
const CarouselDemo = LoadableComponent(()=>import('../../routes/Display/CarouselDemo/index'))
const CollapseDemo = LoadableComponent(()=>import('../../routes/Display/CollapseDemo/index'))
const ListDemo = LoadableComponent(()=>import('../../routes/Display/ListDemo/index'))
const TableDemo = LoadableComponent(()=>import('../../routes/Display/TableDemo/index'))
const TabsDemo = LoadableComponent(()=>import('../../routes/Display/TabsDemo/index'))

//反馈组件Demo
const SpinDemo = LoadableComponent(()=>import('../../routes/Feedback/SpinDemo/index'))
const ModalDemo = LoadableComponent(()=>import('../../routes/Feedback/ModalDemo/index'))
const NotificationDemo = LoadableComponent(()=>import('../../routes/Feedback/NotificationDemo/index'))

//其它
const AnimationDemo = LoadableComponent(()=>import('../../routes/Other/AnimationDemo/index'))
const GalleryDemo = LoadableComponent(()=>import('../../routes/Other/GalleryDemo/index'))
const DraftDemo = LoadableComponent(()=>import('../../routes/Other/DraftDemo/index'))
const ChartView = LoadableComponent(()=>import('../../routes/Other/ChartView/index'))
const LoadingDemo = LoadableComponent(()=>import('../../routes/Other/LoadingDemo/index'))
const ErrorPage = LoadableComponent(()=>import('../../routes/Other/ErrorPage/index'))
const SpringText = LoadableComponent(()=>import('../../routes/Other/SpringText/index'))

//关于
const About = LoadableComponent(()=>import('../../routes/About/index'))

@withRouter
class ContentMain extends React.Component {
  render () {
    return (
      <div style={{padding: 16, position: 'relative'}}>
        <Switch>
          <PrivateRoute exact path='/home' component={Home}/>

          <PrivateRoute exact path='/home/charts' component={ChartView}/>


          <PrivateRoute exact path='/home/article/write' component={ArticleWrite}/>
          <PrivateRoute exact path='/home/article/list' component={ArticleManage}/>
          <PrivateRoute exact path='/home/article/category' component={ArticleCategory}/>

          <PrivateRoute exact path='/home/display/personal' component={Personal}/>
          <PrivateRoute exact path='/home/display/carousel' component={Carousel}/>

          <PrivateRoute exact path='/home/links' component={FriendLink}/>

          <PrivateRoute exact path='/home/visitor/record' component={VisitorRecord}/>
          <PrivateRoute exact path='/home/visitor/blacklist' component={BlackList}/>

          <PrivateRoute exact path='/home/about' component={About}/>

          <Redirect exact from='/' to='/home'/>
        </Switch>
      </div>
    )
  }
}

export default ContentMain