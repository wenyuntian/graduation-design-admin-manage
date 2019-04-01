import React from 'react'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import TypingCard from '../../../components/TypingCard'
import { Card, Row, Col, BackTop, DatePicker, Icon, Button } from 'antd'
import { Chart, Axis, Geom, Tooltip } from 'bizcharts'
import './style.css'

const { RangePicker } = DatePicker;

const data = [
  {date: '3月28', value: 475},
  {date: '3月29', value: 457},
  {date: '3月30', value: 308},
  {date: '3月31', value: 726},
  {date: '4月01', value: 969},
  {date: '4月02', value: 584},
  {date: '4月03', value: 1204},
  {date: '4月04', value: 1127},
  {date: '4月05', value: 1000},
  {date: '4月06', value: 1024}
]
const cols = {
  'value': {min: 0},
  'date': {range: [0, 1]}
}

const data2 = [
  {id: '51', value: 754},
  {id: '12', value: 545},
  {id: '56', value: 465},
  {id: '7', value: 384},
  {id: '18', value: 762},
  {id: '15', value: 772},
  {id: '10', value: 947},
  {id: '2', value: 845},
  {id: '17', value: 845},
  {id: '64', value: 845},
]
const cols2 = {
  'value':  {min: 0},
}


class ChartDemo extends React.Component {
  displayArticleById = (id) => {
    
  }
  getOriginData = (ev) => {
    console.log(ev.data)
  }
  render () {
    return (
      <div>
        <CustomBreadcrumb arr={['统计图表']}/>
        <Row gutter={18} className='numbers'>
          <Col span={6}>
            <Card title='所有文章' className='card-item' extra={<Button size='small' type="primary">总数</Button>}>
              <h2>28</h2>
              <div className='card-detail' style={{color:'#36bafb'}}>
                <span className='left'>已发表</span>
                <span className='right'><Icon type="pie-chart" /> 53%</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card title='草稿箱' className='card-item' extra={<Button style={{background: '#ED5565',color: '#fff'}} size='small' type="danger">总数</Button>}> 
              <h2>28</h2>
              <div className='card-detail' style={{color:'#ED5565'}}>
                <span className='left'>已发表</span>
                <span className='right'><Icon type="pie-chart" /> 53%</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card title='今日访客' className='card-item' extra={<Button style={{background: '#F8AC59',border: 'none'}} size='small' type="primary">总数</Button>}> 
              <h2>28</h2>
              <div className='card-detail' style={{color:'#F8AC59'}}>
                <span className='left'>已发表</span>
                <span className='right'><Icon type="eye" />1024</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card title='历史访客' className='card-item' extra={<Button style={{background: '#1C84C6', border: 'none'}} size='small' type="primary">总数</Button>}> 
              <h2>28</h2>
              <div className='card-detail' style={{color:'#1C84C6'}}>
                <span className='left'>已发表</span>
                <span className='right'><Icon type="eye" />2048</span>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}>
            <Card title='博客日浏览量折线图' bordered={false} className='card-item'>
              <Chart height={400} data={data} scale={cols} forceFit>
                <Axis name="date"/>
                <Axis name="value"/>
                <Tooltip crosshairs={{type: 'y'}}/>
                <Geom select={true} type="line" position="date*value" size={2}/>
                <Geom type='point' position="date*value" size={4} shape={'circle'}
                      style={{stroke: '#fff', lineWidth: 1}}/>
              </Chart>
              <div className='legend-box' style={styles.legendBox}>
                <RangePicker/>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title='文章总浏览量柱状图(X轴：文章id，Y轴：浏览量)' bordered={false} className='card-item'>
              <Chart onPlotClick={this.getOriginData} height={400} data={data2} scale={cols2} forceFit>
                <Axis name="id"/>
                <Axis name="value"/>
                <Tooltip crosshairs={{type: 'y'}}/>
                <Geom type="interval" position="id*value"/>
              </Chart>
              <div className='legend-box' style={styles.legendBox}>
                <p style={{margin: 0}}>注：点击对应列，可查看文章</p>
              </div>
            </Card>
          </Col>
        </Row>
        <BackTop visibilityHeight={200} style={{right: 50}}/>
      </div>
    )
  }
}

const styles = {
  legendBox: {
    textAlign: 'center',
    marginTop: '-36px'
  }
}

export default ChartDemo