import Navbar from "../nav/navbar";

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="h-[200px]"></div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to SuKaPab!</h1>
        <p className="text-gray-600">
          Explore our amazing products and services. Feel free to navigate through our menu to find what you're looking for.
        </p>
        <button className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
