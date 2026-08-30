'use client'

import { useState } from 'react'
import BlogCard from '@/components/BlogCard'
import { categories } from '@/data/blogPosts'

const allCategories = ['All', ...categories]

export default function FilterableBlog({ posts }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Category Filter */}
      <div className="bg-sand-50 border-b border-sand-200 py-5 sticky top-20 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-desert-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-sand-200 hover:border-desert-300 hover:text-desert-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-gray-400 text-sm mb-8">
            {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
