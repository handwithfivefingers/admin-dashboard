import React from 'react';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import { addProduct } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import ModalForm from '../../components/UI/Modal';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';
/**
 *
 * @function Products
 */
const Products = () => {
  const product = useSelector((state) => state.product);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const [productDetailsModal, setProductDetailsModal] = React.useState(false);
  const [ProductName, setProductName] = React.useState('');
  const [Description, setDescription] = React.useState('');
  const [Quantity, setQuantity] = React.useState('');
  const [Price, setPrice] = React.useState('');
  const [productPictures, setProductPictures] = React.useState([]);
  const [Category, setCategory] = React.useState('');

  const [productDetails, setProductDetails] = React.useState(null);
  // Format Number

  function format(number) {
    let x =
      (number.toString().split('').length + 1) % 3 === 0
        ? 1
        : 2*(number.toString().split('').length % 3) ;
    return number
      .toString()
      .split('')
      .map((char, i) => (!i || (i + x) % 3 ? '' : ',') + char)
      .join('');
  }


  const handleClose = () => {
    setShow(false);
    setProductDetailsModal(false);
  };
  const handleSave = () => {
    const form = new FormData();
    form.append('name', ProductName);
    form.append('description', Description);
    form.append('quantity', Quantity);
    form.append('price', Price);
    form.append('category', Category);
    for (let pic of productPictures) {
      form.append('productPicture', pic);
    }

    dispatch(addProduct(form));
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };
  const renderProducts = () => {
    return (
      <Table responsive="sm" hover style={{ fontSize: 14 }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price (VND)</th>
            <th>Quantity</th>
            {/* <th>Description</th> */}
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((item) => {
                return (
                  <tr>
                    <td>2</td>
                    <td>{item.name}</td>
                    <td>{format(item.price)}</td>
                    <td>{item.quantity}</td>
                    <td>{item.category.name}</td>
                    <td>
                      <Button
                      size="sm"
                        onClick={() => showProductDetailsModal(item)}
                        key={item._id}
                      >Edit</Button>
                    </td>
                  </tr>
                );
              })
            : ''}
        </tbody>
      </Table>
    );
  };
  const showProductDetailsModal = (product) => {
    console.log(product);
    setProductDetailsModal(true);
    setProductDetails(product);
  };
  const renderAddProductModal = () => {
    return (
      <ModalForm
        show={show}
        handleClose={handleClose}
        handleSave={handleSave}
        modalTitle={`Add New Product`}
      >
        <Row>
          <Col>
            <Input
              className="mt-3"
              label="Add New Products"
              type="text"
              placeholder="Add New Products"
              value={ProductName}
              onChange={(e) => setProductName(e.target.value)}
            />

            <Input
              className="mt-3"
              label="Description"
              type="text"
              placeholder="Description"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Input
              className="mt-3"
              label="Quantity"
              type="number"
              placeholder="Quantity"
              value={Quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <Input
              className="mt-3"
              label="Price"
              type="number"
              placeholder="Price"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <select
              className=" mt-3 form-control"
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select Category</option>
              {createCategoryList(category.categories).map((option) => {
                return (
                  <option value={option.value} key={option.value}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </Col>
        </Row>
        <div className="image-info mt-3">
          {productPictures.length > 0
            ? productPictures.map((pic, index) => {
                return <div key={index}>{pic.name}</div>;
              })
            : null}
        </div>
        <div className="input-group mt-3">
          <input
            type="file"
            className="form-control"
            name="productPictures"
            onChange={handleProductPictures}
          />
        </div>
      </ModalForm>
    );
  };
  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <ModalForm
        show={productDetailsModal}
        handleClose={handleClose}
        modalTitle={'Product Details'}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{format(productDetails.price)} VND</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
          <Col md="12">
            <label className="key">Image</label>
            <div className="product-container">
              {productDetails.productPictures.map((picture) => {
                return (
                  <img key={picture} src={generatePublicUrl(picture.img)} />
                );
              })}
            </div>
          </Col>
        </Row>
      </ModalForm>
    );
  };
  console.log(productPictures);
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Product Page</h3>
              <button className="btn btn-primary" onClick={handleShow}>
                Add new
              </button>
            </div>
          </Col>
          <Col md={12}>{renderProducts()}</Col>
        </Row>
        <Row></Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;
