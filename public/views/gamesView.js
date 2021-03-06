"use strict";

import { getData } from '/getData.js';

const main = document.querySelector('main');
const logoWrapper = document.querySelector('.logo');
const logo = logoWrapper.querySelector('div');

const makeGamesView = async () => {
  
  logoWrapper.id = 'Real Madrid';
  logo.style['background-image'] = 'url("../images/Real_Madrid_logo.png")';

  let block = '';

  const games = await getData('/games');
  const realMadrid = await getData('/RealMadrid');
    for (const game of games) {
      const owner = (game['opponent'] != game['location']) ? realMadrid : game;
      const guest = (owner === realMadrid) ? game : realMadrid;  
      let ownerGoals = 0;
      let guestGoals = 0;
      if (owner == realMadrid) {
        ownerGoals = await getData(`goals?matchid=${game['matchid']}&clubid=8`);
        guestGoals = await getData(`goals?matchid=${game['matchid']}&clubid=${game['opponent']}`);
      } else {
        ownerGoals = await getData(`goals?matchid=${game['matchid']}&clubid=${game['opponent']}`);
        guestGoals = await getData(`goals?matchid=${game['matchid']}&clubid=8`);
      }
      block += `
        <div class="gameDate">${game['date'].slice(0, 10)}</div>
        <div class="gameRow">
          <img src="images/${owner['emblem']}" class="emblem owner"></img>
          <div class="name owner">${owner['name']}</div>
          <div class="score">${ownerGoals['count']} : ${guestGoals['count']}</div>
          <div class="name guest">${guest['name']}</div>
          <img src="images/${guest['emblem']}" class="emblem guest"></img>
        </div>
      `
    }
  
  main.innerHTML = block;

};

export { makeGamesView };