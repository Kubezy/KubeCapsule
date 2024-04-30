
import Cards from "./components/pages/main/cards";
import Hero from "./components/pages/main/hero";
import Sponsors from "./components/pages/main/sponsors";

export default function Home() {
  return (
    <>
      <div className="mt-6 max-w-screen-xl mx-auto">
        <Hero/>
        <Cards />
        <Sponsors />
      </div>
    </>
  );
}
