"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-600">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
              </p>
              <p className="text-sm text-gray-500">
                Last updated: January 1, 2024
              </p>
            </div>

            {/* Privacy Content */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="prose prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  1. Information We Collect
                </h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1.1 Personal Information</h3>
                <p>
                  We may collect personal information when you:
                </p>
                <ul>
                  <li>Create an account</li>
                  <li>Book flights or hotels</li>
                  <li>Subscribe to newsletters</li>
                  <li>Contact customer support</li>
                </ul>
                <p>
                  This information may include:
                </p>
                <ul>
                  <li>Name and contact details</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Date of birth</li>
                  <li>Payment information</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">1.2 Travel Information</h3>
                <p>
                  When you book travel services, we collect:
                </p>
                <ul>
                  <li>Travel dates and destinations</li>
                  <li>Passenger details</li>
                  <li>Passport information</li>
                  <li>Preference data</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">1.3 Usage Data</h3>
                <p>
                  We automatically collect certain information about your use of the Service:
                </p>
                <ul>
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent</li>
                  <li>Click patterns and interactions</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  2. How We Use Your Information
                </h2>
                <p>
                  We use your information to:
                </p>
                <ul>
                  <li>Provide and improve our services</li>
                  <li>Process bookings and payments</li>
                  <li>Send booking confirmations</li>
                  <li>Provide customer support</li>
                  <li>Send marketing communications</li>
                  <li>Analyze usage patterns</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  3. Information Sharing
                </h2>
                <p>
                  We do not sell, rent, or lease your personal information to third parties except as described in this policy.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Service Providers</h3>
                <p>
                  We share your booking information with:
                </p>
                <ul>
                  <li>Airlines and hotels for booking fulfillment</li>
                  <li>Payment processors for payment processing</li>
                  <li>Travel insurance providers</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Legal Requirements</h3>
                <p>
                  We may share your information when required by law or to protect our rights.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  4. Data Security
                </h2>
                <p>
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul>
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure payment processing</li>
                  <li>Access controls and authentication</li>
                  <li>Regular security audits</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  5. Your Rights
                </h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Access to Information</h3>
                <p>
                  You have the right to:
                </p>
                <ul>
                  <li>View and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request data export</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Data Portability</h3>
                <p>
                  You can request a copy of your personal data in a structured format.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  6. Cookies and Tracking
                </h2>
                <p>
                  We use cookies and similar technologies to:
                </p>
                <ul>
                  <li>Remember your preferences</li>
                  <li>Keep you logged in</li>
                  <li>Analyze website usage</li>
                  <li>Personalize content</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  7. Third-Party Services
                </h2>
                <p>
                  Our Service integrates with third-party services:
                </p>
                <ul>
                  <li>Payment gateways</li>
                  <li>Social media platforms</li>
                  <li>Analytics services</li>
                  <li>Email marketing services</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  8. Data Retention
                </h2>
                <p>
                  We retain your information for as long as necessary to:
                </p>
                <ul>
                  <li>Fulfill bookings and transactions</li>
                  <li>Provide customer support</li>
                  <li>Improve our services</li>
                  <li>Comply with legal requirements</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  9. Children's Privacy
                </h2>
                <p>
                  Our Service is not intended for children under 13. We do not knowingly collect personal information from children.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  10. Changes to This Policy
                </h2>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any significant changes.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  11. Contact Us
                </h2>
                <p>
                  For privacy-related questions, contact us at:
                </p>
                <ul>
                  <li>Email: privacy@sharetrip.net</li>
                  <li>Phone: +880 9617-617-617</li>
                  <li>Address: Rangs Pearl Tower, 4th Floor, House 76, Road 12, Block E, Banani, Dhaka 1213</li>
                </ul>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    This Privacy Policy was last updated on January 1, 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
