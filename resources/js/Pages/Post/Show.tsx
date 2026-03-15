import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Header } from '@/Components/Headers';
import { Footer } from '@/Components/Footer';
import { MediaDisplay } from '@/Components/MediaDisplay';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { format } from 'date-fns';
import MDEditor from '@uiw/react-md-editor';
import { formatDistanceToNow } from 'date-fns';
import MarkdownPreview from "@uiw/react-markdown-preview";

interface Post {
  id: number;
  uuid: number;
  image_caption: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  credit: string;
  video_url?: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  author: {
    id: number;
    name: string;
    avatar?: string;
    bio: string;
  };
  created_at: string;
  updated_at: string;
}
interface ShowProps {
  post: Post;
  relatedPosts: Post[];
  categories: Array;
  trendingPosts: Array<{
    id: number;
    title: string;
    slug: string;
    image: string | null;
    published_at: string;
    views: number;
  }>;
}
export default function Show({ post: postData, relatedPosts = [], trendingPosts = [], categories = [] }: ShowProps) {
  const [post, setPost] = React.useState<Post | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (postData) {
      setPost(postData);
      setIsLoading(false);
    } else {
      // If post is not passed as prop, try to fetch it
      const fetchPost = async () => {
        try {
          const url = new URL(window.location.href);
          const slug = url.pathname.split('/').pop();
          const response = await fetch(`/api/posts/${slug}`);
          if (!response.ok) throw new Error('Post not found');
          const data = await response.json();
          setPost(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load post');
          console.error('Error fetching post:', err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPost();
    }
  }, [postData]);

  // document.documentElement.setAttribute('data-color-mode', 'light')
  // document.documentElement.setAttribute('data-color-mode', 'dark')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header categories={categories} />
        <main className="container py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-96 bg-muted rounded"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded w-full"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header categories={categories} />
        <main className="container py-12 text-center">
          <div className="bg-destructive/10 text-destructive p-6 rounded-lg inline-block">
            <h1 className="text-2xl font-bold mb-2">Post Not Found</h1>
            <p className="text-muted-foreground">
              {error || 'The requested post could not be found.'}
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center text-primary hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Process content to fix image paths
  const processContent = (html: string) => {
    if (!html) return '';

    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Update image sources
    const images = tempDiv.getElementsByTagName('img');
    for (let img of Array.from(images)) {
      const src = img.getAttribute('src') || '';

      // Only modify relative paths (not external URLs)
      if (src && !src.startsWith('http') && !src.startsWith('data:')) {
        // Remove any leading slashes to prevent double slashes
        const cleanPath = src.replace(/^\/+/, '');
        img.src = `/storage/${cleanPath}`;
      }

      // Add error handling
      img.onerror = function () {
        this.src = 'https://placehold.co/800x400?text=Image+Not+Found';
        this.onerror = null; // Prevent infinite loop
      };

      // Add responsive classes
      img.classList.add('max-w-full', 'h-auto', 'rounded-lg', 'my-4');
    }

    return tempDiv.innerHTML;
  };

  const parsedContent = { __html: processContent(post.content) };
  const isDark = document.documentElement.classList.contains("dark"); // or from your theme store
  console.log(isDark);
  return (
    <>
      <Head title={post.title}>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={new URL(post.image, window.location.origin).toString()} />

        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        <meta name="twitter:image:src" content={post.image} />
      </Head>

      <div className="min-h-screen bg-background">
        <Header categories={categories} />

        <main className="container py-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              {/* <li>/</li> */}
              {post.category?.name && (
                <>
                  <li>/</li>
                  <li>
                    <Link
                      href={`/category/${post.category.slug || 'uncategorized'}`}
                      className="hover:underline"
                    >
                      {post.category.name}
                    </Link>
                  </li>
                </>
              )}
              <li>/</li>
              <li className="text-foreground">{post.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <header className="mb-8 relative">
                <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
                  {post.title}
                </h1>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-3">
                    {post.author?.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {post.author?.name?.charAt(0) || 'A'}
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{post.author?.name || 'Admin'}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(post.created_at), 'MMMM d, yyyy')} • {Math.ceil(post.content.split(' ').length / 200)} min read
                      </div>
                    </div>
                  </div>

                  <div className="flex-1"></div>

                  <div className="flex items-center space-x-3 relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 rounded-full hover:bg-muted">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                          className="cursor-pointer flex items-center space-x-2"
                        >
                          <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                          </svg>
                          <span>Share on Facebook</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`)}
                          className="cursor-pointer flex items-center space-x-2"
                        >
                          <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                          <span>Share on Twitter</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => window.open(`https://www.instagram.com/`)}
                          className="cursor-pointer flex items-center space-x-2"
                        >
                          <svg className="h-4 w-4 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                          <span>Share on Instagram</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${window.location.href}`)}`)}
                          className="cursor-pointer flex items-center space-x-2"
                        >
                          <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.963-.94 1.16-.175.196-.35.223-.644.075-.3-.15-1.263-.465-2.405-1.485-.888-.795-1.484-1.77-1.66-2.07-.173-.297-.018-.458.13-.606.136-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.508-.172-.007-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.228 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.345m-5.421 7.403h-.016a9.57 9.57 0 01-5.707-1.903l-.202-.16-3.6-.99 1.21-3.53.137-.203a9.3 9.3 0 01-1.38-4.85c0-5.165 4.208-9.365 9.372-9.365 2.507 0 4.853.975 6.615 2.74a9.26 9.26 0 012.74 6.615c0 5.164-4.2 9.366-9.37 9.366" />
                          </svg>
                          <span>Share on WhatsApp</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(window.location.href);
                              alert('Link copied to clipboard!');
                            } catch (err) {
                              console.error('Failed to copy: ', err);
                            }
                          }}
                          className="cursor-pointer flex items-center space-x-2"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          <span>Copy link</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <button className="p-2 rounded-full hover:bg-muted">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Video or Image Display */}
                {post?.video_url ? (
                  <div className="w-full rounded-lg overflow-hidden mb-6">
                    <MediaDisplay
                      videoUrl={post.video_url}
                      title={post.title}
                      showVideo
                      className="w-full pb-[56.25%] h-0 rounded-lg overflow-hidden"
                    />
                    {post.image_caption && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {post.image_caption}
                      </p>
                    )}
                  </div>
                ) : post?.image ? (
                  <div className="w-full h-[500px] max-md:h-full rounded-lg overflow-hidden mb-6">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full max-md:h-[270px] object-cover "
                      onError={(e) => {
                        // Fallback to a placeholder image if the image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/800x500?text=Image+Not+Found';
                        target.onerror = null; // Prevent infinite loop if placeholder also fails
                      }}
                    />
                    {/* <p className="text-sm text-muted-foreground mt-2">
                      {post.image_caption || 'Image caption goes here'}
                    </p> */}
                  </div>
                ) : null}

                {post.credit ? (
                  <div className="absolute bottom-0 right-0 bg-primary text-black p-2 py-1 text-sm">
                    {post.credit}
                  </div>
                ) : null}
              </header>

              <div className='rounded-lg font-sans' data-color-mode={isDark ? "dark" : "light"}>
                <MarkdownPreview
                  source={post.content}
                  style={{ fontFamily: 'Georgia, serif' }}
                />
              </div>

              <footer className="mt-12 pt-6 border-t border-border">
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.category && post.category.name && (
                    <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                      {post.category.name}
                    </span>
                  )}
                  {/* Add more tags if needed */}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span>Like</span>
                    </button>
                    <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>Comment</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      {post.updated_at && format(new Date(post.updated_at), 'MMMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </footer>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* About Author */}
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">About the Author</h3>
                <div className="flex items-start space-x-4">
                  {post.author?.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl text-primary font-medium">
                      {post.author?.name?.charAt(0) || 'A'}
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium">{post.author?.name || 'Admin'}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {post.author?.bio || 'Contributing reporter at BASHTV MEDIA'}
                    </p>
                    <div className="flex items-center space-x-3 mt-2">
                      <a href="#" className="text-muted-foreground hover:text-primary">
                        <span className="sr-only">Twitter</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-primary/5 border border-primary/10 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Stay updated</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest news and articles in your inbox weekly.
                </p>
                <form className="space-y-3">
                  <div>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="Enter your email"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Trending Now */}
              {/* // In Show.tsx, update the trending now section */}
              {trendingPosts && trendingPosts.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Trending Now</h3>
                  <div className="space-y-4">
                    {trendingPosts.map((post) => (
                      <div key={post.id} className="flex items-start space-x-3 group">
                        <div className="flex-shrink-0 w-16 h-16 bg-muted rounded overflow-hidden">
                          {post.image ? (
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted-foreground/20 animate-pulse"></div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                            <Link
                              href={route('posts.show.full', post.slug)}
                              className="hover:underline"
                            >
                              {post.title}
                            </Link>
                          </h4>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}</span>
                            <span className="mx-2">•</span>
                            <span>{post.views} {post.views === 1 ? 'view' : 'views'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>

          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">
              {post.category ? `More from ${post.category.name}` : 'Related Articles'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts && relatedPosts.length > 0 ? (
                relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.id} className="group">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-3">
                      {relatedPost.image ? (
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted-foreground/20 animate-pulse"></div>
                      )}
                    </div>
                    {relatedPost.category && (
                      <div className="text-sm text-primary font-medium mb-1">
                        {relatedPost.category.name}
                      </div>
                    )}
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      <Link
                        href={route('posts.show.full', relatedPost.slug)}
                        className="hover:underline"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">

                      <MDEditor.Markdown
                        source={relatedPost.excerpt || (relatedPost.content ? relatedPost.content.substring(0, 150) + '...' : '')}
                        className="prose dark:prose-invert max-w-none text-foreground"
                      />
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No related articles found.</p>
              )}
            </div>
          </section>

          {/* Comments Section */}
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Comments</h2>
              <button className="text-sm text-primary hover:underline">
                Sign in to comment
              </button>
            </div>

            <div className="space-y-6">
              {/* Comment form placeholder */}
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-muted-foreground text-sm">
                  <Link href={route('login')} className="text-primary hover:underline">Sign in</Link> to leave a comment
                </p>
              </div>

              {/* Comments list placeholder */}
              <div className="text-center py-8">
                <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
