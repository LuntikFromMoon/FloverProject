import PropTypes from 'prop-types';

export const Arrow=({color   = '#FFFFFF'}) => {
    return (
        <svg width="7" height="3" viewBox="0 0 7 3" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 3L0.468911 -5.70966e-07L6.53109 -4.09935e-08L3.5 3Z" fill={color}/>
        </svg>
    )
}

Arrow.propTypes = {
    color: PropTypes.string,
};