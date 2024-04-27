import { Row, Col, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery, useGetProductCategoriesQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { useState } from 'react';
import { toast } from 'react-toastify';



const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    keyword,
    pageNumber,
    minPrice,
    maxPrice,
    category: selectedCategory,
  });

  const { data: categoriesData, isLoading: isLoadingCategories } = useGetProductCategoriesQuery();
  console.log(categoriesData);
  const submitHandler = (e) => {
    e.preventDefault();
    try {
      const queryParams = {};

    console.log('minPrice:', minPrice);
    console.log('maxPrice:', maxPrice);
    // Add minimum price to the query params if it's not empty
    if (minPrice) {
      queryParams.minPrice = minPrice;
    }

    // Add maximum price to the query params if it's not empty
    if (maxPrice) {
      queryParams.maxPrice = maxPrice;
    }

  

    // Add selected category to the query params if it's not empty
    if (selectedCategory) {
      queryParams.category = selectedCategory;
    }
    console.log('queryParams:', queryParams);

    refetch({ keyword, pageNumber, ...queryParams });

    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
    // Refetch products with new filter values
    // Optionally, you can also update the URL query params
  };

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
        <Form onSubmit={submitHandler} className="mb-4">
        <Row>
          <Col xs={12} sm={6} md={3} lg={2} className="mb-3">
            <Form.Control
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </Col>
          <Col xs={12} sm={6} md={3} lg={2} className="mb-3">
            <Form.Control
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Col>
          <Col xs={12} sm={6} md={3} lg={3} className="mb-3">
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categoriesData &&
                categoriesData.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </Form.Control>
          </Col>
          <Col xs={12} sm={6} md={3} lg={2} className="mb-3">
            <Button type="submit" variant="primary">Apply Filters</Button>
          </Col>
        </Row>
      </Form>



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
