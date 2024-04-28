import { Row, Col, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery, useGetProductCategoriesQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Filter from '../components/Filter';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { useState } from 'react';



const HomeScreen = () => {
  const { pageNumber, keyword , minPrice: minP, maxPrice: maxP, category} = useParams();
    const [minPrice, setMinPrice] = useState(minP || '');
    const [maxPrice, setMaxPrice] = useState(maxP || '');
    const [selectedCategory, setSelectedCategory] = useState(category ||'');
    const queryParams = {};

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    keyword,
    pageNumber,
    minPrice,
    maxPrice,
    category: selectedCategory,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )} <Filter />
        



      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
