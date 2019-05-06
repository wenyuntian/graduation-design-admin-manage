import React from 'react'
import {Upload, Icon, message, Button, Col, Form, Input, List, Row, Card, BackTop,Avatar} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import fetch from '../../../utils/fetch'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css'


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
  }
  
class UpLoadAvatar extends React.Component {
    state = {
      loading: false,
    };
  
    handleChange = (info) => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.setState({
            imageUrl,
            loading: false,
          })
          this.props.handleImageChange(imageUrl)
        });
      }
    }
  
    render() {
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const imageUrl = this.state.imageUrl;
      return (
        <Upload
          name="file"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="/api/administrator/uploadImage"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
      );
    }
}

class ModifyPasswordForm extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="modify-password">
          <Form.Item>
            {getFieldDecorator('oldPassword', {
              rules: [{ required: true, message: '原始密码不能为空' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="原始密码" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('newPassword', {
              rules: [{ required: true, message: '新密码不能为空' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="新密码" />
            )}
          </Form.Item>
          <Form.Item style={{textAlign:"center"}}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              确认修改
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
const ModifyPassword = Form.create({ name: 'modify_password' })(ModifyPasswordForm);

class Persional extends React.Component {
  state = {
    administrator: {},
    newInformation: {}
  }

  componentWillMount() {
    this.getPersonInformation()
  }

  handleImageChange = (url) => {
    if(!!url) {
      this.setState({
        administrator: {
          ...this.state.administrator,
          image: url,
        }
      })
    }
  }

  changeInformation = (type, e) => {
    const information = {...this.state.newInformation}
    information[type] = e.target.value;
    
    this.setState({
      newInformation: information
    })
  }

  submitInformation = (type) => {
    const administrator = {};
    const value = this.state.newInformation[type];

    if(!!value) {

      administrator[type] = value;
      fetch('post', '/api/administrator/update', {administrator: administrator}, (response) => {
        this.setState({
          administrator: {
            ...this.state.administrator,
            ...administrator,
          }
        })
      })
    }
  }

  getPersonInformation = () => {
    fetch('get', '/api/administrator/getAdministratorInformation', null, (response) => {
      const administrator = response.data.administrator;
      administrator.image = `/images/upload/${administrator.image}`
      if(!!administrator) {
        this.setState({
          administrator: administrator
        })
      }
    })
  }

  render() {
    const administrator = this.state.administrator;
    return (
      <div>
        <CustomBreadcrumb arr={['展示信息', '个人信息']}/>
        <Row gutter={18}>
            <Col span={10}>
                <Card className="write-article-header" title='信息展示'>
                    <List bordered size="large" className="show-information">
                        <List.Item>
                            <div className="personal-information">
                                <span className="information-item">头像</span>
                                <div className="img-box">
                                    <Avatar size="large" src={administrator.image} icon="user" />
                                </div>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="personal-information">
                                <span className="information-item">姓名</span>
                                <div>{administrator.name}</div>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="personal-information">
                                <span className="information-item">座右铭</span>
                                <div>{administrator.motto}</div>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="personal-information">
                                <span className="information-item">居住地</span>
                                <div>{administrator.address}</div>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="personal-information">
                                <span className="information-item">职业</span>
                                <div>{administrator.profession}</div>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="personal-information">
                                <span className="information-item">邮箱</span>
                                <div>{administrator.email}</div>
                            </div>
                        </List.Item>
                    </List>
                </Card>
            </Col>
            <Col span={14}>
                <Card className="write-article-header" title='修改信息'>
                <List bordered size="small">
                        <List.Item>
                            <div className="personal-information">
                                <span className="information-item">头像</span>
                                <div className="img-box">
                                    <UpLoadAvatar handleImageChange={this.handleImageChange}/>
                                </div>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="personal-information">
                                <span className="information-item">姓名</span>
                                <Row gutter={8}>
                                    <Col span={18}>
                                        <Input value={this.state.newInformation.name} onChange={this.changeInformation.bind(this, 'name')} placeholder="姓名"/>
                                    </Col>
                                    <Col span={6}>
                                        <Button type="primary" onClick={this.submitInformation.bind(this, 'name')}>修改</Button>
                                    </Col>
                                </Row>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="personal-information">
                                <span className="information-item">座右铭</span>
                                <Row gutter={8}>
                                    <Col span={18}>
                                        <Input value={this.state.newInformation.motto} onChange={this.changeInformation.bind(this, 'motto')} placeholder="座右铭"/>
                                    </Col>
                                    <Col span={6}>
                                        <Button type="primary" onClick={this.submitInformation.bind(this, 'motto')}>修改</Button>
                                    </Col>
                                </Row>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="personal-information">
                                <span className="information-item">居住地</span>
                                <Row gutter={8}>
                                    <Col span={18}>
                                        <Input value={this.state.newInformation.address} onChange={this.changeInformation.bind(this, 'address')} placeholder="居住地"/>
                                    </Col>
                                    <Col span={6}>
                                        <Button type="primary" onClick={this.submitInformation.bind(this, 'address')}>修改</Button>
                                    </Col>
                                </Row>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="personal-information">
                                <span className="information-item">职业</span>
                                <Row gutter={8}>
                                    <Col span={18}>
                                        <Input value={this.state.newInformation.profession} onChange={this.changeInformation.bind(this, 'profession')} placeholder="职业"/>
                                    </Col>
                                    <Col span={6}>
                                        <Button type="primary" onClick={this.submitInformation.bind(this, 'profession')}>修改</Button>
                                    </Col>
                                </Row>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="personal-information">
                                <span className="information-item">邮箱</span>
                                <Row gutter={8}>
                                    <Col span={18}>
                                        <Input value={this.state.newInformation.email} onChange={this.changeInformation.bind(this, 'email')} placeholder="邮箱"/>
                                    </Col>
                                    <Col span={6}>
                                        <Button type="primary" onClick={this.submitInformation.bind(this, 'email')}>修改</Button>
                                    </Col>
                                </Row>
                            </div>
                        </List.Item>
                    </List>
                </Card>
                <Card title="修改密码" style={{ marginTop: "15px" }}>
                    <ModifyPassword />
                </Card>
            </Col>
        </Row>
        <BackTop visibilityHeight={200} style={{right: 50}}/>
      </div>
    )
  }
}

export default Persional