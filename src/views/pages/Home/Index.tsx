import React from 'react'
import Footer from './Footer';
import HeaderBox from './Header';
import ListBox from './ListBox';
import MainBox from './MainBox';

const Home: React.FC = () => {
    return (
        <>
            <HeaderBox />
            <MainBox />
            <ListBox />
            <Footer />
        </>
    )
}

export default Home;