import React from 'react';
import Layout from '../../components/Layout';
import ProductStore from './ProductStore';
import getParams from '../../utils/getParams';
import './style.css';
import ProductPage from './ProductPage';

const ProductListPage = (props) => {
  const renderProduct = () => {
    console.log(props);
    const params = getParams(props.location.search);
    console.log(params);
    let content = null;
    switch (params.type) {
      case 'store':
        content = <ProductStore {...props} />;
        break;
      case 'page':
        content = <ProductPage {...props} />;
        break;
      default:
        content = null;
    }
    return content ;
  };
  return (
    <Layout>
      {/* <ProductStore {...props} /> */}
      {renderProduct()}
    </Layout>
  );
};

export default ProductListPage;
