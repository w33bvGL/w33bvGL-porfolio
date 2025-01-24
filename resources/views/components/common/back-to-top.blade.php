<!-- ./components/common/back-to-top.blade.php -->

<script type="module">
    function backToTopInit() {
        $(document).ready(function () {
            var progressPath = document.querySelector('.progress-wrap path');
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

            var updateProgress = function () {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                progressPath.style.strokeDashoffset = pathLength - (scroll * pathLength / height);
            };
            updateProgress();

            $(window).scroll(updateProgress);

            var offset = 50;
            var duration = 550;
            jQuery(window).on('scroll', function () {
                if (jQuery(this).scrollTop() > offset) {
                    jQuery('.progress-wrap').addClass('active-progress');
                } else {
                    jQuery('.progress-wrap').removeClass('active-progress');
                }
            });

            jQuery('.progress-wrap').on('click', function (event) {
                event.preventDefault();
                jQuery('html, body').animate({
                    scrollTop: 0
                }, duration);
                return false;
            });
        });
    }

    backToTopInit();
</script>

<div class="BACK-TO-TOP-COMPONENT">
    <div class="progress-wrap">
        <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>
        </svg>

    </div>
</div>

<style>
    .BACK-TO-TOP-COMPONENT {
        .progress-wrap {
            position: fixed;
            right: 30px;
            bottom: 30px;
            height: 46px;
            width: 46px;
            cursor: pointer;
            display: block;
            border-radius: 50px;
            z-index: 10000;
            opacity: 1;
            visibility: hidden;
            transform: translateY(15px);
            -webkit-transition: all 200ms linear;
            transition: all 200ms linear;
            mix-blend-mode: exclusion;
        }

        .progress-wrap.active-progress {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .progress-wrap::after {
            position: absolute;
            font-family: var(--font-3);
            content: "\f062";
            text-align: center;
            line-height: 46px;
            font-size: 24px;
            color: var(--color-primary);
            left: 0;
            top: 0;
            height: 46px;
            width: 46px;
            cursor: pointer;
            display: block;
            z-index: 1;
            -webkit-transition: all 200ms linear;
            transition: all 200ms linear;
            border: 0 solid var(--color-primary);
            box-shadow: none;
            border-radius: 50% !important;
            border-radius: 5px;
        }

        .progress-wrap:hover::after {
            opacity: 1;
            content: "\f062";
            border: 0 solid var(--color-primary);
        }

        .progress-wrap::before {
            position: absolute;
            font-family: var(--font-3), sans-serif;
            content: "\f062";
            text-align: center;
            line-height: 46px;
            font-size: 24px;
            opacity: 0;
            background: var(--color-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            left: 0;
            top: 0;
            height: 46px;
            width: 46px;
            cursor: pointer;
            display: block;
            z-index: 2;
            -webkit-transition: all 200ms linear;
            transition: all 200ms linear;
            mix-blend-mode: exclusion;
        }

        .progress-wrap:hover::before {
            opacity: 0;
        }

        .progress-wrap svg path {
            fill: none;
        }

        .progress-wrap svg {
            color: var(--color-primary);
            border-radius: 50%;
            background: #ededed;
            mix-blend-mode: exclusion;
        }

        .progress-wrap svg.progress-circle path {
            stroke: var(--color-primary);
            stroke-width: 0;
            box-sizing: border-box;
            -webkit-transition: all 200ms linear;
            transition: all 200ms linear;
        }

        .home-blue .progress-wrap svg.progress-circle path {
            stroke: red;
        }
        .home-blue .progress-wrap::after {
            border-color: var(--color-primary-2);
            box-shadow: 0px 3px 20px 6px #0742e952;
            color: var(--color-primary-2);
        }
    }
</style>
