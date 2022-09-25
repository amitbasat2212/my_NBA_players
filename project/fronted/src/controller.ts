const ModelSinglton =new Model();
const RenderSinglton = new Render();

async function getPlayers(year:String,teamMate:String) {
    const players=await ModelSinglton.getPlayers(year,teamMate);
    RenderSinglton.RenderThePlayers(players)
}

async function filter_active_player(active:boolean){
    
}

function getPlayerByTeamAndYear(){
    const teamName = document.querySelector('#team-name') as HTMLInputElement;
    const year = document.querySelector('#year-player') as HTMLInputElement;    
    getPlayers(year.value,teamName.value);
}

$('#get-team').on('click',()=>{
    getPlayerByTeamAndYear();
})

$('AcrivePlayer').on('click',()=>{
    const checkbox = document.getElementById(
        'AcrivePlayer',
      ) as HTMLInputElement | null;

      if (checkbox?.checked) {
        filter_active_player(true)    
      }else{
        getPlayerByTeamAndYear();
      }  
      
})
