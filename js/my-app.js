// Initialize your app
var myApp = new Framework7({
    precompileTemplates: true,
    template7Pages: true, // need to set this
    cache: false
});
 
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
 
// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});

//Main ID for comedian
var comedianID="df0273f966c42beb1c3f47532df4432c514b04b2484239f277e5dc5acf680ab2";

var isAjaxLoaded=false;
var pathToAjaxDispatcher="http://www.ihumoru.com/appengine/php/ajaxDispatcher.php";

function handleWithMainWrapper(div){
    
    CordovaFacebook.login({
   permissions: ['email', 'user_likes'],
   onSuccess: function(result) {
      if(result.declined.length > 0) {
         alert("The User declined something!");
      }
      /* ... */
   },
   onFailure: function(result) {
      if(result.cancelled) {
         alert("The user doesn't like my app");
      } else if(result.error) {
         alert("There was an error:" + result.errorLocalized);
      }
   }
});
return false;
        
        
        
    
    
    
    
    
    
    if(isAjaxLoaded) return false;
    isAjaxLoaded=true;
    var postData={id: comedianID, context: "loadMainAPPWrapper"};
    
    $$.ajax({
       type: "POST",
       url: pathToAjaxDispatcher,
       data: postData,
       dataType: "json",
       success: function(data){
           isAjaxLoaded=false;
               if(data["success"]==1){
                   //Load custom stylesheet and embeed it in the head
                   for(var i in data["css"]){
                       var cssItem=data["css"][i];
                       $$('<link rel="stylesheet" type="text/css" href="'+cssItem+'" />').appendTo("head");
                   }
                   
                   //Load custom stylesheet and embeed it in the head
                   for(var i in data["js"]){
                       var jsItem=data["js"][i];
                       
                       JavaScript.load(jsItem, function() {
                           dinyamicUseScript(myApp);
                           //Timeout to load the content and properly display it
                           div.html(data["content"]);
                      });
                   }
                   
                   
               }
       }, error: function(){
           isAjaxLoaded=false;
       }
    });
}

if($$("#mainWrapper").length>0){
    //APP loads dynamic content
    window.setTimeout(function(){
        handleWithMainWrapper($$("#mainWrapper"));
    }, 100);
    
}


var JavaScript = {
  load: function(src, callback) {
    var script = document.createElement('script'),
        loaded;
    script.setAttribute('src', src);
    if (callback) {
      script.onreadystatechange = script.onload = function() {
        if (!loaded) {
          callback();
        }
        loaded = true;
      };
    }
    document.getElementsByTagName('body')[0].appendChild(script);
  }
};