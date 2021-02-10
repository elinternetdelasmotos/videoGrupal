
function quita_indicador_tiempo(url){
  var resultado = url;
  var inicio = url.length;
  var final = url.length;
  var antigua_marca_temporal="";
  while (resultado.indexOf("t=")>=0)
  {
    inicio = resultado.indexOf("t=");
    if (resultado.indexOf("&",inicio)>=0)
    {
      final =resultado.indexOf("&",inicio);
    }
  antigua_marca_temporal = "&"+resultado.substr(inicio, final-inicio);
  resultado = resultado.replace(antigua_marca_temporal,'');
  }

  return resultado;
}



function pausa_video (){
  document.querySelector("video").pause();
};
function reproduce_video (){
  document.querySelector("video").play();
};
function recarga_video (){
  recarga_video_desde("1");
};

function recarga_video_desde(segundos){
  var url = window.location.href;
  url=quita_indicador_tiempo(url);
  document.querySelector("video").currentTime = segundos;
  pausa_video();
}

function marca_ventana_activa(){
  document.getElementById("container").style.setProperty("background-color", "green", "important");
}
function desmarca_ventana_activa(){
  document.getElementById("container").style.setProperty("background-color", "white", "important");
}



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var mensajedeentrada =request.greeting;
    if (request.greeting.indexOf("recarga_video_")>=0 )
    {
      try {
        recarga_video_desde(request.greeting.substr(request.greeting.indexOf("recarga_video_")+14));
      } catch (e) {
  //      console.log("algun error al inetentar encontrar la marca de tiempo para mandar el mensaje de recargar");
      }
    }
    else {
    switch (request.greeting) {
      case "p" :
      case "pausa_video":
        try {
          pausa_video();
          sendResponse({farewell: "hecho youtube"});
        }
        catch{
          sendResponse({farewell: "mal pausar youtube"});
        }
        break;
      case "r" :
      case "reproduce_video":
        try {
          reproduce_video();
          sendResponse({farewell: "reproduciendo youtube"});
        }
        catch{
          sendResponse({farewell: "mal reproducir youtube"});
        }
        break;
      case "l":
      case "recarga_video":
        try {
          recarga_video();
          sendResponse({farewell: "recargando youtube"});
        }
        catch{
          sendResponse({farewell: "mal recargar youtube"});
        }
        break;
      case "marca_ventana_activa":
        try {
          marca_ventana_activa();
          pausa_video();
          sendResponse({farewell: "marcando youtube"});
        }
        catch{
          sendResponse({farewell: "mal marcando youtube"});
        }
        break;
        case "desmarca_ventana_activa":
          try {
            desmarca_ventana_activa();
            sendResponse({farewell: "desmarcando youtube"});
          }
          catch{
            sendResponse({farewell: "mal desmarcando youtube"});
          }
          break;
      break;
      default:
        sendResponse({farewell: "no pediste nada de youtube"});

    }
  }
});

document.addEventListener("DOMContentLoaded", function(event) {
  pausa_video();
});
