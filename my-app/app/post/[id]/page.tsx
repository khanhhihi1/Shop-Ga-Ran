'use client'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useSWR,{Fetcher} from "swr";
import Link from 'next/link';
const PostDetail = (
    {
params,}
    : {
    params:{ id: string }
}) => {
    const fetcher: Fetcher <PostType, string> = (url:string)=> fetch(url).then(res=>res.json());
    const {data, error,isLoading} = useSWR(
        `http://localhost:9000/Table/${params.id}`,fetcher,{
            revalidateIFStable: false,
            revalidateOnFocus:false,
            revalidateOnReconnect:false,
        }
    );
    return <>
      <Card className='text-center' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{data?.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Lượt xem: {data?.view}</Card.Subtitle>
                <Card.Text>ID bài viết: {data?.id}</Card.Text>
                <Link href="/" passHref>
                    <Button variant="primary">Quay lại</Button>
                </Link>
            </Card.Body>
        </Card>
    </>
}
export default PostDetail;