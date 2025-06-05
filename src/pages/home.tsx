import React from 'react';
import HeroSection from '../components/homeComponents/Hero';
// import CategoryPage from '../components/homeComponents/Category';
// import { products } from "../pages/Products/products";
// import RandomProducts from './Products/RelatedProd';
// import BlogBanner from './Blog/blogBanner';
import FeaturedBlog from './Blog/featuredBlog';
import FeaturedProducts from './Products/RelatedProd';



const Home: React.FC = () => {
  return (
<>
<HeroSection/>
{/* <CategoryPage products={products}/> */}
<FeaturedProducts/>
<FeaturedBlog/>
{/* <BlogBanner/> */}


</>
  );
};

export default Home;
