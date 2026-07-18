{{--
  Ridhvick Uniforms — Laravel Blade <head> partial.

  NOT APPLICABLE to this project today — the live codebase is React 19 +
  Vite + Express (see server.ts), not Laravel/PHP. Provided as a complete,
  correct reference in case any part of the stack (e.g. an admin/CMS panel
  for managing the uniform catalog) is ever built in Laravel.

  Usage: save as resources/views/partials/seo-head.blade.php and include
  with @include('partials.seo-head') inside your main layout's <head>.
  Pass page-specific values from the parent view with @section/@yield or a
  view-composer; the homepage's real values are used as defaults below so
  this file works standalone, unmodified, if included with no overrides.
--}}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>{{ $title ?? 'Ridhvick Uniforms | School & Sports Uniform Manufacturer' }}</title>
<meta name="description" content="{{ $description ?? 'Ridhvick manufactures premium school uniforms, sports wear, woven blazers & custom embroidery in Tirupur, India since 2009. Get a bulk quote today.' }}">
<meta name="keywords" content="school uniforms, sports uniforms, uniform manufacturer, custom embroidery, woven uniforms, Ridhvick, Tirupur uniforms, Chennai uniforms">
<meta name="author" content="Ridhvick Uniforms">

<link rel="canonical" href="{{ $canonical ?? 'https://www.ridhvickuniforms.com/' }}">
@if(!empty($noindex))
    <meta name="robots" content="noindex, nofollow">
@endif

<link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
<link rel="apple-touch-icon" href="{{ asset('favicon.svg') }}">
<link rel="manifest" href="{{ asset('manifest.json') }}">
<meta name="theme-color" content="#00346f">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap">

{{-- Open Graph --}}
<meta property="og:type" content="{{ $ogType ?? 'website' }}">
<meta property="og:site_name" content="Ridhvick Uniforms">
<meta property="og:title" content="{{ $ogTitle ?? 'Ridhvick Uniforms | Premium School & Sports Uniform Manufacturer' }}">
<meta property="og:description" content="{{ $ogDescription ?? 'Premium quality school uniforms, tailored blazers, sports jerseys, and custom embroidery. Crafting academic pride since 2009.' }}">
<meta property="og:image" content="{{ $ogImage ?? asset('images/ridhvick_uniforms_hero_kids.png') }}">
<meta property="og:url" content="{{ $canonical ?? 'https://www.ridhvickuniforms.com/' }}">
<meta property="og:locale" content="en_IN">

{{-- Twitter / X Card --}}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ $ogTitle ?? 'Ridhvick Uniforms | Premium School & Sports Uniform Manufacturer' }}">
<meta name="twitter:description" content="{{ $ogDescription ?? 'Premium quality school uniforms, tailored blazers, sports jerseys, and custom embroidery. Crafting academic pride since 2009.' }}">
<meta name="twitter:image" content="{{ $ogImage ?? asset('images/ridhvick_uniforms_hero_kids.png') }}">

{{-- Structured data — site-wide, include on every page unmodified --}}
<script type="application/ld+json">
{!! file_get_contents(base_path('SEO/schema/organization.json')) !!}
</script>
<script type="application/ld+json">
{!! file_get_contents(base_path('SEO/schema/website.json')) !!}
</script>

{{-- Structured data — page-specific, pass a $schemaFiles array of paths from the controller --}}
@if(!empty($schemaFiles))
    @foreach($schemaFiles as $schemaFile)
        <script type="application/ld+json">
        {!! file_get_contents(base_path($schemaFile)) !!}
        </script>
    @endforeach
@endif
