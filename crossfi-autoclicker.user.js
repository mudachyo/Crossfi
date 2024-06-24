// ==UserScript==
// @name         Crossfi Autoclicker
// @version      1.0
// @author       mudachyo
// @match        *://bot.crossfi.org/*
// @icon         https://s2.coinmarketcap.com/static/img/coins/64x64/26202.png
// @grant        none
// @downloadURL  https://github.com/mudachyo/Crossfi/raw/main/crossfi-autoclicker.user.js
// @updateURL    https://github.com/mudachyo/Crossfi/raw/main/crossfi-autoclicker.user.js
// @homepage     https://github.com/mudachyo/Crossfi
// ==/UserScript==

(function() {
    'use strict';

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

    let autoClickerInterval;
    const energySelector = '.MuiTypography-root.MuiTypography-body1.energyCount.css-ex96t';

    function getRandomInterval() {
        return Math.floor(Math.random() * (120 - 30 + 1)) + 30;
    }

    function getRandomCoordinate(radius) {
        let angle = Math.random() * 2 * Math.PI;
        let r = Math.sqrt(Math.random()) * radius;
        let x = r * Math.cos(angle);
        let y = r * Math.sin(angle);
        return { x, y };
    }

    function createPointerEvent(type, x, y) {
        return new PointerEvent(type, {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y,
            pointerId: 1,
            width: 1,
            height: 1,
            pressure: type === 'pointerdown' ? 0.5 : 0,
            isPrimary: true
        });
    }

    function createMouseEvent(type, x, y) {
        return new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y
        });
    }

    function clickCanvas() {
        try {
            const canvas = document.querySelector('.tapCoinCanvas');
            if (canvas) {
                const rect = canvas.getBoundingClientRect();
                const radius = rect.width / 2;
                const centerX = rect.left + radius;
                const centerY = rect.top + radius;

                const randomCoord = getRandomCoordinate(radius);
                const x = centerX + randomCoord.x;
                const y = centerY + randomCoord.y;

                canvas.dispatchEvent(createPointerEvent('pointerdown', x, y));
                canvas.dispatchEvent(createMouseEvent('mousedown', x, y));
                canvas.dispatchEvent(createPointerEvent('pointerup', x, y));
                canvas.dispatchEvent(createMouseEvent('mouseup', x, y));
                canvas.dispatchEvent(createPointerEvent('click', x, y));
            }
        } catch (error) {
            console.log(`${logPrefix}Error clicking the canvas: ${error}`, styles.error);
        }
    }

    function getEnergy() {
        const energyElement = document.querySelector(energySelector);
        return energyElement ? parseInt(energyElement.textContent, 10) : null;
    }

    function pauseAutoClicker() {
        clearInterval(autoClickerInterval);
        const pauseDuration = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
        console.log(`${logPrefix}Pausing for ${pauseDuration} seconds due to low energy`, styles.info);
        setTimeout(startAutoClicker, pauseDuration * 1000);
    }

    function startAutoClicker() {
        autoClickerInterval = setInterval(() => {
            const energy = getEnergy();
            if (energy !== null && energy < 25) {
                pauseAutoClicker();
            } else {
                clickCanvas();
            }
        }, getRandomInterval());
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            startAutoClicker();
        }, 5000);
    });
})();
