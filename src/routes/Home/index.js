import React from 'react'
import {Carousel} from 'antd'
import './style.css'

const imgs = [
  'https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/slide1.jpg?raw=true',
  'https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/slide2.jpg?raw=true',
  'https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/slide3.jpg?raw=true',
  'https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/slide4.jpg?raw=true'
]

const animations = [
  ['bounceInDown','bounceInUp'],
  ['bounceInLeft','bounceInRight'],
  ['rotateIn','rotateIn'],
  ['flipInX','flipInY'],
  ['rotateInDownLeft','rotateInUpRight'],
  ['rotateInDownRight','rotateInUpLeft'],
  ['zoomInLeft','zoomInRight'],
  ['zoomInDown','zoomInUp'],
  ['zoomIn','zoomIn'],
  ['lightSpeedIn','bounceInLeft'],
]

const text = [
  { title: 'Wellcome to dayday\'s blog', detail: 'You can find the source code in my github'},
  { title: 'Never give up', detail: 'It\'s always morning somewhere in the world'},
  { title: 'Do your best today', detail: 'The best preparation for tomorrow is doing your best today'},
  { title: 'About dream', detail: 'everyone should take action with a dream and be strong with a reason'}
]

function getAnimation(animations){
  let index = Math.floor(Math.random()*animations.length)
  let arr = animations[index]
  arr = arr.map(item=>{
    return `${item} animated slider-active`
  })
  return arr
}

class Home extends React.Component {
  state = {
    current:0
  }

  animations = getAnimation(animations)
  componentWillUpdate(){
    //当current变化时，也就是state变化时重新给animations赋值，否则animations不会改变.实现类似vue的watch
    //用componentWUpdate还是componentDidUpdate根据具体场景，componentDidUpdate一般是需要用到state时调用（因为setState是异步，需要等更新完成）
    let temp  =  getAnimation(animations)
    while (this.animations[0] === temp[0] ) {
      temp = getAnimation(animations)
    }
    this.animations = temp

  }
  render() {
    const { current} = this.state;
    const length = imgs.length;

    return (
      <div style={styles.bg} className='home'>
        <Carousel speed={100} arrows effect='fade' afterChange={(current)=>this.setState({current})} autoplay className='size'>
          {imgs.map((item, index)=> {
            return <div key={item}>
                    <div className='size' style={{backgroundImage:`url(${item})`}}>
                      <div className='text'>
                        <h3 className={current === index ? this.animations[0] : ''}>{current === index ? text[index % length].title : ''}</h3>
                        <p className={current === index ? this.animations[1] : ''}>{current === index ? text[index % length].detail : ''}</p>
                      </div>
                    </div>
                   </div>
          })}
        </Carousel>
      </div>
    )
  }
}

const styles = {
  bg:{
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'calc(100vh - 64px)'
  }
}

export default Home