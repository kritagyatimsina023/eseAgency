import { lazy, useState } from "react";
import ReactLenis from "lenis/react";
import Loader from "./components/Loader";
// import Brands from "./components/Brands";

const HeroTwo = lazy(() => import("./components/HeroTwo"));
const Info = lazy(() => import("./components/Info"));
const MiddleCard = lazy(() => import("./components/MiddleCard"));
const Brands = lazy(() => import("./components/Brands"));
const VideoComponent = lazy(() => import("./components/VideoComponent"));
const News = lazy(() => import("./components/News"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const [loaded, setLoaded] = useState(false);
  return (
    <ReactLenis root>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <HeroTwo />
      <Info />
      <MiddleCard />
      <Brands />
      <VideoComponent />
      <News />
      <Footer />
    </ReactLenis>
  );
}

export default App;
