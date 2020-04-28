// Instellingen
var APIKey1="803HierAPIKeyInvullendF877818141";
var APIKey2="803HierAPIKeyInvullendF844448141";
var Online1=false;
var Online2=false;

$(function(){
 
 IsOctoprintOnline(); 
 setTimeout(UpdateStatus,1000);
 setTimeout(TestVerbonden,1500);
 setInterval(UpdateStatus,4000);
 setInterval(TestVerbonden,6000);
 
 $(".btn").click(function(){  
  if($(this).hasClass("disabled")) return;
  
  switch($(this).attr("data-cmd")) {
   case "connect":
    Connect($(this).attr("data-printer"));
    break;
   case "up":
    Stuur($(this).attr("data-printer"), "printer/printhead",'{ "command": "jog", "z": 50, "speed":500}');
    break;
   case "warm":
    Stuur($(this).attr("data-printer"), "printer/command",'{"command":"M104 S215"}');
    if($(this).attr("data-printer")==="1")
     setTimeout(function(){Stuur(1, "printer/command",'{"command":"M140 S60"}'); },600);
    else
     setTimeout(function(){Stuur(2, "printer/command",'{"command":"M140 S60"}'); },600);
    break;
   case "unload":
    Stuur($(this).attr("data-printer"), "printer/command",'{"command":"M702"}');
    break;
   case "load":
    Stuur($(this).attr("data-printer"), "printer/command",'{"command":"M701"}');
    break;
   case "cool":
    Stuur($(this).attr("data-printer"), "printer/command",'{"command":"M104 S0"}');
    if($(this).attr("data-printer")==="1")
     setTimeout(function(){Stuur(1, "printer/command",'{"command":"M140 S0"}'); },600);
    else
     setTimeout(function(){Stuur(2, "printer/command",'{"command":"M140 S0"}'); },600);
    break;    
  }  
 });
 
 function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
 }
 
 function DisableUI(Nummer, Enable) {
  $(".printer"+Nummer+" .btn").each(function(){
   $(this).removeClass("disabled");
   $(this).addClass("disabled");   
  });
 }
 
 function EnableUI(Nummer, Enable) {
  $(".printer"+Nummer+" .btn:not(:first)").each(function(){
   $(this).removeClass("disabled");
   if(!Enable) $(this).addClass("disabled");   
  });
 }
 
 function IsOctoprintOnline() {
  $(".printer1 .status").text("...");
  $(".printer2 .status").text("...");     
  var img1 = document.body.appendChild(document.createElement("img"));
  img1.onload = function(){$(".printer1 .status").html("&nbsp;");img1.parentNode.removeChild(img1); };
  img1.onerror = function(){$(".printer1 .status").text("Octopi-server is offline!");};
  var img2 = document.body.appendChild(document.createElement("img"));
  img2.onload = function(){$(".printer2 .status").html("&nbsp;");img2.parentNode.removeChild(img2); };
  img2.onerror = function(){$(".printer2 .status").text("Octopi-server is offline!");};
  img1.src = "http://octopi.local/static/img/tentacle-20x20@2x.png";
  img2.src = "http://octopi2.local/static/img/tentacle-20x20@2x.png";
}
    
 function TestVerbonden() {
  DoTestVerbonden(1);
  DoTestVerbonden(2);
 }   
 
 function UpdateStatus() {
  DoUpdateTemp(1);
  DoUpdateTemp(2);
  GetJobInfo(1);
  GetJobInfo(2);
 }
 
 function GetJobInfo(Printer) {
  $.ajax({
   url: Printer==1? "http://octopi.local/api/job" : "http://octopi2.local/api/job",
   method: "GET",     
   dataType: "json",
   context:{"Printer" : Printer},   
   headers: {    
    "X-Api-Key": eval("APIKey"+Printer),
    "Content-type": "application/json"
   } 
  }).always(function(R) {     
   console.log(R);   
   if(!R.job.file.name){
    $("#fname"+$(this)[0].Printer).html("&nbsp;");      
    $("#procent"+$(this)[0].Printer).html("&nbsp;");
   }
   else {
    $("#fname"+$(this)[0].Printer).html(R.job.file.name.replace(/_/g," "));         
    $("#procent"+$(this)[0].Printer).html(Math.round(R.progress.completion)+" %");
   }
   
   var Nu = new Date();
   var Begonnen = Nu;       
   Begonnen = new Date(Begonnen.getTime()-R.progress.printTime*1000);   
   var Begintijd=Begonnen;
   var Einde = new Date(Begonnen.getTime()+ R.progress.printTimeLeft*1000);
   Begonnen = Begonnen.getHours() + ":" + ("00" + Begonnen.getMinutes()).slice(-2);
   Einde = Einde.getHours() + ":" + ("00" + Einde.getMinutes()).slice(-2);    
   
   // Indien de printtijd in de bestandssnaam staat, gebruik die dan
   // luminaria 0.2mm PLA MK3 8h20m.gcode
   if(R.job.file.name.endsWith(".gcode")) {
    var f=R.job.file.name.replace(/_/g," ").split(" ");
    f=f[f.length-1]; // 8h20m.gcode    
    f=f.substring(0,f.indexOf(".")); // 8h20m of 3m of 2d3h21m
    var Dagen=0,Uren=0,Minuten=0;
    if(f.indexOf("d")>=0) {Dagen = f.split("d")[0];f=f.split("d")[1];}
    if(f.indexOf("h")>=0) {Uren = f.split("h")[0];f=f.split("h")[1];}
    if(f.indexOf("m")>=0) Minuten = f.split("m")[0];
    Einde = new Date(Begintijd.getTime()+ Dagen*24*60*60*1000 + Uren*60*60*1000 + Minuten*60*1000);
    Einde = Einde.getHours() + ":" + ("00" + Einde.getMinutes()).slice(-2);    
   }
   $("#tijd"+$(this)[0].Printer).html("Start "+Begonnen +" - Einde "+Einde);      
  });
 }  
 
 function DoUpdateTemp(Printer) {
  $.ajax({
   url: Printer==1? "http://octopi.local/api/printer" : "http://octopi2.local/api/printer",
   method: "GET",     
   dataType: "json",
   context:{"Printer" : Printer},   
   headers: {    
    "X-Api-Key": eval("APIKey"+Printer),
    "Content-type": "application/json"
   } 
  }).always(function(R) {     
   console.log(R);   
   $("#t"+$(this)[0].Printer).html(
    R.temperature.tool0.actual+' &deg;C / '+R.temperature.bed.actual+' &deg;C'
   );   
   if(R.state.text==="Operational") {
    EnableUI($(this)[0].Printer, true);
    $(".printer"+$(this)[0].Printer+" .btn:first()").addClass("disabled");
   }
  });
 }  
 
 function DoTestVerbonden(Printer) {
  $.ajax({
   url: Printer==1? "http://octopi.local/api/connection" : "http://octopi2.local/api/connection",
   method: "GET",     
   dataType: "json",
   context:{"Printer" : Printer},   
   headers: {    
    "X-Api-Key": eval("APIKey"+Printer),
    "Content-type": "application/json"
   } 
  }).always(function(R) {  
    if(R.current.state==="Operational") {
     console.log("Printer "+$(this)[0].Printer+" is verbonden");
     EnableUI($(this)[0].Printer, true);
     $(".printer"+$(this)[0].Printer+" .btn:first()").addClass("disabled");
    }
    else {
     EnableUI($(this)[0].Printer, false);
     console.log("Status printer "+$(this)[0].Printer+": "+R.current.state);
     if(R.current.state==="Printing") {
      $(".printer"+$(this)[0].Printer+" .btn:first()").addClass("disabled");
     }
    }  
  });
 }     
 
 function Connect(PrinterNummer) {  
  $.ajax({
   url: PrinterNummer==1? "http://octopi.local/api/connection" : "http://octopi2.local/api/connection",
   method: "POST",  
   data: '{"command":"connect"}', 
   dataType: "json",
   context:{"PrinterNummer" : PrinterNummer},
   success:function(data,text){       
    if(text==="nocontent") {
     setTimeout(TestVerbonden,3000);
     // Nee! Dit moet met timeout want state verandert steeds
    }
   },
   headers: {    
    "X-Api-Key": eval("APIKey"+PrinterNummer),
    "Content-type": "application/json"
   } 
  }).always(function(R) {  
    //console.log(R);
  });
 }

 function Stuur(PrinterNummer, call, cmd) {
  console.log(call);
  console.log(cmd);
  $.ajax({
   url: PrinterNummer==1? "http://octopi.local/api/"+call : "http://octopi2.local/api/"+call,
   method: "POST",
   data: cmd,
   dataType: "json",
   success:function(data,text){    
    console.log("Commando succesvol verstuurd");
    console.log("Succes="+text);
   },
   headers: {    
    "X-Api-Key": eval("APIKey"+PrinterNummer),
    "Content-type": "application/json"
   } 
  }).always(function(R) {  
    console.log(R);
   }).done(function(R) {
    console.log(R);
   });
 }


});
