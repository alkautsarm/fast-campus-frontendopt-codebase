import Link from "next/link";
import Image from "next/image";
import { fetchArticles } from "@/utils/api";

export default async function ArticlesPage() {
  const articles = await fetchArticles();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Travel Articles
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover amazing travel experiences and tips from our collection of
            articles
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {article.content.substring(0, 150)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
