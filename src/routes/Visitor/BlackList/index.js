import React from 'react'
import {Icon, Button, Col, Tag, DatePicker, List, Row, Card, BackTop,Table, Input} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import Highlighter from "react-highlight-words";
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
    key: '2',
    ip: '203.208.60.18',
    isBlack: false,
    address: '北京省北京市 电信',
    browser: 'chrome',
    system: 'windows',
    time: '2019/04/04 13:35:06',
  }, {
    key: '3',
    ip: '203.208.60.18',
    isBlack: false,
    address: '北京省北京市 电信',
    browser: 'chrome',
    system: 'windows',
    time: '2019/04/04 13:35:06',
  }];

  const tags = ['教育网','IE','Chrome','iPhone','iPad','Mac','Android','Windows','Linux','Firefox']

class BlackList extends React.Component {

    testClick = (e) => {
        console.log(e.currentTarget.getAttribute("data-id"))
    }
  render() {
    return (
      <div className="visitor-content">
        <CustomBreadcrumb arr={['访客模块', '黑名单']}/>
        <Row gutter={18}>
            <Col span={6}>
                <Card>
                  <Card className="visitor" bordered={false}>
                    <Button type="primary" block={true}><Icon type="edit"></Icon>黑名单</Button>
                  </Card>
                  <List 
                    className="visitor-record"
                    header={<div>黑名单</div>}
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
                    {tags.map((item,index) => (
                        <List.Item key={index}>
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
                <FilterTable/ >
                </Card>
            </Col>
        </Row>
        <BackTop visibilityHeight={200} style={{right: 50}}/>
      </div>
    )
  }
}

  
  class FilterTable extends React.Component {
    state = {
      searchText: ""
    };
  
    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) => (
        <div
          style={{
            width: 320,
            padding: 8,
            position: "absolute",
            top: "-132px",
            left: "480px",
            height: "36px",
            lineHeight: "36px"
          }}
        >
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`输入关键字`}
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 150, display: "inline-block" }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginLeft: 8 }}
          >
            搜索
          </Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="search" style={{ display: "none" }} />
      ),
      filterDropdownVisible: true,
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
  
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      )
    });
  
    handleSearch = (selectedKeys, confirm) => {
      confirm();
      this.setState({ searchText: selectedKeys[0] });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: "" });
    };
  
    render() {
      const columns = [{
        title: 'IP地址',
        align: "center",
        dataIndex: 'ip',
        ...this.getColumnSearchProps("ip")
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
                <Tag data-id={record.id} color="#108ee9"><Icon type="rollback"></Icon> 移除黑名单</Tag>  
            </span>)
        }
      }];
      return (
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
      );
    }
  }

export default BlackList