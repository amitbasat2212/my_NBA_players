"use strict";
class Render {
    RenderThePlayers(players) {
        const source = $('#player_tamplate').html();
        const template = Handlebars.compile(source);
        const newHTML = template({ results: players });
        console.log(players);
        $('#row_container').append(newHTML);
    }
}
