import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import './model.css'
interface iShow {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
}
function ModalsAdmin(props: iShow) {
    const { showModal, setShowModal } = props;
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handelSubmit = () => {
        if (!id || !name || !price || !image || !category || !description) {
            toast.error("Vui lòng nhập đầy đủ thông tin !");
            return;
        }
        fetch('http://localhost:9000/Product', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id, name, price, image, category, description
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Có lỗi xảy ra khi thêm sản phẩm");
                }
                window.location.reload();
                toast.success("Thêm sản phẩm thành công!");
                return response.json();
            })
            .then(data => {
                console.log("Sản phẩm đã thêm:", data);
            })
            .catch(error => {
                console.error("Lỗi:", error);
                toast.error("Thêm sản phẩm thất bại");
            });
    };

    const handelFalse = () => {
        toast.error("Thất bại");
    };

    const handleClose = () => {
        setDescription("");
        setCategory("");
        setName("");
        setPrice("");
        setImage("");
        setId("");
        setShowModal(false);
    };
    return (
        <>
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title className="modal-title">Thêm sản phẩm mới</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <Form>
                        <Form.Group className="mb-3" controlId="formId">
                            <Form.Label className="mt-3 form-label">ID</Form.Label>
                            <Form.Control type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />

                            <Form.Label className="mt-3 form-label">Tên sản phẩm</Form.Label>
                            <Form.Control type="text" placeholder="Tên sản phẩm" value={name} onChange={(e) => setName(e.target.value)} />

                            <Form.Label className="mt-3 form-label">Mô tả sản phẩm</Form.Label>
                            <Form.Control type="text" placeholder="Tên sản phẩm" value={description} onChange={(e) => setDescription(e.target.value)} />

                            <Form.Label className="mt-3 form-label">Giá</Form.Label>
                            <Form.Control type="text" placeholder="Giá" value={price} onChange={(e) => setPrice(e.target.value)} />

                            <Form.Label className="mt-3 form-label">Danh mục</Form.Label>
                            <Form.Control type="text" placeholder="Tên sản phẩm" value={category} onChange={(e) => setCategory(e.target.value)} />

                            {/* <Form.Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">-- Chọn danh mục --</option>
                                <option value="Áo">Áo</option>
                            </Form.Select> */}

                            <Form.Label className="mt-3 form-label">Hình ảnh</Form.Label>
                            <Form.Control type="text" placeholder="URL hình ảnh" value={image} onChange={(e) => setImage(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handelSubmit}>
                        Thêm sản phẩm
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default ModalsAdmin;
