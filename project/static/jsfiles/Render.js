"use strict";
class Render {
    RenderThePlayers(players) {
        $('#row_container').empty();
        const source = $('#player_tamplate').html();
        const template = Handlebars.compile(source);
        const newHTML = template({ results: players });
        console.log(players);
        $('#row_container').append(newHTML);
    }
}
