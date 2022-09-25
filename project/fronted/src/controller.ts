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
