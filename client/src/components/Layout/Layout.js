import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';

const Layout = ({children,title,description,keyword,author}) => {
  return (
    <div>
       <Helmet>
                <meta charSet="utf-8" />
      <div>
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
      </div>

                <title>{title}</title>
               </Helmet>
        <Header/>
        <main style={{ minHeight:'70vh'}}>
        <Toaster />
        {children}
        </main>
        <Footer/>
        </div>
  );
};
Layout.defalutProps={
  title:'Clickmart-Shop Now',
  description:'mern  stack ecommerce project',
  keyword:"ecommerce, react, nodejs",
  author:"Dhruv Gajjar"
}

export default Layout;