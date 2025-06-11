import { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function MyModel({ args, item }) {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState([]);
  const toggle = () => setModal(!modal);
  function loadModel() {
    setUser(args);
  }
  useEffect(() => {
    if (args) {
      loadModel();
    }
  }, [args, modal]);
  return (
    <>
      <div className="">
        <Button color="success" onClick={toggle}>
          View details
        </Button>
      </div>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>{item?.name}</ModalHeader>
        <ModalBody>
          <div>Age:{item.age}</div>
          <div>Class:{item.class}</div>
          <div>Subject:{item.subject}</div>
          <div>Attendance: {item.attendance}</div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            OK
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
