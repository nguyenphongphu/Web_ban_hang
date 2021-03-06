﻿(function (n, t) {
    typeof define == "function" && define.amd ? define(["jquery"], function (n) {
        return t(n)
    }) : typeof exports == "object" ? module.exports = t(require("jquery")) : t(n.jQuery)
}
)(this, function (n) {
    (function () {
        "use strict";
        function t(t, r) {
            if (this.el = t,
                this.$el = n(t),
                this.s = n.extend({}, i, r),
                this.s.dynamic && this.s.dynamicEl !== "undefined" && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length)
                throw "When using dynamic mode, you must also define dynamicEl as an Array.";
            return this.modules = {},
                this.lGalleryOn = !1,
                this.lgBusy = !1,
                this.hideBartimeout = !1,
                this.isTouch = "ontouchstart" in document.documentElement,
                this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1),
                this.$items = this.s.dynamic ? this.s.dynamicEl : this.s.selector === "this" ? this.$el : this.s.selector !== "" ? this.s.selectWithin ? n(this.s.selectWithin).find(this.s.selector) : this.$el.find(n(this.s.selector)) : this.$el.children(),
                this.$slide = "",
                this.$outer = "",
                this.init(),
                this
        }
        var i = {
            mode: "lg-slide",
            cssEasing: "ease",
            easing: "linear",
            speed: 600,
            height: "100%",
            width: "100%",
            addClass: "",
            startClass: "lg-start-zoom",
            backdropDuration: 150,
            hideBarsDelay: 6e3,
            useLeft: !1,
            closable: !0,
            loop: !0,
            escKey: !0,
            keyPress: !0,
            controls: !0,
            slideEndAnimatoin: !0,
            hideControlOnEnd: !1,
            mousewheel: !0,
            getCaptionFromTitleOrAlt: !0,
            appendSubHtmlTo: ".lg-sub-html",
            subHtmlSelectorRelative: !1,
            preload: 1,
            showAfterLoad: !0,
            selector: "",
            selectWithin: "",
            nextHtml: "",
            prevHtml: "",
            index: !1,
            iframeMaxWidth: "100%",
            download: !0,
            counter: !0,
            appendCounterTo: ".lg-toolbar",
            swipeThreshold: 50,
            enableSwipe: !0,
            enableDrag: !0,
            dynamic: !1,
            dynamicEl: [],
            galleryId: 1
        };
        t.prototype.init = function () {
            var t = this, i;
            if (t.s.preload > t.$items.length && (t.s.preload = t.$items.length),
                i = window.location.hash,
                i.indexOf("lg=" + this.s.galleryId) > 0 && (t.index = parseInt(i.split("&slide=")[1], 10),
                    n("body").addClass("lg-from-hash"),
                    n("body").hasClass("lg-on") || (setTimeout(function () {
                        t.build(t.index)
                    }),
                        n("body").addClass("lg-on"))),
                t.s.dynamic)
                t.$el.trigger("onBeforeOpen.lg"),
                    t.index = t.s.index || 0,
                    n("body").hasClass("lg-on") || setTimeout(function () {
                        t.build(t.index);
                        n("body").addClass("lg-on")
                    });
            else
                t.$items.on("click.lgcustom", function (i) {
                    try {
                        i.preventDefault();
                        i.preventDefault()
                    } catch (r) {
                        i.returnValue = !1
                    }
                    t.$el.trigger("onBeforeOpen.lg");
                    t.index = t.s.index || t.$items.index(this);
                    n("body").hasClass("lg-on") || (t.build(t.index),
                        n("body").addClass("lg-on"))
                })
        }
            ;
        t.prototype.build = function (t) {
            var i = this;
            i.structure();
            n.each(n.fn.lightGallery.modules, function (t) {
                i.modules[t] = new n.fn.lightGallery.modules[t](i.el)
            });
            i.slide(t, !1, !1, !1);
            i.s.keyPress && i.keyPress();
            i.$items.length > 1 && (i.arrow(),
                setTimeout(function () {
                    i.enableDrag();
                    i.enableSwipe()
                }, 50),
                i.s.mousewheel && i.mousewheel());
            i.counter();
            i.closeGallery();
            i.$el.trigger("onAfterOpen.lg");
            i.$outer.on("mousemove.lg click.lg touchstart.lg", function () {
                i.$outer.removeClass("lg-hide-items");
                clearTimeout(i.hideBartimeout);
                i.hideBartimeout = setTimeout(function () {
                    i.$outer.addClass("lg-hide-items")
                }, i.s.hideBarsDelay)
            });
            i.$outer.trigger("mousemove.lg")
        }
            ;
        t.prototype.structure = function () {
            var u = "", f = "", t = 0, e = "", o, i = this, r;
            for (n("body").append('<div class="lg-backdrop"><\/div>'),
                n(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms"),
                t = 0; t < this.$items.length; t++)
                u += '<div class="lg-item"><\/div>';
            this.s.controls && this.$items.length > 1 && (f = '<div class="lg-actions"><div class="lg-prev lg-icon">' + this.s.prevHtml + '<\/div><div class="lg-next lg-icon">' + this.s.nextHtml + "<\/div><\/div>");
            this.s.appendSubHtmlTo === ".lg-sub-html" && (e = '<div class="lg-sub-html"><\/div>');
            o = '<div class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + u + '<\/div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"><\/span><\/div>' + f + e + "<\/div><\/div>";
            n("body").append(o);
            this.$outer = n(".lg-outer");
            this.$slide = this.$outer.find(".lg-item");
            this.s.useLeft ? (this.$outer.addClass("lg-use-left"),
                this.s.mode = "lg-slide") : this.$outer.addClass("lg-use-css3");
            i.setTop();
            n(window).on("resize.lg orientationchange.lg", function () {
                setTimeout(function () {
                    i.setTop()
                }, 100)
            });
            this.$slide.eq(this.index).addClass("lg-current");
            this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"),
                this.s.speed = 0);
            this.$outer.addClass(this.s.mode);
            this.s.enableDrag && this.$items.length > 1 && this.$outer.addClass("lg-grab");
            this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load");
            this.doCss() && (r = this.$outer.find(".lg-inner"),
                r.css("transition-timing-function", this.s.cssEasing),
                r.css("transition-duration", this.s.speed + "ms"));
            setTimeout(function () {
                n(".lg-backdrop").addClass("in")
            });
            setTimeout(function () {
                i.$outer.addClass("lg-visible")
            }, this.s.backdropDuration);
            this.s.download && this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"><\/a>');
            this.prevScrollTop = n(window).scrollTop()
        }
            ;
        t.prototype.setTop = function () {
            if (this.s.height !== "100%") {
                var t = n(window).height()
                    , r = (t - parseInt(this.s.height, 10)) / 2
                    , i = this.$outer.find(".lg");
                t >= parseInt(this.s.height, 10) ? i.css("top", r + "px") : i.css("top", "0px")
            }
        }
            ;
        t.prototype.doCss = function () {
            var n = function () {
                for (var t = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"], i = document.documentElement, n = 0, n = 0; n < t.length; n++)
                    if (t[n] in i.style)
                        return !0
            };
            return n() ? !0 : !1
        }
            ;
        t.prototype.isVideo = function (n, t) {
            var i;
            if (i = this.s.dynamic ? this.s.dynamicEl[t].html : this.$items.eq(t).attr("data-html"),
                !n && i)
                return {
                    html5: !0
                };
            var r = n.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i)
                , u = n.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i)
                , f = n.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i)
                , e = n.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
            return r ? {
                youtube: r
            } : u ? {
                vimeo: u
            } : f ? {
                dailymotion: f
            } : e ? {
                vk: e
            } : void 0
        }
            ;
        t.prototype.counter = function () {
            this.s.counter && n(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '<\/span> / <span id="lg-counter-all">' + this.$items.length + "<\/span><\/div>")
        }
            ;
        t.prototype.addHtml = function (t) {
            var i = null, r, u, f;
            this.s.dynamic ? this.s.dynamicEl[t].subHtmlUrl ? r = this.s.dynamicEl[t].subHtmlUrl : i = this.s.dynamicEl[t].subHtml : (u = this.$items.eq(t),
                u.attr("data-sub-html-url") ? r = u.attr("data-sub-html-url") : (i = u.attr("data-sub-html"),
                    this.s.getCaptionFromTitleOrAlt && !i && (i = u.attr("title") || u.find("img").first().attr("alt"))));
            r || (typeof i != "undefined" && i !== null ? (f = i.substring(0, 1),
                (f === "." || f === "#") && (i = this.s.subHtmlSelectorRelative && !this.s.dynamic ? u.find(i).html() : n(i).html())) : i = "");
            this.s.appendSubHtmlTo === ".lg-sub-html" ? r ? this.$outer.find(this.s.appendSubHtmlTo).load(r) : this.$outer.find(this.s.appendSubHtmlTo).html(i) : r ? this.$slide.eq(t).load(r) : this.$slide.eq(t).append(i);
            typeof i != "undefined" && i !== null && (i === "" ? this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html") : this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html"));
            this.$el.trigger("onAfterAppendSubHtml.lg", [t])
        }
            ;
        t.prototype.preload = function (n) {
            for (var t = 1, i = 1, t = 1; t <= this.s.preload; t++) {
                if (t >= this.$items.length - n)
                    break;
                this.loadContent(n + t, !1, 0)
            }
            for (i = 1; i <= this.s.preload; i++) {
                if (n - i < 0)
                    break;
                this.loadContent(n - i, !1, 0)
            }
        }
            ;
        t.prototype.loadContent = function (t, i, r) {
            var u = this, o = !1, s, e, a, h, c, v, p = function (t) {
                for (var i, s, r, u = [], o = [], f = 0; f < t.length; f++)
                    i = t[f].split(" "),
                        i[0] === "" && i.splice(0, 1),
                        o.push(i[0]),
                        u.push(i[1]);
                for (s = n(window).width(),
                    r = 0; r < u.length; r++)
                    if (parseInt(u[r], 10) > s) {
                        e = o[r];
                        break
                    }
            }, w, b, l, f, y;
            if (u.s.dynamic ? (u.s.dynamicEl[t].poster && (o = !0,
                a = u.s.dynamicEl[t].poster),
                v = u.s.dynamicEl[t].html,
                e = u.s.dynamicEl[t].src,
                u.s.dynamicEl[t].responsive && (w = u.s.dynamicEl[t].responsive.split(","),
                    p(w)),
                h = u.s.dynamicEl[t].srcset,
                c = u.s.dynamicEl[t].sizes) : (u.$items.eq(t).attr("data-poster") && (o = !0,
                    a = u.$items.eq(t).attr("data-poster")),
                    v = u.$items.eq(t).attr("data-html"),
                    e = u.$items.eq(t).attr("href") || u.$items.eq(t).attr("data-src"),
                    u.$items.eq(t).attr("data-responsive") && (b = u.$items.eq(t).attr("data-responsive").split(","),
                        p(b)),
                    h = u.$items.eq(t).attr("data-srcset"),
                    c = u.$items.eq(t).attr("data-sizes")),
                l = !1,
                u.s.dynamic ? u.s.dynamicEl[t].iframe && (l = !0) : u.$items.eq(t).attr("data-iframe") === "true" && (l = !0),
                f = u.isVideo(e, t),
                !u.$slide.eq(t).hasClass("lg-loaded")) {
                if (l ? u.$slide.eq(t).prepend('<div class="lg-video-cont" style="max-width:' + u.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + e + '"  allowfullscreen="true"><\/iframe><\/div><\/div>') : o ? (y = "",
                    y = f && f.youtube ? "lg-has-youtube" : f && f.vimeo ? "lg-has-vimeo" : "lg-has-html5",
                    u.$slide.eq(t).prepend('<div class="lg-video-cont ' + y + ' "><div class="lg-video"><span class="lg-video-play"><\/span><img class="lg-object lg-has-poster" src="' + a + '" /><\/div><\/div>')) : f ? (u.$slide.eq(t).prepend('<div class="lg-video-cont "><div class="lg-video"><\/div><\/div>'),
                        u.$el.trigger("hasVideo.lg", [t, e, v])) : u.$slide.eq(t).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + e + '" /><\/div>'),
                    u.$el.trigger("onAferAppendSlide.lg", [t]),
                    s = u.$slide.eq(t).find(".lg-object"),
                    c && s.attr("sizes", c),
                    h) {
                    s.attr("srcset", h);
                    try {
                        picturefill({
                            elements: [s[0]]
                        })
                    } catch (k) {
                        console.error("Make sure you have included Picturefill version 2")
                    }
                }
                this.s.appendSubHtmlTo !== ".lg-sub-html" && u.addHtml(t);
                u.$slide.eq(t).addClass("lg-loaded")
            }
            u.$slide.eq(t).find(".lg-object").on("load.lg error.lg", function () {
                var i = 0;
                r && !n("body").hasClass("lg-from-hash") && (i = r);
                setTimeout(function () {
                    u.$slide.eq(t).addClass("lg-complete");
                    u.$el.trigger("onSlideItemLoad.lg", [t, r || 0])
                }, i)
            });
            if (f && f.html5 && !o && u.$slide.eq(t).addClass("lg-complete"),
                i === !0)
                if (u.$slide.eq(t).hasClass("lg-complete"))
                    u.preload(t);
                else
                    u.$slide.eq(t).find(".lg-object").on("load.lg error.lg", function () {
                        u.preload(t)
                    })
        }
            ;
        t.prototype.slide = function (t, i, r, u) {
            var e = this.$outer.find(".lg-current").index(), f = this, o, l, c, s, h;
            f.lGalleryOn && e === t || (o = this.$slide.length,
                l = f.lGalleryOn ? this.s.speed : 0,
                f.lgBusy || (this.s.download && (c = f.s.dynamic ? f.s.dynamicEl[t].downloadUrl !== !1 && (f.s.dynamicEl[t].downloadUrl || f.s.dynamicEl[t].src) : f.$items.eq(t).attr("data-download-url") !== "false" && (f.$items.eq(t).attr("data-download-url") || f.$items.eq(t).attr("href") || f.$items.eq(t).attr("data-src")),
                    c ? (n("#lg-download").attr("href", c),
                        f.$outer.removeClass("lg-hide-download")) : f.$outer.addClass("lg-hide-download")),
                    this.$el.trigger("onBeforeSlide.lg", [e, t, i, r]),
                    f.lgBusy = !0,
                    clearTimeout(f.hideBartimeout),
                    this.s.appendSubHtmlTo === ".lg-sub-html" && setTimeout(function () {
                        f.addHtml(t)
                    }, l),
                    this.arrowDisable(t),
                    u || (t < e ? u = "prev" : t > e && (u = "next")),
                    i ? (this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide"),
                        o > 2 ? (s = t - 1,
                            h = t + 1,
                            t === 0 && e === o - 1 ? (h = 0,
                                s = o - 1) : t === o - 1 && e === 0 && (h = 0,
                                    s = o - 1)) : (s = 0,
                                        h = 1),
                        u === "prev" ? f.$slide.eq(h).addClass("lg-next-slide") : f.$slide.eq(s).addClass("lg-prev-slide"),
                        f.$slide.eq(t).addClass("lg-current")) : (f.$outer.addClass("lg-no-trans"),
                            this.$slide.removeClass("lg-prev-slide lg-next-slide"),
                            u === "prev" ? (this.$slide.eq(t).addClass("lg-prev-slide"),
                                this.$slide.eq(e).addClass("lg-next-slide")) : (this.$slide.eq(t).addClass("lg-next-slide"),
                                    this.$slide.eq(e).addClass("lg-prev-slide")),
                            setTimeout(function () {
                                f.$slide.removeClass("lg-current");
                                f.$slide.eq(t).addClass("lg-current");
                                f.$outer.removeClass("lg-no-trans")
                            }, 50)),
                    f.lGalleryOn ? (setTimeout(function () {
                        f.loadContent(t, !0, 0)
                    }, this.s.speed + 50),
                        setTimeout(function () {
                            f.lgBusy = !1;
                            f.$el.trigger("onAfterSlide.lg", [e, t, i, r])
                        }, this.s.speed)) : (f.loadContent(t, !0, f.s.backdropDuration),
                            f.lgBusy = !1,
                            f.$el.trigger("onAfterSlide.lg", [e, t, i, r])),
                    f.lGalleryOn = !0,
                    this.s.counter && n("#lg-counter-current").text(t + 1)))
        }
            ;
        t.prototype.goToNextSlide = function (n) {
            var t = this
                , i = t.s.loop;
            n && t.$slide.length < 3 && (i = !1);
            t.lgBusy || (t.index + 1 < t.$slide.length ? (t.index++ ,
                t.$el.trigger("onBeforeNextSlide.lg", [t.index]),
                t.slide(t.index, n, !1, "next")) : i ? (t.index = 0,
                    t.$el.trigger("onBeforeNextSlide.lg", [t.index]),
                    t.slide(t.index, n, !1, "next")) : t.s.slideEndAnimatoin && !n && (t.$outer.addClass("lg-right-end"),
                        setTimeout(function () {
                            t.$outer.removeClass("lg-right-end")
                        }, 400)))
        }
            ;
        t.prototype.goToPrevSlide = function (n) {
            var t = this
                , i = t.s.loop;
            n && t.$slide.length < 3 && (i = !1);
            t.lgBusy || (t.index > 0 ? (t.index-- ,
                t.$el.trigger("onBeforePrevSlide.lg", [t.index, n]),
                t.slide(t.index, n, !1, "prev")) : i ? (t.index = t.$items.length - 1,
                    t.$el.trigger("onBeforePrevSlide.lg", [t.index, n]),
                    t.slide(t.index, n, !1, "prev")) : t.s.slideEndAnimatoin && !n && (t.$outer.addClass("lg-left-end"),
                        setTimeout(function () {
                            t.$outer.removeClass("lg-left-end")
                        }, 400)))
        }
            ;
        t.prototype.keyPress = function () {
            var t = this;
            if (this.$items.length > 1)
                n(window).on("keyup.lg", function (n) {
                    t.$items.length > 1 && (n.keyCode === 37 && (n.preventDefault(),
                        t.goToPrevSlide()),
                        n.keyCode === 39 && (n.preventDefault(),
                            t.goToNextSlide()))
                });
            n(window).on("keydown.lg", function (n) {
                t.s.escKey === !0 && n.keyCode === 27 && (n.preventDefault(),
                    t.$outer.hasClass("lg-thumb-open") ? t.$outer.removeClass("lg-thumb-open") : t.destroy())
            })
        }
            ;
        t.prototype.arrow = function () {
            var n = this;
            this.$outer.find(".lg-prev").on("click.lg", function () {
                n.goToPrevSlide()
            });
            this.$outer.find(".lg-next").on("click.lg", function () {
                n.goToNextSlide()
            })
        }
            ;
        t.prototype.arrowDisable = function (n) {
            !this.s.loop && this.s.hideControlOnEnd && (n + 1 < this.$slide.length ? this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled"),
                n > 0 ? this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled"))
        }
            ;
        t.prototype.setTranslate = function (n, t, i) {
            this.s.useLeft ? n.css("left", t) : n.css({
                transform: "translate3d(" + t + "px, " + i + "px, 0px)"
            })
        }
            ;
        t.prototype.touchMove = function (t, i) {
            var r = i - t;
            Math.abs(r) > 15 && (this.$outer.addClass("lg-dragging"),
                this.setTranslate(this.$slide.eq(this.index), r, 0),
                this.setTranslate(n(".lg-prev-slide"), -this.$slide.eq(this.index).width() + r, 0),
                this.setTranslate(n(".lg-next-slide"), this.$slide.eq(this.index).width() + r, 0))
        }
            ;
        t.prototype.touchEnd = function (n) {
            var t = this;
            t.s.mode !== "lg-slide" && t.$outer.addClass("lg-slide");
            this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0");
            setTimeout(function () {
                t.$outer.removeClass("lg-dragging");
                n < 0 && Math.abs(n) > t.s.swipeThreshold ? t.goToNextSlide(!0) : n > 0 && Math.abs(n) > t.s.swipeThreshold ? t.goToPrevSlide(!0) : Math.abs(n) < 5 && t.$el.trigger("onSlideClick.lg");
                t.$slide.removeAttr("style")
            });
            setTimeout(function () {
                t.$outer.hasClass("lg-dragging") || t.s.mode === "lg-slide" || t.$outer.removeClass("lg-slide")
            }, t.s.speed + 100)
        }
            ;
        t.prototype.enableSwipe = function () {
            var n = this
                , t = 0
                , i = 0
                , r = !1;
            if (n.s.enableSwipe && n.isTouch && n.doCss()) {
                n.$slide.on("touchstart.lg", function (i) {
                    n.$outer.hasClass("lg-zoomed") || n.lgBusy || (i.preventDefault(),
                        n.manageSwipeClass(),
                        t = i.originalEvent.targetTouches[0].pageX)
                });
                n.$slide.on("touchmove.lg", function (u) {
                    n.$outer.hasClass("lg-zoomed") || (u.preventDefault(),
                        i = u.originalEvent.targetTouches[0].pageX,
                        n.touchMove(t, i),
                        r = !0)
                });
                n.$slide.on("touchend.lg", function () {
                    n.$outer.hasClass("lg-zoomed") || (r ? (r = !1,
                        n.touchEnd(i - t)) : n.$el.trigger("onSlideClick.lg"))
                })
            }
        }
            ;
        t.prototype.enableDrag = function () {
            var t = this
                , r = 0
                , u = 0
                , i = !1
                , f = !1;
            if (t.s.enableDrag && !t.isTouch && t.doCss()) {
                t.$slide.on("mousedown.lg", function (u) {
                    t.$outer.hasClass("lg-zoomed") || (n(u.target).hasClass("lg-object") || n(u.target).hasClass("lg-video-play")) && (u.preventDefault(),
                        t.lgBusy || (t.manageSwipeClass(),
                            r = u.pageX,
                            i = !0,
                            t.$outer.scrollLeft += 1,
                            t.$outer.scrollLeft -= 1,
                            t.$outer.removeClass("lg-grab").addClass("lg-grabbing"),
                            t.$el.trigger("onDragstart.lg")))
                });
                n(window).on("mousemove.lg", function (n) {
                    i && (f = !0,
                        u = n.pageX,
                        t.touchMove(r, u),
                        t.$el.trigger("onDragmove.lg"))
                });
                n(window).on("mouseup.lg", function (e) {
                    f ? (f = !1,
                        t.touchEnd(u - r),
                        t.$el.trigger("onDragend.lg")) : (n(e.target).hasClass("lg-object") || n(e.target).hasClass("lg-video-play")) && t.$el.trigger("onSlideClick.lg");
                    i && (i = !1,
                        t.$outer.removeClass("lg-grabbing").addClass("lg-grab"))
                })
            }
        }
            ;
        t.prototype.manageSwipeClass = function () {
            var t = this.index + 1
                , n = this.index - 1;
            this.s.loop && this.$slide.length > 2 && (this.index === 0 ? n = this.$slide.length - 1 : this.index === this.$slide.length - 1 && (t = 0));
            this.$slide.removeClass("lg-next-slide lg-prev-slide");
            n > -1 && this.$slide.eq(n).addClass("lg-prev-slide");
            this.$slide.eq(t).addClass("lg-next-slide")
        }
            ;
        t.prototype.mousewheel = function () {
            var n = this;
            n.$outer.on("mousewheel.lg", function (t) {
                t.deltaY && (t.deltaY > 0 ? n.goToPrevSlide() : n.goToNextSlide(),
                    t.preventDefault())
            })
        }
            ;
        t.prototype.closeGallery = function () {
            var t = this
                , i = !1;
            this.$outer.find(".lg-close").on("click.lg", function () {
                t.destroy()
            });
            if (t.s.closable) {
                t.$outer.on("mousedown.lg", function (t) {
                    i = n(t.target).is(".lg-outer") || n(t.target).is(".lg-item ") || n(t.target).is(".lg-img-wrap") ? !0 : !1
                });
                t.$outer.on("mouseup.lg", function (r) {
                    (n(r.target).is(".lg-outer") || n(r.target).is(".lg-item ") || n(r.target).is(".lg-img-wrap") && i) && (t.$outer.hasClass("lg-dragging") || t.destroy())
                })
            }
        }
            ;
        t.prototype.destroy = function (t) {
            var i = this;
            t || (i.$el.trigger("onBeforeClose.lg"),
                n(window).scrollTop(i.prevScrollTop));
            t && (i.s.dynamic || this.$items.off("click.lg click.lgcustom"),
                n.removeData(i.el, "lightGallery"));
            this.$el.off(".lg.tm");
            n.each(n.fn.lightGallery.modules, function (n) {
                i.modules[n] && i.modules[n].destroy()
            });
            this.lGalleryOn = !1;
            clearTimeout(i.hideBartimeout);
            this.hideBartimeout = !1;
            n(window).off(".lg");
            n("body").removeClass("lg-on lg-from-hash");
            i.$outer && i.$outer.removeClass("lg-visible");
            n(".lg-backdrop").removeClass("in");
            setTimeout(function () {
                i.$outer && i.$outer.remove();
                n(".lg-backdrop").remove();
                t || i.$el.trigger("onCloseAfter.lg")
            }, i.s.backdropDuration + 50)
        }
            ;
        n.fn.lightGallery = function (i) {
            return this.each(function () {
                if (n.data(this, "lightGallery"))
                    try {
                        n(this).data("lightGallery").init()
                    } catch (r) {
                        console.error("lightGallery has not initiated properly")
                    }
                else
                    n.data(this, "lightGallery", new t(this, i))
            })
        }
            ;
        n.fn.lightGallery.modules = {}
    }
    )()
}),
    function (n, t) {
        typeof define == "function" && define.amd ? define([], function () {
            return t()
        }) : typeof exports == "object" ? module.exports = t() : t()
    }(this, function () {
        (function (n, t, i) {
            "use strict";
            var u = {
                fullScreen: !0
            }
                , r = function (t) {
                    return this.core = n(t).data("lightGallery"),
                        this.$el = n(t),
                        this.core.s = n.extend({}, u, this.core.s),
                        this.init(),
                        this
                };
            r.prototype.init = function () {
                var n = "";
                if (this.core.s.fullScreen)
                    if (i.fullscreenEnabled || i.webkitFullscreenEnabled || i.mozFullScreenEnabled || i.msFullscreenEnabled)
                        n = '<span class="lg-fullscreen lg-icon"><\/span>',
                            this.core.$outer.find(".lg-toolbar").append(n),
                            this.fullScreen();
                    else
                        return
            }
                ;
            r.prototype.requestFullscreen = function () {
                var n = i.documentElement;
                n.requestFullscreen ? n.requestFullscreen() : n.msRequestFullscreen ? n.msRequestFullscreen() : n.mozRequestFullScreen ? n.mozRequestFullScreen() : n.webkitRequestFullscreen && n.webkitRequestFullscreen()
            }
                ;
            r.prototype.exitFullscreen = function () {
                i.exitFullscreen ? i.exitFullscreen() : i.msExitFullscreen ? i.msExitFullscreen() : i.mozCancelFullScreen ? i.mozCancelFullScreen() : i.webkitExitFullscreen && i.webkitExitFullscreen()
            }
                ;
            r.prototype.fullScreen = function () {
                var t = this;
                n(i).on("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg", function () {
                    t.core.$outer.toggleClass("lg-fullscreen-on")
                });
                this.core.$outer.find(".lg-fullscreen").on("click.lg", function () {
                    i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement || i.msFullscreenElement ? t.exitFullscreen() : t.requestFullscreen()
                })
            }
                ;
            r.prototype.destroy = function () {
                this.exitFullscreen();
                n(i).off("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg")
            }
                ;
            n.fn.lightGallery.modules.fullscreen = r
        }
        )(jQuery, window, document)
    }),
    function (n, t) {
        typeof define == "function" && define.amd ? define(["jquery"], function (n) {
            return t(n)
        }) : typeof exports == "object" ? module.exports = t(require("jquery")) : t(jQuery)
    }(this, function (n) {
        (function () {
            "use strict";
            var i = {
                thumbnail: !0,
                animateThumb: !0,
                currentPagerPosition: "middle",
                thumbWidth: 100,
                thumbContHeight: 100,
                thumbMargin: 5,
                exThumbImage: !1,
                showThumbByDefault: !0,
                toogleThumb: !0,
                pullCaptionUp: !0,
                enableThumbDrag: !0,
                enableThumbSwipe: !0,
                swipeThreshold: 50,
                loadYoutubeThumbnail: !0,
                youtubeThumbSize: 1,
                loadVimeoThumbnail: !0,
                vimeoThumbSize: "thumbnail_small",
                loadDailymotionThumbnail: !0
            }
                , t = function (t) {
                    return this.core = n(t).data("lightGallery"),
                        this.core.s = n.extend({}, i, this.core.s),
                        this.$el = n(t),
                        this.$thumbOuter = null,
                        this.thumbOuterWidth = 0,
                        this.thumbTotalWidth = this.core.$items.length * (this.core.s.thumbWidth + this.core.s.thumbMargin),
                        this.thumbIndex = this.core.index,
                        this.left = 0,
                        this.init(),
                        this
                };
            t.prototype.init = function () {
                var n = this;
                this.core.s.thumbnail && this.core.$items.length > 1 && (this.core.s.showThumbByDefault && setTimeout(function () {
                    n.core.$outer.addClass("lg-thumb-open")
                }, 700),
                    this.core.s.pullCaptionUp && this.core.$outer.addClass("lg-pull-caption-up"),
                    this.build(),
                    this.core.s.animateThumb ? (this.core.s.enableThumbDrag && !this.core.isTouch && this.core.doCss() && this.enableThumbDrag(),
                        this.core.s.enableThumbSwipe && this.core.isTouch && this.core.doCss() && this.enableThumbSwipe(),
                        this.thumbClickable = !1) : this.thumbClickable = !0,
                    this.toogle(),
                    this.thumbkeyPress())
            }
                ;
            t.prototype.build = function () {
                function f(n, i, r) {
                    var f = t.core.isVideo(n, r) || {}, o, s = "";
                    f.youtube || f.vimeo || f.dailymotion ? f.youtube ? o = t.core.s.loadYoutubeThumbnail ? "//img.youtube.com/vi/" + f.youtube[1] + "/" + t.core.s.youtubeThumbSize + ".jpg" : i : f.vimeo ? t.core.s.loadVimeoThumbnail ? (o = "//i.vimeocdn.com/video/error_" + u + ".jpg",
                        s = f.vimeo[1]) : o = i : f.dailymotion && (o = t.core.s.loadDailymotionThumbnail ? "//www.dailymotion.com/thumbnail/video/" + f.dailymotion[1] : i) : o = i;
                    e += '<div data-vimeo-id="' + s + '" class="lg-thumb-item" style="width:' + t.core.s.thumbWidth + "px; margin-right: " + t.core.s.thumbMargin + 'px"><img src="' + o + '" /><\/div>';
                    s = ""
                }
                var t = this, e = "", u = "", i, r;
                switch (this.core.s.vimeoThumbSize) {
                    case "thumbnail_large":
                        u = "640";
                        break;
                    case "thumbnail_medium":
                        u = "200x150";
                        break;
                    case "thumbnail_small":
                        u = "100x75"
                }
                if (t.core.$outer.addClass("lg-has-thumb"),
                    t.core.$outer.find(".lg").append('<div class="lg-thumb-outer"><div class="lg-thumb lg-group"><\/div><\/div>'),
                    t.$thumbOuter = t.core.$outer.find(".lg-thumb-outer"),
                    t.thumbOuterWidth = t.$thumbOuter.width(),
                    t.core.s.animateThumb && t.core.$outer.find(".lg-thumb").css({
                        width: t.thumbTotalWidth + "px",
                        position: "relative"
                    }),
                    this.core.s.animateThumb && t.$thumbOuter.css("height", t.core.s.thumbContHeight + "px"),
                    t.core.s.dynamic)
                    for (r = 0; r < t.core.s.dynamicEl.length; r++)
                        f(t.core.s.dynamicEl[r].src, t.core.s.dynamicEl[r].thumb, r);
                else
                    t.core.$items.each(function (i) {
                        t.core.s.exThumbImage ? f(n(this).attr("href") || n(this).attr("data-src"), n(this).attr(t.core.s.exThumbImage), i) : f(n(this).attr("href") || n(this).attr("data-src"), n(this).find("img").attr("src"), i)
                    });
                t.core.$outer.find(".lg-thumb").html(e);
                i = t.core.$outer.find(".lg-thumb-item");
                i.each(function () {
                    var i = n(this)
                        , r = i.attr("data-vimeo-id");
                    r && n.getJSON("//www.vimeo.com/api/v2/video/" + r + ".json?callback=?", {
                        format: "json"
                    }, function (n) {
                        i.find("img").attr("src", n[0][t.core.s.vimeoThumbSize])
                    })
                });
                i.eq(t.core.index).addClass("active");
                t.core.$el.on("onBeforeSlide.lg.tm", function () {
                    i.removeClass("active");
                    i.eq(t.core.index).addClass("active")
                });
                i.on("click.lg touchend.lg", function () {
                    var i = n(this);
                    setTimeout(function () {
                        (!t.thumbClickable || t.core.lgBusy) && t.core.doCss() || (t.core.index = i.index(),
                            t.core.slide(t.core.index, !1, !0, !1))
                    }, 50)
                });
                t.core.$el.on("onBeforeSlide.lg.tm", function () {
                    t.animateThumb(t.core.index)
                });
                n(window).on("resize.lg.thumb orientationchange.lg.thumb", function () {
                    setTimeout(function () {
                        t.animateThumb(t.core.index);
                        t.thumbOuterWidth = t.$thumbOuter.width()
                    }, 200)
                })
            }
                ;
            t.prototype.setTranslate = function (n) {
                this.core.$outer.find(".lg-thumb").css({
                    transform: "translate3d(-" + n + "px, 0px, 0px)"
                })
            }
                ;
            t.prototype.animateThumb = function (n) {
                var i = this.core.$outer.find(".lg-thumb"), t;
                if (this.core.s.animateThumb) {
                    switch (this.core.s.currentPagerPosition) {
                        case "left":
                            t = 0;
                            break;
                        case "middle":
                            t = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
                            break;
                        case "right":
                            t = this.thumbOuterWidth - this.core.s.thumbWidth
                    }
                    this.left = (this.core.s.thumbWidth + this.core.s.thumbMargin) * n - 1 - t;
                    this.left > this.thumbTotalWidth - this.thumbOuterWidth && (this.left = this.thumbTotalWidth - this.thumbOuterWidth);
                    this.left < 0 && (this.left = 0);
                    this.core.lGalleryOn ? (i.hasClass("on") || this.core.$outer.find(".lg-thumb").css("transition-duration", this.core.s.speed + "ms"),
                        this.core.doCss() || i.animate({
                            left: -this.left + "px"
                        }, this.core.s.speed)) : this.core.doCss() || i.css("left", -this.left + "px");
                    this.setTranslate(this.left)
                }
            }
                ;
            t.prototype.enableThumbDrag = function () {
                var t = this
                    , u = 0
                    , f = 0
                    , r = !1
                    , e = !1
                    , i = 0;
                t.$thumbOuter.addClass("lg-grab");
                t.core.$outer.find(".lg-thumb").on("mousedown.lg.thumb", function (n) {
                    t.thumbTotalWidth > t.thumbOuterWidth && (n.preventDefault(),
                        u = n.pageX,
                        r = !0,
                        t.core.$outer.scrollLeft += 1,
                        t.core.$outer.scrollLeft -= 1,
                        t.thumbClickable = !1,
                        t.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"))
                });
                n(window).on("mousemove.lg.thumb", function (n) {
                    r && (i = t.left,
                        e = !0,
                        f = n.pageX,
                        t.$thumbOuter.addClass("lg-dragging"),
                        i = i - (f - u),
                        i > t.thumbTotalWidth - t.thumbOuterWidth && (i = t.thumbTotalWidth - t.thumbOuterWidth),
                        i < 0 && (i = 0),
                        t.setTranslate(i))
                });
                n(window).on("mouseup.lg.thumb", function () {
                    e ? (e = !1,
                        t.$thumbOuter.removeClass("lg-dragging"),
                        t.left = i,
                        Math.abs(f - u) < t.core.s.swipeThreshold && (t.thumbClickable = !0)) : t.thumbClickable = !0;
                    r && (r = !1,
                        t.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab"))
                })
            }
                ;
            t.prototype.enableThumbSwipe = function () {
                var n = this
                    , i = 0
                    , r = 0
                    , u = !1
                    , t = 0;
                n.core.$outer.find(".lg-thumb").on("touchstart.lg", function (t) {
                    n.thumbTotalWidth > n.thumbOuterWidth && (t.preventDefault(),
                        i = t.originalEvent.targetTouches[0].pageX,
                        n.thumbClickable = !1)
                });
                n.core.$outer.find(".lg-thumb").on("touchmove.lg", function (f) {
                    n.thumbTotalWidth > n.thumbOuterWidth && (f.preventDefault(),
                        r = f.originalEvent.targetTouches[0].pageX,
                        u = !0,
                        n.$thumbOuter.addClass("lg-dragging"),
                        t = n.left,
                        t = t - (r - i),
                        t > n.thumbTotalWidth - n.thumbOuterWidth && (t = n.thumbTotalWidth - n.thumbOuterWidth),
                        t < 0 && (t = 0),
                        n.setTranslate(t))
                });
                n.core.$outer.find(".lg-thumb").on("touchend.lg", function () {
                    n.thumbTotalWidth > n.thumbOuterWidth ? u ? (u = !1,
                        n.$thumbOuter.removeClass("lg-dragging"),
                        Math.abs(r - i) < n.core.s.swipeThreshold && (n.thumbClickable = !0),
                        n.left = t) : n.thumbClickable = !0 : n.thumbClickable = !0
                })
            }
                ;
            t.prototype.toogle = function () {
                var n = this;
                if (n.core.s.toogleThumb) {
                    n.core.$outer.addClass("lg-can-toggle");
                    n.$thumbOuter.append('<span class="lg-toogle-thumb lg-icon"><\/span>');
                    n.core.$outer.find(".lg-toogle-thumb").on("click.lg", function () {
                        n.core.$outer.toggleClass("lg-thumb-open")
                    })
                }
            }
                ;
            t.prototype.thumbkeyPress = function () {
                var t = this;
                n(window).on("keydown.lg.thumb", function (n) {
                    n.keyCode === 38 ? (n.preventDefault(),
                        t.core.$outer.addClass("lg-thumb-open")) : n.keyCode === 40 && (n.preventDefault(),
                            t.core.$outer.removeClass("lg-thumb-open"))
                })
            }
                ;
            t.prototype.destroy = function () {
                this.core.s.thumbnail && this.core.$items.length > 1 && (n(window).off("resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb"),
                    this.$thumbOuter.remove(),
                    this.core.$outer.removeClass("lg-has-thumb"))
            }
                ;
            n.fn.lightGallery.modules.Thumbnail = t
        }
        )()
    }),
    function (n, t) {
        typeof define == "function" && define.amd ? define(["jquery"], function (n) {
            return t(n)
        }) : typeof exports == "object" ? module.exports = t(require("jquery")) : t(jQuery)
    }(this, function (n) {
        (function () {
            "use strict";
            var i = function () {
                var n = !1
                    , t = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
                return t && parseInt(t[2], 10) < 54 && (n = !0),
                    n
            }
                , r = {
                    scale: 1,
                    zoom: !0,
                    actualSize: !0,
                    enableZoomAfter: 300,
                    useLeftForZoom: i()
                }
                , t = function (t) {
                    return this.core = n(t).data("lightGallery"),
                        this.core.s = n.extend({}, r, this.core.s),
                        this.core.s.zoom && this.core.doCss() && (this.init(),
                            this.zoomabletimeout = !1,
                            this.pageX = n(window).width() / 2,
                            this.pageY = n(window).height() / 2 + n(window).scrollTop()),
                        this
                };
            t.prototype.init = function () {
                var t = this
                    , e = '<span id="lg-zoom-in" class="lg-icon"><\/span><span id="lg-zoom-out" class="lg-icon"><\/span>';
                t.core.s.actualSize && (e += '<span id="lg-actual-size" class="lg-icon"><\/span>');
                t.core.s.useLeftForZoom ? t.core.$outer.addClass("lg-use-left-for-zoom") : t.core.$outer.addClass("lg-use-transition-for-zoom");
                this.core.$outer.find(".lg-toolbar").append(e);
                t.core.$el.on("onSlideItemLoad.lg.tm.zoom", function (i, r, u) {
                    var f = t.core.s.enableZoomAfter + u;
                    n("body").hasClass("lg-from-hash") && u ? f = 0 : n("body").removeClass("lg-from-hash");
                    t.zoomabletimeout = setTimeout(function () {
                        t.core.$slide.eq(r).addClass("lg-zoomable")
                    }, f + 30)
                });
                var i = 1
                    , o = function (i) {
                        var r = t.core.$outer.find(".lg-current .lg-image"), e, o, s = (n(window).width() - r.prop("offsetWidth")) / 2, h = (n(window).height() - r.prop("offsetHeight")) / 2 + n(window).scrollTop(), u, f;
                        e = t.pageX - s;
                        o = t.pageY - h;
                        u = (i - 1) * e;
                        f = (i - 1) * o;
                        r.css("transform", "scale3d(" + i + ", " + i + ", 1)").attr("data-scale", i);
                        t.core.s.useLeftForZoom ? r.parent().css({
                            left: -u + "px",
                            top: -f + "px"
                        }).attr("data-x", u).attr("data-y", f) : r.parent().css("transform", "translate3d(-" + u + "px, -" + f + "px, 0)").attr("data-x", u).attr("data-y", f)
                    }
                    , u = function () {
                        i > 1 ? t.core.$outer.addClass("lg-zoomed") : t.resetZoom();
                        i < 1 && (i = 1);
                        o(i)
                    }
                    , f = function (r, f, e, o) {
                        var s = f.prop("offsetWidth"), h, c;
                        h = t.core.s.dynamic ? t.core.s.dynamicEl[e].width || f[0].naturalWidth || s : t.core.$items.eq(e).attr("data-width") || f[0].naturalWidth || s;
                        t.core.$outer.hasClass("lg-zoomed") ? i = 1 : h > s && (c = h / s,
                            i = c || 2);
                        o ? (t.pageX = n(window).width() / 2,
                            t.pageY = n(window).height() / 2 + n(window).scrollTop()) : (t.pageX = r.pageX || r.originalEvent.targetTouches[0].pageX,
                                t.pageY = r.pageY || r.originalEvent.targetTouches[0].pageY);
                        u();
                        setTimeout(function () {
                            t.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
                        }, 10)
                    }
                    , r = !1;
                t.core.$el.on("onAferAppendSlide.lg.tm.zoom", function (n, i) {
                    var u = t.core.$slide.eq(i).find(".lg-image");
                    u.on("dblclick", function (n) {
                        f(n, u, i)
                    });
                    u.on("touchstart", function (n) {
                        r ? (clearTimeout(r),
                            r = null,
                            f(n, u, i)) : r = setTimeout(function () {
                                r = null
                            }, 300);
                        n.preventDefault()
                    })
                });
                n(window).on("resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom", function () {
                    t.pageX = n(window).width() / 2;
                    t.pageY = n(window).height() / 2 + n(window).scrollTop();
                    o(i)
                });
                n("#lg-zoom-out").on("click.lg", function () {
                    t.core.$outer.find(".lg-current .lg-image").length && (i -= t.core.s.scale,
                        u())
                });
                n("#lg-zoom-in").on("click.lg", function () {
                    t.core.$outer.find(".lg-current .lg-image").length && (i += t.core.s.scale,
                        u())
                });
                n("#lg-actual-size").on("click.lg", function (n) {
                    f(n, t.core.$slide.eq(t.core.index).find(".lg-image"), t.core.index, !0)
                });
                t.core.$el.on("onBeforeSlide.lg.tm", function () {
                    i = 1;
                    t.resetZoom()
                });
                t.core.isTouch || t.zoomDrag();
                t.core.isTouch && t.zoomSwipe()
            }
                ;
            t.prototype.resetZoom = function () {
                this.core.$outer.removeClass("lg-zoomed");
                this.core.$slide.find(".lg-img-wrap").removeAttr("style data-x data-y");
                this.core.$slide.find(".lg-image").removeAttr("style data-scale");
                this.pageX = n(window).width() / 2;
                this.pageY = n(window).height() / 2 + n(window).scrollTop()
            }
                ;
            t.prototype.zoomSwipe = function () {
                var n = this
                    , t = {}
                    , i = {}
                    , f = !1
                    , r = !1
                    , u = !1;
                n.core.$slide.on("touchstart.lg", function (i) {
                    if (n.core.$outer.hasClass("lg-zoomed")) {
                        var f = n.core.$slide.eq(n.core.index).find(".lg-object");
                        u = f.prop("offsetHeight") * f.attr("data-scale") > n.core.$outer.find(".lg").height();
                        r = f.prop("offsetWidth") * f.attr("data-scale") > n.core.$outer.find(".lg").width();
                        (r || u) && (i.preventDefault(),
                            t = {
                                x: i.originalEvent.targetTouches[0].pageX,
                                y: i.originalEvent.targetTouches[0].pageY
                            })
                    }
                });
                n.core.$slide.on("touchmove.lg", function (e) {
                    if (n.core.$outer.hasClass("lg-zoomed")) {
                        var o = n.core.$slide.eq(n.core.index).find(".lg-img-wrap"), s, h;
                        e.preventDefault();
                        f = !0;
                        i = {
                            x: e.originalEvent.targetTouches[0].pageX,
                            y: e.originalEvent.targetTouches[0].pageY
                        };
                        n.core.$outer.addClass("lg-zoom-dragging");
                        h = u ? -Math.abs(o.attr("data-y")) + (i.y - t.y) : -Math.abs(o.attr("data-y"));
                        s = r ? -Math.abs(o.attr("data-x")) + (i.x - t.x) : -Math.abs(o.attr("data-x"));
                        (Math.abs(i.x - t.x) > 15 || Math.abs(i.y - t.y) > 15) && (n.core.s.useLeftForZoom ? o.css({
                            left: s + "px",
                            top: h + "px"
                        }) : o.css("transform", "translate3d(" + s + "px, " + h + "px, 0)"))
                    }
                });
                n.core.$slide.on("touchend.lg", function () {
                    n.core.$outer.hasClass("lg-zoomed") && f && (f = !1,
                        n.core.$outer.removeClass("lg-zoom-dragging"),
                        n.touchendZoom(t, i, r, u))
                })
            }
                ;
            t.prototype.zoomDrag = function () {
                var t = this
                    , r = {}
                    , i = {}
                    , u = !1
                    , o = !1
                    , f = !1
                    , e = !1;
                t.core.$slide.on("mousedown.lg.zoom", function (i) {
                    var o = t.core.$slide.eq(t.core.index).find(".lg-object");
                    e = o.prop("offsetHeight") * o.attr("data-scale") > t.core.$outer.find(".lg").height();
                    f = o.prop("offsetWidth") * o.attr("data-scale") > t.core.$outer.find(".lg").width();
                    t.core.$outer.hasClass("lg-zoomed") && n(i.target).hasClass("lg-object") && (f || e) && (i.preventDefault(),
                        r = {
                            x: i.pageX,
                            y: i.pageY
                        },
                        u = !0,
                        t.core.$outer.scrollLeft += 1,
                        t.core.$outer.scrollLeft -= 1,
                        t.core.$outer.removeClass("lg-grab").addClass("lg-grabbing"))
                });
                n(window).on("mousemove.lg.zoom", function (n) {
                    if (u) {
                        var s = t.core.$slide.eq(t.core.index).find(".lg-img-wrap"), h, c;
                        o = !0;
                        i = {
                            x: n.pageX,
                            y: n.pageY
                        };
                        t.core.$outer.addClass("lg-zoom-dragging");
                        c = e ? -Math.abs(s.attr("data-y")) + (i.y - r.y) : -Math.abs(s.attr("data-y"));
                        h = f ? -Math.abs(s.attr("data-x")) + (i.x - r.x) : -Math.abs(s.attr("data-x"));
                        t.core.s.useLeftForZoom ? s.css({
                            left: h + "px",
                            top: c + "px"
                        }) : s.css("transform", "translate3d(" + h + "px, " + c + "px, 0)")
                    }
                });
                n(window).on("mouseup.lg.zoom", function (n) {
                    u && (u = !1,
                        t.core.$outer.removeClass("lg-zoom-dragging"),
                        o && (r.x !== i.x || r.y !== i.y) && (i = {
                            x: n.pageX,
                            y: n.pageY
                        },
                            t.touchendZoom(r, i, f, e)),
                        o = !1);
                    t.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
                })
            }
                ;
            t.prototype.touchendZoom = function (n, t, i, r) {
                var u = this
                    , f = u.core.$slide.eq(u.core.index).find(".lg-img-wrap")
                    , s = u.core.$slide.eq(u.core.index).find(".lg-object")
                    , e = -Math.abs(f.attr("data-x")) + (t.x - n.x)
                    , o = -Math.abs(f.attr("data-y")) + (t.y - n.y)
                    , h = (u.core.$outer.find(".lg").height() - s.prop("offsetHeight")) / 2
                    , l = Math.abs(s.prop("offsetHeight") * Math.abs(s.attr("data-scale")) - u.core.$outer.find(".lg").height() + h)
                    , c = (u.core.$outer.find(".lg").width() - s.prop("offsetWidth")) / 2
                    , a = Math.abs(s.prop("offsetWidth") * Math.abs(s.attr("data-scale")) - u.core.$outer.find(".lg").width() + c);
                (Math.abs(t.x - n.x) > 15 || Math.abs(t.y - n.y) > 15) && (r && (o <= -l ? o = -l : o >= -h && (o = -h)),
                    i && (e <= -a ? e = -a : e >= -c && (e = -c)),
                    r ? f.attr("data-y", Math.abs(o)) : o = -Math.abs(f.attr("data-y")),
                    i ? f.attr("data-x", Math.abs(e)) : e = -Math.abs(f.attr("data-x")),
                    u.core.s.useLeftForZoom ? f.css({
                        left: e + "px",
                        top: o + "px"
                    }) : f.css("transform", "translate3d(" + e + "px, " + o + "px, 0)"))
            }
                ;
            t.prototype.destroy = function () {
                var t = this;
                t.core.$el.off(".lg.zoom");
                n(window).off(".lg.zoom");
                t.core.$slide.off(".lg.zoom");
                t.core.$el.off(".lg.tm.zoom");
                t.resetZoom();
                clearTimeout(t.zoomabletimeout);
                t.zoomabletimeout = !1
            }
                ;
            n.fn.lightGallery.modules.zoom = t
        }
        )()
    });
!function (n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof exports ? module.exports = n : n(jQuery)
}(function (n) {
    function u(r) {
        var u = r || window.event, w = c.call(arguments, 1), l = 0, s = 0, e = 0, a = 0, b = 0, k = 0, v, y, p;
        if (r = n.event.fix(u),
            r.type = "mousewheel",
            "detail" in u && (e = -1 * u.detail),
            "wheelDelta" in u && (e = u.wheelDelta),
            "wheelDeltaY" in u && (e = u.wheelDeltaY),
            "wheelDeltaX" in u && (s = -1 * u.wheelDeltaX),
            "axis" in u && u.axis === u.HORIZONTAL_AXIS && (s = -1 * e,
                e = 0),
            l = 0 === e ? s : e,
            "deltaY" in u && (e = -1 * u.deltaY,
                l = e),
            "deltaX" in u && (s = u.deltaX,
                0 === e && (l = -1 * s)),
            0 !== e || 0 !== s)
            return 1 === u.deltaMode ? (v = n.data(this, "mousewheel-line-height"),
                l *= v,
                e *= v,
                s *= v) : 2 === u.deltaMode && (y = n.data(this, "mousewheel-page-height"),
                    l *= y,
                    e *= y,
                    s *= y),
                (a = Math.max(Math.abs(e), Math.abs(s)),
                    (!t || t > a) && (t = a,
                        o(u, a) && (t /= 40)),
                    o(u, a) && (l /= 40,
                        s /= 40,
                        e /= 40),
                    l = Math[l >= 1 ? "floor" : "ceil"](l / t),
                    s = Math[s >= 1 ? "floor" : "ceil"](s / t),
                    e = Math[e >= 1 ? "floor" : "ceil"](e / t),
                    i.settings.normalizeOffset && this.getBoundingClientRect) && (p = this.getBoundingClientRect(),
                        b = r.clientX - p.left,
                        k = r.clientY - p.top),
                r.deltaX = s,
                r.deltaY = e,
                r.deltaFactor = t,
                r.offsetX = b,
                r.offsetY = k,
                r.deltaMode = 0,
                w.unshift(r, l, s, e),
                f && clearTimeout(f),
                f = setTimeout(h, 200),
                (n.event.dispatch || n.event.handle).apply(this, w)
    }
    function h() {
        t = null
    }
    function o(n, t) {
        return i.settings.adjustOldDeltas && "mousewheel" === n.type && t % 120 == 0
    }
    var f, t, s = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], r = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], c = Array.prototype.slice, e, i;
    if (n.event.fixHooks)
        for (e = s.length; e;)
            n.event.fixHooks[s[--e]] = n.event.mouseHooks;
    i = n.event.special.mousewheel = {
        version: "3.1.12",
        setup: function () {
            if (this.addEventListener)
                for (var t = r.length; t;)
                    this.addEventListener(r[--t], u, !1);
            else
                this.onmousewheel = u;
            n.data(this, "mousewheel-line-height", i.getLineHeight(this));
            n.data(this, "mousewheel-page-height", i.getPageHeight(this))
        },
        teardown: function () {
            if (this.removeEventListener)
                for (var t = r.length; t;)
                    this.removeEventListener(r[--t], u, !1);
            else
                this.onmousewheel = null;
            n.removeData(this, "mousewheel-line-height");
            n.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function (t) {
            var r = n(t)
                , i = r["offsetParent" in n.fn ? "offsetParent" : "parent"]();
            return i.length || (i = n("body")),
                parseInt(i.css("fontSize"), 10) || parseInt(r.css("fontSize"), 10) || 16
        },
        getPageHeight: function (t) {
            return n(t).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    n.fn.extend({
        mousewheel: function (n) {
            return n ? this.bind("mousewheel", n) : this.trigger("mousewheel")
        },
        unmousewheel: function (n) {
            return this.unbind("mousewheel", n)
        }
    })
})
