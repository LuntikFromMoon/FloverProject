import PropTypes from "prop-types";

export const ArrowActive=({color = '#000000'}) => {
    return (
        <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 0.285767L9.33013 4.57148L0.669873 4.57148L5 0.285767Z" fill={color}/>
        </svg>
    )
}

ArrowActive.propTypes = {
    color: PropTypes.string.isRequired,
};