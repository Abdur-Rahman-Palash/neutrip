"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { mockHotelsExtended, ExtendedHotel } from "@/data/hotelsExtended";

type SortOption = "price-low" | "price-high" | "rating-high" | "rating-low" | "distance";

function HotelResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [hotels, setHotels] = useState<ExtendedHotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<ExtendedHotel[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("price-low");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [selectedStarRatings, setSelectedStarRatings] = useState<number[]>([3, 4, 5]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [freeCancellationOnly, setFreeCancellationOnly] = useState(false);
  const [breakfastIncludedOnly, setBreakfastIncludedOnly] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Search parameters
  const destination = searchParams.get("destination") || "";
  const destinationCode = searchParams.get("destinationCode") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = parseInt(searchParams.get("guests") || "2");
  const rooms = parseInt(searchParams.get("rooms") || "1");

  useEffect(() => {
    setHotels(mockHotelsExtended);
    setFilteredHotels(mockHotelsExtended);
  }, []);

  useEffect(() => {
    let filtered = [...hotels];

    // Price filter
    filtered = filtered.filter(hotel => 
      hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );

    // Star rating filter
    filtered = filtered.filter(hotel => 
      selectedStarRatings.includes(hotel.starRating)
    );

    // Amenities filter
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(hotel =>
        selectedAmenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }

    // Free cancellation filter
    if (freeCancellationOnly) {
      filtered = filtered.filter(hotel => hotel.freeCancellation);
    }

    // Breakfast included filter
    if (breakfastIncludedOnly) {
      filtered = filtered.filter(hotel => hotel.breakfastIncluded);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating-high":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "rating-low":
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case "distance":
        filtered.sort((a, b) => {
          const aDist = parseFloat(a.distance?.split(' ')[0] || '999');
          const bDist = parseFloat(b.distance?.split(' ')[0] || '999');
          return aDist - bDist;
        });
        break;
    }

    setFilteredHotels(filtered);
  }, [hotels, sortBy, priceRange, selectedStarRatings, selectedAmenities, freeCancellationOnly, breakfastIncludedOnly]);

  const handleStarRatingToggle = (rating: number) => {
    setSelectedStarRatings(prev => 
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const formatPrice = (price: number) => {
    return `BDT ${price.toLocaleString()}`;
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  const allAmenities = Array.from(new Set(hotels.flatMap(h => h.amenities)));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Search Summary */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <span className="font-medium text-gray-900">{destination}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-sm text-gray-600">
                    {checkIn} - {checkOut} • {nights} night{nights > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {guests} Guest{guests > 1 ? 's' : ''} • {rooms} Room{rooms > 1 ? 's' : ''}
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push("/hotels")}
              >
                Modify Search
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="lg:w-80">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className="w-full"
                  variant="outline"
                >
                  Filters ({selectedStarRatings.length + selectedAmenities.length + (freeCancellationOnly ? 1 : 0) + (breakfastIncludedOnly ? 1 : 0)})
                </Button>
              </div>

              {/* Filters */}
              <div className={`bg-white rounded-lg p-6 shadow-sm ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
                <h3 className="font-bold text-gray-900 mb-6">Filters</h3>

                {/* Sort */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating-high">Rating: High to Low</option>
                    <option value="rating-low">Rating: Low to High</option>
                    <option value="distance">Distance</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <RangeSlider
                    min={0}
                    max={300}
                    value={priceRange}
                    onChange={setPriceRange}
                    label="Price Range (per night)"
                    formatValue={formatPrice}
                  />
                </div>

                {/* Star Rating */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Star Rating</label>
                  <div className="space-y-2">
                    {[5, 4, 3].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedStarRatings.includes(rating)}
                          onChange={() => handleStarRatingToggle(rating)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex items-center gap-1">
                          {[...Array(rating)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                          <span className="text-sm text-gray-700 ml-1">{rating} Stars</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {allAmenities.map((amenity) => (
                      <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Filters */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Special Offers</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={freeCancellationOnly}
                        onChange={(e) => setFreeCancellationOnly(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Free Cancellation</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={breakfastIncludedOnly}
                        onChange={(e) => setBreakfastIncludedOnly(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Breakfast Included</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">
                    {filteredHotels.length} Hotels Found
                  </h2>
                  <div className="text-sm text-gray-600">
                    {destination} • {checkIn} - {checkOut}
                  </div>
                </div>
              </div>

              {/* Hotel List */}
              <div className="space-y-4">
                {filteredHotels.map((hotel) => (
                  <div key={hotel.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row">
                      {/* Hotel Image */}
                      <div className="lg:w-80 h-48 lg:h-auto">
                        <img 
                          src={hotel.image} 
                          alt={hotel.name}
                          className="w-full h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none"
                        />
                      </div>

                      {/* Hotel Info */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            {/* Hotel Name and Rating */}
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{hotel.name}</h3>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="flex items-center gap-1">
                                    {[...Array(hotel.starRating)].map((_, i) => (
                                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                      </svg>
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-600">
                                    {hotel.rating} ({hotel.reviewCount} reviews)
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Location */}
                            <div className="text-sm text-gray-600 mb-3">
                              📍 {hotel.location} {hotel.distance && `• ${hotel.distance}`}
                            </div>

                            {/* Amenities */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {hotel.amenities.slice(0, 4).map((amenity) => (
                                <span key={amenity} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  {amenity}
                                </span>
                              ))}
                              {hotel.amenities.length > 4 && (
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  +{hotel.amenities.length - 4} more
                                </span>
                              )}
                            </div>

                            {/* Special Offers */}
                            <div className="flex flex-wrap gap-2">
                              {hotel.freeCancellation && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                  ✅ Free Cancellation
                                </span>
                              )}
                              {hotel.breakfastIncluded && (
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                  🍳 Breakfast Included
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Price and Book */}
                          <div className="lg:text-right lg:pl-6">
                            <div className="text-sm text-gray-600 mb-1">per night</div>
                            <div className="text-2xl font-bold text-blue-600 mb-3">
                              {formatPrice(hotel.price)}
                            </div>
                            <div className="text-sm text-gray-600 mb-3">
                              {formatPrice(hotel.price * nights)} for {nights} night{nights > 1 ? 's' : ''}
                            </div>
                            <Button
                              onClick={() => router.push(`/hotels/${hotel.id}?${searchParams.toString()}`)}
                              size="sm"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredHotels.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <div className="text-gray-500 mb-4">No hotels found matching your criteria</div>
                  <Button variant="outline" onClick={() => {
                    setPriceRange([0, 300]);
                    setSelectedStarRatings([3, 4, 5]);
                    setSelectedAmenities([]);
                    setFreeCancellationOnly(false);
                    setBreakfastIncludedOnly(false);
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function HotelResults() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotel results...</p>
        </div>
      </div>
    }>
      <HotelResultsContent />
    </Suspense>
  );
}
