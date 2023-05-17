const wsUrl = "wss://echo-ws-service.herokuapp.com";

function pageLoaded(){

  const infoOutput = document.querySelector('.info_output');
  const chatOutput = document.querySelector('.chat_output');
  const input = document.querySelector("input");
  const sendBtn = document.querySelector('.btn_send');
  const btn = document.querySelector('.j-btn-test');
  
  


  //создаем объект сокет 
  let socket = new WebSocket(wsUrl);

  //события сокета
  socket.onopen = () => {
    infoOutput.innerText = " ";
  }
  //если приходит сообщение
  // если оно полученное (isRecieved), то пишем true  в третий параметр
  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  }

  //если что-то пошло не так
  socket.onerror = () => {
    infoOutput.innerText = " ";
  }


  sendBtn.addEventListener('click', sendMessage);

  //функция, чтобы отправить сообщение
  function sendMessage(){
    if (input.value === "") return;
 
    socket.send(`${input.value}`);
    writeToChat(input.value, false);
    input.value = "";
    console.log(input.value);
  }

  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div}`
   
    chatOutput.innerHTML += messageHTML;
  }

  // Функция, срабатывающая при успешном получении геолокации
  const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  let mapLink = `
  <a href='https://www.openstreetmap.org/#map=18/${latitude}/${longitude}'>Гео-локация</a>
  `;
  writeToChat(mapLink,false)
}
// если ошибка
const error = () => {
  infoOutput.textContent = 'Невозможно получить ваше местоположение';
}

btn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    infoOutput.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    infoOutput.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});


}

document.addEventListener('DOMContentLoaded' , pageLoaded);