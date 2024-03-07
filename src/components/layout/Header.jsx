import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCompetition } from "../../context/CompetititonContext";

const Header = () => {
  const { contextValues } = useCompetition();
  const [logo, setLogo] = useState("");

  useEffect(() => {
    setLogo(contextValues.logo);
  }, [contextValues]);

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
              <a href="/">
                <img
                  id="logoImg"
                  className="logoPage"
                  src={`/public/assets/images/${logo}`}
                  alt="Logo"
                />
              </a>
            </div>
            <div className="ml-auto">
              <nav
                className="site-navigation position-relative text-right"
                role="navigation"
              >
                <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? "activelink nav-link" : "nav-link"
                      }
                    >
                      Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/team"
                      className={({ isActive }) =>
                        isActive ? "activelink nav-link" : "nav-link"
                      }
                    >
                      Team
                    </NavLink>
                  </li>
                  <li>
                  <NavLink
                      to="/scorers"
                      className={({ isActive }) =>
                        isActive ? "activelink nav-link" : "nav-link"
                      }
                    >
                      Scorers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/starter"
                      className={({ isActive }) =>
                        isActive ? "activelink nav-link" : "nav-link"
                      }
                    >
                      Starter
                    </NavLink>
                  </li>
                  <li>
                  <NavLink
                      to="/live"
                      className={({ isActive }) =>
                        isActive ? "activelink nav-link" : "nav-link"
                      }
                    >
                      Live Chat🔴
                    </NavLink>
                  </li>
                </ul>
              </nav>

              <a
                href="#"
                className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white"
              >
                <span className="icon-menu h3 text-white"></span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
