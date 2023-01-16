chrome.tabs.query({windowType:'normal'}, function(tabs) {
    //console.log('Number of open tabs in all normal browser windows:',tabs.length);
    a='Open Tabs:'+tabs.length;
    document.getElementById("test").innerHTML=a;
});

// for removing the local storage data

// chrome.storage.local.remove(["tabs","abc"],function(){
//  var error = chrome.runtime.lastError;
//     if (error) {
//         console.error(error);
//     }
// })
// chrome.storage.local.clear() 


// let tabsCount = Object.keys( JSON.parse(localStorage.getItem('TabsOpen')||'{}') ).length
// document.getElementById("test").childElementCount
// document.getElementById("test").innerHTML=tabsCount;

// function onError(error) {
//   console.log(`Error: ${error}`);
// }

javascript:

String.prototype.HTMLtagWrap   =
    function ( tag,  attrs)  { 
        return  tag[0]=="/" ?
            "<"+tag+">"+this+ "<" +tag.substr(1)+ (attrs?" "+attrs:"")+ ">" :
            "<"  +tag+ (attrs?" "+attrs:"") + ">"  +this+  "</"  +tag+">"
    }  ;

String.prototype.HTMLwrapTags =
   function ( tagRA, atRA) { 
      return tagRA[0] ? this.HTMLtagWrap(tagRA.pop(),atRA.pop()).HTMLwrapTags(tagRA,atRA)
                                :  this
   }  ;

/* alert */ ( str =
( function(x){return x.HTMLtagWrap('title') + x.HTMLwrapTags(['/pre','center','b'] , [ ] ) }
                              (' History ')+
    //'1. '.HTMLtagWrap('b') +
    ' '.HTMLtagWrap('b') +
    '<input id=URIplcQry type=text size=120  '+'value="SEARCH RESULTS" >\n' +
    '<input type=button onclick=URIplcQry.value+="&"+this.value  value=domain="" >\t' + 
        ' '.HTMLtagWrap(  'A', 
            ' href="places:"  rel="sidebar"  title="hystryx  " id="hystryx  " ' +
            ' onmouseover ="with(this)title=id+(href=document.forms[0].URIplcQry.value)"  '
        ) +
    '\n\n '.HTMLtagWrap('b',   ' style="vertical-align:top;" '  ) +
  ( '\n\t\t\tOpen Tabs Information\n\n' +'\n ') 
   .HTMLtagWrap('textarea', 'id=histURIs  rows=12 cols=120 nowrap')  
)  .  HTMLwrapTags ( ["html", "form", "pre"] , [ ] ) 
);
document.write ( str );



// $(document).ready(function(){
//    $("form").validate().settings.ignore = "";
// })

document.addEventListener("DOMContentLoaded", () => {
    const start = new Date().getTime();
    window.addEventListener("beforeunload", () => {
        const end = new Date().getTime();
        const totalTime = (end - start) / 1000
        console.log("hello world")
        console.log(totalTime)
    });
})

chrome.windows.getAll({ populate: true }, function (windows) {
    for (var i = 0; i < windows.length; ++i) {
        var w = windows[i];
        for (var j = 0; j < w.tabs.length; ++j) {
            var t = w.tabs[j];
            // if (isValidTab(t)) {
            //     tabs.push(t);
            // }
        }

    }
    // sendResponse({ tabs: tabs });
});

// chrome.tabs.query({ currentWindow: true }, function (tabs) {
//     tabs.forEach(function (tab) {
//         console.log('Tab ID: ', tab.id);
//     });
// });

// chrome.windows.getAll({populate:true},function(windows){
//   var i=0; 
//   windows.forEach(function(window){
//     window.tabs.forEach(function(tab){
//       //collect all of the urls here, I will just log them instead
//       console.log(tab.url);
//       i++;
//     });
//   });
//   console.log(i);
// });

//calculating time

var count=0


var cont=[];
var a="";
var s="title,time\n";


// chrome.tabs.onCreated(function(tab){
//     // let tabid =tab.id;
//     // let st=performance.now()
//     count+=1;
//     chrome.storage.local.set({"tabs":count})
// });

// function tabCreated(tab){
//     count+=1;
//     chrome.storage.local.set({"tabs":count})
// }




 // chrome.tabs.onCreated.addListener(function(tab){
 //    let tabid =tab.id;
 //    let st=performance.now()
 //    chrome.storage.local.set({tabid:st})
 //    // console.log(tab.id);
 //   });
chrome.tabs.query({}, function(tabs){
    
    for(let i=0;i<tabs.length;i++)
    {
    // console.log(tabs[i]);
    // console.log(tabs[i].url);     
    // console.log(tabs[i].title); 

    cont.push(tabs[i].title);
    s+=tabs[i].title+",0\n";
    a+=tabs[i].title;
    // console.log(tabs[i])
    // chrome.storage.local.set({[tabs[i].id]:tabs[i].title})
    // document.getElementById('content').innerHTML=tabs[i].title;
    // chrome.storage.local.get(null,function(data) {console.log(data);})
    }
    var tempElem = document.createElement('a');
    tempElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(s));
    tempElem.setAttribute('download', 'abc.csv');
    tempElem.click();
    // window.open('data:text/csv;charset=utf-8,'+escape(s));
   

});

   // document.getElementById('content').innerHTML=list;
   // console.log(list);

   // var list="<ol>";
   // for(let i of cont){
   //  list+=`<li>${i}</li>`;
   // }
   // list +="</ol>";
   // document.getElementById('content').innerHTML=list;
   // console.log(cont.length);

   // console.log(cont);

   // cont.forEach(c=>{
   //  // console.log(c);
   //  s+=c+",";

   // })
   // console.log(s);
   // for (var i=0;i<cont.length;i++)
   // {
   //  console.log(cont[i]);
   // }

// chrome.tabs.onCreated.addListener(function(tab){
//     chrome.storage.local.set({tab.id : performance.now()});
//     // console.log(tab.id);
// }); 
var d = new Date().getTime() - performance.timing.navigationStart; 
document.getElementById('content').innerHTML=(Math.floor(d/(24*60*60*1000))+" days, "+new Date(d).toISOString().substr(11,8));


