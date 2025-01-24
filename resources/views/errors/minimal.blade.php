<!-- ./errors/minimal.blade.php -->

@extends('layouts.default')

@section('page-header')
    <meta name="robots" content="noindex, nofollow">
@endsection

@section('page-content')
    <div class="rts-light-mood">
        <div class="inner-page coming-soon">
            <div class="rts-coming-soon error">
                <div class="container">
                    <div class="section-inner text-center">
                        <h2 class="title-elements-parent">
                            <span>@yield('code')</span>
                            <br>
                            @yield('message')
                        </h2>
                        <p class="desc">Sorry , the page you seems looking for, has been <br> moved, redirected or removed permanently</p>
                        <div class="buttons-main-wrapper-elements justify-content-center">
                            <a href="/" class="rts-btn btn-primary">Back To Homepage</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

<style>
    .rts-light-mood .inner-page.coming-soon {
        background: #fff;
    }
    .rts-light-mood .inner-page.coming-soon .rts-coming-soon .section-inner .title-elements-parent {
        color: #141414;
    }
    .rts-light-mood .inner-page.coming-soon .rts-coming-soon .section-inner .countdown-time span {
        color: #141414;
    }
    .rts-light-mood .inner-page.coming-soon .social-area .title {
        color: #141414;
    }
    .rts-light-mood .inner-page.coming-soon .rts-coming-soon .section-inner .social-area .social-wrapper li a i {
        color: #141414;
    }
    .rts-light-mood .inner-page.coming-soon .rts-coming-soon .section-inner .title-elements-parent {
        border-bottom: 1px solid #eaeaea;
    }

    .rts-light-mood .rts-coming-soon.error .section-inner .title-elements-parent span {
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 2px;
        -webkit-text-stroke-color: #141414;
    }
    .rts-light-mood .rts-coming-soon.error .section-inner .buttons-main-wrapper-elements .rts-btn {
        background: #141414;
        color: #fff;
    }
    body.coming-soon {
        height: 100vh;
        position: relative;
    }

    .rts-coming-soon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .rts-coming-soon .section-inner .title-elements-parent {
        padding-bottom: 50px;
        width: max-content;
        margin: 0 auto 55px auto;
        border-bottom: 1px solid #272727;
    }

    @media (max-width: 991px) {
        .rts-coming-soon .section-inner .title-elements-parent {
            padding-bottom: 25px;
            margin: 0 auto 25px auto;
        }
    }

    @media (max-width: 768px) {
        .rts-coming-soon .section-inner .title-elements-parent {
            font-size: 45px;
        }
    }

    @media (max-width: 576px) {
        .rts-coming-soon .section-inner .title-elements-parent {
            font-size: 30px;
        }
    }

    .rts-coming-soon .section-inner .countdown-time {
        color: #FFFFFF;
        margin-bottom: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
    }

    .rts-coming-soon .section-inner .countdown-time span {
        font-size: 40px;
        font-style: normal;
        font-weight: 400;
        letter-spacing: -0.4px;
        width: 80px;
        height: 80px;
        display: inline-block;
        color: #FFFFFF;
        line-height: 80px;
        text-align: center;
        border: 1px solid #272727;
        border-radius: 8px;
    }

    @media (max-width: 768px) {
        .rts-coming-soon .section-inner .countdown-time span {
            width: 50px;
            height: 50px;
            line-height: 50px;
            font-size: 26px;
        }
    }

    .rts-coming-soon .section-inner .social-area .social-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 0;
        gap: 15px;
    }

    .rts-coming-soon .section-inner .social-area .social-wrapper li {
        list-style: none;
    }

    .rts-coming-soon .section-inner .social-area .social-wrapper li a {
        display: block;
        height: 45px;
        width: 45px;
        line-height: 45px;
        text-align: center;
        border: 1px solid #2b2b2b;
        border-radius: 50%;
    }

    .rts-coming-soon .section-inner .social-area .social-wrapper li a i {
        color: #FFFFFF;
        font-size: 16px;
    }

    .rts-coming-soon.error .section-inner .title-elements-parent {
        color: #FFFFFF;
        padding-bottom: 30px;
        margin: 0 auto 35px auto;
    }

    .rts-coming-soon.error .section-inner .title-elements-parent span {
        font-size: 250px;
        color: #FFFFFF;
        font-weight: 600;
        line-height: 1;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 1px;
    }

    @media (max-width: 991px) {
        .rts-coming-soon.error .section-inner .title-elements-parent span {
            font-size: 210px;
        }
    }

    @media (max-width: 768px) {
        .rts-coming-soon.error .section-inner .title-elements-parent span {
            font-size: 170px;
        }
    }

    @media (max-width: 576px) {
        .rts-coming-soon.error .section-inner .title-elements-parent span {
            font-size: 120px;
        }
    }

    .rts-coming-soon.error .section-inner .buttons-main-wrapper-elements .rts-btn {
        padding: 14px 22px;
    }

    .rts-coming-soon p.desc {
        font-size: 20px;
    }
    @media (max-width: 576px) {
        .rts-coming-soon p.desc {
            font-size: 16px;
        }
    }
</style>


