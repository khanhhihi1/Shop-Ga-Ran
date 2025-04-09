"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Button, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import FaTrash, { FontAwesomeIcon }  from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Lỗi khi đọc dữ liệu giỏ hàng:", error);
      }
    }
  }, []);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Giỏ hàng của bạn</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Giỏ hàng trống!</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>Hình Ảnh</th>
                <th>Sản Phẩm</th>
                <th>Giá</th>
                <th>Số Lượng</th>
                <th>Tổng</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="text-center">
                  <td>
                    <Image style={{margin:"0 auto"}} src={item.image} width={150} height={100} rounded />
                  </td>
                  <td>{item.name || "Không xác định"}</td>
                  <td>{(item.price || 0).toLocaleString()} VND</td>
                  <td>{item.quantity || 1}</td>
                  <td>{((item.price || 0) * (item.quantity || 1)).toLocaleString()} VND</td>
                  <td >
                    <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                      <FontAwesomeIcon
                      icon={faTrash}
                      />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row className="mt-4">
            <Col md={{ span: 4, offset: 8 }}>
              <h5>Tổng tiền: {getTotalPrice().toLocaleString()} VND</h5>
              <Button onClick={()=>toast.error("Hiện tại web chưa có thanh toán bạn ơi")} variant="success" className="w-50 mt-2">
                Thanh Toán
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default CartPage;
