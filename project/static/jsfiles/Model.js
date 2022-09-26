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
class Model {
    getPlayers(year, teamMate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getPlayers = yield $.get(`/players/?year=${year}&teamname=${teamMate.toLowerCase()}`);
                let Players = [];
                const players = JSON.parse(getPlayers);
                Players = yield this.createPlayers(players);
                return (Players);
            }
            catch (err) {
                return { err: err };
            }
        });
    }
    FilterHasBirthDatePlayers(year, teamMate) {
        return __awaiter(this, void 0, void 0, function* () {
            const playersFilter = yield this.getPlayers(year, teamMate);
            let playersHasBirth = [];
            if (Array.isArray(playersFilter)) {
                playersHasBirth = playersFilter.filter(player => player.HasBirthDate !== "");
            }
            return playersHasBirth;
        });
    }
    createPlayers(getPlayers) {
        return __awaiter(this, void 0, void 0, function* () {
            const Players = [];
            for (let i = 0; i < getPlayers.length; i++) {
                getPlayers[i].forEach((element) => {
                    Players.push(new Player(element.firstName + element.lastName, element.firstName, element.lastName, element.jersey, element.pos, element.dateOfBirthUTC));
                });
            }
            return Players;
        });
    }
    ajaxRequests(urlRequest, type, player) {
        return __awaiter(this, void 0, void 0, function* () {
            const new_player = yield $.post({
                url: urlRequest,
                type: type,
                async: false,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({
                    player
                })
            });
            return new_player;
        });
    }
    AddPlayerTeam(player) {
        return __awaiter(this, void 0, void 0, function* () {
            let new_player;
            try {
                new_player = this.ajaxRequests("/player/", "post", player);
                return new_player;
            }
            catch (err) {
                return { err: err };
            }
        });
    }
}
class Player {
    constructor(id, FirstName, LastName, jerseyNumber, position, HasBirthDate) {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.jerseyNumber = jerseyNumber;
        this.position = position;
        this.HasBirthDate = HasBirthDate;
        this.id = id;
    }
}
