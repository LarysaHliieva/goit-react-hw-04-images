import PropTypes from 'prop-types';

import { Dna } from 'react-loader-spinner';

const Loader = ({ visible = false }) => (
  <Dna
    visible={visible}
    height="80"
    width="80"
    ariaLabel="dna-loading"
    wrapperStyle={{ margin: '0 auto' }}
    wrapperClass="dna-wrapper"
  />
);

export default Loader;

Loader.propTypes = {
  visible: PropTypes.bool,
};
