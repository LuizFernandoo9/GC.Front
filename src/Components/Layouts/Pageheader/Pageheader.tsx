import React from 'react';
import { ButtonGroup, Dropdown, Button } from 'react-bootstrap';
import styles from './Pageheader.module.scss';

const Pageheader = (props) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className={styles.Pageheader}>
      {/* <!-- breadcrumb --> */}
      <div className="breadcrumb-header justify-content-between">
        <div className="my-auto">
          <div className="d-flex">
            <h4 className="content-title mb-0 my-auto">{props.titles}</h4><span className="text-muted mt-1 tx-13 ms-2 mb-0">/ {props.active}</span>
          </div>
        </div>
        <div className="d-sm-flex">
          <div className="d-flex my-xl-auto right-content">
            <div className="pe-1 mb-xl-0">
              <Button variant='info' className="btn-icon me-2 btn-b"><i className="mdi mdi-filter-variant"></i></Button>
            </div>
            <div className="pe-1 mb-xl-0">
              <Button variant='danger' className="btn-icon me-2"><i className="mdi mdi-star"></i></Button>
            </div>
            <div className="pe-1 mb-xl-0">
              <Button variant='warning' className="btn-icon me-2"><i className="mdi mdi-refresh"></i></Button>
            </div>
          </div>  
          <div className="mb-xl-0 right-content">
            <Dropdown as={ButtonGroup} placement="bottom-end" id="bg-vertical-dropdown-1">
              <Button variant="primary">{new Date().getDate()} {months[new Date().getMonth()]} {new Date().getFullYear()}</Button>
              <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />
              <Dropdown.Menu style={{margin: '0px'}} >
                <Dropdown.Item eventKey="1">2018</Dropdown.Item>
                <Dropdown.Item eventKey="2">2019</Dropdown.Item>
                <Dropdown.Item eventKey="1">2020</Dropdown.Item>
                <Dropdown.Item eventKey="2">2021</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div> 
      </div>
      {/* <!-- breadcrumb --> */}
    </div>
  )
};

Pageheader.defaultProps = {};

export default Pageheader;
