'use client';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Modals from '../component/creat.model';
import { Button } from 'react-bootstrap';
import UpdateModel from '../component/update-model';
import Link from 'next/link';
import { toast } from "react-toastify";
export default function Post() {
    interface PostType {
        id: number;
        title: string;
        view: string;
    }

    const [posts, setPosts] = useState<PostType[]>([]);
    const [post, setPost] = useState<PostType | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showUpdateModal, setUpdateModal] = useState<boolean>(false);

    useEffect(() => {
        fetchPosts();
    }, []);
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:9000/Table/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Lỗi khi xóa bài viết');
            }
            toast.success("Xóa sản phẩm thành công!");
            setPosts(posts.filter((post) => post.id !== id));
        } catch (error) {
            toast.error("Xóa sản phẩm thất bại");
            console.error('Lỗi xóa bài viết:', error);
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:9000/Table');
            if (!response.ok) throw new Error('Lỗi khi tải dữ liệu');

            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Fetch error:', error);
            setPosts([]);
        }
    };

    return (
        <>
            <Button onClick={() => setShowModal(true)}>Add</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Views</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.view}</td>
                            <td>
                                <Button className="bg-success" onClick={() => { setUpdateModal(true); setPost(item); }}>Edit</Button>
                                <Link href={`/post/${item.id}`} passHref>
                                    <Button className="mx-2">View</Button>
                                </Link>
                                <Button className="bg-danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modals showModal={showModal} setShowModal={setShowModal} />
            <UpdateModel showUpdateModal={showUpdateModal} setUpdateModal={setUpdateModal} post={post} fetchPosts={fetchPosts} />
        </>
    );
}
