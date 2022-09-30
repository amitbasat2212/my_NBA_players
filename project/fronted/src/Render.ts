
class Render{  
    
    RenderEmpty(){
        $('#row_container').empty();
    }

    RenderThePlayers(players:Player[] | Object){
        this.RenderEmpty();
        const source = $('#player_tamplate').html();
        const template = Handlebars.compile(source)
        const newHTML = template({results:players})        
        $('#row_container').append(newHTML)
    }

    RenderThePlayerStatus(PlayerStatus:PlayerStatus |Object){
        const source = $('#playerstatus_tamplate').html();
        const template = Handlebars.compile(source)
        const newHTML = template({status:PlayerStatus})        
        $('#row_status_container').append(newHTML)
    }
    

    
}

