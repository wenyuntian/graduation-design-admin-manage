import React from 'react'
import {Icon, Button, Col, Tag, Input, Modal, Row, Card, BackTop,Table, message} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import fetch from '../../utils/fetch'
import './style.css'

message.config({
  top: 250,
  duration: 2,
  maxCount: 3,
});
  
  const data = [{
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  }];

  class EditLink extends React.Component {
    state = { 
      visible: false,
    }
  
    showModal = (record) => {
      this.setState({
        visible: true,
      });
    }
  
    handleOk = (e) => {
      this.setState({
        visible: false,
      });
    }
  
    handleCancel = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }

    componentDidMount(){
　　　this.props.onRef(this)
　　}
  
    render() {
      return (
        <div>
          <Modal
            title="修改友情链接"
            width="320px"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Input placeholder="名称"></Input>
            <Input placeholder="地址" style={{marginTop:"16px"}}></Input>
          </Modal>
        </div>
      );
    }
  }

class FriendLink extends React.Component {

  state = {
    linkName: '',
    linkPath: '',
    linkList: []
  }

  componentWillMount() {
    this.getLinkList();
  }

  showModal = (record) => {
    this.child.showModal(record)
  }
  onRef = (ref) => {
　　this.child = ref
　}

  changeLinkNameAndPath = (type, e) => {
    const value = e.target.value
    
    switch(type) {
      case 'name':
        this.setState({
          linkName: value
        })
        break;
      default:
        this.setState({
          linkPath: value
        })
    }
  }

  getLinkList = () => {
    fetch('get', '/api/link/list', null, (response) => {
      const linkList = response.data.linkList;
      console.log(linkList)
      this.setState({
        linkList: linkList
      })
    })
  }

  addLink = () => {
    const {linkName, linkPath} = this.state;
    if(!!linkName && !!linkPath) {
      fetch('post', '/api/link/save', {name: linkName, path: linkPath}, (response) => {
        const link = response.data.link;

        if(!!link) {
          this.setState({
            linkList: this.state.linkList.concat(link),
            linkName: '',
            linkPath: ''
          })
        }
      })
    }
    else {
      message.error("请输入链接名和地址")
    }
  }

  deleteLink = (id) => {

    if(!!id) {
      fetch('post', '/api/link/delete', {id: id}, (response) => {
        const result = response.data.result;
        if(!!result) {
          this.setState({
            linkList: this.state.linkList.filter((item) => {
              return item._id !== id;
            })
          })
        }
      })
    }
  }

  columns = [{
      title: '名称',
      align: "center",
      dataIndex: 'name'
    }, {
      title: '地址',
      align: "center",
      className: 'column-money',
      dataIndex: 'path',
      width: "80px"
    }, {
      title: '发布时间',
      align: "center",
      dataIndex: 'createAt',
    },{
      title: '操作',
      align: "center",
      render: (text, record) => {
          return (<span>
              <Tag data-id={record.id} onClick={this.showModal.bind(this, record)} color="#409AE9"><Icon type="edit"></Icon> 编辑</Tag>
              <Tag onClick={this.deleteLink.bind(this, record._id)} color="#e53935"><Icon type="delete"></Icon> 删除</Tag>
          </span>)
      }
    }];

  render() {
    const {linkList, linkName, linkPath} = this.state;

    return (
      <div>
        <CustomBreadcrumb arr={['友情链接']}/>
        <Row gutter={18}>
            <Col span={6}>
                <Card>
                  <Card className="links-title" bordered={false}>
                    <Button type="primary" block={true}><Icon type="link"></Icon>友情链接</Button>
                  </Card>
                  <Row className="addLinks" gutter={8}>
                    <Col span={24}>
                        <Input placeholder="输入链接名称" value={linkName} onChange={this.changeLinkNameAndPath.bind(this, 'name')}/>
                    </Col>
                    <Col span={24}>
                        <Input placeholder="输入链接地址" value={linkPath} onChange={this.changeLinkNameAndPath.bind(this, 'path')}/>
                    </Col>
                    <Col span={24} style={{textAlign:"center"}}>
                        <Button type="primary" onClick={this.addLink}>新增</Button>
                    </Col>
                  </Row>
                </Card>
            </Col>
            <Col span={18}>
                <Card className="write-article-header" title='链接管理'>
                <Table
                    columns={this.columns}
                    dataSource={linkList}
                    bordered
                    size="small"
                />
                </Card>
            </Col>
        </Row>
        <EditLink onRef={this.onRef}/>
        <BackTop visibilityHeight={200} style={{right: 50}}/>
      </div>
    )
  }
}

export default FriendLink