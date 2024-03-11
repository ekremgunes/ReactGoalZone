/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, React } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loading from "./Loading";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {  CompetitionProvider, useCompetition,} from "../../context/CompetititonContext";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import LiveChat from "../LiveChat";

const RootContent = () => {
  const competition = useSelector((state) => state.user.competition);
  const { contextFunctions } = useCompetition();
  const location = useLocation();
  const id = useSelector((state) => state.user.id);
  const id_LS = localStorage.getItem("id");
  const shortName_LS = localStorage.getItem("shortName");
  const competition_LS = localStorage.getItem("competition");
  const { updateUserTeam } = userActions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleWindowLoad = () => {
    if (competition && document.readyState == "complete") {
      const rootStyles = getComputedStyle(document.documentElement);

      const PL1DARK = rootStyles.getPropertyValue("--PL1DARK");
      const PL1 = rootStyles.getPropertyValue("--PL1");
      const PL2 = rootStyles.getPropertyValue("--PL2");
      const PL3 = rootStyles.getPropertyValue("--PL3");
      const PL4 = rootStyles.getPropertyValue("--PL4");

      const UCL1 = rootStyles.getPropertyValue("--UCL1");
      const UCL1DARK = rootStyles.getPropertyValue("--UCL1DARK");
      const UCL2 = rootStyles.getPropertyValue("--UCL2n");
      const UCL3 = rootStyles.getPropertyValue("--UCL3n");

      const UEL1 = rootStyles.getPropertyValue("--UEL1");
      const UEL2 = rootStyles.getPropertyValue("--UEL2");
      const UEL3 = rootStyles.getPropertyValue("--UEL3");

      switch (competition) {
        case "CL":
          document.documentElement.style.setProperty("--PL1", UCL1);
          document.documentElement.style.setProperty("--PL2", UCL3);
          document.documentElement.style.setProperty("--PL1DARK", UCL1DARK);
          contextFunctions.updatesliderClass("ucl_bg");
          contextFunctions.updateLogoSrc("ucl_logo.png");
          contextFunctions.updatescoreBgClass("ucl_score_bg");
          break;
        case "EL":
          document.documentElement.style.setProperty("--PL1", UEL2);
          document.documentElement.style.setProperty("--PL2", UEL1);
          document.documentElement.style.setProperty("--PL1DARK", UEL3);
          contextFunctions.updatesliderClass("uel_bg");
          contextFunctions.updateLogoSrc("uel_logo.png");
          contextFunctions.updatescoreBgClass("uel_score_bg");
          break;
        default:
          contextFunctions.updatesliderClass("pl_bg");
          contextFunctions.updateLogoSrc("pl_logo.png");
          contextFunctions.updatescoreBgClass("pl_score_bg");
          document.documentElement.style.setProperty("--PL1", PL1);
          document.documentElement.style.setProperty("--PL2", PL2);
          document.documentElement.style.setProperty("--PL1DARK", PL1DARK);
          break;
      }
    }
  };

  useLayoutEffect(() => {
    handleWindowLoad();

    window.addEventListener("load", handleWindowLoad);

    return () => {
      window.removeEventListener("load", handleWindowLoad);
    };
  }, [competition, location]);

  useEffect(() => {
    if (id_LS == null) {
      navigate("/starter");
    } else {
      if (!id) {
        dispatch(
          updateUserTeam({
            id: id_LS,
            shortName: shortName_LS,
            competition: competition_LS,
          })
        );
      }
    }
  }, [id]);

  if (document.readyState == "loading") {
    return <Loading></Loading>;
  }

  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
      <LiveChat />

    </Fragment>
  );
};

const RootLayout = () => {
  return (
    <CompetitionProvider>
      <RootContent />
    </CompetitionProvider>
  );
};
export default RootLayout;
