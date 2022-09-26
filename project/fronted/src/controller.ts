const ModelSinglton =new Model();
const RenderSinglton = new Render();

async function getPlayers(year:String,teamMate:String) {
    const players=await ModelSinglton.getPlayers(year,teamMate);
    RenderSinglton.RenderThePlayers(players)
}

async function filterHasBirthDatePlayers(year:String,teamMate:String){
    const players=await ModelSinglton.FilterHasBirthDatePlayers(year,teamMate);
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

$('#HasBirthDate').on('click',()=>{
    const checkbox = document.getElementById(
        'HasBirthDate',
      ) as HTMLInputElement | null;

      if (checkbox?.checked) {
        getPlayerByTeamAndYear(filterHasBirthDatePlayers);    
      }else{
        getPlayerByTeamAndYear(getPlayers);
      }  
      
})

async function addPlayer(player:Player){
    const newPlayer= await ModelSinglton.AddPlayerTeam(player);
    return newPlayer;
}
async function deletePlayer(player:Player){
    const newPlayer= await ModelSinglton.DeletePlayer(player);
    return newPlayer;
}


function findPlayerPush(thePlayer:any):Player{
    const firstName= $(thePlayer).closest(".card-body").find(".card-firstName").text()
    const lastName= $(thePlayer).closest(".card-body").find(".card-lastName").text()
    const jersyNumber= $(thePlayer).closest(".card-body").find(".card-jersy").text()
    const position= $(thePlayer).closest(".card-body").find(".card-position").text()   
    const HasBirthDate= $(thePlayer).closest(".card-body").find(".card-hasBirthDate").text()
    const player:Player = new Player(firstName+lastName,firstName,lastName,jersyNumber,position,HasBirthDate);
    return player;   
}

$('body').on('click','#AddPlayer',function(){       
    const player:Player = findPlayerPush($(this));
    let playerNewPromise = addPlayer(player)  
    playerNewPromise.then((value)=>{
        console.log(value);
    })

})


$('body').on('click','#DeletePlayer',function(){
    const player:Player = findPlayerPush($(this));
    let playerNewPromise = deletePlayer(player)  
    playerNewPromise.then((value)=>{
        console.log(value);
    })
})

