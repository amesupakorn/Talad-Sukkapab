import Navbar from "../nav/navbar";
import Arrival from "./arrival";
const Home = () => {
  const catagory = [
    { name:"Protein Powders & Bars", icon: "/images/home/protein.webp"},
    { name:"Natural Energy Drinks", icon: "/images/home/organique.webp"},
    { name:"Fitness Gear", icon: "/images/home/fitness.png"},
    { name:"Air Purifiers", icon: "/images/home/air.webp"},
    { name:"Organic Skincare", icon: "/images/home/pngtree.png"},
    { name:"Vitamins & Minerals",icon: "/images/home/blackmores.webp"},
           

  ]

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="h-[100px]"></div>
      <div className="p-4">
        <div className="grid grid-flow-col md:grid-cols-3 gap-6 overflow-x-auto scrollbar">
        {/* Main Banner */}
        <div className="md:col-span-2 relative bg-gray-800 rounded-lg overflow-hidden">
          <img
            src="/images/home/fitness.avif"
            alt="Fitness Gear"
            className="w-full h-full object-cover"
          />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-center items-start p-8">
              <h2 className="text-white md:text-5xl text-3xl font-bold">Upgrade Your Fitness Journey</h2>
              <p className="text-white mt-2 md:text-xl text-l">
                High-performance gear designed for every move.
              </p>
            </div>
        </div>
    
      {/* Side Banners */}
      <div className="flex flex-col gap-6 hidden md:flex">
        <div className="relative bg-gray-300 rounded-lg overflow-hidden">
          <img
            src="/images/home/air.jpeg"
            alt="Air Purifiers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center">
            <span className="text-white font-bold text-xl">Breathe Clean, Live Healthy</span>
          </div>
        </div>
        <div className="relative bg-gray-300 rounded-lg overflow-hidden">
          <img
            src="/images/home/water.webp"
            alt="Natural Energy Drinks"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center">
            <span className="text-white font-bold text-xl">Refresh with Pure Hydration</span>
          </div>
        </div>
      </div>
    </div>
  </div>


      {/* Category Section */}
      <div className="container mx-auto px-6 p-4">
        <h3 className="text-xl font-bold mb-4">Category</h3>
        <div className="grid grid-flow-col gap-2 text-center overflow-x-auto max-w-full">
            {catagory.map(({ name, icon }, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 group transition"
              >
                <div className="w-14 h-14 bg-gray-300 rounded-full mb-2 flex items-center group-hover:scale-110 justify-center overflow-hidden transition duration-300">
                  {icon ? (
                    <img
                      src={icon}
                      alt={name}
                      className="w-10 h-10 object-cover shadow-xl rounded-full group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : null}
                </div>
                <span className="text-sm group-hover:text-gray-700 transition duration-300">{name}</span>
              </div>
            ))}
          </div>
      </div>

      {/* New Arrival Section */}
      <Arrival/>
    </div>
  );
};

export default Home;
