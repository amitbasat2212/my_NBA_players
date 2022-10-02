"use strict";
class Render {
    RenderEmptyPlayers() {
        $('#row_container').empty();
    }
    RenderEmptyStatusPlayer() {
        $('#row_status_container').empty();
    }
    RenderThePlayers(players) {
        this.RenderEmptyPlayers();
        this.RenderEmptyStatusPlayer();
        const source = $('#player_tamplate').html();
        const template = Handlebars.compile(source);
        const newHTML = template({ results: players });
        $('#row_container').append(newHTML);
    }
    RenderThePlayerStatus(PlayerStatus) {
        this.RenderEmptyStatusPlayer();
        const source = $('#playerstatus_tamplate').html();
        const template = Handlebars.compile(source);
        const newHTML = template({ status: PlayerStatus });
        $('#row_status_container').append(newHTML);
    }
}
