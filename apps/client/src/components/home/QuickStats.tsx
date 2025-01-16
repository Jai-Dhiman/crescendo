export const QuickStats = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="card-gradient">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Recent Pieces */}
            <div className="space-y-3">
              <h4 className="font-recia-medium text-gray-600 dark:text-gray-400">Recent Pieces</h4>
              <div className="space-y-2">
                {/* List of recent pieces would go here */}
                <div className="flex items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <span className="truncate">Moonlight Sonata</span>
                </div>
              </div>
            </div>

            {/* Practice Time */}
            <div className="space-y-3">
              <h4 className="font-recia-medium text-gray-600 dark:text-gray-400">This Week</h4>
              <div className="text-3xl font-recia-bold text-primary-600">
                8.5 hours
              </div>
            </div>

            {/* Practice Goals */}
            <div className="space-y-3">
              <h4 className="font-recia-medium text-gray-600 dark:text-gray-400">Goals</h4>
              <div className="space-y-2">
                <div className="bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg">
                  Practice Bach for 2 hours
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h4 className="font-recia-medium text-gray-600 dark:text-gray-400">Quick Actions</h4>
              <div className="space-y-2">
                <button className="btn-soft w-full">Start Practice</button>
                <button className="btn-outline w-full">Upload Piece</button>
                <button className="btn-soft w-full">Continue Last</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};