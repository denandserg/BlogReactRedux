import React from 'react';
import { Link } from 'react-router-dom';
import './header.less';

const Header = () => {
  return(
      <Link to='/'>
          <div className="app-header">
              <h1>Blog</h1>
          </div>
      </Link>
  )
};

export default Header;