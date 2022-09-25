"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ModelSinglton = new Model();
const RenderSinglton = new Render();
function getPlayers(year, teamMate) {
    return __awaiter(this, void 0, void 0, function* () {
        const players = yield ModelSinglton.getPlayers(year, teamMate);
        RenderSinglton.RenderThePlayers(players);
    });
}
function filter_active_player(active) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function getPlayerByTeamAndYear() {
    const teamName = document.querySelector('#team-name');
    const year = document.querySelector('#year-player');
    getPlayers(year.value, teamName.value);
}
$('#get-team').on('click', () => {
    getPlayerByTeamAndYear();
});
$('AcrivePlayer').on('click', () => {
    const checkbox = document.getElementById('AcrivePlayer');
    if (checkbox === null || checkbox === void 0 ? void 0 : checkbox.checked) {
        filter_active_player(true);
    }
    else {
        getPlayerByTeamAndYear();
    }
});
