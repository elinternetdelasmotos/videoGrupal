
function preparatwitch (){
  var chat=document.getElementsByClassName("chat-scrollable-area__message-container");
  if (chat.length>0)
  {
    chat[0].style.border = "thick solid #00ff87";
    chat[0].addEventListener("DOMNodeInserted", function(cambio){
      var mensaje_de_chat="";
      var texto = "";
      var mensaje_a_enviar="";

      mensaje_de_chat=cambio.target;
      if(mensaje_de_chat.getElementsByClassName("chat-author__display-name").length>0){
        try {
            var emisor_tag = mensaje_de_chat.getElementsByTagName("img");
            var es_del_emisor =false;
            for (let imagen of emisor_tag) {
               if (imagen.getAttribute("alt")=="Emisor"){es_del_emisor=true;break;};
          };

         if(es_del_emisor)
          {
          texto =  mensaje_de_chat.getElementsByClassName("text-fragment")[0].innerHTML;
          mensaje_a_enviar = {"texto":texto};
          chrome.runtime.sendMessage({greeting: mensaje_a_enviar});
          }
        }
        catch (e) {
  //        console.log("algo fallo mandando el mensaje seguramente uno mal formado");
        }
      }
    });
  };


};

function desmarca_ventana_activa(){
  var chat=document.getElementsByClassName("chat-scrollable-area__message-container");
  if (chat.length>0)
  {
    chat[0].style.border = "none";
  }
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "activa_lector_chat_twitch")
    {
      preparatwitch();
      sendResponse({farewell: "hecho twitch"});
    };
    if (request.greeting == "desmarca_ventana_activa")
    {
      desmarca_ventana_activa();
    }
  }
);
