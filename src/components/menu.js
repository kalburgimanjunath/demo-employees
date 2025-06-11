import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

function Menu(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...args}>
        <NavbarBrand href="/">Logo</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <div className="flex w-full" style={{display:isOpen?'block':'none'}}>
            <ul>
                <li><a href="home">Home</a></li>
                <li><a href="home">About us</a></li>

            </ul>
        </div>
      </Navbar>
    </div>
  );
}

export default Menu;