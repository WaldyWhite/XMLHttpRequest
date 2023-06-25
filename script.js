/*
* Функция-обертка над XMLHttpRequest, осуществляеющая запрос
* url, по которому будет осуществляться запрос
* callback-функция, которая вызывается при успешном выполнении 
* и первым параметром получит объект-результат запроса
*/

function useRequest (url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log('Статус ответа: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if(callback) {
                callback(result);
            }
        }
    };

    xhr.operror = function () {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    }

    xhr.send();
};

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');

// Ищем кнопку, по нажатию на которую будет запрос
const btnNode = document.querySelector('.j-dtn-request');

/*
* Функция обработки получения запроса
* apiData - Объект с результатом запроса
*/

function displayResult (apiData) {
    let cards = '';

    apiData.forEach(item => {
    let cardBlock = `
    <div class'card'>
        <img class='card-image' src= '${item.download_url}'>
        <p class='author'>${item.author}</p>
    </div>
    `;
    cards = cards +cardBlock;
    });

    resultNode.innerHTML = cards;
};

// Вешаем обработчик на кнопку для запроса по клику
btnNode.addEventListener('click', function () {
    useRequest('https://picsum.photos/v2/list/?limit=5', displayResult)
})