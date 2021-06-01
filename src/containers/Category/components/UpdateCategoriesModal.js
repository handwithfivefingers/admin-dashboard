import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// UI component
import Input from '../../../components/UI/Input';
import ModalForm from '../../../components/UI/Modal';

const UpdateCategoriesModal = (props) => {
  const {
    size,
    handleClose,
    modalTitle,
    expandedArray,
    checkedArray,
    handleSave,
    handleCategoryInput,
    categoryList,
    show,
  } = props;
  console.log({ expandedArray, checkedArray });
  return (
    <ModalForm
      show={show}
      handleClose={handleClose}
      handleSave={handleSave}
      modalTitle={modalTitle}
      size={size}
    >
      <Row>
        <Col>
          <h6>Expanded</h6>
        </Col>
      </Row>

      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => {
          return (
            <Row key={index}>
              <Col className="mt-3">
                <Input
                  className="mt-3"
                  placeholder="Category Name"
                  value={item.name}
                  onChange={(e) =>
                    handleCategoryInput(
                      'name',
                      e.target.value,
                      index,
                      'expanded',
                    )
                  }
                />
              </Col>
              <Col className="mt-3">
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      'parentId',
                      e.target.value,
                      index,
                      'expanded',
                    )
                  }
                >
                  <option>Select Category</option>
                  {categoryList.map((option) => {
                    return (
                      <option value={option.value} key={option.value}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              </Col>
              <Col className="mt-3">
                <select
                  className="form-control"
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      'type',
                      e.target.value,
                      index,
                      'expanded',
                    )
                  }
                >
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          );
        })}
      <Row>
        <Col className="mt-3">
          <h6> Checked Categories </h6>
        </Col>
      </Row>

      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => {
          return (
            <Row key={index}>
              <Col className="mt-3">
                <Input
                  className="mt-3"
                  placeholder="Category Name"
                  value={item.name}
                  onChange={(e) =>
                    handleCategoryInput(
                      'name',
                      e.target.value,
                      index,
                      'checked',
                    )
                  }
                />
              </Col>
              <Col className="mt-3">
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      'parentId',
                      e.target.value,
                      index,
                      'checked',
                    )
                  }
                >
                  <option>Select Category</option>
                  {categoryList.map((option) => {
                    return (
                      <option value={option.value} key={option.value}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              </Col>
              <Col className="mt-3">
                <select
                  className="form-control"
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      'type',
                      e.target.value,
                      index,
                      'checked',
                    )
                  }
                >
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          );
        })}
    </ModalForm>
  );
};
export default UpdateCategoriesModal;
