const esquema_url_de_twich= '*://*.twitch.tv/*';
const  esquema_url_de_youtube= '*://*.youtube.com/watch*';


//mensajes
const no_twich_abierto = "no tienes ninguna pestaña de twich abierta , debes abrirla como pestaña en esta misma ventana del navegador";
const no_tienes_youtube = "debes tener una pestaña con el youtube abierto y un el video en pausa, esta extension intenta intervenir lo menos posible , no por vago sino por respeto";


function comprueba_twich(){
  if (localStorage.getItem('twich_tab')){desmarca_pestanya_twich()};
  chrome.tabs.query({url: esquema_url_de_twich, currentWindow: true}, function(tabs) {
    if (tabs.length > 0 ){
          localStorage.setItem('twich_tab', tabs[0].id);
          activa_lector_chat_twich();
          pasa_verificador_twich_a_si();
     }else{
       muestra_mensaje_validacion(no_twich_abierto) ;
     }
  });
};


function comprueba_youtube(){
  if (localStorage.getItem('youtube_tab')){desmarca_pestanya_youtube()};
  chrome.tabs.query({url: esquema_url_de_youtube ,active: true, currentWindow: true}, function(tabs) {
    if (tabs.length > 0 ){
        localStorage.setItem('youtube_tab', tabs[0].id);
        marca_pestanya_youtube();
        pasa_verificador_youtube_a_si();
      }
      else{
        muestra_mensaje_validacion(no_tienes_youtube); ;
      }
    });
}


function marca_pestanya_youtube (){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "marca_ventana_activa"});
  });
}
function desmarca_pestanya_youtube(){
  if (localStorage.getItem('youtube_tab'))
  {
    chrome.tabs.sendMessage(parseInt(localStorage.getItem('youtube_tab')), {greeting: "desmarca_ventana_activa"});
    localStorage.removeItem('youtube_tab');
  }
}
function desmarca_pestanya_twich(){
  if (localStorage.getItem('twich_tab'))
  {
    chrome.tabs.sendMessage(parseInt(localStorage.getItem('twich_tab')), {greeting: "desmarca_ventana_activa"});
    localStorage.removeItem('twich_tab');
  }
}
function activa_lector_chat_twich()
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "activa_lector_chat_twich"});
      localStorage.setItem('twich_tab', tabs[0].id);
  });
}




//funciones de vista
function pasa_verificador_twich_a_si(){
      document.getElementById("verificaTwich").style.backgroundImage = "url('./images/twich_check_si48.png')";
};
function pasa_verificador_youtube_a_si(){
      document.getElementById("verificaYoutube").style.backgroundImage = "url('./images/youtube_check_si48.png')";
};
function pasa_verificador_twich_a_no(){
      document.getElementById("verificaTwich").style.backgroundImage = "url('./images/twich_check_no48.png')";
};
function pasa_verificador_youtube_a_no(){
      document.getElementById("verificaYoutube").style.backgroundImage = "url('./images/youtube_check_no48.png')";
};
function muestra_mensaje_validacion(mensaje){
      document.getElementById("validacion").innerHTML=mensaje;
};


document.getElementById("desconecta").onclick = function (){
  desmarca_pestanya_twich();
  pasa_verificador_twich_a_no();
  desmarca_pestanya_youtube();
  pasa_verificador_youtube_a_no();
};



chrome.tabs.query({url: esquema_url_de_youtube ,active: true, currentWindow: true}, function(tabs) {
  if (tabs.length>0)
  {
    comprueba_youtube();
  }
});

chrome.tabs.query({url: esquema_url_de_twich ,active: true, currentWindow: true}, function(tabs) {
  if(tabs.length>0)
  {comprueba_twich();}
});

if (localStorage.getItem('youtube_tab')){pasa_verificador_youtube_a_si()};
if (localStorage.getItem('twich_tab')){pasa_verificador_twich_a_si()};
