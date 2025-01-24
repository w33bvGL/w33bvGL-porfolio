<!-- ./pages/welcome.blade.php -->

@extends('layouts.default')

@section('page-header')
    <title>{{ __('title.title', ['APP_NAME' => config('app.name')] ) }}</title>
@endsection

@section('page-content')
    <h1 class="text-3xl font-bold text-whtie">Добро пожаловать wdна главную страницу!</h1>
    <p class="text-whtie">Это пример главной страницы.</p>
@endsection
