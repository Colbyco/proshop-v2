import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery, useGetProductCategoriesQuery } from '../slices/productsApiSlice';
import { toast } from 'react-toastify';


const Filter = () => {
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
    const { data: categoriesData, isLoading: isLoadingCategories } = useGetProductCategoriesQuery();


  const submitHandler = (e) => {
    e.preventDefault();

    if (minPrice !== "") {
      queryParams.minPrice = minPrice;
    }

    if (maxPrice!== "") {
      queryParams.maxPrice = maxPrice;
    }

    if (selectedCategory !== "") {
      queryParams.category = selectedCategory;
    }

    try {
      refetch({ keyword, pageNumber, ...queryParams });
      navigate('/');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
    // Refetch products with new filter values
  };

  return (
    <Form onSubmit={submitHandler} className="mb-4">
        <Row>
          <Col xs={12} sm={6} md={3} lg={2} className="mb-3">
            <Form.Control
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => {
                console.log('Input value:', e.target.value);
                setMinPrice(e.target.value);
              }}
            />
          </Col>
          <Col xs={12} sm={6} md={3} lg={2} className="mb-3">
            <Form.Control
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => {
                console.log('Input value:', e.target.value);
                setMaxPrice(e.target.value);
              }}
            />
          </Col>
          <Col xs={12} sm={6} md={3} lg={3} className="mb-3">
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => {
                console.log('Input value:', e.target.value);
                setSelectedCategory(e.target.value);
              }}
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
  );
};

export default Filter;
