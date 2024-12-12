<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Laravel App')</title>

    @vite(['resources/css/app.scss', 'resources/scss/app.scss'])
</head>
<body>

<main>
    @yield('content')
</main>

<!-- CURSOR START -->
<div class="rts-cursor cursor-outer" data-default="yes" data-link="yes" data-slider="no">
    <span class="fn-cursor"></span>
</div>
<div class="rts-cursor cursor-inner" data-default="yes" data-link="yes" data-slider="no">
        <span class="fn-cursor">
        <span class="fn-left"></span>
        <span class="fn-right"></span>
        </span>
</div>
<!-- CURSOR END -->

<!-- THEME SWITCHER START-->
<div class="modal-sidebar-scroll rts-dark-light">
    <ul>
        <li class="go-dark-w"><span>Dark</span><i class="rts-go-dark fal fa-moon"></i></li>
        <li class="go-light-w"><span>Light</span><i class="rts-go-light fa-light fa-brightness"></i></li>
    </ul>
</div>
<!-- THEME SWITCHER END -->

</body>
</html>
