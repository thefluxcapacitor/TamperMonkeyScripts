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
	var searchTerm = $item.find('a.cellMainLink').text();
	$item.parent().find('.iaconbox').prepend('<a target="_blank" href="http://subsearch.apphb.com/home/searchsub?searchterm=' + escape(searchTerm) + '">SUB</a>');
});

$('.advertising').hide();
