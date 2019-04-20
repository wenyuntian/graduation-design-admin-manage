import React from 'react'
import {Icon, message, Button, List, Col, Tag, Row, Card, BackTop, Form, Input, Modal, Select} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import axios from 'axios'
import fetch from '../../../utils/fetch'
import draftToHtml from 'draftjs-to-html';
import './style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

message.config({
  top: 250,
  duration: 2,
  maxCount: 3,
});

class HorizontalLoginForm extends React.Component {
  state = { 
    visible: false,
    content: '',
    articleId: null
   }

  setContent = (content) => {
    this.setState({
      content: content
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(err) {

        return;
      }
      values = {
        id: this.state.articleId,
        content: this.state.content,
        ...values
      }

      axios.post('/api/article/add', {article: values})
      .then((response) =>  {
        if(response.data.status === 1000) {
          this.setState({
            articleId: response.data.articleId
          })
          message.success(response.data.information)
        }
      })
      .catch(function (error) {
        message.success(error)
      });
    });
  }

  render() {
    const {
      getFieldDecorator
    } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 22 },
      },
    };

    const Option = Select.Option;

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="标题">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入文章标题' }],
          })(
            <Input placeholder="文章标题" />
          )}
        </Form.Item>
        <Form.Item label="摘要">
          {getFieldDecorator('abstract', {
            rules: [{ required: true, message: '请输入文章摘要' }],
          })(
            <Input placeholder="文章摘要" />
          )}
        </Form.Item>
        <Form.Item label="类别">
          {getFieldDecorator('category', {
            rules: [{ required: true, message: '请输入文章摘要' }],
          })(
            <Select placeholder="文章类别">
              {this.props.categoryList.map((item, index) => {
                return <Option key={index} value={item.name}>{item.name}</Option>
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="标签">
        {getFieldDecorator('keyWords', {
            rules: [{ required: true, message: '请输入文章摘要' }],
          })(
            <Select mode="tags" placeholder="多个标签请按回车键"></Select>
          )}
        </Form.Item>
        <Draft setContent = {this.setContent}/>
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

class Draft extends React.Component{
  state = {
    editorState: EditorState.createEmpty()
  }

  onEditorStateChange = (editorState) => {
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.props.setContent(content)

    this.setState({
      editorState,
    });
  };
  onContentStateChange =  (contentState) => {
    this.setState({
      contentState,
    });
  };

  handlePreview = (e) => {
    this.setState({
      visible: true,
    });
  }
  handleClose = () => {
    this.setState({
      visible: false,
    });
  }

  uploadImageCallBack = ()=>{
    
  }
  render(){
    const { editorState } = this.state;

    return (
      <div>
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          onContentStateChange={this.onContentStateChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          localization={{ locale: 'zh'}}
          toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true }},
          }}
        />
        <Form.Item className="button-group">
          <Button type="default" onClick={this.handlePreview}><Icon type="eye"></Icon>预览</Button>
          <Button type="primary" htmlType="submit"><Icon type="save"></Icon>存为草稿</Button>
        </Form.Item>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleClose}
          footer={null}
          width={"720px"}
        >
        <p dangerouslySetInnerHTML={{ __html: editorState && draftToHtml(convertToRaw(editorState.getCurrentContent()))} } />
        </Modal>
      </div>
    )
  }
}

class IconDemo extends React.Component {
  state = {
    categoryList: [],
    allArticle: []
  }

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

  calculateArticleList = () => {
    const categoryList = [{content: '已发表', status: 1, amount: 0},{content: '草稿箱', status: 0, amount: 0},{"content": '垃圾箱', status: 2, amount: 0}]
    const allArticle = this.state.allArticle;
    return categoryList.map((categoryItem) => {
      categoryItem.amount = allArticle.filter((articleItem) => {
        console.log(articleItem)
        return categoryItem.status === articleItem.status;
      }).length;
      return categoryItem;
    })
  }

  calculateCategoryList = () => {
    const statusList = [{content: '已发表', status: 1, amount: 0},{content: '草稿箱', status: 0, amount: 0},{"content": '垃圾箱', status: 2, amount: 0}]
    const allArticle = this.state.allArticle;
    return statusList.map((statusItem) => {
      statusItem.amount = allArticle.filter((articleItem) => {

        return statusItem.status === articleItem.status;
      }).length;
      return statusItem;
    })
  }

  calculateCategoryArticleList = () => {
    const categoryList = this.state.categoryList;
    const allArticle = this.state.allArticle;

    return categoryList.map((categoryItem) => {
      const categoryArticleItem = {content: categoryItem.name};
      categoryArticleItem.amount = allArticle.filter((articleItem) => {

        return categoryItem.name === articleItem.category;
      }).length;

      return categoryArticleItem;
    })
  }

  render() {
    this.calculateCategoryArticleList()
    const colorArray = ["#e53935", "#8e24aa", "#1e88e5", "#fb8c00", "#8e24aa"];
    let colorCount = 0;
    const articleList = this.calculateArticleList();
    const categoryArticleList = this.calculateCategoryArticleList();
    return (
      <div>
        <CustomBreadcrumb arr={['博客模块', '写文章']}/>
        <Row gutter={18}>
            <Col span={6}>
                <Card>
                  <Card className="aside-title" bordered={false}>
                    <Button type="primary" block={true}><Icon type="edit"></Icon>写文章</Button>
                  </Card>
                  <List
                    header={<div>文章状态</div>}
                    size="small"
                    className="article-list"
                    dataSource={articleList}
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
                  <List
                    header={<div>文章分类</div>}
                    size="small"
                    className="category-list"
                    dataSource={categoryArticleList}
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
                <Card className="write-article-header" title='写文章'>
                    <WrappedHorizontalLoginForm categoryList={this.state.categoryList}/>
                </Card>
            </Col>
        </Row>
        <BackTop visibilityHeight={200} style={{right: 50}}/>
      </div>
    )
  }
}

export default IconDemo