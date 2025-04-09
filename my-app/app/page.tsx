import Link from "next/link";
import Product from "./product/page";
import Post from "./post/post";
export default async function Home() {
 
  return (
    <>
      <Product category="combo" title="Combo Fried King" />
      <Product category="thuc-an" title="Thức ăn kèm" />
      {/* <Post /> */}
    </>
  );
}

