import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import ItemDropDown from './ItemDropDown';

import styles from './index.scss';

class Table extends Component {
    constructor (props) {
        super (props);
        this.getTableHeader = this.getTableHeader.bind(this);
        this.getColumns = this.getColumns.bind(this);
        this.getTableBody = this.getTableBody.bind(this);
        this.getColumnContents = this.getColumnContents.bind(this);
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
            let itemProps = {
                key: `${i}_${index}`,
                className: ClassNames(styles.item, styles.overflow, themes.item),
                style: { width: this.width },
                onMouseOver: this.handleMouseOver
            };
            if (Object.prototype.toString.call(_itemData) === '[object Object]') {
                _itemData = this.getColumnContents(_itemData);
                itemProps = {...itemProps, className: ClassNames(styles.item, themes.item)};
            };

            return <span {...itemProps}>{_itemData}</span>
        });

        return columns;
    }

    getColumnContents (itemData) {
        const { themes } = this.props;
        let itemList = [];
        const { lists, type } = itemData;
        if (type === 'show') {
            itemList = lists.map(item => {
                return <span
                    onClick={() => {item.onClick(item)}}
                    className={ClassNames(styles.itemBtn, themes.itemBtn)}
                    key={item.name}
                >
                    {item.name}
                </span>;
            })
        } else if (type === 'dropDown') {
            const itemDropDownProps = {...itemData, themes};
            itemList = <ItemDropDown { ...itemDropDownProps }/>
        }

        return itemList;
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