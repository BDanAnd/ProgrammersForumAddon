// ==UserScript==
// @name        ProgrammersForumAddon
// @description Small userscript which adds some features
// @author      BDA
// @version     0.0.2
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

function pfa_settings_option(caption, id) {
    return '<div><label><input id="' + id + '" type="checkbox" ' + (GM_getValue(id, false) ? 'checked="checked"' : '') + '"/>' + caption + '</label></div>';
}

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
        var menu_nav = $("div.tborder");
        if (menu_nav.length == 1) {
            var menu_button = $('<td class="vbmenu_control"><a id="pfa_settings" href="/?styleid=1&amp;nojs=1#pfa_settings">\
Настройки PFA</a> <script type="text/javascript"> vbmenu_register("pfa_settings"); </script></td>');
            menu_nav.find("tr").append(menu_button);
            var popup_menu = $('<div class="vbmenu_popup" id="pfa_settings_menu" style="display:none;margin-top:3px" align="left">\
<table cellpadding="4" cellspacing="1" border="0"><tr><td class="thead">Настройки PFA</td></tr>\
<tr><td class="vbmenu_option" title="nohilite">' + pfa_settings_option("Нумерация строк", "pfa_LineNumbering") + '</td></tr>\
<tr><td class="vbmenu_option" title="nohilite" align="center"><input type="button" class="button" value="Перезагрузить" onClick="window.location.reload();"></td></tr>\
</table></div>');
            $(popup_menu).find("input").click(function(e) {GM_setValue(e.toElement.id, e.toElement.checked);});
            $(popup_menu).insertAfter("div.vbmenu_popup");
        }

        //Line Numbering for CODE BBCode
        if (GM_getValue("pfa_LineNumbering", false)) {
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
    }
})(window);