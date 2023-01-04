import PropTypes from 'prop-types';

const Review = (props) => {
  return (
    <div className="flex flex-col" style={{ background: 'red' }}>
      Review web component - {props.name}
      <button className="bg-green-500 font-semibold text-lg border-none">
        review detail
      </button>
    </div>
  );
};

Review.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Review;
