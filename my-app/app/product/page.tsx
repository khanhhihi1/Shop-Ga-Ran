'use client';
import { useRouter } from 'next/navigation';
import Container from "react-bootstrap/Container";
import { Row, Col, Card, Button, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import Link from 'next/link';

interface ProductType {
    id: number;
    image: string;
    price: number;
    name: string;
    description: string;
    category: string;
    isHidden: boolean;
}

interface ProductProps {
    category: string;
    title: string;
}

export default function Product({ category, title }: ProductProps) {
    const [hiddenProducts, setHiddenProducts] = useState<ProductType[]>([]);
    const [posts, setPosts] = useState<ProductType[]>([]);
    const [cart, setCart] = useState<ProductType[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:9000/Product');
                if (!response.ok) throw new Error('Lỗi khi tải dữ liệu');
    
                const data = await response.json();
                console.log(data);
                const visibleProducts = data.filter((product: ProductType) => !product.isHidden);
                setPosts(visibleProducts);
                const hidden = data.filter((product: ProductType) => product.isHidden);
                setHiddenProducts(hidden);
            } catch (error) {
                console.error('Fetch error:', error);
                setPosts([]);
            }
        };
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(product => product.category === category);

    const addToCart = (product: ProductType) => {
        setCart((prevCart) => [...prevCart, product]);
        toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
    };

    return (
        <Container className="mt-4">
            <div className="text-center fs-3 mb-3 titles">{title}</div>
            <Row>
                {filteredPosts.map((post) => (
                    <Col md={3} sm={6} key={post.id} className="mb-4">
                        <Card style={{ cursor: 'pointer' }}>
                            <Link href={`/product/${post.id}`} passHref>
                                <Card.Img variant="top" src={post.image} alt={post.name} />
                            </Link>
                            <Card.Body className="text-center">
                                <Card.Title>{post.name}</Card.Title>
                                <Card.Text>{post.price .toLocaleString()}đ</Card.Text>
                                <Button variant="danger">Mua hàng</Button>
                                <Button 
                                    variant="dark" 
                                    className="ms-2"
                                    onClick={() => addToCart(post)}
                                >
                                    Thêm vào giỏ
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
