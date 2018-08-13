import React, { Component } from 'react';
import ClassNames from 'classnames';

import styles from './index.scss';

class ItemDropDown extends Component {
    constructor () {
        super ();
        this.state = {
            isShow: false
        };
        this.dropDown = this.dropDown.bind(this);
        this.itemClick = this.itemClick.bind(this);
    }

    
    dropDown (isShow=true) {
        return () => {
            this.setState({ isShow });
        };
    }

    itemClick (handleClick, item) {
        return () => {
            handleClick && handleClick(item);
            this.dropDown(false)();
        };
    }

    render () {
        const { lists, label, themes } = this.props;
        const { isShow } = this.state;
        return <span
            className={ClassNames(styles.itemBtn, themes.itemBtn)}
            onMouseEnter={this.dropDown()}
            onMouseLeave={this.dropDown(false)}
        >
            {label}
            <span className={ClassNames(styles.down, themes.down)} /><br />
            <span className={ClassNames(styles.dropDownWrapper, themes.dropDownWrapper)}>
                {
                    isShow && <span
                        className={ClassNames(styles.dropDown, themes.dropDown)}
                        onMouseEnter={this.dropDown()}
                        onMouseLeave={this.dropDown(false)}
                    >
                        {
                        lists.map(item =>  <span
                                    onClick={this.itemClick(item.onClick, item)}
                                    className={ClassNames(styles.dropDownItem, themes.dropDownItem)}
                                    key={item.name}
                                >
                                    {item.name}
                                </span>
                            )
                        }
                    </span>
                }
            </span>
        </span>
    }
}

export default ItemDropDown;
