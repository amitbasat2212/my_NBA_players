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
                const getPlayers = yield $.get(`/allThePlayersInSpesificYearAndTeam/?year=${year}&teamname=${teamMate.toLowerCase()}`);
                let Players = [];
                Players = yield createPlayers(getPlayers);
                return (Players);
            }
            catch (err) {
                return { err: err };
            }
        });
    }
}
function getImage(firstName, lastName) {
    $.ajax({
        method: "GET",
        url: `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`,
        success: function (result) {
            return result;
        }
    });
}
function createPlayers(getPlayers) {
    return __awaiter(this, void 0, void 0, function* () {
        const Players = [];
        for (let i = 0; i < getPlayers.length; i++) {
            getPlayers[i].forEach((element) => {
                let lastName = element.lastName.toLowerCase();
                let firstName = element.firstName.toLowerCase();
                let image = getImage(firstName, lastName);
                Players.push(new Player(element.firstName, element.lastName, element.jersey, element.pos, image));
            });
        }
        yield delay(3000);
        return Players;
    });
}
class Player {
    constructor(FirstName, LastName, jerseyNumber, position, Image) {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.jerseyNumber = jerseyNumber;
        this.position = position;
        this.Image = Image;
    }
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
