
chrome.storage.local.clear() 

console.log("running background task")
// var openTabs={};
chrome.tabs.onCreated.addListener(
	function(tab){
		console.log(tab);
	  var data={}
	  data[tab.id]=Date.now()
	  chrome.storage.local.set(data)
	  console.log()

  
	}
  )

chrome.tabs.onRemoved.addListener(function(tabId,removeInfo){
	
})
function getSeconds(timestamp){
	return Math.floor(timestamp/(1000))%60
}
function getMinutes(timestamp){
	return Math.floor(timestamp/(1000*60))%60
}
function getHours(timestamp){
	return Math.floor(timestamp/(1000*60*60))
}

chrome.webRequest.onBeforeRequest.addListener(
	function(details) { return {cancel: true}; },
	{urls: ["*://www.evil.com/*"]},
	["blocking"]
  );
var lastTaken=Date.now();
var takingTime=1*10*1000;
setInterval(()=>{
	var data={}
	chrome.storage.local.get(null, function(localdata) {data=localdata})
	var csvData="Title,Time\n"
	chrome.tabs.query({}, function(tabs){
		if(Date.now()-lastTaken>takingTime){
			if(tabs.length==0){
				lastTaken=Date.now()
			}

			var isvalidData=false;
			for(let i=0;i<tabs.length;i++)
			{
				if(data[tabs[i].id]){
					var diff = Date.now()-data[tabs[i].id]
					console.log("\n*************************************************************************")
					console.log(tabs[i].title)
					console.log("Hours: ", getHours(diff), " Minutes: ", getMinutes(diff), "Seconds", getSeconds(diff))
					console.log("*************************************************************************\n")
					var tabdetails=tabs[i].title +"," + diff  +"\n"

					csvData+=tabdetails
					lastTaken=Date.now()
					isvalidData=true;
					if(getMinutes(diff)===1)
					{
						console.log(tabs[i].title)
						chrome.webRequest.onBeforeRequest.addListener(
							function(details){ return{cancel:true}},
							{urls:["*://*.youtube.com/*","*://*.instagram.com/*","*://*.facebook.com/*"]},
							["blocking"])
					}
					

					
				}
		
			}
			if(isvalidData){
				
		
				console.log(csvData)
			}
			
		}
	   
	
	});

},1000)