var wikiLink = 'http://en.wikipedia.org';
var scriptLoc = 'http://localhost/countries/scripts/curl.php';
var foodLoc = 'http://localhost/countries/scripts/food.php';
var wikiBox = '.infobox';
var foodBox = '.column-count ul';

function countryHover(event, code){
	$('body').css('cursor','pointer');
}
function countryBlur(event, code){
	$('body').css('cursor','text');
}
function countryClick(event, code){
	var cunt = $('.jvectormap-label').html();
	$('#info').html('<div class="loading"></div>');
	showCuntInfo(cunt);
}
function showCuntInfo(c){
	c = c.split(' ').join('_');
	$.get(scriptLoc+'?keunt='+c, function(data){
		var info = $(data).find(wikiBox);
		var infoDiv = $('#info');
		infoDiv.html(info);
		var infoHeight = infoDiv.height();
		$('body').height(infoHeight);
	//Loop through table rows removing unwanted elements
		$(wikiBox+' tr').each(function(){
			var t = $(this);
		//Remove anthem
			if(t.children('td').hasClass('anthem')){
				t.children('td').css('display','none');
			}
		//Remove location map table row
			if(t.has('a.image')){
				var thisImg = t.children('td').children('div').children('div').children('a.image');
				if(thisImg.length > 0){
					var thisTit = thisImg.attr('title');
					if(thisTit){
						if((thisTit.indexOf('Location of') != -1) || (thisTit.indexOf('hemisphere') != -1)){
							t.css('display','none');
						}
					}
					if(thisImg.attr('href').indexOf('orthographic') != -1){
						t.css('display','none');
					}
				}
			}
		});
	}).complete(function(){
		var food = '';
		var cunt = ''; var foodCount = 0;
	//Replace any countries that are listed differently in the food list
		switch(c){
			case'United_States_of_America': c='United_States'; break;
		}
		c = c.split('_').join(' ');
		$('#food ul:first-child li').each(function(){
			var list = $(this);
			cunt = list.children('b').children('a').attr('title');
			if(cunt == c){
				list.children('a').each(function(){
					if(!$(this).parents('sup').hasClass('reference')){
						var link = $(this).attr('href');
						$(this).attr('href', wikiLink+link).attr('target','_blank');
						$('#food-holder').html($(this));
						food = food+$('#food-holder').html()+'<br />';
						foodCount++;
					}
				});
			}
		});
		if(foodCount > 1){
			foodTitle = '<h3>National Dishes:</h5>';
		}else{
			foodTitle = '<h3>National Dish:</h5>';
			if(foodCount == 0){
				food = '<em>unknown</em>';
			}
		}
		$('#info tr.adr').after('<tr><td colspan="3">'+foodTitle+food+'</td></tr>');
	});
}
//Initiate map keunt
$(document).ready(function() {
	$('#map').vectorMap({
		'color':'#4db849',
		'hoverColor':'#003579',
		'backgroundColor':'#ffffff',
		'onRegionOver':function(e,c){ countryHover(e,c);},
		'onRegionOut':function(e,c){ countryBlur(e,c);},
		'onRegionClick':function(e,c){ countryClick(e,c);}
	});
	$.get(foodLoc, function(fData){
		var foodList = $(fData).find(foodBox);
		$('#food').html(foodList);
	});
});