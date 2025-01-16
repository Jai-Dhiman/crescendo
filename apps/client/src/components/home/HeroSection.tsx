export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 -z-10" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-recia-medium mb-6 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            Transform Your Practice Journey
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-recia-regular mb-8">
            Track your progress, manage your sheet music, and record your practice sessions 
            all in one place. Elevate your musical journey with powerful analytics and 
            organized practice management.
          </p>
          <div className="flex gap-4">
            <button className="btn-gradient">Get Started</button>
            <button className="btn-outline">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};