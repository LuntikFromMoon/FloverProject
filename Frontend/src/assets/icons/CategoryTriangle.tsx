import PropTypes from "prop-types";

export const CategoryTriangle=({color = '#828282'}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="5"
            fill="none"
            viewBox="0 0 10 5"
        >
            <path fill={color} d="M5 4.714L.67.43h8.66L5 4.714z"></path>
        </svg>
    )
}

CategoryTriangle.propTypes = {
    color: PropTypes.string,
};