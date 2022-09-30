"use strict";
class Render {
    RenderEmpty() {
        $('#row_container').empty();
    }
    RenderThePlayers(players) {
        this.RenderEmpty();
        const source = $('#player_tamplate').html();
        const template = Handlebars.compile(source);
        const newHTML = template({ results: players });
        $('#row_container').append(newHTML);
    }
    RenderThePlayerStatus(PlayerStatus) {
        const source = $('#playerstatus_tamplate').html();
        const template = Handlebars.compile(source);
        const newHTML = template({ status: PlayerStatus });
        $('#row_status_container').append(newHTML);
    }
}
