import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.propTypes = {
  variant: PropTypes.string, // Assuming 'variant' is always required
  children: PropTypes.node.isRequired,   // Adding 'children' prop validation
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
