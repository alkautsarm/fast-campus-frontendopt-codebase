export default function ArticleDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="h-6 bg-gray-200 rounded-lg w-32 mb-8 animate-pulse"></div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-64 md:h-96 bg-gray-200 animate-pulse"></div>

          <div className="p-8">
            <div className="h-8 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>

            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-5/6 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
