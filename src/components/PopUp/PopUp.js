import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classname';
import styles from './index.scss';

class PopUp extends Component {
    handleComfirm = () => {
        const { onClose, onComfirm } = this.props;
        onComfirm();
        onClose();
    }

    handleCancel = () => {
        const { onClose, onCancel } = this.props;
        onCancel();
        onClose();
    }

    handleMaskClick = () => {
        const { onClose, maskClosable } = this.props;
        maskClosable && onClose();
    }

    render () {
        const { title, isShowFooter, content, theme, comfirmButtonText, CancelButtonText, isShowCloseButton, onClose } = this.props;
        return <div>
            <div className={classNames(styles.popUp_mask, theme.popUp_mask)} onClick={this.handleMaskClick}></div>

            <div className={classNames(styles.popUp_wrapper, theme.popUp_wrapper)}>
                {isShowCloseButton && <span className={styles.popUp_close_button} onClick={onClose}>X</span>}

                {!!title && <div className={classNames(styles.popUp_title, theme.popUp_title)}>{title}</div>}

                <section className={classNames(styles.popUp_content, theme.popUp_content)}>
                    {content}
                </section>

                {!!isShowFooter &&
                    <div className={classNames(styles.popUp_footer, theme.popUp_footer)}>
                        <button
                            className={classNames(styles.popUp_footer_left, theme.popUp_footer_left)}
                            onClick={this.handleComfirm}
                        >
                            {CancelButtonText}
                        </button>
                        <button
                            className={classNames(styles.popUp_footer_right, theme.popUp_footer_right)}
                            onClick={this.handleCancel}
                        >
                            {comfirmButtonText}
                        </button>
                    </div>
                }
            </div>
        </div>
    }
};

PopUp.propTypes = {
    onClose: PropTypes.func,
    onComfirm: PropTypes.func,
    onCancel: PropTypes.func,
    isShowFooter: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    isShowCloseButton: PropTypes.bool,
    comfirmButtonText: PropTypes.string,
    CancelButtonText: PropTypes.string,
    maskClosable: PropTypes.bool,
    theme: PropTypes.object
};

PopUp.defaultProps = {
    onClose: () => {},
    onComfirm: () => {},
    onCancel: () => {},
    isShowFooter: true,
    title: '',
    content: <div>{'this is content.'}</div>,
    isShowCloseButton: true,
    comfirmButtonText: '确定',
    CancelButtonText: '取消',
    maskClosable: true,
    theme: {}
}

export default PopUp;