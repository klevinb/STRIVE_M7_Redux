import React from 'react';
import { Col, Row, Image, ListGroup, ListGroupItem } from 'react-bootstrap'
import './MainCss.css'


function SideBar(props) {
    return (
        <>
            <Col id="menu" md={2} className="col-2 black-bg">
                <div>
                    <Image src="/assets/spotify.png" width="120px" height="40px" />
                    <ListGroup id="menuOl" className="text-left">
                        <ListGroupItem><i className="fa fa-home pr-2"></i>Home</ListGroupItem>
                        <ListGroupItem className="border-left"><i className="fa fa-search pr-2"></i>Search</ListGroupItem>
                        <ListGroupItem><i className="fa fa-bookmark pr-2"></i>Your Library</ListGroupItem>
                    </ListGroup>
                </div>
                <div id="menu2">
                    <p><i className=" ml-2 fa fa-download pr-2"></i>Install App</p>
                    <hr></hr>
                    <div className="d-flex justify-content-between">
                        <Image src="/assets/avatar.png" style={{ height: "25px", width: "30px" }} className="pr-2" />
                        <p><b>Klevin Bazaiti</b></p>
                    </div>
                </div>
            </Col>
        </>
    );
}

export default SideBar;