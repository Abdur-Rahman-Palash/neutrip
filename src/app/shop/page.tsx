"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  features: string[];
}

const products: Product[] = [
  {
    id: "1",
    name: "Travel Neck Pillow",
    description: "Ergonomic memory foam neck pillow for comfortable travel",
    price: 899,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1525273058-756c2c5a3b6c?w=400&h=400&fit=crop",
    category: "comfort",
    brand: "TravelComfort",
    inStock: true,
    rating: 4.5,
    reviewCount: 234,
    features: ["Memory Foam", "Washable Cover", "Compact Size", "Airplane Compatible"]
  },
  {
    id: "2",
    name: "Packing Cubes Set",
    description: "6-piece travel packing cubes for organized luggage",
    price: 1299,
    image: "https://images.unsplash.com/photo-1556075798-60212b619ac8?w=400&h=400&fit=crop",
    category: "organization",
    brand: "PackSmart",
    inStock: true,
    rating: 4.7,
    reviewCount: 189,
    features: ["6 Different Sizes", "Waterproof", "Lightweight", "See-through Mesh"]
  },
  {
    id: "3",
    name: "Universal Travel Adapter",
    description: "All-in-one international travel adapter with USB ports",
    price: 1599,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
    category: "electronics",
    brand: "PowerTech",
    inStock: true,
    rating: 4.3,
    reviewCount: 156,
    features: ["150+ Countries", "2 USB Ports", "Safety Certified", "Compact Design"]
  },
  {
    id: "4",
    name: "Travel Toiletry Bag",
    description: "Hanging toiletry bag with multiple compartments",
    price: 799,
    image: "https://images.unsplash.com/photo-1524863479829-916d8e5f9ea2?w=400&h=400&fit=crop",
    category: "organization",
    brand: "TravelEssentials",
    inStock: true,
    rating: 4.4,
    reviewCount: 98,
    features: ["Hanging Hook", "Waterproof", "Multiple Pockets", "Clear Compartments"]
  },
  {
    id: "5",
    name: "Portable Luggage Scale",
    description: "Digital luggage scale to avoid overweight fees",
    price: 1899,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    category: "electronics",
    brand: "WeighRight",
    inStock: true,
    rating: 4.2,
    reviewCount: 67,
    features: ["Digital Display", "110lb Capacity", "Battery Powered", "Compact Size"]
  },
  {
    id: "6",
    name: "Travel First Aid Kit",
    description: "Comprehensive first aid kit for travel emergencies",
    price: 999,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    category: "safety",
    brand: "SafeTravel",
    inStock: true,
    rating: 4.6,
    reviewCount: 145,
    features: ["100+ Items", "Compact Case", "Organized Compartments", "Travel-sized"]
  },
  {
    id: "7",
    name: "Noise-Canceling Headphones",
    description: "Wireless headphones with active noise cancellation",
    price: 4999,
    originalPrice: 6999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "electronics",
    brand: "SoundWave",
    inStock: true,
    rating: 4.8,
    reviewCount: 267,
    features: ["Active Noise Cancellation", "30-hour Battery", "Bluetooth 5.0", "Foldable Design"]
  },
  {
    id: "8",
    name: "Travel Power Bank",
    description: "20000mAh portable charger with multiple ports",
    price: 2499,
    image: "https://images.unsplash.com/photo-1596445832528-7d65b02c5f59?w=400&h=400&fit=crop",
    category: "electronics",
    brand: "PowerGo",
    inStock: true,
    rating: 4.1,
    reviewCount: 89,
    features: ["20000mAh", "3 USB Ports", "LED Display", "Fast Charging"]
  }
];

const categories = [
  { id: "all", name: "All Products" },
  { id: "comfort", name: "Comfort" },
  { id: "organization", name: "Organization" },
  { id: "electronics", name: "Electronics" },
  { id: "safety", name: "Safety" }
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const formatPrice = (price: number) => {
    return `BDT ${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Travel Shop
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Essential travel accessories and gadgets to make your journey comfortable and convenient.
            </p>
          </div>

          {/* Cart Button */}
          <div className="fixed top-24 right-4 z-50">
            <button
              onClick={() => setShowCart(!showCart)}
              className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Product Content */}
                <div className="p-4">
                  {/* Brand and Category */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">{product.brand}</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} viewBox="0 0 24 24">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{product.rating} ({product.reviewCount})</span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                    {product.features.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        +{product.features.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-blue-600">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="whitespace-nowrap"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Sidebar */}
          {showCart && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowCart(false)} />
              <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                    <button
                      onClick={() => setShowCart(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                      </svg>
                      <p className="text-gray-500">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">{item.product.name}</h4>
                            <p className="text-blue-600 font-bold">{formatPrice(item.product.price)}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="ml-auto text-red-600 hover:text-red-700"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M18 6L6 18M6 6l12 12"/>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-gray-200 p-6">
                    <div className="flex justify-between mb-4">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-lg font-bold text-blue-600">{formatPrice(getTotalPrice())}</span>
                    </div>
                    <Button className="w-full">
                      Proceed to Checkout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
