document.addEventListener('DOMContentLoaded', () => {

  const cardContainer = document.getElementById('contenedor_cards');
  const dailyButton = document.getElementById('dailyBtn');
  const weeklyButton = document.getElementById('weeklyBtn');
  const monthlyButton = document.getElementById('monthlyBtn');
  let currentPeriod = 'weekly';
  let jsonData = [];

  // Función para crear las tarjetas
  const createCards = (data) => {
    cardContainer.innerHTML = '';

    for (let i = 0; i < data.length; i++) {

      const card = document.createElement('div');
      card.classList.add('cards');

      const cardA = document.createElement('div');
      const cardB = document.createElement('div');
      const cont = document.createElement('span');

      const logo = document.createElement('img');
      logo.src =`./images/icon-${data[i].title}.svg`;

      const title = document.createElement('p');
      title.textContent = data[i].title;

      const img = document.createElement('img');
      img.src = './images/icon-ellipsis.svg'

      const currentPeriodData = document.createElement('h1');
      currentPeriodData.textContent = `${data[i].timeframes[currentPeriod].current}hrs`;

      const previousPeriodData = document.createElement('p');
      previousPeriodData.textContent = `Last Week - ${data[i].timeframes[currentPeriod].previous}hrs`;
      
      card.appendChild(cardA);
      card.appendChild(cardB);

      cardA.appendChild(logo);
      
      cardB.appendChild(cont);
      cont.appendChild(title);
      cont.appendChild(img);
      cardB.appendChild(currentPeriodData);
      cardB.appendChild(previousPeriodData);
      cardContainer.appendChild(card);
    }
  };

  // Función para cambiar el período de tiempo
  const changePeriod = (period, button) => {
    currentPeriod = period;
    createCards(jsonData);

    //Remover la clase 'active' de todos los botones
    dailyButton.classList.remove('active');
    weeklyButton.classList.remove('active');
    monthlyButton.classList.remove('active');

    // Agregar la clase 'active' al botón seleccionado
    button.classList.add('active');
  };


  // Obtener el archivo JSON mediante fetch
  fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      jsonData = data;
      // Llamada inicial para mostrar las tarjetas con los datos iniciales
      createCards(jsonData);

      //botones para cambiar el período de tiempo
      dailyButton.addEventListener('click', () => changePeriod('daily', dailyButton));
      weeklyButton.addEventListener('click', () => changePeriod('weekly', weeklyButton));
      monthlyButton.addEventListener('click', () => changePeriod('monthly', monthlyButton));
    })
    .catch(error => {
      console.log('Error al obtener el archivo JSON:', error);
    });
});

  
  
  
  
  