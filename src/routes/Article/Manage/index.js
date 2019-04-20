import React from 'react'
import {Link} from 'react-router-dom'
import {Card,Tag, Button, Icon, Table, Divider, BackTop, Affix, Anchor, Form, InputNumber, Input} from 'antd'
import fetch from '../../../utils/fetch'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import './style.css'
  
class ArticleList extends React.Component {
  state = {
    selectedRowKeys: [],
    articleList: [],
    selectedArticle: [],
    allArticle: []
  };

  componentWillMount(){
    this.getAllArticles();
  }

  getAllArticles = () => {
    fetch('get', '/api/article/getArticleClassification', null, (response) => {
      const allArticle = response.data.allArticle;
      this.setState({
        articleList: allArticle,
        allArticle: allArticle
      })
    })
  }

  deleteArticles = () => {
    fetch('post', '/api/article/delete', {ids: this.state.selectedArticle}, () => {
      const filterArticle = this.state.allArticle.filter((item) => {
        return this.state.selectedArticle.indexOf(item._id) === -1
        ? true
        : false
      })
      this.setState({
        articleList: filterArticle,
        allArticle: filterArticle,
        selectedArticle: []
      })
    })
  }

  recommendArticles = (id, isRecommend) => {
    console.log(isRecommend)
    const ids = id != null ? [id] : this.state.selectedArticle;
    console.log(ids)

    fetch('post', '/api/article/setRecommend', {ids: ids, isRecommend: isRecommend}, () => {
      const recommendArticle = this.state.allArticle.map((item) => {
        if(ids.indexOf(item._id) !== -1) {
          item.isRecommend = isRecommend;
          return item;
        }
        return item;
      })

      this.setState({
        selectedRowKeys: [],
        articleList: recommendArticle,
        allArticle: recommendArticle,
        selectedArticle: []
      })
    })
  }

  filterArticle = (key) => {
    const statusMap = {
      draftBox: 0,
      hasPublish: 1,
      hasDelete: 2
    }

    this.setState({
      articleList: this.state.allArticle.filter((item) => {
        if(key === "articleList") {
          return true;
        } 
        return statusMap[key] === item.status
      })
    })
    console.log(this.state.articleList)
  }

  testClock = (e) =>  {
    console.log(e.currentTarget.getAttribute("data-id"))
  }
  render() {
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const colorArray = ["#00796b", "#8e24aa", "#1e88e5", "#fb8c00", "#8e24aa"];

    const columns = [{
      title: '标题',
      dataIndex: 'title',
      align: "center"
    }, {
      title: '类别',
      dataIndex: 'category',
      align: "center"
    }, {
      title: '标签',
      align: "center",
      dataIndex: 'keyWords',
      render: (text, record) => {
        let length = colorArray.length;
        return (<span>
            {record.keyWords.map((item, index) => {
                return <Tag key={index} color={colorArray[index % length]}>{item}</Tag>
            })}
        </span>)
      }
    }, {
      title: '浏览量',
      dataIndex: 'views',
      align: "center",
      sorter: (a, b) => a.views - b.views,
      sortOrder: sortedInfo.columnKey === 'views' && sortedInfo.order,
    }, {
      title: '发布时间',
      dataIndex: 'createAt',
      align: "center",
      sorter: (a, b) => a.createAt > b.createAt,
      sortOrder: sortedInfo.columnKey === 'createAt' && sortedInfo.order,
    }, {
      title: '推荐',
      dataIndex: 'isRecommend',
      align: "center",
      sorter: (a, b) => a.isRecommend - b.isRecommend,
      sortOrder: sortedInfo.columnKey === 'isRecommend' && sortedInfo.order,
      render: (text, record) => (
          record.isRecommend === true ? <Tag color="#108ee9">是</Tag>
          : <Tag color="#e53935">否</Tag>
        )
    }, {
      title: '状态',
      dataIndex: 'status',
      align: "center",
      render: (text, record) => {
        switch(record.status) {
          case 0: 
            return <Tag color="red">草稿</Tag>
          case 1: 
            return <Tag color="#108ee9">发布</Tag>
          default:
            return <Tag color="#e53935">删除</Tag>
        }
      }}, {
      title: '操作',
      align: "center",
      render: (text, record) => (
          <span>
          {record.status === 0 ? <Tag color="#108ee9" data-id={record._id} onClick = {this.testClock}>发布</Tag>
          : ''}
          {record.isRecommend === true ? <Tag color="#108ee9" data-id={record._id} onClick = {this.recommendArticles.bind(this, record._id, false)}>取消推荐</Tag>
          : ''}
          <Tag color="#108ee9"><Link to={`/home/article/write/${record._id}`}>查看</Link></Tag>
          <Tag color="#108ee9"><Link to={`/home/article/write/${record._id}`}>编辑</Link></Tag>
          </span>
        )
    }, 
  ];

  const rowSelection = {

      onChange: (selectedRowKeys, selectedRows) => {
        const selectedIds = selectedRows.map((item) => {
          return item._id;
        })
        this.setState({
          selectedRowKeys: selectedRowKeys,
          selectedArticle: selectedIds
        })
      },
      getCheckboxProps: record => ({
        id: record.id,
      }),
      selectedRowKeys: this.state.selectedRowKeys,
    };
    
    return (
      <div>
        <CustomBreadcrumb arr={['博客模块', '文章管理']}/>
        <Card>
          <div className="table-operations">
              <Tag color="green" onClick={this.filterArticle.bind(this, "articleList")}>所有文章</Tag>
              <Tag color="cyan" onClick={this.filterArticle.bind(this, "hasPublish")}>已发布</Tag>
              <Tag color="magenta" onClick={this.filterArticle.bind(this, "draftBox")}>草稿箱</Tag>
              <Tag color="red" onClick={this.filterArticle.bind(this, "hasDelete")}>垃圾箱</Tag>
              <Tag color="#e53935" onClick={this.deleteArticles}>删除</Tag>
              <Tag color="#2db7f5" onClick={this.recommendArticles.bind(this, null, true)}>设为推荐</Tag>
          </div>
          <Table rowSelection={rowSelection} rowKey={record =>record.id} bordered columns={columns} dataSource={this.state.articleList} />
        </Card>
      </div>
    );
  }
}




export default ArticleList