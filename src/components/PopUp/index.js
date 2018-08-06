import React, { Component } from 'react';
import Button from '../Button/Button';
import PopUp from './PopUp';
import styles from './popUp.scss'

class PopUpInstruction extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isShowPopUP: false
        }
    }


    handleClickForPopUp = () => {
        this.setState({isShowPopUP: true});
    }

    closePopUp = () => {
        this.setState({isShowPopUP: false});
    }

    render () {
        const { isShowPopUP } = this.state;
        return <div>
            <p>
                <Button onClick={this.handleClickForPopUp}>{'click and check popup'}</Button>
            </p>
            {isShowPopUP &&
                <PopUp
                    onClose={this.closePopUp}
                    onComfirm={() => {}}
                    onCancel={() => {}}
                    title={'提示框'}
                    content={<div>{'this is content 66.'}</div>}
                    theme={styles}
                />
            }
        </div>
    }
};

export default PopUpInstruction;