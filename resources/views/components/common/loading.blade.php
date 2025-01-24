<!-- ./components/common/loading.blade.php -->

<script type="module">
    function preloaderWithBannerActivation () {
        const main_window = $(window);
        let percentage = 0;
        let counterShowsUp = false;

        let preloaderActives = document.getElementsByClassName('loading-screen');

        if (preloaderActives.length) {
            function fireCounter() {
                if ($(".js-stats-counter").length) {
                    if (jQuery().countTo && counterShowsUp === false) {
                        let pos = $(".js-stats-counter").offset().top;
                        if (main_window.scrollTop() + main_window.innerHeight() - 50 >= pos) {
                            $(".counter").countTo();
                            counterShowsUp = true;
                        }
                    }
                }
            }

            fireCounter();

            let LoadingCounter = setInterval(function () {
                if (percentage <= 100) {
                    $("#loading-screen .loading-counter").text(percentage + "%");
                    $("#loading-screen .bar").css("height", (100 - percentage) / 2 + "%");
                    $("#loading-screen .progress-line").css("transform", "scale(" + percentage / 100 + ")");
                    percentage++;
                } else {
                    let homeAgency = gsap.timeline();
                    let hero__title = document.querySelector(".rts_hero__title");
                    let hero__subtitle = document.querySelector(".hero__sub-title");
                    let split_hero__title = new SplitText(hero__title, {
                        type: "chars"
                    });
                    let split_hero__subtitle = new SplitText(hero__subtitle, {
                        type: "chars words"
                    });
                    homeAgency.from(split_hero__title.chars, {
                        duration: 1,
                        x: 70,
                        autoAlpha: 0,
                        stagger: 0.03,
                    });
                    homeAgency.from(
                        split_hero__subtitle.words, {
                            duration: 1,
                            x: 50,
                            autoAlpha: 0,
                            stagger: 0.01
                        },
                        "-=1"
                    );

                    $("#loading-screen").fadeOut(500, function () {
                        $(this).remove();
                    });
                    clearInterval(LoadingCounter);
                }
            }, 10);
        } else {

            let homeAgency = gsap.timeline();
            let hero__title = document.querySelector(".rts_hero__title");
            let hero__subtitle = document.querySelector(".hero__sub-title");
            let split_hero__title = new SplitText(hero__title, {
                type: "chars"
            });
            let split_hero__subtitle = new SplitText(hero__subtitle, {
                type: "chars words"
            });
            homeAgency.from(split_hero__title.chars, {
                duration: 1,
                x: 70,
                autoAlpha: 0,
                stagger: 0.03,
            });
            homeAgency.from(
                split_hero__subtitle.words, {
                    duration: 1,
                    x: 50,
                    autoAlpha: 0,
                    stagger: 0.01
                },
                "-=1"
            );
        }
    }

     preloaderWithBannerActivation();
</script>

<div class="LOADING-COMPONENT">
    <div class="loading-screen" id="loading-screen">
        <span class="bar top-bar"></span>
        <span class="bar down-bar"></span>
        <span class="progress-line"></span>
        <span class="loading-counter"> </span>
    </div>
</div>

<style>
    .LOADING-COMPONENT {

        .loading-screen {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 9999999;
            background: #070707;
        }
        .loading-screen .bar {
            position: absolute;
            height: 100%;
            width: 100%;
            background-color: #000000;
        }
        .loading-screen .top-bar {
            top: 0;
            left: 0;
            right: auto;
            bottom: auto;
        }
        .loading-screen .down-bar {
            bottom: 0;
            top: auto;
            right: 0;
            left: auto;
        }
        .loading-screen .progress-line {
            position: absolute;
            width: 100%;
            top: 60%;
            left: 0;
            right: auto;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.35);
            transform: scale(0);
            transform-origin: center;
            opacity: 0;
        }
        .loading-screen .loading-counter {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fefeff;
            font-size: 90px;
            font-weight: 700;
        }
    }
</style>
