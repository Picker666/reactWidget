import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import styles from './index.scss';

class Table extends Component {
    constructor (props) {
        super (props);
        this.getTableHeader = this.getTableHeader.bind(this);
        this.getColumns = this.getColumns.bind(this);
        this.getTableBody = this.getTableBody.bind(this);
        this.getColumnContents = this.getColumnContents.bind(this);
        this.dropDown = this.dropDown.bind(this);
    }

    // componentDidMount () {
        // this.showAllMsg();
    // }

    handleMouseOver = (event) => {
        const dom = event.target;
        if (dom.scrollWidth > dom.offsetWidth) {
            dom.setAttribute('title', dom.innerHTML);
            dom.addEventListener('mouseleave', (e) => {
                e.target.setAttribute('title', '');
            })
        };
    }

    getTableHeader () {
        const { headerData, themes } = this.props;
        const legth = headerData.length;
        this.width = themes.item && themes.item.width ? themes.item.width : `${legth && (100 / legth)}%` || '';
        const header = headerData.map(item => <span
                className={ClassNames(styles.item, themes.item)}
                key={item.key}
                style={{ width: this.width }}
            >
                {item.title}
            </span>
        );
        return <li className={ClassNames(styles.row, styles.headerRow, themes.row)}>{header}</li>;
    }

    getColumns (itemData, i) {
        const { headerData, themes } = this.props;
        const columns = headerData.map((item, index) => {
                let _itemData = itemData[item.dataIndex];
                if (Object.prototype.toString.call(_itemData) === '[object Object]') {
                    _itemData = this.getColumnContents(_itemData);
                };

                return <span
                    key={`${i}_${index}`}
                    className={ClassNames(styles.item, themes.item)}
                    style={{ width: this.width }}
                    onMouseOver={this.handleMouseOver}
                >
                    {_itemData}
                </span>
            }
        );

        return columns;
    }

    getColumnContents (itemData) {
        const { themes } = this.props;
        let itemList = [];
        const { lists, type, label } = itemData;
        if (type === 'show') {
            itemList = lists.map(item => {
                return <span
                    onClick={item.onClick}
                    className={ClassNames(styles.itemBtn, themes.itemBtn)}
                    key={item.name}
                >
                    {item.name}
                </span>;
            })
        } else if (type === 'dropDown') {
            itemList = <span
                    className={ClassNames(styles.itemBtn, themes.itemBtn)}
                    onClick={(event) => {this.dropDown(event, lists)}}
                >
                    {label}
                    <span className={ClassNames(styles.down, themes.down)} />
                    <span className={ClassNames(styles.dropDown, themes.dropDown)}>
                        {
                            lists.map(item =>  <span
                                    onClick={item.onClick}
                                    className={ClassNames(styles.dropDownItem, themes.dropDownItem)}
                                    key={item.name}
                                >
                                    {item.name}
                                </span>
                            )
                        }
                    </span>
                </span>;
        }

        return itemList;
    }

    dropDown (event, lists) {

    }

    getTableBody () {
        const { dataSource, themes } = this.props;
        return dataSource.map((item, index) => {
            return <li key={index} className={ClassNames(styles.row, themes.row)}>
                {this.getColumns(item, index)}
            </li>
        })
    }

    render () {
        const { themes } = this.props;
        return <ul className={ClassNames(styles.table, themes.table)} >
            {this.getTableHeader()}
            {this.getTableBody()}
        </ul>
    }
};

Table.propTypes = {
    headerData: PropTypes.array,
    dataSource: PropTypes.array,
    theme: PropTypes.object
};

Table.defaultProps = {
    headerData: [],
    dataSource: [],
    themes: {}
};

export default Table;