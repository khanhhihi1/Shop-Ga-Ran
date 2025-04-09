'use client';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./register.css"
import { SignUp } from '@/app/actions/auth'
import { useActionState } from 'react'
import Link from "next/link";
import { SignupFormSchema, FormState } from "../lib/definitions";
export default function Register() {
    const [state, action, pending] = useActionState(SignUp, undefined)
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: "500px", padding: "30px" }} className="shadow">
                <h2 className="fw-bold text-center">Đăng Ký</h2>
                <Form  action={action}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Tên người dùng</Form.Label>
                        <Form.Control id="name" name="name" type="text" placeholder="Nhập tên đăng nhập" style={{ height: "50px" }} />
                    </Form.Group>
                    {state?.errors?.name && (
                        <Form.Text className="text-danger">{state.errors.name}</Form.Text>
                    )}
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Email</Form.Label>
                        <Form.Control id="email" name="email" type="text" placeholder="Nhập email" style={{ height: "50px" }} />
                    </Form.Group>
                    {state?.errors?.email && (
                        <Form.Text className="text-danger">{state.errors.email}</Form.Text>
                    )}
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control id="password" name="password" type="password" placeholder="Nhập mật khẩu" style={{ height: "50px" }} />
                    </Form.Group>
                    {state?.errors?.password && (
                        <div>
                            <p>Password must:</p>
                            <ul className="text-danger">
                                {state.errors.password.map((error) => ( 
                                    <li key={error}>- {error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Xác nhận mật khẩu</Form.Label>
                        <Form.Control type="password" placeholder="Nhập xác nhận mật khẩu" style={{ height: "50px" }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCheckbox">
                        <Form.Check type="checkbox" label="Lưu đăng nhập" />
                    </Form.Group>
                   <Button className="w-100" disabled={pending} type="submit">Đăng ký</Button>
                </Form>
                <p className="mt-3 text-center">
                    <a href="#" style={{ textDecoration: "none", color: "rgb(74, 74, 74)", fontSize: "14px" }}>
                        Không thể đăng ký?
                    </a>
                </p>
            </Card>
        </Container>
    );
};
