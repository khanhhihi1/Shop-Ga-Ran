import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

interface iShow {
    showUpdateModal: boolean;
    setUpdateModal: (value: boolean) => void;
    post: PostType | null;
    fetchPosts: () => void;
}

function UpdateModel({ showUpdateModal, setUpdateModal, post, fetchPosts }: iShow) {
    const [title, setTitle] = useState<string>("");
    const [view, setView] = useState<string>("");

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setView(post.view);
        }
    }, [post]);

    const handleSubmit = async () => {
        if (!post) return;

        try {
            const response = await fetch(`http://localhost:9000/Table/${post.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, view })
            });

            if (!response.ok) throw new Error("Có lỗi xảy ra khi cập nhật sản phẩm");

            toast.success("Cập nhật sản phẩm thành công!");
            setUpdateModal(false);
            fetchPosts();
        } catch (error) {
            console.error("Lỗi:", error);
            toast.error("Cập nhật sản phẩm thất bại");
        }
    };

    const handleClose = () => {
        setTitle("");
        setView("");
        setUpdateModal(false);
    };

    return (
        <Modal show={showUpdateModal} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <Form.Label>View</Form.Label>
                        <Form.Control type="text" placeholder="Views" value={view} onChange={(e) => setView(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateModel;
