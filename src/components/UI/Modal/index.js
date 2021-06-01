import React from 'react';
import { Modal, Button } from 'react-bootstrap';
/**
 *
 * @function Input
 */

const ModalForm = (props) => {
  return (
    <Modal size={props.size} show={props.show} onHide={props.handleClose}>
      <Modal.Header>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {
          props.buttons ?
          props.buttons.map((btn, index) => {
            return (
              <Button
                variant={btn.color}
                key={index}
                onClick={btn.onClick}
                size="md"
              >
                {btn.label}
              </Button>
            );
          }) :
          <>
            <Button variant="dark" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="dark" onClick={props.handleSave}>
              Save Changes
            </Button>
          </>
        }
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;
