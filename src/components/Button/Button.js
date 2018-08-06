import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classname';
import styles from './index.scss';

class Button extends Component {
    // constructor (props) {
    //     super(props);
    // }

    render () {
        const { name, theme, size, onClick, color, disabled=false, icon: {align, iconStyle}, children } = this.props;
        return <a
            className={classNames(
                styles['widget_button'],
                styles[`widget_button_${color}`],
                styles[`widget_button_${size}`],
                (disabled && styles['widget_button_disabled']) || null,
                theme['widget_button']
            )}
            onClick={(event) => {!disabled && onClick(event)}}
        >
            {iconStyle && align === 'left' && <span className={classNames(styles.iconWrapper, styles.leftIconWrapper, iconStyle)}></span>}
            {name || children}
            {iconStyle && align === 'right' && <span className={classNames(styles.iconWrapper, iconStyle)}></span>}
        </a>
    }
}

Button.propTypes = {
    name: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    size: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    theme: PropTypes.object,
    icon: PropTypes.object
}

Button.defaultProps = {
    name: '',
    size: 'normal',
    color: 'blue',
    onClick: () => {},
    disabled: false,
    theme: {},
    children: null,
    icon: { align: 'left' }
}

export default Button;