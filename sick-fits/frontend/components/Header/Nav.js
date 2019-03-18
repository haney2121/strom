import Link from "next/link";
import { Mutation } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "../Cart/Cart";
import { NavStyles } from "./NavStyles";
import User from "../Auth/User";
import Signout from "../Auth/Signout";
import Cart from "../Cart/Cart";

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        {me && (
          <>
            <Link href="/">
              <a>Dashboard</a>
            </Link>
            <Link href="/projects">
              <a>Projects</a>
            </Link>
            <Link href="/account">
              <a>Account</a>
            </Link>
            <Signout />
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Signin</a>
          </Link>
        )}
        <Cart />
        <Mutation mutation={TOGGLE_CART_MUTATION}>
          {toggleCart => (
            <button id="projectList" onClick={toggleCart}>
              Assigned Projects
            </button>
          )}
        </Mutation>
      </NavStyles>
    )}
  </User>
);
export default Nav;
