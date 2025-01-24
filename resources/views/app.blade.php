<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ __('title.title', ['APP_NAME' => config('app.name')] ) }}</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="body">

@include('components.common.cursor')
@include('components.common.back-to-top')

<div id="app">
    @yield('content')
</div>

</body>
</html>

<style>
    body {
        background-color: cornflowerblue;
    }

    #app {
        min-height: 200vh;
    }
</style>
