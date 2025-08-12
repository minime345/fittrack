import React, { Suspense } from "react";
import PersonalPlanClient from "./PersonalPlanClient";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      {/* ако другите страници имат header, можеш да го сложиш тук */}
      
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="p-6 text-center text-lg text-gray-300">Зареждане...</div>}>
          <PersonalPlanClient />
        </Suspense>
      </section>
      
      {/* ако има footer, сложи го тук */}
    </main>
  );
}
