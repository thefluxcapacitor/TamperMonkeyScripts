// ==UserScript==
// @id             TLEnhancements
// @name           TL Enhancements
// @version        1
// @namespace      TLEnhancements
// @author         NA
// @description    TL Enhancements
// @include        http://www.torrentleech.org/torrents/browse/index/*
// @include        https://www.torrentleech.org/torrents/browse/index/*
// @run-at         document-end
// @noframes
// ==/UserScript==

var timeout = 7;

function parseTorrentTitle(torrentName, callback)
{
	var year, title = '';
	var consecutiveDigits = 0;
	var lastCharIsDigit = false;

	for (var i = 0; i < torrentName.length; i++)
	{
		if (!isNaN(torrentName[i]) && torrentName[i] != ' ')
		{
			if (lastCharIsDigit)
			{
				consecutiveDigits++;
			}
			else
			{
				consecutiveDigits = 1;
				lastCharIsDigit = true;
			}
		}
		else
		{
			lastCharIsDigit = false;

			if (consecutiveDigits == 4)
			{
				year = torrentName.substr(i - 4, 4);

				if (!title)
				{
					title = torrentName.substr(0, i - 5).replace('.', ' ');
				}

				break;
			}
		}
	}

	callback(title, year);
}

function getMovieInfo(imdbUrl, index, callback) {
	setTimeout(function() {
		var url = imdbUrl;
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: function(response) {
				callback(extractMovieInfo(response.responseText, index, imdbUrl));
			},
			onerror: function(response) {
				callback();
			}
		});
	}, timeout);
}

function extractMovieInfo(content, index, url) {
	//var match = content.match(/<span class="rating-rating">(\d.\d)<span>\/10<\/span><\/span>/);
	//var match = content.match(/<span class="value" itemprop="ratingValue">(\d.\d)<\/span>/);
	//var match = content.match(/<span class="rating-rating"><span class="value">(\d.\d)<\/span>/);
	var match = content.match(/<span itemprop="ratingValue">(\d.\d)<\/span>/);
	//var match2 = content.match(/([\d,]+ votes)/);
	var match2 = content.match(/<span itemprop="ratingCount">([\d,]+)<\/span>/);
	
	var pattern = /href="\/genre\/([^"]*)\?ref_=tt_ov_inf"/g;
	var match3, count, genres = new Array();
	if (match == null) {
		match = '-';
	} else {
		match = match[1];
	}
	if (match2 == null) {
		match2 = '-';
	} else {
		match2 = match2[1] + ' votes';
	}
	
	count = 0;
	while ( match3 = pattern.exec(content)){
		var gen = ' ' + match3[1];
		if (genres.indexOf(gen) == -1) {
			// put each genre only once
			genres[count++] = gen;
		}
		
	}

	return { rating: match, index: index, votecount: ""+match2, url: url, genres: genres };
}

function findImdbBestMatch(title, year, resultsJson, matchCallback) {
	var match = new Object();

	var findImdbBestMatchInList = function(titleResults) {
		var filtered = titleResults.filter(function(item) {
			return item.title == title &&
				   item.title_description.substr(0, 4) == year;
		});

		if (filtered && filtered.length > 0) {
			return filtered[0];
		} 

		return null;
	};

debugger;
	var allMatches = new Array();

//TODO: add title_substring (http://www.imdb.com/xml/find?json=1&nr=1&tt=on&q=Slaughters%20Big%20Rip%20Off)
//TODO: support movies without year?
	if (resultsJson.title_approx) {
		match.title = resultsJson.title_approx[0].title;
		match.year = resultsJson.title_approx[0].title_description.substr(0, 4);
		match.id = resultsJson.title_approx[0].id;
		match.color = 'magenta';
		allMatches = allMatches.concat(resultsJson.title_approx);
	}

	if (resultsJson.title_popular) {
		match.title = resultsJson.title_popular[0].title;
		match.year = resultsJson.title_popular[0].title_description.substr(0, 4);
		match.id = resultsJson.title_popular[0].id;
		match.color = 'yellow';
		allMatches = allMatches.concat(resultsJson.title_popular);
	}

	if (resultsJson.title_exact) {
		match.title = resultsJson.title_exact[0].title;
		match.year = resultsJson.title_exact[0].title_description.substr(0, 4);
		match.id = resultsJson.title_exact[0].id;
		match.color = 'green';
		allMatches = allMatches.concat(resultsJson.title_exact);
	}

	var aux = findImdbBestMatchInList(allMatches);
	if (aux) {
		match.title = aux.title;
		match.year = aux.title_description.substr(0, 4);
		match.id = aux.id;

		if (resultsJson.title_exact && resultsJson.title_exact.indexOf(aux) >= 0) {
			match.color = 'green';
		} else if (resultsJson.title_popular && resultsJson.title_popular.indexOf(aux) >= 0) {
			match.color = 'yellow';
		} else if (resultsJson.title_approx && resultsJson.title_approx.indexOf(aux) >= 0) {
			match.color = 'magenta';
		}
	}

	return match;
}

var titles = $('span.title');

titles.each(function() {
	var torrentTitle = $(this).children('a').text();
	var torrentItem = $(this);

	torrentItem.append('<span class="loading-imdb-info" style="padding: 1px; color: black; background-color: gray; margin-left: 5px;">Loading IMDB details</span>');

	parseTorrentTitle(torrentTitle, function(title, year) {

		var url = 'http://www.imdb.com/xml/find?json=1&nr=1&tt=on&q=' + escape(title);// + ' ' + year);
		// var torrentTitleLocal = torrentTitle;
		
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: function(response) {
				
				try {
					var resultsJson = JSON.parse(response.responseText);
					var imdbMatch = findImdbBestMatch(title, year, resultsJson);

					if (imdbMatch.id) {
						var imdbUrl = 'http://www.imdb.com/title/' + imdbMatch.id + '/';
						getMovieInfo(imdbUrl, 0, function(results) {
							if (results) {
								var color = 'gray';
								if (results.rating >= 9) {
									color = 'red';
								} else if (results.rating >= 8) {
									color = 'orange';
								} else if (results.rating >= 7) {
									color = 'yellow';
								}

								torrentItem.children('.loading-imdb-info').remove();
								torrentItem.append(
									'<a href="' + imdbUrl + '"><span style="color: ' + color + '; margin-left: 5px;">' + 
									imdbMatch.title + ' - ' + imdbMatch.year + ' - ' + results.rating + ' (' + results.votecount + 
									')</span></a>');
							} else {
								torrentItem.children('.loading-imdb-info').remove();
								torrentItem.append('<span style="color: red; margin-left: 5px;">Request failed</span>');
							}
						});
					} else {
						torrentItem.children('.loading-imdb-info').remove();
						torrentItem.append('<span style="color: red; margin-left: 5px;">Not found</span>');
					}
				} catch (ex) {
					torrentItem.children('.loading-imdb-info').remove();
					torrentItem.append(
						'<span style="color: red; margin-left: 5px;" title="' + ex.message + '">Error</span>');
				}
			},
			onerror: function(response) {
				debugger;
				console.log(title);
				// console.log(torrentTitleLocal);
				console.error(response.statusText + ' - ' + response.responseText);
			}
		});
	});
});
