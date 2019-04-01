import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Popconfirm,Tag, Button, Icon, Table, Divider, BackTop, Affix, Anchor, Form, InputNumber, Input} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'

const data = [{key:'1', id:'1', title:"深入浅出Node.js", category:"前端", tags: ["Node.js", "前端"], views: 1996, recommend: 1, status: 1, pushDate:"1996-06-15"},
{key:'2', id:'2', title:"深入浅出React", category:"Linux", tags: ["Node.js", "前端","Node.js", "前端"], views: 2015, recommend: 0, status: 0, pushDate:"2015-06-15"}]
  
  class ArticleList extends React.Component {
    state = {
      filteredInfo: null,
      sortedInfo: null,
    };
  
    handleChange = (pagination, filters, sorter) => {
      console.log('Various parameters', pagination, filters, sorter);
      this.setState({
        filteredInfo: filters,
        sortedInfo: sorter,
      });
    }
  
    clearFilters = () => {
      this.setState({ filteredInfo: null });
    }
  
    clearAll = () => {
      this.setState({
        filteredInfo: null,
        sortedInfo: null,
      });
    }
  
    setAgeSort = () => {
      this.setState({
        sortedInfo: {
          order: 'descend',
          columnKey: 'age',
        },
      });
    }
  
    render() {
      let { sortedInfo } = this.state;
      sortedInfo = sortedInfo || {};
      const colorArray = ["#00796b", "#8e24aa", "#1e88e5", "#fb8c00", "#8e24aa"];

      const columns = [{
        title: '标题',
        dataIndex: 'title',
        align: "center",
        sorter: (a, b) => a.title > b.title,
        sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
      }, {
        title: '类别',
        dataIndex: 'category',
        align: "center",
        sorter: (a, b) => a.category < b.category,
        sortOrder: sortedInfo.columnKey === 'category' && sortedInfo.order,
      }, {
        title: '标签',
        width: "250px",
        dataIndex: 'tags',
        render: (text, record) => {
            let length = colorArray.length;
            return (<span>
                {record.tags.map((item, index) => {
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
        title: '推荐',
        dataIndex: 'recommend',
        align: "center",
        sorter: (a, b) => a.recommend - b.recommend,
        sortOrder: sortedInfo.columnKey === 'recommend' && sortedInfo.order,
        render: (text, record) => (
            record.recommend === 1 ? <Tag color="#108ee9">是</Tag>
            : <Tag color="#e53935">否</Tag>
          )
      }, {
        title: '状态',
        dataIndex: 'status',
        align: "center",
        sorter: (a, b) => a.status - b.status,
        sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
        render: (text, record) => (
            record.status === 1 ? <Tag color="#108ee9">发布</Tag>
            : <Tag color="red">草稿</Tag>
          )
      }, {
        title: '发布时间',
        dataIndex: 'pushDate',
        align: "center",
        sorter: (a, b) => a.pushDate > b.pushDate,
        sortOrder: sortedInfo.columnKey === 'pushDate' && sortedInfo.order,
      }, {
        title: '操作',
        align: "center",
        render: (text, record) => (
            <span>
            {record.status === 0 ? <Tag color="#108ee9">发布</Tag>
            : ''}
            <Tag color="#108ee9"><Link to={`/home/article/write/${record.id}`}>查看</Link></Tag>
            <Tag color="#108ee9"><Link to={`/home/article/write/${record.id}`}>编辑</Link></Tag>
            </span>
          )
      }, 
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          id: record.id,
        }),
      };
      return (
        <div>
          <CustomBreadcrumb arr={['显示', '表格']}/>
          <Card>
            <div className="table-operations">
                <Button onClick={this.setAgeSort}>Sort age</Button>
                <Button onClick={this.clearFilters}>Clear filters</Button>
                <Button onClick={this.clearAll}>Clear filters and sorters</Button>
            </div>
            <Table rowSelection={rowSelection} align="center" bordered columns={columns} dataSource={data} onChange={this.handleChange} />
          </Card>
        </div>
      );
    }
}




export default ArticleList