import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

const Header = () => {
  return (
    <Menu style={{ marginTop: "50px" }}>
    <Link route={`/`}>
      <a><h1>Ricardian LLC</h1></a>
    </Link>

    </Menu>
  );
};

export default Header;
