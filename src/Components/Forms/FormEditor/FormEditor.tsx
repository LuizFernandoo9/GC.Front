import React, { useState } from 'react';
import styles from './FormEditor.module.scss';
import Pageheader from '../../Layouts/Pageheader/Pageheader';
import { Card, Row, Col, Button, Modal } from 'react-bootstrap';
import SunEditor from 'suneditor-react';
import { Link } from 'react-router-dom';


//sun editor
const htmlWithTableImages = `<center>  </center>`;


const FormEditor = () => {

  //Editor 
  const [value, setValue] = React.useState(htmlWithTableImages);

  //Modal Editor
  const [show, setShow] = useState<any>(false);

  const handleClose:any = () => setShow(false);
  const handleShow:any = () => setShow(true);

  return (

    <div className={styles.FormEditor}>
      <Pageheader titles="Forms" active="Form-Editor" />
      {/* <!-- container --> */}

      {/* <!-- Row --> */}
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header className="border-bottom-0">
              <Card.Title as='h3'>Sun Editor</Card.Title>
            </Card.Header>
            <Card.Body>
              <SunEditor />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <!--End Row--> */}

      {/* <!-- Row --> */}
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header className=" border-bottom-0">
              <Card.Title as='h6'>
                Form Editor in Modal
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='text-center'>
                <Button variant="primary" onClick={handleShow} className="text-center">
                  View live demo
                </Button>
                <Modal show={show} onHide={handleClose} size="lg" variant='primary' aria-labelledby="contained-modal-title-vcenter" backdrop="static" keyboard={false} centered>
                  <Modal.Header className='pd-20'>
                    <Modal.Title as='h6'>Create New Document</Modal.Title>
                    <Link to='#'><span className="text-dark d-flex ms-auto my-auto" onClick={() => { handleClose("Basic") }}><i className='fe fe-x ms-auto'></i></span></Link>
                  </Modal.Header>
                  <Modal.Body className="">
                    <SunEditor />
                  </Modal.Body>
                  <Modal.Footer className="pd-20">
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row >
      {/* <!-- /Row --> */}

      {/* <!-- Row --> */}
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header className=" border-bottom-0">
              <Card.Title as='h6'>
                Sun Editor with value
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <SunEditor
                setContents={value}
                onChange={setValue}
                setOptions={{
                  buttonList: [
                    ["undo", "redo"],
                    ["font", "fontSize"],
                    ['paragraphStyle', 'blockquote'],
                    [
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "subscript",
                      "superscript"
                    ],
                    ["fontColor", "hiliteColor"],
                    ["align", "list", "lineHeight"],
                    ["outdent", "indent"],
                    ["table", "horizontalRule", "link", "image", "video"],
                    ["preview", "print"],
                    ["removeFormat"]
                  ],
                  defaultTag: "div",
                  minHeight: "300px",
                  showPathLabel: false,
                  attributesWhitelist: {
                    all: "style",
                    table: "cellpadding|width|cellspacing|height|style",
                    tr: "valign|style",
                    td: "styleinsert|height|style",
                    img: "title|alt|src|style"
                  }
                }}
              />
              <hr />
              <Card.Title as='h6'>
              Example given value output:
              </Card.Title>
              <textarea className='text-editor bg-white text-dark border'
                disabled
                value={JSON.stringify(value, null, 2)}
                style={{ width: "100%", resize: "none", height: "600px" }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
};

FormEditor.propTypes = {};

FormEditor.defaultProps = {};

export default FormEditor;

