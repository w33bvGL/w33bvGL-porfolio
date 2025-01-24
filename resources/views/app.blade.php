<!-- ./app.blade.php -->

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @yield('header')

    <title></title>

    <script src="{{ asset('storage/gsap.js') }}"></script>
    <script src="{{ asset('storage/splitText.js') }}"></script>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="body">

@include('components.common.loading')
@include('components.common.bg-noise')
@include('components.common.cursor')
@include('components.common.back-to-top')

<div id="app">
    @yield('content')
</div>

</body>
</html>
