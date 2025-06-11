import { BsThreeDotsVertical } from "react-icons/bs";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";

export default function Dropdown(){
    return <div className="d-flex justify-content-center">
  
  <UncontrolledDropdown
    className=""
    direction="start"
  >
    <DropdownToggle
    BsThreeDotsVertical
      color="default"
    >
      <BsThreeDotsVertical />
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem header>
        Edit
      </DropdownItem>
      <DropdownItem disabled>
        Flag
      </DropdownItem>
      <DropdownItem>
        Delete
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
</div>
}