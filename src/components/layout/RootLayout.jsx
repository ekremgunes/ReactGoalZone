import { Fragment, React } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loading from "./Loading";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
const RootLayout = () => {
  const competition = useSelector((state) => state.user.competition);
  const location = useLocation();

  useEffect(() => {
    const handleWindowLoad = () => {
      console.log(location.pathname+"xxxx")
      if (competition && document.readyState == "complete") {

        document.querySelectorAll('*').forEach((element) => {
          const computedStyle = window.getComputedStyle(element);
        
          if (computedStyle.getPropertyValue('--PL2')) {
            element.style.setProperty('--PL2', 'var(--UCL3)', 'important');
          }
          if (computedStyle.getPropertyValue('--PL1')) {
            element.style.setProperty('--PL1', 'var(--UCL2)', 'important');
          }
          if (computedStyle.getPropertyValue('--PL1DARK')) {
            element.style.setProperty('--PL1DARK', 'var(--UCL1DARK)', 'important');
          }
          if (computedStyle.getPropertyValue('PL_BG.png')) {
            element.style.setProperty('background-image', "url('../images/UCL_BG.jpg')", 'important');          }
        });


        var bgSlider = document.getElementById("bg-img-overlay");
        var logo = document.getElementById("logoImg");        
        var classForBg, imgPath;
  
        switch (competition) {
          case "UCL":
            classForBg = "ucl_bg";
            imgPath = "ucl_logo.png";
            break;
          case "UEL":
            classForBg = "uel_bg";
            imgPath = "uel_logo.png";
            break;
          default:
            classForBg = "pl_bg";
            imgPath = "pl_logo.png";
            break;
        }
  
        bgSlider.classList.add("ucl_bg");
        logo.setAttribute("src", `/public/assets/images/${imgPath}`);
      }
    };
  
    window.addEventListener("load", handleWindowLoad);  
    
  }, [competition,location]);
  

  if (document.readyState == "loading") {
    return <Loading></Loading>;
  }

  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
};
export default RootLayout;
