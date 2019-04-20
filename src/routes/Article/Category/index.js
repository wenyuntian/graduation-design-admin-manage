import React from 'react'
import fetch from '../../../utils/fetch'
import {Icon, message, Button, Col, Tag, Input, List, Row, Card, BackTop,Table} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
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

class IconDemo extends React.Component {

  state = { 
    category: '',
    categoryList: [],
    allArticle: []
  }


  columns = [{
    title: '类别',
    align: "center",
    dataIndex: 'content'
  }, {
    title: '数量',
    align: "center",
    className: 'column-money',
    dataIndex: 'amount',
    width: "80px"
  }, {
    title: '发表时间',
    align: "center",
    dataIndex: 'createAt',
  },{
    title: '操作',
    align: "center",
    render: (text, record) => {
        return (<span>
            <Tag data-id={record.id} color="#409AE9"><Icon type="edit"></Icon> 编辑</Tag>
            <Tag onClick={this.deleteCategory.bind(this, record.id)} color="#e53935"><Icon type="delete"></Icon> 删除</Tag>
        </span>)
    }
  }];

  componentWillMount() {
    this.getCategoryList()
    this.getAllArticles()
  }

  getCategoryList = () => {
    fetch("get", "/api/category/list", null, (response) => {
      this.setState({
        categoryList: response.data.categoryList
      })
    })
  }

  getAllArticles = () => {
    fetch('get', '/api/article/getArticleClassification', null, (response) => {
      const allArticle = response.data.allArticle;
      console.log(response)
      this.setState({
        allArticle: allArticle
      })
    })
  }

  calculateCategoryArticleList = () => {
    const categoryList = this.state.categoryList;
    const allArticle = this.state.allArticle;

    return categoryList.map((categoryItem, index) => {
      const categoryArticleItem = {
        content: categoryItem.name, 
        createAt: categoryItem.createAt,
        key: index,
        id: categoryItem._id
      };
      categoryArticleItem.amount = allArticle.filter((articleItem) => {

        return categoryItem.name === articleItem.category;
      }).length;

      return categoryArticleItem;
    })
  }

  categoryChange = (e) => {
    this.setState({
      category: e.currentTarget.value
    })
  }

  addCategory = () => {
    if(!!this.state.category) {
      fetch('post','/api/category/add', {category: {name: this.state.category}}, (response) => {
        const category = response.data.category;
        if(!!category) {
          this.setState({
            categoryList: this.state.categoryList.concat(category),
            category: ''
          })
        }
      })
    }
  }

  deleteCategory = (id) => {
    if(id !== undefined) {
      fetch("post", "/api/category/delete", {id: id}, () => {
        this.setState({
          categoryList: this.state.categoryList.filter((item) => {
            console.log(`_id${item._id}   id:${id}`)
            return item._id !== id;
          })
        })
      })
    }
  }

  render() {
    const CategoryArticleList = this.calculateCategoryArticleList()
    const colorArray = ["#e53935", "#8e24aa", "#1e88e5", "#fb8c00", "#8e24aa"];
    let colorCount = 0;

    return (
      <div>
        <CustomBreadcrumb arr={['博客模块', '技术分类']}/>
        <Row gutter={18}>
            <Col span={6}>
                <Card>
                  <Card className="aside-title" bordered={false}>
                    <Button type="primary" block={true}><Icon type="edit"></Icon>技术分类</Button>
                  </Card>
                  <Row gutter={8}>
                    <Col span={16}>
                        <Input value={this.state.category} onChange={this.categoryChange} placeholder="输入文章类别"/>
                    </Col>
                    <Col span={8}>
                        <Button onClick={this.addCategory} type="primary">新增</Button>
                    </Col>
                  </Row>
                </Card>
                <Card bordered={false}>
                <List
                    header={<div>文章分类</div>}
                    size="small"
                    className="categories"
                    dataSource={CategoryArticleList}
                    split={false}
                    renderItem={item => {
                    let lenght = colorArray.length;
                    let backgroundColor = colorArray[colorCount % lenght];
                    colorCount ++; 
                    return (
                    <List.Item>
                        <div className="content-box">
                            <span className="category-list-dot" style={{background: backgroundColor}}></span>
                            {item.content}
                            <Tag color={backgroundColor}>{item.amount}篇</Tag>
                        </div>
                    </List.Item>
                    )}}
                />
                </Card>
            </Col>
            <Col span={18}>
                <Card className="write-article-header" title='技术分类'>
                <Table
                    columns={this.columns}
                    dataSource={CategoryArticleList}
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