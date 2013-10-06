

$(document).ready (function ()
{
	addEvents();
});


var text = "";
var counterMax = 10;
var counter = 0;
var quotes = [];

function addQuotes (item)
{
	$.tmpl( "quoteItemTmpl", item ).appendTo("#quotesList");
}

function addEvents ()
{
	var self = this;
	$(".searchField").keyup(function (e)
	{
		if (event.which == 13)
		{
			$("#quotesList").empty();
			quotes = [];
			self.doSearch($(this).val());
			counter = 0;
		}
	});
	
	$(".searchField").focus(function ()
	{
		$(this).val("");
	});
}

function doSearch (value, nextUrl)
{
	text = value;
	//$("#quotesList").empty();
	//$("#quotesList").append("<div id='searchInfo' class='quotePart'>Searching...</div>");
	$("#progress").show();
	putSerch(text, onSearchResult, nextUrl);
}

function onSearchResult (result)
{
	for (var i=0; i<result.data.length; i++)
	{
		quotes.push(result.data[i]);
	}
	
	if (result.next && counter < counterMax)
	{
		doSearch(text, result.next);
		counter++;
	}
	else
	{
	
		$("#searchInfo").remove();
		$("#progress").hide();

		data = filterResult(quotes);
		addQuotes(quotes);	

		$(".linkWrapper").empty();
		$(".linkWrapper").append("<a class='filterLinkSpeaker selected' href='javascript:onRelatedLinks(true);'>Quotes from this person</a>");
		$(".linkWrapper").append("<a class='filterLinkOthers' href='javascript:onRelatedLinks(false);'>Quotes from other people in articles related to this person</a>");		
	
	}
	
}

function onRelatedLinks (useSpeaker)
{
	$("#quotesList").empty();
	filterBySpeaker(useSpeaker);

	var data = returnFilteredDataObj();
	addQuotes(data);
	
	if (useSpeaker) {
		$(".filterLinkOthers").removeClass('selected');
		$(".filterLinkSpeaker").addClass('selected');
	} else {
		$(".filterLinkSpeaker").removeClass('selected');
		$(".filterLinkOthers").addClass('selected');		
	}

}