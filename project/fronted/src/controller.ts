const ModelSinglton =new Model();
const RenderSinglton = new Render();

async function getPlayers(year:String,teamMate:String) {
    const players=await ModelSinglton.getPlayers(year,teamMate);
    RenderSinglton.RenderThePlayers(players)
}


$('#get-team').on('click',()=>{
    const teamName = document.querySelector('#team-name') as HTMLInputElement;
    console.log(teamName)
    const year = document.querySelector('#year-player') as HTMLInputElement;    
    getPlayers(year.value,teamName.value);
})

