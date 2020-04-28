<!DOCTYPE html>
<html>
 <head runat="server">
  <title>Octocontrol</title>    
  <link rel="stylesheet" href="/client/awesome/css/all.css" />    
  <link href="/client/octo.css" rel="stylesheet" />  
  <script src="/client/jquery-3.5.0.min.js"></script>
  <script src="/octocontrol.js"></script>  
 </head>
<body>
 <div class="m">  
  <h1>Octocontroller</h1> 
  <div class="printer1">
   <h2>Printer 1</h2>
   <code id="fname1">&nbsp;</code>  
   <h3 id="tijd1">&nbsp;</h3>   
   <h3><span id="procent1">&nbsp;</span><br /><span id=t1>&nbsp;</span></h3>
   <div class="buttons">    
    <div class="btn" title="Verbinden" data-printer="1" data-cmd="connect"><i class="fas fa-plug"></i></div>
    <div class="btn disabled" title="Opwarmen" data-printer="1" data-cmd="warm"><i class="fas fa-thermometer-three-quarters"></i></div>
    <div class="btn disabled" title="Uitwerpen" data-printer="1" data-cmd="unload"><i class="fas fa-level-up-alt"></i></div>
    <div class="btn disabled" title="Laden" data-printer="1" data-cmd="load"><i class="fas fa-level-down-alt"></i></div>  
    <div class="btn disabled" title="Omhoog" data-printer="1" data-cmd="up"><i class="fas fa-arrow-up"></i></div>
    <div class="btn disabled" title="Afkoelen" data-printer="1" data-cmd="cool"><i class="fas fa-thermometer-quarter"></i></div>
   </div>
   <div class="status">...</div>
  </div> 
  
  <div class="printer2">
   <h2>Printer 2</h2>
   <code id="fname2">&nbsp; </code>  
   <h3 id="tijd2">&nbsp;</h3>   
   <h3><span id="procent2">&nbsp;</span><br /><span id=t2>&nbsp;</span></h3>
   <div class="buttons">
    <div title="Verbinden" class="btn" data-printer="2" data-cmd="connect"><i class="fas fa-plug"></i></div>
    <div title="Opwarmen" class="btn disabled" data-printer="2" data-cmd="warm"><i class="fas fa-thermometer-three-quarters"></i></div>
    <div title="Uitwerpen" class="btn disabled" data-printer="2" data-cmd="unload"><i class="fas fa-level-up-alt"></i></div>
    <div style="visibility:hidden" class="btn disabled"><i class="fas fa-level-down-alt"></i></div>  
    <div title="Omhoog" class="btn disabled" data-printer="2" data-cmd="up"><i class="fas fa-arrow-up"></i></div>
    <div title="Afkoelen" class="btn disabled" data-printer="2" data-cmd="cool"><i class="fas fa-thermometer-quarter"></i></div>
   </div>
   <div class="status">...</div>
  </div> 
   
 </div>
</body>
</html>
