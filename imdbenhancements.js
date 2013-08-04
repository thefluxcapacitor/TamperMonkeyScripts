// ==UserScript==
// @id             ImdbEnhancements
// @name           Imdb Enhancements
// @version        1
// @namespace      ImdbEnhancements
// @author         NA
// @description    Imdb Enhancements
// @include        http://www.imdb.com/title/*
// @include        https://www.imdb.com/title/*
// @run-at         document-end
// @noframes
// ==/UserScript==

var header = document.querySelector('#overview-top .infobar');

var movieYear = document.title.substr(document.title.length - 12, 4);
var movieTitle = document.title.slice(0,-14);
var movieTitleAndYear = movieTitle + ' ' + movieYear;

var separator = document.createElement('span');
separator.innerHTML = ' | ';
header.appendChild(separator);

var youtubeSearchLink = document.createElement('a');
youtubeSearchLink.href = 'http://www.youtube.com/results?search_query='+escape(movieTitle + ' trailer');
youtubeSearchLink.textContent = 'YouTube trailer';

var youtubeIcon = document.createElement('img');
youtubeIcon.src = "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgNkQkIDZGiCA2RzAgNkcwIDZH/CA2R/wgNkf8IDZH/CA2R/wgNkf8IDZH/CA2R2AgNkcwIDZHMCA2RhAgNkQYIDpWHCA6V/wgOlf8IDpX/CA6V/wgOlf8IDpX/CA6V/wgOlf8IDpX/CA6V/wgOlf8IDpX/CA6V/wgOlf8IDpWHCQ6ZzAkOmf8JDpn/CQ6Z/wkOmf8JDpb/BQhc/wgMgf8JDpn/CQ6Z/wkOmf8JDpn/CQ6Z/wkOmf8JDpn/CQ6ZzAkOnuoJDp7/CQ6e/wkOnv8JDp7/Exed/8jIy/9RU4j/Bwp0/wkOm/8JDp7/CQ6e/wkOnv8JDp7/CQ6e/wkOnuoJD6T8CQ+k/wkPpP8JD6T/CQ+k/xUbo//V1dX/1dXV/4yNrP8QFG//CA6Y/wkPpP8JD6T/CQ+k/wkPpP8JD6T8CQ+q/wkPqv8JD6r/CQ+q/wkPqv8WG6n/3d3d/93d3f/d3d3/v7/M/y0wjv8JD6r/CQ+q/wkPqv8JD6r/CQ+q/woQr/8KEK//ChCv/woQr/8KEK//Fx2v/+fn5//n5+f/5+fn/+jo6P+YmtP/ChCv/woQr/8KEK//ChCv/woQr/8KELX8ChC1/woQtf8KELX/ChC1/xgdtf/x8fH/8fHx//Ly8v+bndv/Ehi3/woQtf8KELX/ChC1/woQtf8KELX8ChG76goRu/8KEbv/ChG7/woRu/8YH77/+fn5/+/v9/9fY9H/ChG7/woRu/8KEbv/ChG7/woRu/8KEbv/ChG76goRwMwKEcD/ChHA/woRwP8KEcD/EBfB/6Ol5/8tM8n/ChHA/woRwP8KEcD/ChHA/woRwP8KEcD/ChHA/woRwMwLEcSHCxHE/wsRxP8LEcT/CxHE/wsRxP8LEcT/CxHE/wsRxP8LEcT/CxHE/wsRxP8LEcT/CxHE/wsRxP8LEcSHCxLICQsSyKULEsjMCxLI+QsSyP8LEsj/CxLI/wsSyP8LEsj/CxLI/wsSyP8LEsj/CxLI0gsSyMwLEsiiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAD//wAA//8AAA==";
youtubeSearchLink.appendChild(youtubeIcon);

header.appendChild(youtubeSearchLink);

separator = document.createElement('span');
separator.innerHTML = ' | ';
header.appendChild(separator);

var kaTorrentsSearchLink = document.createElement('a');
kaTorrentsSearchLink.href = 'http://kickass.to/usearch/'+escape(movieTitleAndYear +' category:movies')+'/?field=seeders&sorder=desc';
kaTorrentsSearchLink.textContent = 'Search Kickass';

var kaIcon = document.createElement('img');
kaIcon.src = "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHUFLcyFLV74bO0UuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeQEthLmNy+DVzhf81c4X/NXOF/ydUYdscPEUdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkTFeuN3WG/zh2iP84doj/OHaI/zh2iP84doj/M2t7/B9BS1IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlS1ecPHmM/zx5jP88eYz/WIyc/3OfrP9BfI//PHmM/zx5jP83b4D9IEFLPgAAAAAAAAAAAAAAAAAAAAAiQ0wzPXiJ/kB9j/9AfY//XZGg//b5+v//////4uvu/2iZp/9AfY//QH2P/zNkcu4AAAAAAAAAAAAAAAAAAAAAMl1q2UWBlP9FgZT/RYGU/73T2f///////f7+//L29//p8PL/RYGU/0WBlP9FgZT/KUxXgAAAAAAAAAAAJ0ZPHUeBk/9Khpj/SoaY/0qGmP/b5+r//////7vR2P9Khpj/bp6t/0qGmP9Khpj/SoaY/zlndOcAAAAAAAAAAC9SXIBPi53/T4ud/0+Lnf9Pi53/0eHm///////F2d//T4ud/0+Lnf9Pi53/T4ud/0+Lnf9Mhpf/KEZPEgAAAAA4YGu+VJCh/1SQof9UkKH/VJCh/8HX3f//////6/L0/1SQof9UkKH/VJCh/1SQof9UkKH/VJCh/y9QWVwAAAAAQGp31lmUpv9ZlKb/aZ6u/5u/yv/W5en////////////C2N//3urt/3Smtf9ZlKb/WZSm/1mUpv81WWOIAAAAAENseNRemar/Xpmq/3Wntv////////////////////////////////+VvMf/Xpmq/16Zqv9emar/OFtlhAAAAABCaHS+Y52v/2Odr/9nn7H/iLTC/4Kxv//0+Pn//////6zL1f9jna//Y52v/2Odr/9jna//Y52v/zdXYVwAAAAAPF5od2ehsv9nobL/Z6Gy/2ehsv9nobL/xtzi///////f6+//Z6Gy/2ehsv9nobL/Z6Gy/2Wdrv80UVoSAAAAADZTXBJkmqr+a6W2/2ultv9rpbb/a6W2/2ultv9rpbb/a6W2/2ultv9rpbb/a6W2/2ultv9SfovlAAAAAAAAAAAAAAAAS3J9xG+ouf9vqLn/XIuZ9GGTovpvqLn/b6i5/2+ouf9gkqD5Zpqp/W+ouf9vqLn/QWJsdwAAAAAAAAAAAAAAADtZYhdbipfxQWJrbgAAAAAAAAAAR2t2p2CRn/dBYmtuAAAAAAAAAABGanSgVH6L3wAAAAAAAAAA/j8AAPgPAADwBwAA4AMAAMADAADAAQAAgAEAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIABAADAAQAAxjMAAA==";
kaTorrentsSearchLink.appendChild(kaIcon);

header.appendChild(kaTorrentsSearchLink);

separator = document.createElement('span');
separator.innerHTML = ' | ';
header.appendChild(separator);

var tpbSearchLink = document.createElement('a');
tpbSearchLink.href = 'http://thepiratebay.sx/search/'+escape(movieTitleAndYear)+'/0/7/200';
tpbSearchLink.textContent = 'Search TPB';
header.appendChild(tpbSearchLink);

separator = document.createElement('span');
separator.innerHTML = ' | ';
header.appendChild(separator);

var subDivxSearchLink = document.createElement('a');
subDivxSearchLink.href = 'http://subdivx.com/index.php?buscar='+escape(movieTitleAndYear)+'&accion=5&masdesc=&subtitulos=1&realiza_b=1';
subDivxSearchLink.textContent = 'Search SubDivX';
header.appendChild(subDivxSearchLink);

separator = document.createElement('span');
separator.innerHTML = ' | ';
header.appendChild(separator);

var tlSearchLink = document.createElement('a');
tlSearchLink.href = 'http://www.torrentleech.org/torrents/browse/index/query/'+escape(movieTitleAndYear)+'/facets/category%253AMovies';
tlSearchLink.textContent = 'Search TL';
header.appendChild(tlSearchLink);
