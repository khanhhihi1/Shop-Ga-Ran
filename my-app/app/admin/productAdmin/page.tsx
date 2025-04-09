'use client'
import React from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Col, Card, Table, ProgressBar, Navbar, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse, faBarsProgress, faCartShopping, faTicket,
    faCircleUser, faChartSimple, faComments, faDollarSign, faTruck, faMagnifyingGlass, faPlus,
    faBell, faBars, faSearch, faDollar, faPenToSquare, faTrash, faEye, faEyeSlash, faRotateRight, faRightFromBracket, faGear
} from "@fortawesome/free-solid-svg-icons";
import '../admin.css';
import Link from "next/link";
import ModalsAdmin from "@/app/component/caeat.model.admin";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import UpdateModelAdmin from "@/app/component/update-model-admin";
import useDarkMode from "../useDarkMode/page";
import Offcanvas from 'react-bootstrap/Offcanvas';
export default function ShowAdmin() {
    interface PostType {
        id: number;
        name: string;
        image: string;
        category: string;
        price: number;
        isHidden: boolean;
    }
    const [posts, setPosts] = useState<PostType[]>([]);
    const [post, setPost] = useState<PostType | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [hiddenProducts, setHiddenProducts] = useState<PostType[]>([]);
    const [showUpdateModal, setUpdateModal] = useState<boolean>(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [show, setShow] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const toggleSidebar = () => setCollapsed(!collapsed);
    const handleRestoreProduct = async (id: number) => {
        try {
            await fetch(`http://localhost:9000/Product/${id}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isHidden: false })
            });
            window.location.reload();
            setPosts(posts.map(p => p.id === id ? { ...p, isHidden: false } : p));
            toast.success("Sản phẩm đã được khôi phục!");
        } catch (error) {
            toast.error("Khôi phục sản phẩm thất bại");
        }
    };
    const handleDelete = async (id: number) => {
        console.log("Ẩn sản phẩm có ID:", id);
        if (!id) {
            toast.error("ID sản phẩm không hợp lệ!");
            return;
        }

        const url = `http://localhost:9000/Product/${id}`;
        console.log("Gọi API DELETE:", url);

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isHidden: true })
            });

            if (!response.ok) {
                throw new Error(`Lỗi khi ẩn sản phẩm: ${response.status} - ${response.statusText}`);
            }
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === id ? { ...post, isHidden: true } : post
                )
            );
            window.location.reload();
            toast.success("Sản phẩm đã được ẩn thành công!");
        } catch (error) {
            toast.error("Ẩn sản phẩm thất bại");
            console.error("Lỗi khi ẩn sản phẩm:", error);
        }
    };
    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:9000/Product');
            if (!response.ok) throw new Error('Lỗi khi tải dữ liệu');

            const data = await response.json();
            console.log(data);
            const visibleProducts = data.filter((product: PostType) => !product.isHidden);
            setPosts(visibleProducts);
            const hidden = data.filter((product: PostType) => product.isHidden);
            setHiddenProducts(hidden);
        } catch (error) {
            console.error('Fetch error:', error);
            setPosts([]);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);
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
                            <div className="nav-link">
                                <FontAwesomeIcon icon={faHouse} style={{ marginTop: "8px", marginLeft: "5px", color: "rgb(135, 136, 140)" }} />
                                <a href="/admin" style={{ marginLeft: "2px", color: "rgb(135, 136, 140)" }} >Dashboard</a>
                            </div>
                            <div className="nav-link1">
                                <FontAwesomeIcon
                                    icon={faBarsProgress}
                                    style={{ marginTop: "8px", marginLeft: "5px", color: "rgb(135, 136, 140)" }}
                                />
                                <a style={{ marginLeft: "2px" }} href="#">
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
                                    <img
                                        src="/avt.jpg"
                                        className="rounded-circle"
                                        alt="Cinque Terre"
                                        style={{ width: "45px", height: "45px", marginTop: "-18px", marginRight: "12px" }}
                                    />
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
                    <div className="row ">
                        <p className="text-center title-productAdmin">Quản lý sản phẩm</p>
                        <div className="col">
                            <Button className="button-add" onClick={() => setShowModal(true)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>

                            <Table striped bordered hover className="mt-3">
                                <thead>
                                    <tr className="text-center">
                                        <th>ID</th>
                                        <th>Tên</th>
                                        <th>Giá</th>
                                        <th>Hình</th>
                                        <th>Danh mục</th>
                                        <th>Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((item) => (
                                        <tr key={item.id} className="text-center">
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.price.toLocaleString()}đ</td>
                                            <td>
                                                <img src={item.image} alt={item.name} width="100" height="100" />
                                            </td>
                                            <td>{item.category}</td>
                                            <td>
                                                <Button className="action-btn bg-edit" onClick={() => { setUpdateModal(true); setPost(item); }}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </Button>
                                                <Link href={`/admin/productAdmin/${item.id}`}>
                                                    <Button className="action-btn bg-view mx-2">
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </Button>
                                                </Link>
                                                <Button className="action-btn bg-delete" onClick={() => handleDelete(item.id)}>
                                                    <FontAwesomeIcon icon={faEyeSlash} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="row">
                        <p className="text-center title-productAdmin">Sản phẩm ngưng bán</p>
                        <div className="col">
                            <Table className="mt-3">
                                <thead>
                                    <tr className="text-center">
                                        <th>ID</th>
                                        <th>Tên</th>
                                        <th>Giá</th>
                                        <th>Hình</th>
                                        <th>Danh mục</th>
                                        <th>Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hiddenProducts.map((item) => (
                                        <tr key={item.id} className="text-center">
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.price.toLocaleString()}đ</td>
                                            <td><img src={item.image} alt={item.name} width="100" height="100" /></td>
                                            <td>{item.category}</td>
                                            <td>
                                                <Button className="action-btn bg-restore" onClick={() => handleRestoreProduct(item.id)}>
                                                    <FontAwesomeIcon
                                                        icon={faRotateRight}
                                                    />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                </Container>
            </div>

            <ModalsAdmin showModal={showModal} setShowModal={setShowModal} />
            <UpdateModelAdmin showUpdateModal={showUpdateModal}
                setUpdateModal={setUpdateModal} post={post} fetchPosts={fetchPosts} />
        </>
    );
}
