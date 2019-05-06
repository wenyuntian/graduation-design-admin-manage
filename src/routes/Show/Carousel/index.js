import React from 'react'
import {Icon, Modal, Col, Upload, Row, Card, BackTop} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import fetch from '../../../utils/fetch'
import './style.css'

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: []
  };


  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({fileList: props.fileList})
  }

  handleChange = (({file, fileList }) => {

    if(file.status === 'removed') {
      const id = file.id ? file.id : file.response.carousel._id;
      const path = file.url ? file.url : file.response.carousel.path
      fetch('post', '/api/carousel/update', {id: id, path: path});
    }
    this.setState({ fileList })
  })

  render() {
    const { previewVisible, previewImage } = this.state;
    const fileList = this.state.fileList;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload 
          className="upload-image"
          action={`/api/carousel/update?type=${this.props.type}`}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
  
class Carousel extends React.Component {
  state = {
    adminList: [],
    frontList: []
  }

  componentWillMount() {
    this.getCarouselList();
    this.getCarouselList();
  }

  getCarouselList = (type) => {
    fetch('get', '/api/carousel/list', null, (response) => {
      console.log(response.data.adminCarouselList)
      this.setState({
        adminList: response.data.adminCarouselList,
        frontList: response.data.frontCarouselList
      })
    })
  }

  render() {
    return (
      <div className="carousel">
        <CustomBreadcrumb arr={['展示信息', '轮播图']}/>
        <Row gutter={18}>
            <Col span={24}>
                <Card title='后台首页轮播图'>
                  <PicturesWall type="0" fileList={this.state.adminList}/>
                </Card>
                <Card title='博客展示轮播图'>
                  <PicturesWall type="1" fileList={this.state.frontList}/>
                </Card>
            </Col>
        </Row>
        <BackTop visibilityHeight={200} style={{right: 50}}/>
      </div>
    )
  }
}

export default Carousel