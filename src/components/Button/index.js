import React, { Component } from 'react';
import Button from './Button';
import styles from './index.scss';

class ButtonGroup extends Component {
    // constructor (props) {
    //     super(props);
    // }
    handleClick = (event) => {
        console.log(event.target)
    };

    render () {
        return <ul className={styles.buttonGroupWrapper}>
            <li>
                <span className={styles.spanLabel}>大的：</span>
                <Button name={'large'} size={'large'} color={'green'} onClick={this.handleClick}/>
            </li>
            <li>
                <span className={styles.spanLabel}>小的：</span>
                <Button name={'small'} size={'small'} color={'red'}  onClick={this.handleClick}/>
            </li>
            <li>
                <span className={styles.spanLabel}>不可点的：</span>
                <Button disabled={true} onClick={this.handleClick} name={'不可点的'}/>
            </li>
            <li>
                <span className={styles.spanLabel}>默认的：</span>
                <Button onClick={this.handleClick} name={'默认的'} />
            </li>
            <li>
                <span className={styles.spanLabel}>左边内置icon：</span>
                <Button onClick={this.handleClick} name={'内置icon'} icon={{align: 'left', iconStyle: styles.icon}} />
            </li>
            <li>
                <span className={styles.spanLabel}>右边内置icon：</span>
                <Button onClick={this.handleClick} name={'内置icon'} icon={{align: 'right', iconStyle: styles.icon}} />
            </li>
        </ul>
    }
}

export default ButtonGroup;