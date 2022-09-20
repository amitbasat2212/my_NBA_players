"use strict";
class Render {
    RenderThePlayers(players) {
        const source = $('#player_tamplate').html();
        const template = Handlebars.compile(source);
        const newHTML = template({ results: players });
        $('.row').append(newHTML);
    }
}
