import { useEffect } from 'react';
import { ResumeProvider } from '../../Context';
import Header from '../../component/Layouts/Header';
import Navbar from '../../component/Layouts/Navbar';
import Footer from '../../component/Layouts/Footer';
import Main from '../../component/Main';
import WebFont from 'webfontloader';
import { ChakraProvider } from '@chakra-ui/react';
function Resumes() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Pacifico', 'Poppins']
      }
    });
  }, []);

  return (
    <>
      <ChakraProvider>
        <ResumeProvider>
          {/* <Navbar /> */}
          {/* <Header /> */}
          <Main />
          {/* <Footer /> */}
        </ResumeProvider>
      </ChakraProvider>
    </>
  );
}

export default Resumes;
