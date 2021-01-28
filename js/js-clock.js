const body = document.querySelector("body");
const clockContainer = document.createElement("span");

clockContainer.classList.add("time");
body.appendChild(clockContainer);

const clock = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  clockContainer.innerHTML = `${hour < 10 ? `0${hour}` : hour}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
};

setInterval(clock, 1000);
