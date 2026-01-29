"use client";

import { services } from "@/data/services";
import Link from "next/link";

export function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Travel Services & Ecosystem
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need for a perfect travel experience, all in one place
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.link}
              className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300 bg-white group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors text-2xl">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
