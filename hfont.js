;(function(win) {
    // some global varibles
    var doc = win.document,
        docEl = doc.documentElement,
        tid = null;

    // the core object
    var hFont = {
        init: function(){
            var t = this;
            t.bind();
            t.setFont();
        },
        setFont: function(){
            var width = docEl.getBoundingClientRect().width;
            width = width > 750 ? 750 : width;
            docEl.style.fontSize = (width / 750) * 100+ 'px';
        },
        // event bound entry
        bind: function(){
            var t = this;
            win.addEventListener('resize', function() {
                clearTimeout(tid);
                tid = setTimeout(t.setFont, 300);
            }, false);
            win.addEventListener('pageshow', function(e) {
                if (e.persisted) {
                   clearTimeout(tid);
                   tid = setTimeout(t.setFont, 300);
                }
            }, false);
        }
    };
    hFont.init();
})(window);
