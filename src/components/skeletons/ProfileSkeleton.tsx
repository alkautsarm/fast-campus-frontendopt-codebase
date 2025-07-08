const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen py-10 border-l border-r border-gray-100">
      <div className="px-4 animate-pulse">
        {/* Avatar and email section */}
        <div className="rounded-lg mb-6 p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div>
              <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
        </div>

        {/* Email section */}
        <div className="rounded-lg mb-6 p-4 border border-gray-200">
          <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
          <div className="h-8 bg-gray-300 rounded w-full"></div>
        </div>

        {/* Password section */}
        <div className="rounded-lg mb-6 p-4 border border-gray-200">
          <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
          <div className="h-8 bg-gray-300 rounded w-full mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-24"></div>
        </div>

        {/* Logout button */}
        <div className="rounded-lg mb-6">
          <div className="h-12 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
