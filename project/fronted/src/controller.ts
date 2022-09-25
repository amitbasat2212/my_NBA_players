const ModelSinglton =new Model();
const RenderSinglton = new Render();

async function getPlayers(year:String,teamMate:String) {
    const players=await ModelSinglton.getPlayers(year,teamMate);
    RenderSinglton.RenderThePlayers(players)
}

async function filter_active_player(year:String,teamMate:String){
    const players=await ModelSinglton.FilterActivePlayers(year,teamMate);
    RenderSinglton.RenderThePlayers(players)
}

function getPlayerByTeamAndYear(callback:Function){
    const teamName = document.querySelector('#team-name') as HTMLInputElement;
    const year = document.querySelector('#year-player') as HTMLInputElement;    
    callback(year.value,teamName.value);
}

$('#get-team').on('click',()=>{
    getPlayerByTeamAndYear(getPlayers);
})

$('#ActivePlayer').on('click',()=>{
    const checkbox = document.getElementById(
        'ActivePlayer',
      ) as HTMLInputElement | null;

      if (checkbox?.checked) {
        getPlayerByTeamAndYear(filter_active_player);    
      }else{
        getPlayerByTeamAndYear(getPlayers);
      }  
      
})

async function add_player(player:Player){
    const newPlayer=await ModelSinglton.AddPlayerTeam(player);
    return newPlayer;
}

$('body').on('click','#AddPlayer',function(){
    const firstName= $(this).closest(".card-body").find(".card-firstName").text()
    const lastName= $(this).closest(".card-body").find(".card-lastName").text()
    const jersyNumber= $(this).closest(".card-body").find(".card-jersy").text()
    const position= $(this).closest(".card-body").find(".card-position").text()   
    const HasBirthDate= $(this).closest(".card-body").find(".card-active").text()    
    let player:Player = new Player(firstName,lastName,jersyNumber,position,HasBirthDate);
    return add_player(player)    

})
