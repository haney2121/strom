import Link from "next/link";
import { NavStyles } from "./NavStyles";
import User from "../Auth/User";

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
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Signin</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);
export default Nav;