import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify"

interface iShow {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
}
function Modals(props: iShow) {
    const { showModal, setShowModal } = props;
    const [title, setTitle] = useState<string>("");
    const [view, setView] = useState<string>("");
    const handelSubmit = () => {
        fetch('http://localhost:9000/Table', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, view
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Có lỗi xảy ra khi thêm sản phẩm");
                }
                window.location.reload();
                toast.success("Them san pham thanh cong!");
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
        toast.error("thatbai")
    }

    const handleClose = () => {
        setTitle("");
        setView("");
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
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title </Form.Label>
                            <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <Form.Label>View </Form.Label>
                            <Form.Control type="text" placeholder="Title" value={view} onChange={(e) => setView(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handelFalse}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handelSubmit}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Modals;
