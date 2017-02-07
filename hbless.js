;(function(win) {
    // some global varibles
    var doc = win.document,
        docEl = doc.documentElement,
        dpr = 1,
        scale = 1,
        tid = null;
    // the core object
    var Hbless = {
        init: function(){
            var t = this;
            t.setDpr();
            t.setMeta();
            t.refresh();
            t.bind();
        },
        // set device pixel ratio
        setDpr: function(){
            var nv = win.navigator.appVersion,
                pix = win.devicePixelRatio;
            if (nv.match(/iphone/gi)){
                if (pix >=3){
                    dpr = 3;
                } else if (pix >=2){
                    dpr = 2;
                } else {
                    dpr =1;
                }
            }
            scale = 1 / dpr;
            docEl.setAttribute("dpr",dpr);
        },
        // set meta
        setMeta: function(){
            var metaEl = doc.createElement('meta'),
                head = docEl.firstElementChild || doc.getElementsByTagName("head")[0];
            metaEl.name="viewport";
            metaEl.content="initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ", user-scalable=no";
            head.appendChild(metaEl);
        },
        refresh: function(){
            var width = docEl.getBoundingClientRect().width;
            if (width / dpr > 540) {
                width = 540 * dpr;
            }
            var rem = width / 10;
            docEl.style.fontSize = rem + 'px';
        },
        // event bound entry
        bind: function(){
            var t = this;
            win.addEventListener('resize', function() {
                clearTimeout(tid);
                tid = setTimeout(t.refresh, 300);
            }, false);
            win.addEventListener('pageshow', function(e) {
                if (e.persisted) {
                    clearTimeout(tid);
                    tid = setTimeout(t.refresh, 300);
                }
            }, false);
        }
    };
    Hbless.init();
})(window);
