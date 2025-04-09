'use client'
import React from "react";
import { Container, Row, Col, Card, Table, ProgressBar, Navbar, Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse, faBarsProgress, faCartShopping,
    faTicket, faCircleUser, faChartSimple, faComments, faDollarSign, faTruck,
    faMagnifyingGlass, faBell, faBars, faSearch, faDollar, faRightFromBracket, faGear
} from "@fortawesome/free-solid-svg-icons";
import './admin.css';
import useDarkMode from "./useDarkMode/page";
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
                                            <Dropdown.Item href="#/action-2">Cài đặt</Dropdown.Item>
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
                    <div className="row">
                        <div className="col-8 p-3">
                            <div className="row">
                                <h4 className="mt-1" style={{ marginLeft: "8px" }}>Doanh thu hôm nay</h4>
                                <div className="col-md-3">
                                    <div className="card p-3 text-center">
                                        <FontAwesomeIcon
                                            icon={faDollar}
                                            style={{ color: "rgb(175, 175, 38)", fontSize: "23px", marginBottom: "0.5rem" }}
                                        />
                                        <h4>532.000VND</h4>
                                        <p>Tổng doanh thu</p>
                                        <small className="text-success">+12%</small>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card p-3 text-center">
                                        <FontAwesomeIcon
                                            icon={faCartShopping}
                                            style={{ color: "rgb(100, 175, 67)", fontSize: "23px", marginBottom: "0.5rem" }}
                                        />
                                        <h4>57</h4>
                                        <p>Tổng đơn hàng</p>
                                        <small className="text-success">+8%</small>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card p-3 text-center">
                                        <FontAwesomeIcon
                                            icon={faTruck}
                                            style={{ color: "rgb(230, 119, 226)", fontSize: "23px", marginBottom: "0.5rem" }}
                                        />
                                        <h4>30</h4>
                                        <p>Đơn hàng đang giao</p>
                                        <small className="text-success">+2%</small>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card p-3 text-center">
                                        <FontAwesomeIcon
                                            icon={faCircleUser}
                                            style={{ color: "rgb(88, 155, 231)", fontSize: "23px", marginBottom: "0.5rem" }}
                                        />
                                        <h4>12</h4>
                                        <p>Người dùng mới</p>
                                        <small className="text-success">+3%</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 p-3">
                            <div className="chart-container">
                                <div className="chart d-flex">
                                    <div className="bar bg-primary mx-1" style={{ height: "70%", width: "20px" }}></div>
                                    <div className="bar bg-primary mx-1" style={{ height: "50%", width: "20px" }}></div>
                                    <div className="bar bg-primary mx-1" style={{ height: "80%", width: "20px" }}></div>
                                    <div className="bar bg-primary mx-1" style={{ height: "40%", width: "20px" }}></div>
                                    <div className="bar bg-primary mx-1" style={{ height: "90%", width: "20px" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
