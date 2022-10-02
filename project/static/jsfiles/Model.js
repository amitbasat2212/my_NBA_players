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
                const DreamTeam = yield this.getDreamTeam();
                let inDreamTeam;
                Players.forEach((element) => {
                    if (Array.isArray(DreamTeam)) {
                        inDreamTeam = DreamTeam.filter(el => el.id.trim() === element.id.trim());
                    }
                    if (inDreamTeam.length > 0) {
                        element.DreamTeam = true;
                    }
                });
                return (Players);
            }
            catch (err) {
                return { err: err };
            }
        });
    }
    getDreamTeam() {
        return __awaiter(this, void 0, void 0, function* () {
            let dreamTeam;
            try {
                dreamTeam = yield $.get(`/playersDream/`);
                const players_json = JSON.parse(dreamTeam);
                const players = this.createPlayerDreamTeam(players_json);
                return players;
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
                    let FirstName = element.firstName;
                    let LastName = element.lastName;
                    Players.push(new Player(element.firstName + element.lastName, element.firstName, element.lastName, element.jersey, element.pos, element.dateOfBirthUTC, false, `https://nba-players.herokuapp.com/players/${LastName}/${FirstName}`));
                });
            }
            return Players;
        });
    }
    createPlayerDreamTeam(players) {
        return __awaiter(this, void 0, void 0, function* () {
            const Players = [];
            players.forEach((element) => {
                let FirstName = element.FirstName.trim();
                let LastName = element.LastName.trim();
                Players.push(new Player(element.id, element.FirstName, element.LastName, element.jerseyNumber, element.position, element.HasBirthDate, true, `https://nba-players.herokuapp.com/players/${LastName}/${FirstName}`));
            });
            return Players;
        });
    }
    AddPlayerTeam(player) {
        return __awaiter(this, void 0, void 0, function* () {
            let newPlayerResponse;
            try {
                newPlayerResponse = yield $.post({
                    url: "/player/",
                    type: "post",
                    async: false,
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify({
                        player
                    })
                });
                const players_json = JSON.parse(newPlayerResponse);
                const newPlayer = this.createPlayerDreamTeam([players_json]);
                console.log(newPlayer);
                return newPlayer;
            }
            catch (err) {
                return { err: err };
            }
        });
    }
    DeletePlayer(player) {
        return __awaiter(this, void 0, void 0, function* () {
            let newPlayer;
            try {
                newPlayer = yield $.ajax({
                    url: `/player/${player["id"]}`,
                    type: "DELETE",
                    async: false,
                    dataType: "json",
                    contentType: "application/json",
                });
                return newPlayer;
            }
            catch (err) {
                return { err: err };
            }
        });
    }
    GetPlayerStatus(player) {
        return __awaiter(this, void 0, void 0, function* () {
            let PlayerStatusJson;
            let playerStatus;
            try {
                const lasName = String(player.FirstName.trim());
                const firstName = String(player.LastName.trim());
                PlayerStatusJson = yield $.get(`https://nba-players.herokuapp.com/players-stats/${firstName}/${lasName}`);
                playerStatus = new PlayerStatus(PlayerStatusJson["team_name"], PlayerStatusJson["steals_per_game"], PlayerStatusJson["three_point_percentage"], PlayerStatusJson["games_played"], PlayerStatusJson["player_efficiency_rating"]);
                return playerStatus;
            }
            catch (err) {
                return { err: err };
            }
        });
    }
}
class Player {
    constructor(id, FirstName, LastName, jerseyNumber, position, HasBirthDate, DreamTeam, Image) {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.jerseyNumber = jerseyNumber;
        this.position = position;
        this.HasBirthDate = HasBirthDate;
        this.id = id;
        this.DreamTeam = DreamTeam;
        this.Image = Image;
    }
}
class PlayerStatus {
    constructor(TeamName, StealsPerGame, threePointPercentege, GamePlayed, PlayerEfficiencyRating) {
        this.TeamName = TeamName;
        this.StealsPerGame = StealsPerGame;
        this.threePointPercentege = threePointPercentege;
        this.GamePlayed = GamePlayed;
        this.PlayerEfficiencyRating = PlayerEfficiencyRating;
    }
}
