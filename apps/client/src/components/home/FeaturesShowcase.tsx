export const FeaturesShowcase = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Practice Tracking */}
          <div className="card-gradient">
            <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-4">
            </div>
            <h3 className="text-xl font-recia-medium mb-3">Practice Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Track your practice time, set goals, and monitor your progress with detailed analytics.
            </p>
          </div>

          {/* Recording Management */}
          <div className="card-gradient">
            <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-4">
            </div>
            <h3 className="text-xl font-recia-medium mb-3">Recording Studio</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Record your practice sessions, organize recordings, and track your improvement over time.
            </p>
          </div>

          {/* Sheet Management */}
          <div className="card-gradient">
            <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-4">
            </div>
            <h3 className="text-xl font-recia-medium mb-3">Sheet Library</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Organize your sheet music digitally with easy access and smart annotations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};