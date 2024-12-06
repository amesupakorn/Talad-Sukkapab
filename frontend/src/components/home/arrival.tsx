

const Arrival = () => {
    const product = [
        {brand:"NUTRILITE", name:"All Plant Protein" ,image:"/images/home/product/nutrilite.png", price:"฿ 1,330", size:"450 g"},
        {brand:"Pura D'or", name:"Organic Fractionated Coconut Oil (MCT)" ,image:"/images/home/product/37.avif", price:"฿ 520", size:"473 ml"},
        {brand:"NOW Foods", name:"L-Arginine, Double Strength," ,image:"/images/home/product/32.avif", price:"฿ 550", size:"1,000 mg"},

    ]

    return (
        <div className="container mx-auto px-6 p-4">
            <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">New Arrival</h3>
                <a href="#" className="text-red-500 text-sm">
                    View All
                </a>
            </div>

            <div className="grid grid-flow-col  auto-cols-[90%] sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto max-w-full">
            {product.map(({ brand, name, image, price, size}, index) => (
                <div
                key={index}
                className="border rounded-lg overflow-hidden group bg-white shadow-sm group-hover:shadow-md transition"
                >
                <div className="relative p-12">
                    <img
                    src={image}
                    alt={name}
                    className="object-cover rounded-lg group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    NEW
                    </span>
                </div>
                <div className="flex flex-col items-start p-4 ">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mb-2">
                            {brand} 
                            
                    </span>
                    <div className="flex items-center space-x-2">
                        <h4 className="text-md font-bold">{name}</h4>
                        <p className="text-sm text-gray-800">{size}</p>
                    </div>
                    
                    <p className="font-bold text-lg">{price}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Arrival;