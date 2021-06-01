import React from 'react';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import ModalForm from '../../components/UI/Modal';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import linerCategories from '../../helpers/linerCategories';
import { useDispatch, useSelector } from 'react-redux';

import {
  FaRegCircle,
  FaRegCheckCircle,
  FaAngleRight,
  FaAngleDown,
  FaRegTrashAlt,
  FaRegEdit,
  FaRegPlusSquare,
} from 'react-icons/fa';
import { createPage } from '../../actions';

/**
 *
 * @returns NewPage
 */

const NewPage = (props) => {
  const [createModal, setCreateModal] = React.useState(false);
  const [pageTitle, setpageTitle] = React.useState('');
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [type, setType] = React.useState('');
  const [banners, setBanners] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setCategories(linerCategories(category.categories));
  }, [category]);
  React.useEffect(() => {
    console.log(page);
    if (!page.loading) {
      setCreateModal('');
      setpageTitle('');
      setCategoryId('');
      setDesc('');
      setProducts([]);
      setBanners([]);
    }
  }, [page]);
  // Handle Save Form
  const handlePageSave = () => {
    if (pageTitle === '') {
      alert('Title is required');
      setCreateModal(false);
      return;
    }
    const form = new FormData();
    form.append('title', pageTitle);
    form.append('description', desc);
    form.append('category', categoryId);
    form.append('type', type);
    if (banners.length > 0) {
      banners.forEach((banner, index) => {
        form.append('banners', banner);
      });
    }
    if (products.length > 0) {
      products.forEach((product, index) => {
        form.append('products', product);
      });
    }
    dispatch(createPage(form));
  };
  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value == e.target.value,
    );
    setCategoryId(e.target.value);
    setType(category.type ? category.type : '');
  };
  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  };
  const handleBannerImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  };
  const renderCreatePageModal = () => {
    return (
      <ModalForm
        show={createModal}
        handleClose={() => setCreateModal(false)}
        handleSave={() => handlePageSave()}
        modalTitle={'Add New PACEEEEEEEEEE'}
      >
        <Row>
          <Col md={12}>
            {/* <select
              className="form-control form-control-sm"
              value={categoryId}
              onChange={onCategoryChange}
            >
              <option value=""> Select category</option>
              {categories.map((cat) => {
                return (
                  <option key={cat.value} value={cat.value}>
                    {cat.name}
                  </option>
                );
              })}
            </select> */}
            <Input
            type="select"
            value={categoryId}
            onChange={onCategoryChange}
            options={categories}
            placeholder={`Select Category`}
            />
          </Col>
          <Col md={12}>
            <Input
              label="Add New Page"
              className="mt-3"
              type="text"
              placeholder="Add New Page"
              value={pageTitle}
              onChange={(e) => setpageTitle(e.target.value)}
            />
          </Col>
          <Col md={12}>
            <Input
              label="Add new description"
              className="mt-3"
              type="text"
              placeholder="Add new description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Col>
          <Col md={12}>
            {banners.length > 0
              ? banners.map((banner, index) => {
                  return <Col key={index}> {banner.name}</Col>;
                })
              : ''}
            <input
              className="form-control form-control-sm mt-3"
              name="banners"
              type="file"
              onChange={(e) => handleBannerImages(e)}
            />
          </Col>
          <Col md={12}>
            {products.length > 0
              ? products.map((product, index) => {
                  return <Col key={index}> {product.name}</Col>;
                })
              : ''}
            <input
              className="form-control form-control-sm mt-3"
              name="products"
              type="file"
              onChange={(e) => handleProductImages(e)}
            />
          </Col>
        </Row>
      </ModalForm>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        {page.loading ? (
          <>
            <p>Creating Page .... pls wait a sec</p>
          </>
        ) : (
          <Row>
            <Col md={12}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Page</h3>
                <div className="actionBtnContainer">
                  <span>Action:</span>
                  <Button
                    size="sm"
                    variant="light"
                    onClick={() => setCreateModal(true)}
                  >
                    <FaRegPlusSquare /> Add new
                  </Button>
                </div>
              </div>
            </Col>
            {renderCreatePageModal()}
          </Row>
        )}
      </Container>
    </Layout>
  );
};

export default NewPage;
