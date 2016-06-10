// ==UserScript==
// @name        ProgrammersForumAddon
// @description Small userscript which adds some features
// @author      BDA
// @version     0.0.1
// @homepage    https://github.com/BDanAnd/ProgrammersForumAddon
// @downloadURL https://raw.githubusercontent.com/BDanAnd/ProgrammersForumAddon/master/pfa.user.js
// @include     http://programmersforum.ru/*
// @include     http://www.programmersforum.ru/*
// @connect     programmersforum.ru
// @connect     www.programmersforum.ru
// @grant       GM_getValue
// @grant       GM_setValue
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// ==/UserScript==

(function (window, undefined) {
    var w;
    if (typeof unsafeWindow !== undefined) {
        w = unsafeWindow;
    } else {
        w = window;
    }
    if (w.self != w.top) {
        return;
    }
    if (/http:\/\/(www\.)?programmersforum.ru/.test(w.location.href)) {
        //Line Numbering for CODE BBCode
        $("pre code").each(function() {
            var table = $('<table><tr><td align="right"></td><td></td></tr></table>');
            var res = '';
            for (var i = 0; i < $(this).html().split('\n').length - 1; i++)
                res = res + (i + 1) + ':\n';
            $(this).parent().parent().append(table);
            $(this).parent().clone().appendTo($(table).find("td:first-child")).find("code").html(res).attr("class", "no-highlight");
            $(this).parent().appendTo($(table).find("td:nth-child(2)"));
        });
    }
})(window);