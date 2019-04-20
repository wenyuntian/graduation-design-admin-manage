import React from 'react'
import {Icon, Button, Col, Tag, DatePicker, List, Row, Card, BackTop,Table} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import './style.css'
const { RangePicker } = DatePicker;

  const data = [{
    key: '1',
    ip: '203.208.60.18',
    isBlack: true,
    address: '北京省北京市 电信',
    browser: 'chrome',
    system: 'windows',
    time: '2019/04/04 13:35:06',
  }, {
    key: '1',
    ip: '203.208.60.18',
    isBlack: false,
    address: '北京省北京市 电信',
    browser: 'chrome',
    system: 'windows',
    time: '2019/04/04 13:35:06',
  }, {
    key: '1',
    ip: '203.208.60.18',
    isBlack: false,
    address: '北京省北京市 电信',
    browser: 'chrome',
    system: 'windows',
    time: '2019/04/04 13:35:06',
  }];

  const tags = ['教育网','IE','Chrome','iPhone','iPad','Mac','Android','Windows','Linux','Firefox']

class IconDemo extends React.Component {

    columns = [{
        title: 'IP地址',
        align: "center",
        dataIndex: 'ip'
      }, {
        title: '地区',
        align: "center",
        className: 'column-money',
        dataIndex: 'address',
      }, {
        title: '浏览器',
        align: "center",
        dataIndex: 'browser',
      }, {
        title: '操作系统',
        align: "center",
        dataIndex: 'system',
      }, {
        title: '访问时间',
        align: "center",
        dataIndex: 'time',
      },{
        title: '操作',
        align: "center",
        dataIndex: 'money',
        render: (text, record) => {
            return (<span>
                {record.isBlack === false 
                ? <Tag data-id={record.id} color="#e53935"><Icon type="lock"></Icon> 加入黑名单</Tag>
                : <Tag data-id={record.id} color="#108ee9"><Icon type="rollback"></Icon> 移除黑名单</Tag>
                 }   
            </span>)
        }
      }];
    testClick = (e) => {
        console.log(e.currentTarget.getAttribute("data-id"))
    }
  render() {
    return (
      <div className="visitor-content">
        <CustomBreadcrumb arr={['访客模块', '访客记录']}/>
        <Row gutter={18}>
            <Col span={6}>
                <Card>
                  <Card className="visitor" bordered={false}>
                    <Button type="primary" block={true}><Icon type="edit"></Icon>访客记录</Button>
                  </Card>
                  <List 
                    className="visitor-record"
                    header={<div>访客记录</div>}
                    size="small"
                    split={false}>
                        <List.Item>
                            <div className="content-box" style={{color:"#108ee9"}}>
                                <span><Icon type="eye"></Icon> 访客人数</span>
                                <Tag color="#108ee9">10240</Tag>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="content-box" style={{color:"#e53935"}}>
                                <span><Icon type="lock"></Icon> 黑名单</span>
                                <Tag color="#e53935">12</Tag>
                            </div>
                        </List.Item>
                    </List>
                    <List
                    header={<div>指定日期查询</div>}
                    size="small"
                    split={false}>
                        <List.Item>
                            <RangePicker size="small" />
                        </List.Item>
                    </List>
                    <List
                    className="tag-filter"
                    header={<div>快捷筛选</div>}
                    size="small"
                    split={false}>
                    {tags.map((item) => (
                        <List.Item>
                            <span>
                                <Icon type="filter"></Icon>
                                {item}
                            </span>
                        </List.Item>
                    ))}
                    </List>
                </Card>
            </Col>
            <Col span={18}>
                <Card className="write-article-header" title='黑名单'>
                <Table
                    columns={this.columns}
                    dataSource={data}
                    bordered
                    size="small"
                />
                </Card>
            </Col>
        </Row>
        <BackTop visibilityHeight={200} style={{right: 50}}/>
      </div>
    )
  }
}

export default IconDemo