'use client'
import { use } from "react";
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import useSWR, { Fetcher } from "swr";
import { Row, Col, Image, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
interface PostType {
    id: number;
    name: string;
    image: string;
    price: number;
    category:string;
    description: string;
}
const PostDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const [posts, setPosts] = useState<PostType[]>([]);
    const [cart, setCart] = useState<PostType[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    const addToCart = (product: PostType) => {
        setCart((prevCart) => [...prevCart, product]);
        toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
    };
    const fetcher: Fetcher<PostType, string> = (url) => fetch(url).then(res => res.json());
    const { data, error, isLoading } = useSWR(
        `http://localhost:9000/Product/${id}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (isLoading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>Lỗi khi tải dữ liệu!</p>;
    if (!data) return <p>Không tìm thấy sản phẩm!</p>;

    return (
        <>
            <Container className='mt-4'>
                <Breadcrumb>
                    <Breadcrumb.Item onClick={()=> window.history.back()} >Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {data.category}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{data.name}</Breadcrumb.Item>
                </Breadcrumb>
                <Row className="mt-3">
                    <Col md={6}>
                        <Image src={data.image} alt={data.name} fluid />
                    </Col>
                    <Col md={6}>
                        <h2>{data.name}</h2>
                        <h4 className="text-danger">{data.price}₫</h4>
                        <p>{data.description || "Không có mô tả"}</p>
                        <Button onClick={() => toast.error("Hiện tại web chưa có thanh toán bạn ơi!")} variant="danger">
                            Mua ngay
                        </Button>
                        <Button onClick={() => addToCart(data)} variant="dark" className="ms-2">
                            Thêm vào giỏ hàng
                        </Button>
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default PostDetail;
