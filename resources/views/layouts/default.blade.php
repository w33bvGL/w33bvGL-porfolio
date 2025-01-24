<!-- ./layouts/default.blade.php -->

@extends('app')

@section('header')
    @yield('page-header')
@endsection

@section('content')
    <div>
        <main>
            @yield('page-content')
        </main>
    </div>
@endsection
