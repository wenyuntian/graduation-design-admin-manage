import React from 'react'
import {Icon, Button, List, Col, Row, Card, BackTop, Form, Input, Modal, Select} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import './style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class HorizontalLoginForm extends React.Component {
  state = { visible: false }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(this.props.form.getFieldsValue())
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
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入文章标题' }],
          })(
            <Input placeholder="文章标题" />
          )}
        </Form.Item>
        <Form.Item label="摘要">
          {getFieldDecorator('password', {
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
              <Option value="Linux">Linux</Option>
              <Option value="数据库">数据库</Option>
              <Option value="前端">前端</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="标签">
        {getFieldDecorator('tags', {
            rules: [{ required: true, message: '请输入文章摘要' }],
          })(
            <Select mode="tags" placeholder="多个标签请按回车键"></Select>
          )}
        </Form.Item>
        <Draft />
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
    console.log(editorState)
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
  render() {
    const list = [{content: '已发表', icon: "file-done", amount: 54},{content: '草稿箱', icon: "file-exclamation", amount: 24},{"content": '垃圾箱', icon: "delete", amount: 55}]
    const colorArray = ["#e53935", "#8e24aa", "#1e88e5", "#fb8c00", "#8e24aa"];
    let colorCount = 0;

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
                    dataSource={list}
                    renderItem={item => {
                      let lenght = colorArray.length;
                      let backgroundColor = colorArray[colorCount % lenght];
                      colorCount ++; 
                      return (
                      <List.Item actions={[<Button type="primary" style={{background: backgroundColor}} size="small">{item.amount}篇</Button>]}>
                          <div>
                            <Icon className="article-list-icon" type={item.icon}></Icon>
                            {item.content}
                          </div>
                      </List.Item>
                    )}}
                  />
                  <List
                    header={<div>文章分类</div>}
                    size="small"
                    className="category-list"
                    dataSource={list}
                    split={false}
                    renderItem={item => {
                      let lenght = colorArray.length;
                      let backgroundColor = colorArray[colorCount % lenght];
                      colorCount ++; 
                      return (
                      <List.Item actions={[<Button type="primary" style={{background: backgroundColor}} size="small">{item.amount}篇</Button>]}>
                          <div>
                            <span className="category-list-dot" style={{background: backgroundColor}}></span>
                            {item.content}
                          </div>
                      </List.Item>
                    )}}
                  />
                </Card>
            </Col>
            <Col span={18}>
                <Card className="write-article-header" title='写文章' extra={<div>
                        <Button size='small' type="primary"><Icon type="edit"></Icon>存为草稿</Button>
                        <Button size='small' type="danger"><Icon type="rest"></Icon>放弃</Button>
                    </div>}>
                    <WrappedHorizontalLoginForm />
                </Card>
            </Col>
        </Row>
        <BackTop visibilityHeight={200} style={{right: 50}}/>
      </div>
    )
  }
}

export default IconDemo