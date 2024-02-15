import { Fragment,React } from 'react';
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <Fragment>
      <Header/>
      <Outlet />
      <Footer/>
    </Fragment>
  )
}
export default RootLayout;