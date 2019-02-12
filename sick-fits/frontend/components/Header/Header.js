import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";

import Nav from "./Nav";
import { AdminBar, Logo } from "./HeaderStyles";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.error();
};

const Header = () => (
  <div>
    <AdminBar>
      <div id="logo">
        <Link href="/">
          <Logo>
            <a>Strom Centre</a>
          </Logo>
        </Link>
      </div>
      <div className="profileBar">
        <Link href="profile">
          <a>Justin Haney</a>
        </Link>
      </div>
    </AdminBar>
    <Nav />
  </div>
);

export default Header;
