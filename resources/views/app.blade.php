<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  {{-- SEO Meta Tags --}}
  <meta name="description"
    content="BASHTV MEDIA - modern Hausa news, video reports, interviews, and premium headline coverage.">
  <meta name="keywords"
    content="BASHTV MEDIA, BashTV Hausa, Hausa news, video reports, breaking news, politics, business, world news, media platform">
  <meta name="author" content="BASHTV MEDIA">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow">
  <meta name="bingbot" content="index, follow">
  <meta name="google-site-verification" content="-D2lYJKGLw4_wJGRP8pwAGLUhU4qM7IivlUKntHPx_Q" />

  {{-- Canonical URL --}}
  <link rel="canonical" href="{{ url()->current() }}">

  {{-- Open Graph / Facebook Meta Tags --}}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="{{ config('app.name') }}">
  <meta property="og:title" content="{{ config('app.name') }} - Hausa News, Videos, and Reports">
  <meta property="og:description"
    content="Modern Hausa news, video reports, interviews, and premium headline coverage.">
  <meta property="og:url" content="{{ url()->current() }}">
  <meta property="og:image" content="{{ $metaImage ?? asset('bashTvMedia.jpeg') }}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="{{ str_replace('_', '-', app()->getLocale()) }}">

  {{-- Twitter Card Meta Tags --}}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@bashtvhausa">
  <meta name="twitter:creator" content="@bashtvhausa">
  <meta name="twitter:title" content="{{ config('app.name') }} - Hausa News, Videos, and Reports">
  <meta name="twitter:description" content="Modern Hausa news, video reports, interviews, and premium headline coverage.">
  <meta name="twitter:image" content="{{ $metaImage ?? asset('bashTvMedia.jpeg') }}">

  {{-- Favicon and App Icons --}}
  <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
  <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('bashTvMedia.jpeg') }}">
  <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('bashTvMedia.jpeg') }}">
  <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('bashTvMedia.jpeg') }}">

  {{-- Theme Color --}}
  <meta name="theme-color" content="#020F3E">
  <title>{{ $metaTitle ?? config('app.name') }}</title>

  <title>{{ $metaTitle ?? config('app.name') }}</title>

  <meta name="description" content="{{ $metaDescription ?? config('app.name') }}">
  
  <meta property="og:type" content="article">
  <meta property="og:title" content="{{ $metaTitle ?? config('app.name') }}">
  <meta property="og:description" content="{{ $metaDescription ?? '' }}">
  <meta property="og:image" content="{{ $metaImage ?? asset('bashTvMedia.jpeg') }}">
  <meta property="og:url" content="{{ url()->current() }}">
  <meta property="og:site_name" content="{{ config('app.name') }}">
  <meta property="og:locale" content="{{ str_replace('_', '-', app()->getLocale()) }}">
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ $metaTitle ?? config('app.name') }}">
  <meta name="twitter:description" content="{{ $metaDescription ?? '' }}">
  <meta name="twitter:image" content="{{ $metaImage ?? asset('bashTvMedia.jpeg') }}">
  
  <meta property="og:image" content="{{ $metaImage ?? asset('bashTvMedia.jpeg') }}">
  <meta name="twitter:image:src" content="{{ $metaImage ?? asset('bashTvMedia.jpeg') }}" />

  <meta name="msapplication-TileColor" content="#020F3E">

  {{-- RSS Feed --}}
  <link rel="alternate" type="application/rss+xml" title="{{ config('app.name') }} RSS Feed" href="{{ url('/feed') }}">

  {{-- Preconnect for Performance --}}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  {{-- Structured Data (JSON-LD) for News Organization --}}
  @verbatim
      <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "NewsMediaOrganization",
      "name": "{{ config('app.name') }}",
      "url": "{{ config('app.url') }}",
      "logo": {
        "@type": "ImageObject",
        "url": "{{ $metaImage ?? asset('bashTvMedia.jpeg') }}",
        "width": 600,
        "height": 60
      },
      "sameAs": [
        "https://www.youtube.com/channel/UCy8ZkVmZ-iPcS8YlQ7A8_3Q"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Editorial",
        "email": "news@bashtvmedia.com"
      }
    }
    </script>
  @endverbatim


  @verbatim
      <script type="application/ld+json">
    {

      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "{{ config('app.name') }}",
      "url": "{{ config('app.url') }}",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "{{ config('app.url') }}/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
    </script>
  @endverbatim


  <title inertia>{{ config('app.name', 'BASHTV MEDIA') }}</title>

  <!-- Scripts -->
  @routes
  @viteReactRefresh
  @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
  @inertiaHead
</head>

<body class="font-sans antialiased">

  @inertia

</body>

</html>
