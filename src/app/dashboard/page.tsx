"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

interface Booking {
  id: string;
  type: "flight" | "hotel" | "holiday";
  reference: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  date: string;
  destination: string;
  amount: number;
  details: string;
  canCancel: boolean;
  canModify: boolean;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  loyaltyPoints: number;
  tier: "Silver" | "Gold" | "Platinum";
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("user");
    
    if (!isAuthenticated || !userData) {
      router.push("/auth/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser({
      name: parsedUser.name || "Neutrip User",
      email: parsedUser.email || "neutrip@786",
      phone: parsedUser.phone || "+8801234567890",
      memberSince: "2024-01-01",
      loyaltyPoints: 2500,
      tier: "Gold"
    });

    // Mock bookings data
    setBookings([
      {
        id: "1",
        type: "flight",
        reference: "FLT-2024-001234",
        status: "confirmed",
        date: "2024-02-15",
        destination: "Dhaka to Dubai",
        amount: 45000,
        details: "Emirates Airlines, Economy Class",
        canCancel: true,
        canModify: true
      },
      {
        id: "2",
        type: "hotel",
        reference: "HTL-2024-005678",
        status: "confirmed",
        date: "2024-02-15",
        destination: "Burj Al Arab, Dubai",
        amount: 75000,
        details: "Deluxe Room, 3 nights",
        canCancel: true,
        canModify: true
      },
      {
        id: "3",
        type: "holiday",
        reference: "PKG-2024-009012",
        status: "completed",
        date: "2024-01-10",
        destination: "Cox's Bazar Package",
        amount: 25000,
        details: "3 Days 2 Nights Package",
        canCancel: false,
        canModify: false
      }
    ]);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    router.push("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flight": return "✈️";
      case "hotel": return "🏨";
      case "holiday": return "🏖️";
      default: return "📋";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* User Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500">Member since {user.memberSince}</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                      {user.tier} Member
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="text-center md:text-right">
                  <div className="text-2xl font-bold text-blue-600">{user.loyaltyPoints.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Loyalty Points</div>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-sm p-2 mb-6">
            <div className="flex flex-wrap gap-2">
              {[
                { id: "overview", label: "Overview", icon: "📊" },
                { id: "bookings", label: "My Bookings", icon: "📋" },
                { id: "profile", label: "Profile", icon: "👤" },
                { id: "loyalty", label: "Loyalty", icon: "⭐" },
                { id: "settings", label: "Settings", icon: "⚙️" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{bookings.length}</div>
                    <div className="text-sm text-gray-600">Total Bookings</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {bookings.filter(b => b.status === "confirmed").length}
                    </div>
                    <div className="text-sm text-gray-600">Active Bookings</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      ৳{bookings.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-orange-600 mb-2">{user.loyaltyPoints}</div>
                    <div className="text-sm text-gray-600">Points Earned</div>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h3>
                  <div className="space-y-3">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3">
                            <span className="text-2xl">{getTypeIcon(booking.type)}</span>
                            <div>
                              <div className="font-medium text-gray-900">{booking.destination}</div>
                              <div className="text-sm text-gray-600">{booking.details}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                Ref: {booking.reference} • {booking.date}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">৳{booking.amount.toLocaleString()}</div>
                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "bookings" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">My Bookings</h2>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option value="all">All Types</option>
                      <option value="flight">Flights</option>
                      <option value="hotel">Hotels</option>
                      <option value="holiday">Holiday Packages</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option value="all">All Status</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex gap-4 flex-1">
                          <span className="text-3xl">{getTypeIcon(booking.type)}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-gray-900">{booking.destination}</h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 mb-1">{booking.details}</div>
                            <div className="text-xs text-gray-500">
                              Ref: {booking.reference} • {booking.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-end gap-2">
                          <div className="text-right">
                            <div className="font-bold text-lg text-gray-900">৳{booking.amount.toLocaleString()}</div>
                          </div>
                          <div className="flex gap-2">
                            {booking.canModify && (
                              <Button variant="outline" size="sm">
                                Modify
                              </Button>
                            )}
                            {booking.canCancel && (
                              <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                                Cancel
                              </Button>
                            )}
                            <Button size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={user.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={user.phone}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                      <input
                        type="text"
                        value={user.memberSince}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button>Update Profile</Button>
                    <Button variant="outline">Change Password</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "loyalty" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Loyalty Program</h2>
                
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-3xl font-bold mb-2">{user.loyaltyPoints.toLocaleString()} Points</div>
                      <div className="text-blue-100">Current Balance</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold mb-2">{user.tier}</div>
                      <div className="text-blue-100">Member Tier</div>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Points to next tier:</span>
                      <span className="font-bold">2,500</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div className="bg-white rounded-full h-2" style={{ width: "50%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-3">How to Earn Points</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• 10 points per ৳100 spent on flights</li>
                      <li>• 15 points per ৳100 spent on hotels</li>
                      <li>• 20 points per ৳100 spent on holiday packages</li>
                      <li>• 100 points for writing reviews</li>
                      <li>• 500 points for referring friends</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-3">Redeem Points</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• 1000 points = ৳100 discount</li>
                      <li>• 2500 points = ৳300 discount</li>
                      <li>• 5000 points = ৳700 discount</li>
                      <li>• 10000 points = ৳1500 discount</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Email notifications for bookings</span>
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">SMS notifications</span>
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Marketing emails</span>
                        <input type="checkbox" className="h-4 w-4" />
                      </label>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-3">Privacy</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Profile visibility</span>
                        <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                          <option>Public</option>
                          <option>Private</option>
                        </select>
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Share travel history</span>
                        <input type="checkbox" className="h-4 w-4" />
                      </label>
                    </div>
                  </div>

                  <Button>Save Settings</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
