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
        console.log(players);
        $('#row_container').append(newHTML);
    }
}
