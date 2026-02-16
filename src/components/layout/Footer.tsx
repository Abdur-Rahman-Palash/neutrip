import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* About */}
          <div>
             <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 rounded-lg p-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Neu<span className="text-blue-500">Trip</span>
                </span>
              </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              The leading online travel agency in Bangladesh. Book flights, hotels, and holiday packages at the best prices with the best deals.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              {[1, 2, 3, 4].map((i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Book Flights</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Book Hotels</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Holiday Packages</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Visa Assistance</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Airport Transfer</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                 <span>+1 00000000<br/><span className="text-gray-500 text-xs">24/7 Support</span></span>
              </li>
              <li className="flex items-start gap-3">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                 <span>demo@neutrip.com</span>
              </li>
              <li className="flex items-start gap-3">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                 <span>123 Demo Street,<br/>Suite 456,<br/>New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 mb-6">
              <p>&copy; {new Date().getFullYear()} NeuTrip. All rights reserved.</p>
              <div className="flex gap-4">
                 <a href="#" className="hover:text-white transition-colors">Privacy</a>
                 <a href="#" className="hover:text-white transition-colors">Terms</a>
                 <a href="#" className="hover:text-white transition-colors">Sitemap</a>
              </div>
           </div>
           <div className="text-center">
              <a 
                href="https://neubyte.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg font-semibold text-gray-400 hover:text-blue-400 transition-colors"
              >
                Powered by- neubyte.tech
              </a>
           </div>
        </div>
      </div>
    </footer>
  );
}
