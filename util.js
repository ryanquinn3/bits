

var apiList = ["https://btc-e.com/api/2/btc_usd/ticker",
"https://btc-e.com/api/2/ltc_usd/ticker","http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=5",
"http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=14",
"http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=53",
"http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=28"];


var lastPrice = {"bitcoin":0, "litecoin":0,
				"feathercoin":0,"worldcoin":0,
				"bottlecaps":0,"peercoin":0};

function coin(val,diff,input_quant,input_price,calc_val)
{
	this.val = val;
	this.diff = diff;
	this.input_quant = input_quant;
	this.input_price = input_price;
	this.calc_val = calc_val;
}

var coins = new Array();

coins[0] = new coin("#bits","#bitdif","#bitq","#bitp","#bitv");
coins[1] = new coin("#lites","#litedif","#liteq","#litep","#litev");
coins[2] = new coin("#feather","#featherdif","#featherq","#featherp","#featherv");
coins[3] = new coin("#world","#worlddif","#worldq","#worldp","#worldv");
coins[4] = new coin("#caps","#capsdif","#bottleq","#bottlep","#bottlev");
coins[5] = new coin("#peer","#peerdif","#peerq","#peerp","#peerv");

var bits = function(data,textStatus,jqXHR)
{
	var json = $.parseJSON(data);
	var price = parseFloat(json.ticker.last).toFixed(2);
	var diff = (lastPrice["bitcoin"] - price).toFixed(2);
	$("#bits").text("$"+price);
	$("#bitdif").text("$"+diff);
	if(diff>=0)
		$("#bitdif").attr("class","green");
	else
		$("#bitdif").attr("class","red");
	lastPrice["bitcoin"] = price;
};


var lites = function(data,textStatus,jqXHR)
{
	var json = $.parseJSON(data);
	var price = parseFloat(json.ticker.last).toFixed(2);
	var diff = (lastPrice["litecoin"] - price).toFixed(2);
	$("#lite").html("$"+price);
	$("#litedif").html("$"+diff);
	if(diff>=0)
		$("#litedif").attr("class","green");
	else
		$("#litedif").attr("class","red");
	lastPrice["litecoin"] = price;
 
};

var feather = function(data,textStatus,jqXHR)
{
	var price = data.return.markets.FTC.lasttradeprice;
	price = (price * lastPrice["bitcoin"]).toFixed(2);
	var diff = (lastPrice["feathercoin"]-price).toFixed(2);
	$("#feather").html("$"+price);
	$("#featherdif").html("$"+diff);
	if(diff >= 0)
		$("#featherdif").attr("class","green");
	else
		$("#featherdif").attr("class","red");
	lastPrice["feathercoin"] = price;
};

var world = function(data,textStatus,jqXHR)
{
	var price = data.return.markets.WDC.lasttradeprice;
	price = (price*lastPrice["bitcoin"]).toFixed(2);
	var diff = (lastPrice["worldcoin"]-price).toFixed(2);
	$("#world").html("$"+price);
	$("#worlddif").html("$"+diff);
	if(diff >= 0)
		$("#worlddif").attr("class","green");
	else
		$("#worlddif").attr("class","red");
	lastPrice["worldcoin"] = price;

};

var caps = function(data,textStatus,jqXHR)
{
	var price = data.return.markets.CAP.lasttradeprice;
	price = (price*lastPrice["bitcoin"]).toFixed(2);
	var diff = (lastPrice["bottlecaps"] - price).toFixed(2);
	$("#caps").html("$"+price);
	$("#capsdif").html("$"+diff);
	if(diff >= 0)
		$("#capsdif").attr("class","green");
	else
		$("#capsdif").attr("class","red");
	lastPrice["bottlecaps"] = price;
};
var peer = function(data,textStatus,jqXHR)
{
	var price = data.return.markets.PPC.lasttradeprice;
	price = (price*lastPrice["bitcoin"]).toFixed(2);
	var diff = (lastPrice["peercoin"] - price).toFixed(2);
	$("#peer").html("$"+price);
	$("#peerdif").html("$"+diff);
	var c;
	if(diff >= 0)
		c = "green";
	else
		c = "red";
	$("#peerdif").attr("class",c);
	lastPrice["peercoin"] = price;
};


var callBacks = [bits,lites,feather,world,caps,peer];



$(document).ready(function()
{

	
	for(var i = 0; i < apiList.length;i++)
	{
		ajaxc(apiList[i],callBacks[i]);
		var temp = "ajaxc(apiList["+i+"],callBacks["+i+"])";
		setInterval(temp,10000);
	}

	$("#calc").click(function(){

		for(var i in coins)
		{
			var cur = coins[i];
			if( $(cur.input_price).val() !== undefined && $(cur.input_quant).val() !== undefined &&
				($(cur.input_price).val()).length > 0 && $(cur.input_quant).val().length > 0)
			{
				var old_val = $(cur.input_quant).val()*$(cur.input_price).val();
				var newPrice = parseFloat($(cur.val).text().substring(1));
				var new_val = $(cur.input_quant).val()*newPrice;
				var diff = new_val - old_val;
				$(cur.calc_val).text("$"+diff);
			}
		}
	});
});




function ajaxc(link,good)
{
	$.ajax(
	{
		url: link ,
		type: 'GET',
      	headers: { 'Access-Control-Allow-Origin': '*' },
      	crossDomain: true,
      	success: good,
      	error: null,
      	datatype: 'json'
   });
}




