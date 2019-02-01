import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom'

import logo from './img/logo.svg';
import './css/Header.css';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  }

  render() {
    const { title, items } = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          <img className="Logo" src={logo} alt="logo" /> {title}
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {
              items && items.map(
                (item, key) => <li className="nav-item" key={key}><a className="nav-link" href={item.url}>{item.title}</a></li>
              )
            }
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
