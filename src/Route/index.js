import React, { Component } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { Home, Company, Park, ButtonGroup, popUpInstruction } from '../components';
import styles from './index.scss';

class Main extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [{ name: 'Home', path: '/home' },{ name: 'Company', path: '/company' },
            { name: 'Park', path: '/park' },{ name: 'Button', path: '/button' }, { name: 'PopUp', path: '/popUp' }]
        }
    };
    componentDidMount () {
        console.log('this is Main...');
    };

    getNavLink = () => {
        return this.state.data.map(item => <NavLink
                className={styles.resetNavLink}
                key={item.name}
                activeClassName={styles.navActive}
                to={item.path}
            >
                {item.name}
            </NavLink>
        );
    }

    render () {
        return (
            <main className={styles.mainSec}>
                <nav className={styles.navStyle}>
                    { this.getNavLink() }
                </nav>
                <section className={styles.routerContent}>
                    <Switch>
                        <Route exact path='/home' component={Home} />
                        <Route path='/company' component={Company} />
                        <Route exact path='/park' component={Park} />
                        <Route exact path='/button' component={ButtonGroup} />
                        <Route exact path='/popUp' component={popUpInstruction} />
                        <Redirect to='/home' />
                    </Switch>
                </section>
            </main>  
        )
    }
};

export default Main;