import { FileText } from "lucide-react";

const ArticlesPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-4 border-l border-r border-gray-100">
      <div className="px-6 py-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium mb-2">Coming Soon</h2>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
