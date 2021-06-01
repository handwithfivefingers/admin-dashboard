import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../../actions/product.action';
import { generatePublicUrl } from '../../../urlConfig';
import './style.css';

const ProductStore = (props) => {
  const product = useSelector((state) => state.product);
  const [priceRange, setPriceRange] = React.useState({
    under5m: '5 Triệu',
    under10m: '10 Triệu',
    under15m: '15 Triệu',
    under20m: '20 Triệu',
    under30m: '30 Triệu',
  });
  const dispatch = useDispatch();
  React.useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, [props]);
  const { match } = props;
  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="card" key={index}>
            <div className="cardHeader">
              <div>
                {match.params.slug} Mobile giá từ {priceRange[key]}
              </div>
              <button>View all</button>
            </div>
            <div style={{ display: 'flex' }}>
              {product.productsByPrice[key].map((productItem) => {
                return (
                  <div className="productContainer" key={productItem._id}>
                    <div className="productImgContainer">
                      <img
                        src={
                          productItem.productPictures.length > 0
                            ? generatePublicUrl(
                                productItem.productPictures[0].img,
                              )
                            : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ts7-Lee8jdnNMM_ivyZRae3sK-EZOGyuNg&usqp=CAU`
                        }
                        alt=""
                      />
                    </div>
                    <div className="productInfo">
                      <div style={{ margin: '5px 0' }}>{productItem.name}</div>
                      <div>
                        <span>4.3 </span>
                        <span>3355</span>
                      </div>
                      <div className="productPrice">
                        {productItem.price} VND
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductStore;
