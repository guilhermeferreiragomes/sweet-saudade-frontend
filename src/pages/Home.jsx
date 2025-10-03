import Navbar from '../components/Common/Navbar/Navbar'
import FirstSection from '../components/HomePage/FirstSection/FirstSection'
import InfoBar from '../components/HomePage/InfoBar/InfoBar'
import OurProducts from '../components/HomePage/OurPorducts/OurProducts'
import Reviews from '../components/HomePage/Reviews/Reviews'
import ReviewsPopup from '../components/HomePage/ReviewsPopup/ReviewsPopup'
import WaveSeparator from '../components/HomePage/WaveSeparator/WaveSeparator'
import OurMission from '../components/HomePage/OurMission/OurMission'
import Footer from '../components/Common/Footer/Footer'
import ScrollToTopButton from '../components/Common/ScrollToTopButton/ScrollToTopButton'


const Home = () => {
  return (
    <div>
      <Navbar />
      <FirstSection />
      <InfoBar />
      <OurProducts />
      <Reviews />
      <ReviewsPopup />
      <WaveSeparator />
      <OurMission />
      <Footer />
      <ScrollToTopButton />

    </div>
  )
}

export default Home
