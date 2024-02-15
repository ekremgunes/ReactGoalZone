import React from 'react'

const Header = () =>{
  return (
    <>
        <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close">
            <span className="icon-close2 js-menu-toggle"></span>
            </div>
        </div>
        <div className="site-mobile-menu-body"></div>
        </div>


        <header className="site-navbar py-4" role="banner">

        <div className="container">
            <div className="d-flex align-items-center">
            <div className="site-logo">
                <a href="index.html">
                <img src="images/logo.png" alt="Logo"/>
                </a>
            </div>
            <div className="ml-auto">
                <nav className="site-navigation position-relative text-right" role="navigation">
                <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                    <li className="active"><a href="index.html" className="nav-link">Home</a></li>
                    <li><a href="matches.html" className="nav-link">Matches</a></li>
                    <li><a href="players.html" className="nav-link">Players</a></li>
                    <li><a href="blog.html" className="nav-link">Blog</a></li>
                    <li><a href="contact.html" className="nav-link">Contact</a></li>
                </ul>
                </nav>

                <a href="#" className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white"><span
                    className="icon-menu h3 text-white"></span></a>
            </div>
            </div>
        </div>

        </header>
    </>
  )
}

export default Header