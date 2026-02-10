"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Terms and Conditions
              </h1>
              <p className="text-lg text-gray-600">
                Last updated: January 1, 2024
              </p>
            </div>

            {/* Terms Content */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="prose prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing and using NeuTrip ("the Service"), you accept and agree to be bound by these Terms and Conditions. 
                  If you do not agree to these terms, you may not access or use the Service.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  2. Description of Service
                </h2>
                <p>
                  NeuTrip is an online travel booking platform that provides:
                </p>
                <ul>
                  <li>Flight booking services</li>
                  <li>Hotel reservation services</li>
                  <li>Holiday packages</li>
                  <li>Travel insurance</li>
                  <li>Transportation services</li>
                  <li>Travel accessories and merchandise</li>
                  <li>Travel-related information and content</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  3. User Accounts
                </h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Account Creation</h3>
                <p>
                  To use certain features of the Service, you must create an account. You are responsible for:
                </p>
                <ul>
                  <li>Providing accurate and complete information</li>
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Account Security</h3>
                <p>
                  You are responsible for maintaining the security of your account. NeuTrip will not be liable for any loss or damage resulting from unauthorized use of your account.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Account Termination</h3>
                <p>
                  We reserve the right to suspend or terminate your account at any time for violation of these terms.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  4. Booking and Payment
                </h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Booking Terms</h3>
                <p>
                  All bookings are subject to the specific terms and conditions of the service providers (airlines, hotels, etc.).
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Payment Terms</h3>
                <p>
                  Payment for services must be made through our authorized payment gateways. All transactions are processed securely.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Cancellation and Refunds</h3>
                <p>
                  Cancellation and refund policies vary by service provider and fare type. Please review the specific terms before booking.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  5. User Content
                </h2>
                <p>
                  You retain ownership of any content you submit to the Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  6. Intellectual Property
                </h2>
                <p>
                  All content, trademarks, and intellectual property on the Service belong to NeuTrip or its licensors.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  7. Privacy Policy
                </h2>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  8. Limitation of Liability
                </h2>
                <p>
                  NeuTrip is not liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  9. Indemnification
                </h2>
                <p>
                  NeuTrip provides the Service on an "as is" basis without warranties of any kind.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  10. Termination
                </h2>
                <p>
                  We may terminate or suspend your access to the Service at any time, with or without notice.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  11. Governing Law
                </h2>
                <p>
                  These terms are governed by the laws of Bangladesh. Any disputes will be resolved under Bangladeshi law.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  12. Changes to Terms
                </h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  13. Contact Information
                </h2>
                <p>
                  For questions about these Terms and Conditions, please contact us at:
                </p>
                <ul>
                  <li>Email: legal@neutrip.net</li>
                  <li>Phone: +880 9617-617-617</li>
                  <li>Address: Rangs Pearl Tower, 4th Floor, House 76, Road 12, Block E, Banani, Dhaka 1213</li>
                </ul>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    Last updated: January 1, 2024
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
