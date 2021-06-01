import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// UI component
import Input from '../../../components/UI/Input';
import ModalForm from '../../../components/UI/Modal';

const AddNewCategories = (props) => {
const {
  show,
  handleClose,
  handleSave,
  modalTitle,
  categoryName,
  categoryList,
  setCategoryName,
  ParentCategoryId,
  setParentCategoryID,
  handleCategoryImage,
 } = props;

  return (
    <ModalForm
      show={show}
      handleClose={handleClose}
      handleSave={handleSave}
      modalTitle={modalTitle}
    >
      <Input
        className="mt-3 form-control-sm"
        label="Add New Category"
        type="text"
        placeholder="Add New Category"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <select
        className="mt-3 form-control"
        value={ParentCategoryId}
        onChange={(e) => setParentCategoryID(e.target.value)}
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

      <div className="input-group mt-3">
        <input
          type="file"
          className="form-control form-control-sm"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
      </div>
    </ModalForm>
  );
};
export default AddNewCategories;
