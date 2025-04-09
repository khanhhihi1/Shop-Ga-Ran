'use client'
import React from "react";
import { Container, Row, Col, Card, Table, ProgressBar, Navbar, Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse, faBarsProgress, faCartShopping,
    faTicket, faCircleUser, faChartSimple, faComments, faDollarSign, faTruck,
    faMagnifyingGlass, faBell, faBars, faSearch, faDollar, faRightFromBracket, faGear
} from "@fortawesome/free-solid-svg-icons";
import '../admin.css';
import useDarkMode from "../useDarkMode/page";
import Link from "next/link";
import { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';
export default function ShowAdmin() {
    const [show, setShow] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const toggleSidebar = () => setCollapsed(!collapsed);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    return (
        <>
            <div className="d-flex dark-mode">
                <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                    <h3 className="text-center">
                        <img
                            className="rounded-circle"
                            src="/logo-admin.jpg"
                            style={{ width: "100px", height: "100px", marginLeft: 50 }}
                            alt="Logo"
                        />
                    </h3>
                    <div className="navbar">
                        <div className="nav-item">
                            <div className="nav-link1">
                                <FontAwesomeIcon icon={faHouse} style={{ marginTop: "8px", marginLeft: "5px" }} />
                                <a href="/admin">Dashboard</a>
                            </div>
                            <div className="nav-link">
                                <FontAwesomeIcon
                                    icon={faBarsProgress}
                                    style={{ marginTop: "8px", marginLeft: "5px", color: "rgb(135, 136, 140)" }}
                                />
                                <a style={{ marginLeft: "2px", color: "rgb(135, 136, 140)" }} href="/admin/productAdmin">
                                    Quản lý sản phẩm
                                </a>
                            </div>
                            <div className="nav-link">
                                <FontAwesomeIcon
                                    icon={faCartShopping}
                                    style={{ marginTop: "8px", marginLeft: "5px", color: "rgb(135, 136, 140)" }}
                                />
                                <a style={{ marginLeft: "2px", color: "rgb(135, 136, 140)" }} href="#">
                                    Quản lý đơn hàng
                                </a>
                            </div>
                            <div className="nav-link">
                                <FontAwesomeIcon
                                    icon={faTicket}
                                    style={{ marginTop: "8px", marginLeft: "5px", color: "rgb(135, 136, 140)" }}
                                />
                                <a style={{ marginLeft: "2px", color: "rgb(135, 136, 140)" }} href="#">
                                    Quản lý voucher
                                </a>
                            </div>
                            <div className="nav-link">
                                <FontAwesomeIcon
                                    icon={faCircleUser}
                                    style={{ marginTop: "8px", marginLeft: "5px", color: "rgb(135, 136, 140)" }}
                                />
                                <a style={{ marginLeft: "2px", color: "rgb(135, 136, 140)" }} href="#">
                                    Quản lý user
                                </a>
                            </div>
                            <div className="nav-link">
                                <FontAwesomeIcon
                                    icon={faChartSimple}
                                    style={{ marginTop: "8px", marginLeft: "5px", color: "rgb(135, 136, 140)" }}
                                />
                                <a style={{ marginLeft: "2px", color: "rgb(135, 136, 140)" }} href="#">
                                    Thống kê
                                </a>
                            </div>
                            <div className="nav-link">
                                <FontAwesomeIcon
                                    icon={faComments}
                                    style={{ marginTop: "8px", marginLeft: "5px", color: "rgb(135, 136, 140)" }}
                                />
                                <a style={{ marginLeft: "2px", color: "rgb(135, 136, 140)" }} href="#">
                                    Đánh giá
                                </a>
                            </div>
                            <div className="nav-link">
                                <FontAwesomeIcon
                                    icon={faRightFromBracket}
                                    style={{ marginTop: "8px", marginLeft: "5px", color: "rgb(135, 136, 140)" }}
                                />
                                <a style={{ marginLeft: "2px", color: "rgb(135, 136, 140)" }} href="#">
                                    Đăng xuất
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <Container fluid className={`content w-100 ${collapsed ? 'collapsed-content' : ''}`}>
                    <Navbar className="navbar" style={{ marginRight: "10px" }}>
                        <Container fluid className="container-fluid">
                            <Button variant="light" onClick={toggleSidebar} className="me-3">
                                <FontAwesomeIcon icon={faBars} />
                            </Button>
                            <InputGroup className="input-group w-50">
                                <span className="input-group-text">
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                    />
                                </span>
                                <Form.Control type="search" className="form-control" placeholder="Tìm kiếm..." />
                            </InputGroup>
                            <div className="hihi">
                                <span className="me-3">
                                    <FontAwesomeIcon
                                        icon={faBell}
                                        style={{ fontSize: 24 }}
                                    />
                                </span>
                                <span>
                                    <Dropdown>
                                        <Dropdown.Toggle className="drop-down-avt" id="dropdown-basic">
                                            <img
                                                src="/avt.jpg"
                                                className="rounded-circle"
                                                alt="Cinque Terre"
                                                style={{ width: "45px", height: "45px", marginTop: "-18px", marginRight: "12px" }}
                                            />                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="/admin/account">Trang cá nhân</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Đăng xuất</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </span>
                                <span>
                                    <Button className="btn-setting" onClick={handleShow}>
                                        <FontAwesomeIcon
                                            icon={faGear}
                                            className="setting-icon"
                                            style={{ fontSize: 24 }}
                                        />
                                    </Button>
                                </span>
                                <Offcanvas show={show} onHide={handleClose} placement="end">
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title>Cấu hình trang web</Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                                            <Form.Check
                                                type="switch"
                                                id="dark-mode-switch"
                                                label=""

                                                checked={isDarkMode}
                                                onChange={toggleDarkMode}
                                            />
                                        </div>
                                    </Offcanvas.Body>
                                </Offcanvas>

                            </div>
                        </Container>
                    </Navbar>
                    <Container>
                        <div className="row">
                            <div className="col">
                                <div className="menu-account ">
                                    <ul className="d-flex ps-5">
                                        <li><Link href="#">Trang cá nhân</Link></li>
                                        <li className="account-li"><Link href="#">Mật khẩu</Link></li>
                                    </ul>
                                </div>
                                <div className="title-account ps-5 mt-3">
                                    <p>Tổng quan</p>
                                    <div className="title-account-name">
                                        <Form>
                                            <Form.Group className="d-flex">
                                                <Form.Label className="mt-3 form-label">Name</Form.Label>
                                                <Form.Control className="form-control-account ms-auto mt-auto me-5" type="text" placeholder="ID" />
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>

                </Container>
            </div>
        </>
    );
}
