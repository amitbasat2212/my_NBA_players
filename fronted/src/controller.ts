const ModelSinglton =new Model();
const RenderSinglton = new Render();

async function getPlayers(year:String,teamMate:String) {
    const players=await ModelSinglton.getPlayers(year,teamMate);
    RenderSinglton.RenderThePlayers(players)
}


$('.get-team').on('click',()=>{
    const teamName = document.querySelector('.foo') as HTMLInputElement;
    const year = document.querySelector('.foo') as HTMLInputElement;    
    getPlayers(year,teamName);
})

