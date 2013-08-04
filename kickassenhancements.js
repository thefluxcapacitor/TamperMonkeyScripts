// ==UserScript==
// @id             KAEnhancements
// @name           KA Enhancements
// @version        1
// @namespace      KAEnhancements
// @author         NA
// @description    KA Enhancements
// @include        http://kickass.to/*
// @run-at         document-end
// @noframes
// ==/UserScript==
 
$('.torrentname').each(function() {
debugger;
	var $item = $(this);
	var searchTerm = $item.find('>a:nth-child(2)').text();
	$item.parent().find('.iaconbox').prepend('<a href="http://subdivxsearch.apphb.com/home/searchsub?searchterm=' + escape(searchTerm) + '">SUB</a>');
});
