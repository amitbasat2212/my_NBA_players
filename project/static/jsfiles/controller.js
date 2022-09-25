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
function filter_active_player(year, teamMate) {
    return __awaiter(this, void 0, void 0, function* () {
        const players = yield ModelSinglton.FilterActivePlayers(year, teamMate);
        RenderSinglton.RenderThePlayers(players);
    });
}
function getPlayerByTeamAndYear(callback) {
    const teamName = document.querySelector('#team-name');
    const year = document.querySelector('#year-player');
    callback(year.value, teamName.value);
}
$('#get-team').on('click', () => {
    getPlayerByTeamAndYear(getPlayers);
});
$('#ActivePlayer').on('click', () => {
    const checkbox = document.getElementById('ActivePlayer');
    if (checkbox === null || checkbox === void 0 ? void 0 : checkbox.checked) {
        getPlayerByTeamAndYear(filter_active_player);
    }
    else {
        getPlayerByTeamAndYear(getPlayers);
    }
});
function add_player(player) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPlayer = yield ModelSinglton.AddPlayerTeam(player);
        return newPlayer;
    });
}
$('body').on('click', '#AddPlayer', function () {
    const firstName = $(this).closest(".card-body").find(".card-firstName").text();
    const lastName = $(this).closest(".card-body").find(".card-lastName").text();
    const jersyNumber = $(this).closest(".card-body").find(".card-jersy").text();
    const position = $(this).closest(".card-body").find(".card-position").text();
    const HasBirthDate = $(this).closest(".card-body").find(".card-active").text();
    let player = new Player(firstName, lastName, jersyNumber, position, HasBirthDate);
    return add_player(player);
});
