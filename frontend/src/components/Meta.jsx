import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';


const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.propTypes = {
  title: PropTypes.string.isRequired, // Assuming 'title' is always required
  description: PropTypes.string.isRequired,   // Adding 'description' prop validation
  keywords: PropTypes.string.isRequired,   // Adding 'keywords' prop validation
};

Meta.defaultProps = {
  title: 'Welcome To ProShop',
  description: 'We sell the best products for cheap',
  keywords: 'electronics, buy electronics, cheap electroincs',
};

export default Meta;
