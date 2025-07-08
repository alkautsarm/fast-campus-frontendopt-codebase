import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { fetchArticleById, fetchArticles } from "@/utils/api";

type Params = Promise<{
  id: string;
}>;

export async function generateStaticParams() {
  const articles = await fetchArticles();

  return articles.map((article) => ({
    id: article.id,
  }));
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { id } = await params;
  const article = await fetchArticleById(id);

  return (
    <div className="min-h-screen">
      <div>
        <article className="bg-white overflow-hidden">
          <div className="relative h-64 md:h-96 w-full">
            <Link
              href="/articles"
              className="absolute top-4 left-4 p-2 bg-white/80 hover:bg-white/90 rounded-full shadow-lg transition-colors z-1"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </Link>
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            <div className="prose max-w-none">
              {article.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
