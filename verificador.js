const esquema_url_de_twitch= '*://*.twitch.tv/*';
const  esquema_url_de_youtube= '*://*.youtube.com/watch*';


//mensajes
const no_twitch_abierto = "no tienes ninguna pestaña de twitch abierta , debes abrirla como pestaña en esta misma ventana del navegador";
const no_tienes_youtube = "debes tener una pestaña con el youtube abierto y un el video en pausa, esta extension intenta intervenir lo menos posible , no por vago sino por respeto";


function comprueba_twitch(){
  if (localStorage.getItem('twitch_tab')){desmarca_pestanya_twitch()};
  chrome.tabs.query({url: esquema_url_de_twitch, currentWindow: true}, function(tabs) {
    if (tabs.length > 0 ){
          localStorage.setItem('twitch_tab', tabs[0].id);
          activa_lector_chat_twitch();
          pasa_verificador_twitch_a_si();
     }else{
       muestra_mensaje_validacion(no_twitch_abierto) ;
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
        muestra_mensaje_validacion(no_tienes_youtube);
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
function desmarca_pestanya_twitch(){
  if (localStorage.getItem('twitch_tab'))
  {
    chrome.tabs.sendMessage(parseInt(localStorage.getItem('twitch_tab')), {greeting: "desmarca_ventana_activa"});
    localStorage.removeItem('twitch_tab');
  }
}
function activa_lector_chat_twitch()
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "activa_lector_chat_twitch"});
      localStorage.setItem('twitch_tab', tabs[0].id);
  });
}




//funciones de vista
function pasa_verificador_twitch_a_si(){
      document.getElementById("verificatwitch").style.backgroundImage = "url('./images/twitch_check_si48.png')";
};
function pasa_verificador_youtube_a_si(){
      document.getElementById("verificaYoutube").style.backgroundImage = "url('./images/youtube_check_si48.png')";
};
function pasa_verificador_twitch_a_no(){
      document.getElementById("verificatwitch").style.backgroundImage = "url('./images/twitch_check_no48.png')";
};
function pasa_verificador_youtube_a_no(){
      document.getElementById("verificaYoutube").style.backgroundImage = "url('./images/youtube_check_no48.png')";
};
function muestra_mensaje_validacion(mensaje){
      document.getElementById("validacion").innerHTML=mensaje;
};


document.getElementById("desconecta").onclick = function (){
  desmarca_pestanya_twitch();
  pasa_verificador_twitch_a_no();
  desmarca_pestanya_youtube();
  pasa_verificador_youtube_a_no();
};

document.getElementById("verificaYoutube").onclick = function (){
  chrome.tabs.query({url: esquema_url_de_youtube ,active: true, currentWindow: true}, function(tabs) {
    if (tabs.length>0)
    {
      chrome.tabs.executeScript(tabs[0].id, { file : '/youtube_script.js'}, function (){return true;});
      comprueba_youtube();
    }
    else{
        muestra_mensaje_validacion(no_tienes_youtube);
    }
  });
};

document.getElementById("verificatwitch").onclick = function (){
  chrome.tabs.query({url: esquema_url_de_twitch ,active: true, currentWindow: true}, function(tabs) {
    if(tabs.length>0)
    {
      chrome.tabs.executeScript(tabs[0].id, { file : '/twitch_script.js'}, function (){return true;});
      comprueba_twitch();
    }
  });
};

if (localStorage.getItem('youtube_tab')){pasa_verificador_youtube_a_si()};
if (localStorage.getItem('twitch_tab')){pasa_verificador_twitch_a_si()};
