"use client"
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhone, FaBuilding } from "react-icons/fa";

const ContactForm = () => {
    return (
        <Container className="mt-5">
            <h3 className="mb-3 fw-bold">Thông tin liên hệ</h3>
            <ul className="list-unstyled">
                <li>
                    Fried-King Việt Nam
                </li>
                <li>
                    1900 - 1533
                </li>
                <li>
                    Tầng 26, Tòa nhà CII Tower, số 152 Điện Biên Phủ, P.25, Bình Thạnh, TP.HCM
                </li>
            </ul>

          
            <h4 className="mt-4 fw-bold">Gửi tin nhắn cho chúng tôi</h4>
            <Form className="mt-3">
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Control type="text" placeholder="Tên " required />
                    </Col>
                    <Col md={6}>
                        <Form.Control type="text" placeholder="Số điện thoại " required />
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="E-mail " required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control as="textarea" rows={4} placeholder="Tin nhắn " required />
                </Form.Group>
                <Button variant="danger" type="submit" className="w-100">
                    GỬI
                </Button>
            </Form>
        </Container>
    );
};

export default ContactForm;