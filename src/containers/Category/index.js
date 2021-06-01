import React from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import linerCategories from '../../helpers/linerCategories';
// Reducer & Action
import {
  getAllCategory,
  addCategory,
  updateCategories,
  addProduct,
  deleteCategories as deleteCategoriesAction,
} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

// UI Component
import Input from '../../components/UI/Input';
import ModalForm from '../../components/UI/Modal';

// Check box tree
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

// Icons
import {
  FaRegCircle,
  FaRegCheckCircle,
  FaAngleRight,
  FaAngleDown,
  FaRegTrashAlt,
  FaRegEdit,
  FaRegPlusSquare,
} from 'react-icons/fa';
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import AddNewCategories from './components/AddnewCategories';

// Styler
import './style.scss';
/**
 *
 * @function Categories
 */
const Category = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState('');
  const [categoryImage, setCategoryImage] = React.useState([]);
  const [ParentCategoryId, setParentCategoryID] = React.useState('');
  const [checked, setChecked] = React.useState([]);
  const [expanded, setExpanded] = React.useState([]);
  const [checkedArray, setCheckedArray] = React.useState([]);
  const [expandedArray, setExpandedArray] = React.useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = React.useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {

    if( categoryName === "") {
      alert('Category Name is required!')
      handleClose();
      return;
   }
    const form = new FormData();
    form.append('name', categoryName);
    form.append('parentId', ParentCategoryId);
    form.append('categoryImage', categoryImage);

    dispatch(addCategory(form));
    setCategoryName('');
    setParentCategoryID('');

    handleClose();
  };
  // show modal and get value
  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };
  // show value checked and expanded on modal
  const updateCheckedAndExpandedCategories = () => {
    const categories = linerCategories(category.categories);
    const checkedArray = [];
    const expandedArray = [];

    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value,
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value,
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleUpdateCategoriesForm = () => {

    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : '');
      form.append('type', item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : '');
      form.append('type', item.type);
    });

    dispatch(updateCategories(form));
    setUpdateCategoryModal(false);
  };

  // Set value when expanded or checked
  const handleCategoryInput = (key, value, index, type) => {
    if (type == 'checked') {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item,
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == 'expanded') {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item,
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  // Hook Effect Render
  // React.useEffect(() => {
  //   dispatch(getAllCategory());
  // }, []);

  React.useEffect(() => {
    if (!category.loading) {
      setShow(false);
    }
  }, [category.loading]);

  const renderCategories = (categories) => {

    let myCategories = [];

    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);
    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
        }
      });
    }

    setDeleteCategoryModal(false);
  };

  const renderDeleteCategoriesModal = () => {
    console.log('delete', checkedArray);
    return (
      <ModalForm
        modalTitle="Confirm"
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: 'No',
            color: 'primary',
            onClick: () => setDeleteCategoryModal(false),
          },
          {
            label: 'Yes',
            color: 'danger',
            onClick: deleteCategories,
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => {
          return <span key={index}>{item.name}</span>;
        })}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => {
          return <span key={index}>{item.name}</span>;
        })}
      </ModalForm>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Category</h3>
              <div className="actionBtnContainer">
                <span>Actions: </span>
                <Button
                  className="actionBtn mr"
                  size="sm"
                  variant="light"
                  onClick={handleShow}
                >
                  <FaRegPlusSquare /> Add new
                </Button>
                <Button
                  className="actionBtn mr"
                  size="sm"
                  variant="light"
                  onClick={updateCategory}
                >
                  <FaRegEdit /> Edit{' '}
                </Button>
                <Button
                  className="actionBtn mr"
                  size="sm"
                  variant="light"
                  onClick={deleteCategory}
                >
                  {' '}
                  <FaRegTrashAlt /> Delete
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <FaRegCheckCircle />,
                uncheck: <FaRegCircle />,
                halfCheck: <FaRegCheckCircle />,
                expandClose: <FaAngleRight />,
                expandOpen: <FaAngleDown />,
              }}
            />
          </Col>
        </Row>

        {/* Update category*/}
        <UpdateCategoriesModal
          show={updateCategoryModal}
          handleClose={() => setUpdateCategoryModal(false)}
          modalTitle={'Update Categories'}
          size="lg"
          expandedArray={expandedArray}
          checkedArray={checkedArray}
          handleCategoryInput={handleCategoryInput}
          categoryList={linerCategories(category.categories)}
          handleSave={handleUpdateCategoriesForm}
        />
        {/** Add new Category */}
        <AddNewCategories
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          size="lg"
          modalTitle={'Add new Category'}
          categoryList={linerCategories(category.categories)}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          ParentCategoryId={ParentCategoryId}
          setParentCategoryID={setParentCategoryID}
          handleCategoryImage={handleCategoryImage}
        />

        {renderDeleteCategoriesModal()}
      </Container>
    </Layout>
  );
};

export default Category;
