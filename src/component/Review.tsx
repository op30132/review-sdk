import React from 'react';
import PropTypes from 'prop-types';

const Review = (props) => {
  console.log('🚀 - Review - props', props);
  return <div>Review</div>;
};

Review.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Review;
