import React, { useState } from 'react';
import { Search, Calendar, User, Music, Users, Trophy } from 'lucide-react';

// Mock data for news articles
const newsArticles = [
  {
    id: 1,
    title: 'Summer Tournament Series Announced',
    excerpt: 'Get ready for our biggest summer yet with five major tournaments scheduled across the city.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Tennis League Admin',
    date: 'June 5, 2025',
    image: 'https://images.pexels.com/photos/8224057/pexels-photo-8224057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Tournaments',
    featured: true,
  },
  {
    id: 2,
    title: 'New Court Facilities Opening Next Month',
    excerpt: 'The city is opening six new tennis courts with state-of-the-art surfaces and lighting for evening play.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Jane Smith',
    date: 'June 1, 2025',
    image: 'https://images.pexels.com/photos/1619860/pexels-photo-1619860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Facilities',
    featured: false,
  },
  {
    id: 3,
    title: 'Interview with League Champion Michael Rodriguez',
    excerpt: 'We sat down with our reigning champion to discuss his training routine and tips for improving your game.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'David Johnson',
    date: 'May 28, 2025',
    image: 'https://images.pexels.com/photos/8224033/pexels-photo-8224033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Player Spotlight',
    featured: true,
  },
  {
    id: 4,
    title: 'Youth Program Expanding This Fall',
    excerpt: 'Our successful youth tennis program is adding more classes and age groups starting this September.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Tennis League Admin',
    date: 'May 20, 2025',
    image: 'https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Programs',
    featured: false,
  },
  {
    id: 5,
    title: 'Pro Tips: Improving Your Backhand',
    excerpt: 'Professional coach Emily Thompson shares her top techniques for developing a stronger backhand.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Emily Thompson',
    date: 'May 15, 2025',
    image: 'https://images.pexels.com/photos/8224077/pexels-photo-8224077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Tips & Techniques',
    featured: false,
  },
  {
    id: 6,
    title: 'League Rankings Updated for Spring Season',
    excerpt: 'The latest player rankings have been released. Check out who made the top 10 this season.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Tennis League Admin',
    date: 'May 10, 2025',
    image: 'https://images.pexels.com/photos/6956426/pexels-photo-6956426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'League Updates',
    featured: false,
  },
];

// Categories extracted from news articles
const categories = Array.from(new Set(newsArticles.map(article => article.category)));

const NewsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filter articles based on search term and category
  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Separate featured articles
  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">News & Updates</h1>
          <p className="text-gray-600">Stay up to date with the latest from our tennis community</p>
        </div>

        {/* Search and filters */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
            <div className="w-full md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredArticles.length > 0 ? (
          <>
            {/* Featured articles */}
            {featuredArticles.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Featured News</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredArticles.map((article) => (
                    <div key={article.id} className="card overflow-hidden">
                      <div className="relative">
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 bg-tennis-green-500 text-white text-sm font-medium rounded-full">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2">{article.title}</h3>
                        <div className="flex items-center text-gray-500 mb-4">
                          <User className="h-4 w-4 mr-1" />
                          <span className="text-sm mr-4">{article.author}</span>
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-sm">{article.date}</span>
                        </div>
                        <p className="mb-4">{article.excerpt}</p>
                        <button className="text-tennis-green-500 font-medium hover:text-tennis-green-600 transition-colors">
                          Read More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular articles */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Latest News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularArticles.map((article) => (
                  <div key={article.id} className="card overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                          {article.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                      <div className="flex items-center text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{article.date}</span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                      <button className="text-tennis-green-500 font-medium hover:text-tennis-green-600 transition-colors">
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="card p-12 text-center">
            <p className="text-xl text-gray-600 mb-4">No articles found matching your search</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Newsletter signup */}
        <div className="mt-12 card p-8 bg-tennis-green-500 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
            <p className="mb-6">
              Get weekly updates on tournaments, player spotlights, and tennis tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-tennis-yellow-500 text-gray-800"
              />
              <button className="btn bg-tennis-yellow-500 text-gray-900 hover:bg-tennis-yellow-600 font-medium py-3 px-6">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;