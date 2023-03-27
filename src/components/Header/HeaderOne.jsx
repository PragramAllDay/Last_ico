import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import logoImage from "../../../src/assets/img/logo/Artboard_1_copy.png";
import $ from "jquery";
import  {GlobalContext} from "../../ContextAPI/GlobalContext";
import { handleClickScroll } from "../../lib/helpers";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { useContext } from "react";
import { useAccount, useDisconnect, useProvider, useSigner } from "wagmi";

const HeaderOne = () => {
  const { address, provider, updateAddress, updateProvider } = useContext(GlobalContext);
  // sticky nav bar 
  const [stickyClass, setStickyClass] = useState({
    fixed: "",
    header: "",
  });

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight < 245
        ? setStickyClass({ fixed: "", header: "" })
        : setStickyClass({ fixed: "active-height", header: "sticky-menu" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  // mobile menu
  useEffect(() => {
    //SubMenu Dropdown Toggle
    if ($(".menu-area li.menu-item-has-children ul").length) {
      $(".menu-area .navigation li.menu-item-has-children").append(
        '<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>'
      );
    }

    //Mobile Nav Hide Show
    if ($(".mobile-menu").length) {
      let mobileMenuContent = $(".menu-area .main-menu").html();
      $(".mobile-menu .menu-box .menu-outer").append(mobileMenuContent);

      //Dropdown Button
      $(".mobile-menu li.menu-item-has-children .dropdown-btn").on(
        "click",
        function () {
          $(this).toggleClass("open");
          $(this).prev("ul").slideToggle(500);
        }
      );
      //Menu Toggle Btn
      $(".mobile-nav-toggler").on("click", function () {
        $("body").addClass("mobile-menu-visible");
      });

      //Menu Toggle Btn
      $(".menu-backdrop, .mobile-menu .close-btn").on("click", function () {
        $("body").removeClass("mobile-menu-visible");
      });
    }
  }, []);

  // active link switching
  const { hash, pathname } = useLocation();
  const isActiveLink = (id) => {
    return id == hash ? "active" : "";
  };
  
 
  const Provider = useProvider();
  const signer = useSigner();
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  })
  return (
    <header id="header">
      <div id="header-fixed-height" className={cn(stickyClass.fixed)} />

      <div id="sticky-header" className={cn("menu-area", stickyClass.header)}>
        <div className={cn("container custom-container")}>
          <div className="row">
            <div className="col-12">
              <div className={"mobile-nav-toggler"}>
                <i className="fas fa-bars" />
              </div>

              <div className="menu-wrap">
                <nav className={"menu-nav"}>
                  <div className="logo">
                    <Link to={"/"}>
                      <img src={logoImage} alt="BigTech Logo" />
                    </Link>
                  </div>

                  <div className={cn("navbar-wrap main-menu d-none d-lg-flex")}>
                    <ul className={"navigation"}>
                      <li
                        className={cn(
                          hash == "" && "active",
                          "menu-item-has-children"
                        )}
                      >
                        <Link
                          to="#header"
                          className={"section-link"}
                          onClick={() => handleClickScroll("header")}
                        >
                          Home
                        </Link>
                        {/* <ul className={cn("sub-menu")}> */}
                          {/* <li className={cn(pathname == "/" && "active")}>
                            <NavLink to="/">Home One</NavLink>
                          </li> */}
                          {/* <li
                            className={cn(pathname == "/home-two" && "active")}
                          >
                            <NavLink to="/home-two">Home Two</NavLink>
                          </li> */}
                        {/* </ul> */}
                      </li>
                    
                      <li className={isActiveLink("#presale")}>
                        <Link
                          to="#sales"
                          className={"section-link"}
                          onClick={() => handleClickScroll("presale")}
                        >
                          Presale
                        </Link>
                      </li>
                      <li className={cn(hash == "#about" && "active")}>
                        <Link
                          to="#about"
                          className={"section-link"}
                          onClick={() => handleClickScroll("about")}
                        >
                          About us
                        </Link>
                      </li>
                      <li className={isActiveLink("#roadmap")}>
                        <Link
                          to="#roadmap"
                          className={"section-link"}
                          onClick={() => handleClickScroll("roadmap")}
                        >
                          Roadmap
                        </Link>
                      </li>
                      {/* <li className={"menu-item-has-children"}>
                        <Link to="/blog">Blog</Link>
                        <ul className={cn("sub-menu")}>
                          <li className={cn(pathname == "/blog" && "active")}>
                            <Link to="/blog">Our Blog</Link>
                          </li>
                          <li
                            className={cn(
                              pathname == "/blog-details" && "active"
                            )}
                          >
                            <Link to="/blog-details">Blog Details</Link>
                          </li>
                        </ul>
                      </li> */}
                      <li className={isActiveLink("#contact")}>
                        <Link
                          to="#contact"
                          className={"section-link"}
                          onClick={() => handleClickScroll("contact")}
                        >
                          Contact us
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className={cn("header-action", "d-none d-md-block")}>
                    <ul>
                      {/* <li className={"header-lang"}>
                        <span className={"selected-lang"}>ENG</span>
                        <ul className={"lang-list"}>
                          <li>
                            <Link to="#">IND</Link>
                          </li>
                          <li>
                            <Link to="#">BNG</Link>
                          </li>
                          <li>
                            <Link to="#">TUR</Link>
                          </li>
                          <li>
                            <Link to="#">CIN</Link>
                          </li>
                        </ul>
                      </li> */}
                      <li className={"header-btn"}>     
                         <ConnectButton className="btn" /> 
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              {/* <!-- Mobile Menu  --> */}
              <div className={"mobile-menu"}>
                <nav className={"menu-box"}>
                  <div className={"close-btn"}>
                    <i className="fas fa-times"></i>
                  </div>
                  <div className={"nav-logo"}>
                    <Link to="/">
                      <img src={logoImage} alt="BigTech Logo" title="" />
                    </Link>
                  </div>

                  <div className={"menu-outer"}>
                    {/* <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header-->  */}
                   
                  </div>
                  <li className={"header-btn"} style={{margin: "1rem"}}>     
                         <ConnectButton className="btn" /> 
                      </li>
                  <div className={"social-links"}>
                    <ul className="clearfix">
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-youtube"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              <div className={"menu-backdrop"} />
              {/* <!-- End Mobile Menu --> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderOne;
