"use client";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./login.css";
import Link from "next/link";
export default function Login() {
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: "500px", padding: "30px" }} className="shadow">
                <h2 className="fw-bold text-center">Đăng nhập</h2>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên người dùng</Form.Label>
                        <Form.Control id="email" name="email" type="text" placeholder="Nhập tên đăng nhập" style={{ height: "50px" }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control id="password" name="password" type="password" placeholder="Nhập mật khẩu" style={{ height: "50px" }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCheckbox">
                        <Form.Check type="checkbox" label="Lưu đăng nhập" />
                    </Form.Group>
                    <Button className="w-100" type="submit">Đăng nhập</Button>
                </Form>
                <p className="mt-3 text-center">
                    <a href="#" style={{ textDecoration: "none", color: "rgb(74, 74, 74)", fontSize: "14px" }}>
                        Không thể đăng nhập?
                    </a>
                </p>
                <Link href="/register">
                    <p className="mt-3 text-center">
                        Tạo tài khoản
                    </p>
                </Link>

            </Card>
        </Container>
    );
};
