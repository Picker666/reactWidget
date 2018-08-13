import React, { Component } from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './index.scss';

class Pagenation extends Component {
    constructor (props) {
        super(props);
        this.state = {
            currentPage: 1,
            totalPage: Math.ceil(props.totalRecords / props.perPageRecords)
        };
        this.getPages = this.getPages.bind(this);
        this.handleSelectPage = this.handleSelectPage.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    getPages () {
        const { themes, maxDisplay } = this.props;
        const { currentPage, totalPage } = this.state;
        let pages = [];
        const isNeedPreviewMore = currentPage > 3 && !!(currentPage - 4);
        const isNeedNextMore = ((isNeedPreviewMore && currentPage + 3 < totalPage) || !isNeedPreviewMore) && totalPage > maxDisplay;
        for (let i = 1; i <= totalPage; i++) {
            let li = <li
                    key={`${totalPage}_${i}`}
                    title={i}
                    className={ClassNames(styles.page, currentPage === i && styles.currentPage, themes.page)}
                    onClick={this.handleSelectPage(i)}
                >
                <a>{i}</a>
            </li>;
            if (isNeedPreviewMore && i === 2) {
                li = <li
                    key={`${totalPage}_preview5`}
                    title={'向前5页'}
                    className={ClassNames(styles.left_more, styles.page, themes.more)}
                    onClick={this.handleSelectPage(currentPage, 'minus', 5)}
                />;
                i = currentPage - 3;
            } else if (isNeedNextMore && totalPage !== i && ((!isNeedPreviewMore && i === maxDisplay - 2) || (isNeedPreviewMore && i > currentPage + 2))) {
                li = <li
                    key={`${totalPage}_next5`}
                    title={'向后5页'}
                    className={ClassNames(styles.right_more, styles.page, themes.more)}
                    onClick={this.handleSelectPage(currentPage, 'plus', 5)}
                />;
                i = totalPage - 1;
            };
            pages.push(li);
        };

        return pages;
    }

    handleSelectPage (currentPage, type, range=1) {
        return () => {
            let page = currentPage;
            const { totalPage } = this.state;
            if (type === 'plus') {
                page += range;
            } else if (type === 'minus') {
                page -= range;
            };
            page = page > totalPage ? totalPage : page;
            page = page < 1 ? 1 : page;
            const { selectPage } = this.props;
            this.setState({currentPage: page});
            selectPage && selectPage(page);
        };
    }

    handleKeyUp (event) {
        if (event.keyCode === 13) {
            const { totalPage } = this.state;
            const value = this.inputRef.value;
            const page = parseInt(value, 10);
            if (page > totalPage) {
                this.inputRef.value = totalPage;
            } else if (page < 1) {
                this.inputRef.value = 1;
            }
            this.handleSelectPage(page)();
        };
    }

    render () {
        const { themes, inputPage } = this.props;
        let { currentPage, totalPage } = this.state;
        return <ul className={ClassNames(styles.pagenation, themes.pagenation)}>
            <li
                className={ClassNames(currentPage === 1 ? styles.preview_disable : styles.preview, styles.page, themes.preview)}
                title={'上一页'}
                onClick={this.handleSelectPage(currentPage, 'minus')}
            ></li>
            {this.getPages()}
            <li
                className={ClassNames(currentPage === totalPage ? styles.next_disable : styles.next, styles.page, themes.next)}
                title={'下一页'}
                onClick={this.handleSelectPage(currentPage, 'plus')}
            ></li>
            {inputPage && <li
                className={ClassNames(styles.page, themes.page)}
            >   
                跳至
                <input
                    className={ClassNames(styles.inputPage, themes.inputPage)}
                    type="number" onKeyUp={this.handleKeyUp}
                    ref={(ref) => {this.inputRef = ref}}
                />
                页
            </li>
        }
        </ul>
    }
}

Pagenation.propTypes = {
    totalRecords: PropTypes.number,
    perPageRecords: PropTypes.number,
    themes: PropTypes.object,
    selectPage: PropTypes.func,
    maxDisplay: PropTypes.number,
    inputPage: PropTypes.bool
};

Pagenation.defaultProps = {
    totalRecords: 100,
    perPageRecords: 10,
    themes: {},
    selectPage: () => {},
    maxDisplay: 8,
    inputPage: true
}

export default Pagenation;
