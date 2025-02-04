/*! ScrollMagic v2.0.8 | (c) 2020 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */
!(function (e, n) {
    var r;
    'function' == typeof define && define.amd
        ? define(['ScrollMagic', 'gsap', 'TweenMax', 'TimelineMax'], n)
        : 'object' == typeof exports
          ? ((r = require('gsap/dist/gsap') || require('gsap')),
            n(require('scrollmagic'), r, TweenMax || r, TimelineMax || r))
          : n(
                e.ScrollMagic || (e.jQuery && e.jQuery.ScrollMagic),
                e.gsap,
                e.gsap || e.TweenMax || e.TweenLite,
                e.gsap || e.TimelineMax || e.TimelineLite,
            );
})(this, function (e, n, p, u) {
    'use strict';
    var g = n && 3 <= parseFloat(n.version);
    e.Scene.addOption('tweenChanges', !1, function (e) {
        return !!e;
    }),
        e.Scene.extend(function () {
            var o,
                i = this;
            i.on('progress.plugin_gsap', function () {
                s();
            }),
                i.on('destroy.plugin_gsap', function (e) {
                    i.removeTween(e.reset);
                });
            var s = function () {
                var e, n;
                o &&
                    ((e = i.progress()),
                    (n = i.state()),
                    o.repeat && -1 === o.repeat()
                        ? 'DURING' === n && o.paused()
                            ? o.play()
                            : 'DURING' === n || o.paused() || o.pause()
                        : e != o.progress() &&
                          (0 === i.duration()
                              ? 0 < e
                                  ? o.play()
                                  : o.reverse()
                              : i.tweenChanges() && o.tweenTo
                                ? o.tweenTo(e * o.duration())
                                : o.progress(e).pause()));
            };
            (i.setTween = function (e, n, r) {
                var t, a;
                1 < arguments.length &&
                    ((a = 'number' == typeof arguments[1]),
                    g
                        ? (a || (r = n),
                          r.hasOwnProperty('duration') ||
                              (r.duration = a ? n : 1))
                        : arguments.length < 3 && ((r = n), (n = 1)),
                    (e = g ? p.to(e, r) : p.to(e, n, r)));
                try {
                    (t =
                        u && !g
                            ? new u({ smoothChildTiming: !0 }).add(e)
                            : e).pause();
                } catch (e) {
                    return i;
                }
                return (
                    o && i.removeTween(),
                    (o = t),
                    e.repeat &&
                        -1 === e.repeat() &&
                        (o.repeat(-1), o.yoyo(e.yoyo())),
                    s(),
                    i
                );
            }),
                (i.removeTween = function (e) {
                    return (
                        o &&
                            (e && o.progress(0).pause(),
                            o.kill(),
                            (o = void 0)),
                        i
                    );
                });
        });
});
