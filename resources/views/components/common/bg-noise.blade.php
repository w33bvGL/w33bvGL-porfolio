<!-- ./components/common/bg-noise.blade.php -->

<script type="module">

</script>

<div class="BG-NOISE-COMPONENT">
    <div class="bg-noise"></div>
</div>

<style>
    .BG-NOISE-COMPONENT {
        .bg-noise {
            position: absolute;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            pointer-events: none;
            overflow: hidden;
        }

        .bg-noise::before {
            position: absolute;
            content: "";
            top: -10rem;
            left: -10rem;
            width: calc(100% + 20rem);
            height: calc(100% + 20rem);
            z-index: -1;
            pointer-events: none;
            background-image: url('{{ Vite::asset("resources/images/banner/shape-noise.png") }}');
            background-position: 50%;
            animation: BgNoise 1s steps(2) infinite;
        }
    }

    @keyframes BgNoise {
        0% {
            transform: translate3d(0, 9rem, 0);
        }
        10% {
            transform: translate3d(-1rem, -4rem, 0);
        }
        20% {
            transform: translate3d(-8rem, 2rem, 0);
        }
        30% {
            transform: translate3d(9rem, -9rem, 0);
        }
        40% {
            transform: translate3d(-2rem, 7rem, 0);
        }
        50% {
            transform: translate3d(-9rem, -4rem, 0);
        }
        60% {
            transform: translate3d(2rem, 6rem, 0);
        }
        70% {
            transform: translate3d(7rem, -8rem, 0);
        }
        80% {
            transform: translate3d(-9rem, 1rem, 0);
        }
        90% {
            transform: translate3d(6rem, -5rem, 0);
        }
        to {
            transform: translate3d(-7rem, 0, 0);
        }
    }
</style>
