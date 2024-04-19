import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Row,
  Col,
  ListGroup,
  Image,
  Button
} from 'react-bootstrap';
import { FaTrash, FaStar } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCartFromSaved } from '../slices/cartSlice';
import { removeFromSaved } from '../slices/savedSlice';
import { toast } from 'react-toastify';

const SavedScreen = () => {
  const dispatch = useDispatch();

  const saved = useSelector((state) => state.saved);
  const { savedItems } = saved;

  const moveToCartHandler = (item) => {
    dispatch(addToCartFromSaved({ ...item, qty: 1 })); // Assuming we add one quantity to cart
    toast.success('Item has been added to the cart');
  };

  const removeFromSavedHandler = (item) => {
    dispatch(removeFromSaved(item._id)); // Pass only the item ID
    toast.success('Item has been removed from saved items');
  };

  if (!savedItems || savedItems.length === 0) {
    return (
      <Row>
        <Col md={12}>
          <Message>
            Your saved list is empty <Link to='/'>Go Back</Link>
          </Message>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
        <h1 style={{ marginBottom: '20px' }}>Saved Items</h1>
        <ListGroup variant='flush'>
          {savedItems.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={6}>
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                  <div>Price: ${item.price}</div>
                  <div style={{ color: '#f8e825' }}>
                        {Array.from({ length: 5 }, (_, index) => (
                          <FaStar key={index} color={index < item.rating ? '#ffc107' : '#e4e5e9'} />
                        ))}
                      </div>
                      <div>{item.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</div>
                </Col>
                <Col md={3}>
                  <Button
                    type='button'
                    variant='primary'
                    onClick={() => moveToCartHandler(item)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                      type='button'
                      variant='danger'
                      onClick={() => removeFromSavedHandler(item)}
                      className='ms-2'
                  >
                    <FaTrash />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
    </Row>
  );
};

export default SavedScreen;
