import { Truck, Shield, Headphones, Award } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on all orders over $500'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: '100% secure payment processing'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated support team available'
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: 'Only the best bikes and gear'
    }
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About BikeBazaar</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're passionate about bikes and committed to providing the best cycling experience for our customers.
            With years of expertise and a wide selection of quality bikes, we're your trusted partner in cycling adventures.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 border rounded-lg">
              <feature.icon className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800"
              alt="Bike Shop"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, BikeBazaar has grown from a small local shop to one of the leading
              online bicycle retailers. Our journey began with a simple mission: to make quality
              bikes accessible to everyone.
            </p>
            <p className="text-gray-600 mb-4">
              We take pride in our carefully curated selection of bikes and our commitment to
              exceptional customer service. Our team of cycling enthusiasts is always ready to
              help you find the perfect bike for your needs.
            </p>
            <p className="text-gray-600">
              Whether you're a professional cyclist or just starting out, we're here to support
              your cycling journey with expert advice and top-quality products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}