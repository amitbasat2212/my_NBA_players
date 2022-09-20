class Render{


    RenderThePlayers(players:Player[] | Object){
        const source = $('#player_tamplate').html();
        const template = Handlebars.compile(source)
        const newHTML = template({results:players})
        $('.row').append(newHTML)
    }
}