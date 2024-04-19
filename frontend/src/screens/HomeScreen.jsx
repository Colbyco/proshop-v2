import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery, useGetProductCategoriesQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

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

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      const queryParams = {};

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
