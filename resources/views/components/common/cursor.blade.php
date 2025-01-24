<!-- ./components/common/cursor.blade.php -->

<script type="module">
    function magicCursor() {
        const myCursor = document.querySelectorAll('.rts-cursor');
        if (myCursor.length) {
            const e = document.querySelector(".cursor-inner"),
                t = document.querySelector(".cursor-outer");
            let n, i = 0,
                W = 0,
                intro = 0,
                o = false;

            const buttons = "a, button, .active-progress, .search-click, .action-menu, .swiper-button-next, .swiper-button-prev";
            const removeCursor = ".learn-more-btn, .swiper-slider-main-main-wrapper-portfolio .thumbnail, .single-portfolio-style-five a, .mySwiper_portfolio-5-scale-none a";

            window.onmousemove = function (s) {
                if (!o) {
                    t.style.transform = `translate(${s.clientX}px, ${s.clientY}px)`;
                }
                e.style.transform = `translate(${s.clientX}px, ${s.clientY}px)`;
                n = s.clientY;
                i = s.clientX;
            };

            document.querySelectorAll(buttons).forEach(button => {
                button.addEventListener('mouseenter', () => {
                    e.classList.add("cursor-hover");
                    t.classList.add("cursor-hover");
                });
                button.addEventListener('mouseleave', () => {
                    if (button.closest(".cursor-link")) return;
                    e.classList.remove("cursor-hover");
                    t.classList.remove("cursor-hover");
                });
            });

            e.style.visibility = "visible";
            t.style.visibility = "visible";

            const mightyBody = document.querySelector('body');
            const removeCursorElements = document.querySelectorAll(removeCursor);

            removeCursorElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    e.classList.add('cursor-remove');
                    t.classList.add('cursor-remove');
                });
                el.addEventListener('mouseleave', () => {
                    e.classList.remove('cursor-remove');
                    t.classList.remove('cursor-remove');
                });
            });
        }
    }

    magicCursor();
</script>

<div class="CURSOR-COMPONENT">
    <div class="rts-cursor cursor-outer" data-default="yes" data-link="yes" data-slider="no">
        <span class="fn-cursor"></span>
    </div>
    <div class="rts-cursor cursor-inner" data-default="yes" data-link="yes" data-slider="no">
        <span class="fn-cursor">
            <span class="fn-left"></span>
            <span class="fn-right"></span>
        </span>
    </div>
</div>

<style>
    .CURSOR-COMPONENT {
        .rts-cursor[data-default=no] {
            opacity: 0;
        }

        .rts-cursor[data-default=no].cursor-inner {
            -webkit-transition: opacity 0.3s ease;
            -o-transition: opacity 0.3s ease;
            transition: opacity 0.3s ease;
        }

        .rts-cursor[data-default=no].cursor-inner.cursor-hover,
        .rts-cursor[data-default=no].cursor-inner.cusror-remove {
            opacity: 1;
        }

        .rts-cursor[data-link=no].cursor-inner.cursor-hover {
            opacity: 0;
        }

        .rts-cursor[data-slider=no].cursor-inner.cusror-remove {
            opacity: 0;
        }

        .rts-cursor {
            position: fixed;
            left: 0;
            top: 0;
            pointer-events: none;
            --webkit-transform: translateZ(0);
            transform: translateZ(0);
            visibility: hidden;
        }

        .rts-cursor.mouse-down .fn-cursor {
            --webkit-transform: scale(0.9);
            -ms-transform: scale(0.9);
            transform: scale(0.9);
        }

        @media (max-width: 1040px) {
            .rts-cursor {
                display: none;
            }
        }

        .cursor-link {
            width: 30px;
            height: 30px;
            margin-left: -15px;
            margin-top: -15px;
            border: 2px solid rgba(0, 0, 0, 0.5);
            z-index: 10000000;
            -webkit-transition: all 0.08s ease-out;
            -o-transition: all 0.08s ease-out;
            transition: all 0.08s ease-out;
        }

        .cursor-outer {
            z-index: 10000000;
            --webkit-transition: transform 0.08s ease-out, opacity 1s ease;
            -webkit-transition: opacity 1s ease, -webkit-transform 0.08s ease-out;
            transition: opacity 1s ease, -webkit-transform 0.08s ease-out;
            -o-transition: transform 0.08s ease-out, opacity 1s ease;
            transition: transform 0.08s ease-out, opacity 1s ease;
            transition: transform 0.08s ease-out, opacity 1s ease, -webkit-transform 0.08s ease-out;
        }

        .cursor-outer .fn-cursor {
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -25px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 2px solid #8f8f8f;
        }

        .cursor-inner .fn-cursor {
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -3px 0 0 -3px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #8f8f8f;
            -webkit-transition: all 0.5s ease-in-out;
            -o-transition: all 0.5s ease-in-out;
            transition: all 0.5s ease-in-out;
        }

        .cursor-outer.cursor-hover {
            opacity: 0;
            -webkit-transition: transform 0.08s ease-out, opacity 0.2s ease;
            -webkit-transition: opacity 0.2s ease, -webkit-transform 0.08s ease-out;
            transition: opacity 0.2s ease, -webkit-transform 0.08s ease-out;
            -o-transition: transform 0.08s ease-out, opacity 0.2s ease;
            transition: transform 0.08s ease-out, opacity 0.2s ease;
            transition: transform 0.08s ease-out, opacity 0.2s ease, -webkit-transform 0.08s ease-out;
        }

        .cursor-inner {
            z-index: 10000001;
        }

        .cursor-inner.cursor-hover .fn-cursor {
            margin: -30px 0 0 -30px;
            width: 80px;
            height: 80px;
            background-color: #8f8f8f62;
        }

        .cursor-inner.cursor-remove.cursor-hover .fn-cursor {
            display: none;
        }

        .cursor-outer.cursor-remove {
            display: none;
        }

        .cursor-inner.cursor-slider:not(.cursor-hover) .fn-cursor {
            margin-left: -30px;
            margin-top: -30px;
            width: 60px;
            height: 60px;
            background-color: transparent;
            border: 5px solid #000;
        }

        .cursor-inner .fn-left,
        .cursor-inner .fn-right {
            opacity: 0;
            visibility: hidden;
            -webkit-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            transition: all 0.3s ease;
        }

        .cursor-inner .fn-left:after {
            content: "";
            position: absolute;
            width: 2px;
            height: 12px;
            -webkit-transform: rotate(50deg);
            -ms-transform: rotate(50deg);
            transform: rotate(50deg);
            left: -20px;
            top: 50%;
            margin-top: -10px;
            background-color: #000;
            -webkit-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            transition: all 0.3s ease;
        }

        .cursor-inner .fn-left:before {
            content: "";
            position: absolute;
            width: 2px;
            height: 12px;
            -webkit-transform: rotate(130deg);
            -ms-transform: rotate(130deg);
            transform: rotate(130deg);
            left: -20px;
            top: 50%;
            margin-top: -2px;
            background-color: #000;
            -webkit-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            transition: all 0.3s ease;
        }

        .cursor-inner .fn-right:after {
            content: "";
            position: absolute;
            width: 2px;
            height: 12px;
            --webkit-transform: rotate(50deg);
            -ms-transform: rotate(50deg);
            transform: rotate(50deg);
            right: -20px;
            top: 50%;
            margin-top: -2px;
            background-color: #000;
            -webkit-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            transition: all 0.3s ease;
        }

        .cursor-inner .fn-right:before {
            content: "";
            position: absolute;
            width: 2px;
            height: 12px;
            --webkit-transform: rotate(130deg);
            --ms-transform: rotate(130deg);
            transform: rotate(130deg);
            right: -20px;
            top: 50%;
            margin-top: -10px;
            background-color: var(--titleColor);
            -webkit-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            transition: all 0.3s ease;
        }

        .cursor-outer.cursor-remove {
            opacity: 0;
            -webkit-transition: transform 0.08s ease-out, opacity 0.2s ease;
            -webkit-transition: opacity 0.2s ease, -webkit-transform 0.08s ease-out;
            transition: opacity 0.2s ease, -webkit-transform 0.08s ease-out;
            -o-transition: transform 0.08s ease-out, opacity 0.2s ease;
            transition: transform 0.08s ease-out, opacity 0.2s ease;
            transition: transform 0.08s ease-out, opacity 0.2s ease, -webkit-transform 0.08s ease-out;
        }
    }
</style>
