// ==UserScript==
// @name         Crossfi Autoclicker
// @version      1.1
// @author       mudachyo
// @match        *://bot.crossfi.org/*
// @icon         https://s2.coinmarketcap.com/static/img/coins/64x64/26202.png
// @grant        none
// @downloadURL  https://github.com/mudachyo/Crossfi/raw/main/crossfi-autoclicker.user.js
// @updateURL    https://github.com/mudachyo/Crossfi/raw/main/crossfi-autoclicker.user.js
// @homepage     https://github.com/mudachyo/Crossfi
// ==/UserScript==

// === НАСТРОЙКИ СКРИПТА ===
const selector = '.tapCoinImage'; // Селектор для элемента
const minClickInterval = 40; // Минимальный интервал между кликами (в миллисекундах)
const maxClickInterval = 130; // Максимальный интервал между кликами (в миллисекундах)
const pointerType = 'touch'; // Тип указателя: 'touch' или 'mouse'
const touchRadiusX = 10; // Радиус случайных координат по оси X
const touchRadiusY = 10; // Радиус случайных координат по оси Y
const touchForce = 1; // Сила касания (от 0 до 1)

const styles = {
    success: 'background: #28a745; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    starting: 'background: #8640ff; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    error: 'background: #dc3545; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    info: 'background: #007bff; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
};

const logPrefix = '%c[CrossfiBot] ';
const originalLog = console.log;
console.log = function () {
    if (typeof arguments[0] === 'string' && arguments[0].includes('[CrossfiBot]')) {
        originalLog.apply(console, arguments);
    }
};

console.error = console.warn = console.info = console.debug = () => {};

console.clear();
console.log(`${logPrefix}Starting`, styles.starting);
console.log(`${logPrefix}Created by https://t.me/mudachyo`, styles.starting);
console.log(`${logPrefix}Github https://github.com/mudachyo/Crossfi`, styles.starting);

function getRandomCoordinate(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function autoClicker() {
    const element = document.querySelector(selector);
    if (element && element.offsetParent !== null) {
        const rect = element.getBoundingClientRect();
        const randomX = getRandomCoordinate(rect.left, rect.right);
        const randomY = getRandomCoordinate(rect.top, rect.bottom);

        const pointerDownEvent = new PointerEvent('pointerdown', {
            bubbles: true,
            cancelable: true,
            clientX: randomX,
            clientY: randomY,
            pointerType: pointerType
        });

        const pointerUpEvent = new PointerEvent('pointerup', {
            bubbles: true,
            cancelable: true,
            clientX: randomX,
            clientY: randomY,
            pointerType: pointerType
        });

        element.dispatchEvent(pointerDownEvent);
        element.dispatchEvent(pointerUpEvent);

        console.log(`Элемент кликнут в точке (${randomX}, ${randomY})`, styles.success);
    } else {
        console.log('Элемент не найден или не доступен для клика.', styles.error);
    }
}

setTimeout(function() {
    console.log(`${logPrefix}Autoclicker started`, styles.info);
    setInterval(autoClicker, getRandomInterval(minClickInterval, maxClickInterval));
}, 5000);
