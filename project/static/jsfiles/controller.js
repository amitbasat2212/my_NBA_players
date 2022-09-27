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
        try {
            const players = yield ModelSinglton.getPlayers(year, teamMate);
            if (!Array.isArray(players)) {
                RenderSinglton.RenderEmpty();
                $("#projectIDSelectError").html("there is an error in your team or year").addClass("error-msg");
            }
            else {
                RenderSinglton.RenderThePlayers(players);
            }
        }
        catch (error) {
            return error;
        }
    });
}
function filterHasBirthDatePlayers(year, teamMate) {
    return __awaiter(this, void 0, void 0, function* () {
        const players = yield ModelSinglton.FilterHasBirthDatePlayers(year, teamMate);
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
$('#HasBirthDate').on('click', () => {
    const checkbox = document.getElementById('HasBirthDate');
    if (checkbox === null || checkbox === void 0 ? void 0 : checkbox.checked) {
        getPlayerByTeamAndYear(filterHasBirthDatePlayers);
    }
    else {
        getPlayerByTeamAndYear(getPlayers);
    }
});
function addPlayer(player) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPlayer = yield ModelSinglton.AddPlayerTeam(player);
        return newPlayer;
    });
}
function deletePlayer(player) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletePlayer = yield ModelSinglton.DeletePlayer(player);
        return deletePlayer;
    });
}
function getDreamTeam() {
    return __awaiter(this, void 0, void 0, function* () {
        const dreamTeam = yield ModelSinglton.getDreamTeam();
        return dreamTeam;
    });
}
function findPlayerPush(thePlayer) {
    const firstName = $(thePlayer).closest(".card-body").find(".card-firstName").text();
    const lastName = $(thePlayer).closest(".card-body").find(".card-lastName").text();
    const jersyNumber = $(thePlayer).closest(".card-body").find(".card-jersy").text();
    const position = $(thePlayer).closest(".card-body").find(".card-position").text();
    const HasBirthDate = $(thePlayer).closest(".card-body").find(".card-hasBirthDate").text();
    const player = new Player(firstName + lastName, firstName, lastName, jersyNumber, position, HasBirthDate);
    return player;
}
$('body').on('click', '#AddPlayer', function () {
    const player = findPlayerPush($(this));
    const deleteButton = $(this).closest(".card-body").find("#DeletePlayer");
    let playerNewPromise = addPlayer(player);
    playerNewPromise.then((value) => {
        $(this).hide();
        deleteButton.show();
    });
});
$('body').on('click', '#DeletePlayer', function () {
    const player = findPlayerPush($(this));
    const addButton = $(this).closest(".card-body").find("#AddPlayer");
    let playerNewPromise = deletePlayer(player);
    playerNewPromise.then(() => {
        $(this).hide();
        addButton.show();
    });
});
$('#DreamTeam').on('click', function () {
    let playerNewPromise = getDreamTeam();
    playerNewPromise.then((value) => {
        RenderSinglton.RenderThePlayers(value);
        $(".hide-dream-team").hide();
        $('.show-in-dreamteam').show();
    });
});
