
const ModelSinglton =new Model();
const RenderSinglton = new Render();

async function getPlayers(year:String,teamMate:String) {
    try{        
        const players=await ModelSinglton.getPlayers(year,teamMate); 

        if(!Array.isArray(players)){
            RenderSinglton.RenderEmptyPlayers();
            $("#projectIDSelectError").html("there is an error in your team or year").addClass("error-msg"); 
        

        }else{       
            RenderSinglton.RenderThePlayers(players)
        }
    }catch(error){
        return error;
    }
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

async function addPlayer(player:Player):Promise<Player |Object>{
    const newPlayer= await ModelSinglton.AddPlayerTeam(player);
    return newPlayer;
}
async function deletePlayer(player:Player):Promise<Player |Object>{
    const deletePlayer= await ModelSinglton.DeletePlayer(player);
    return deletePlayer;
}
async function getDreamTeam(): Promise<Player |Object>{
    const dreamTeam= await ModelSinglton.getDreamTeam();
    return dreamTeam;
}
async function getPlayerStatus(player:Player):Promise<PlayerStatus |Object>{
    const playerStatus= await ModelSinglton.GetPlayerStatus(player);
    return playerStatus;
}


function findPlayerPush(thePlayer:any):Player{
    const firstName= $(thePlayer).closest(".card-body").find(".card-firstName").text()
    const lastName= $(thePlayer).closest(".card-body").find(".card-lastName").text()
    const jersyNumber= $(thePlayer).closest(".card-body").find(".card-jersy").text()
    const position= $(thePlayer).closest(".card-body").find(".card-position").text()   
    const HasBirthDate= $(thePlayer).closest(".card-body").find(".card-hasBirthDate").text()
    const DreamTeam= $(thePlayer).closest(".card-body").find(".card-DreamTeam").text()
    const Image= $(thePlayer).closest(".card").find("#ImagePlayer").prop('src')
    const dreamTeamIn = DreamTeam === 'true';
    const player:Player = new Player(firstName+lastName,firstName,lastName,jersyNumber,position,HasBirthDate,dreamTeamIn,Image);
    
    return player;   
}

$('body').on('click','#AddPlayer',function(){       
    const player:Player = findPlayerPush($(this));
    let playerNewPromise = addPlayer(player)  
    playerNewPromise.then((value)=>{        
        $(this).hide();
         
    })

})


$('body').on('click','#DeletePlayer',function(){
   const player:Player = findPlayerPush($(this));
   let playerNewPromise = deletePlayer(player)  
   playerNewPromise.then(()=>{ 
        let playerNewPromise = getDreamTeam()
        playerNewPromise.then((value)=>{             
            RenderSinglton.RenderThePlayers(value)     
            $('.btn-outline-danger').show();        
        })         
         
    })
})

$('#DreamTeamGet').on('click',function(){    
    let playerNewPromise = getDreamTeam()    
    playerNewPromise.then((value)=>{   
        RenderSinglton.RenderThePlayers(value)
        $('#DeletePlayer').show();     
        $(".hide-dream-team").hide();
        $('.show-in-dreamteam').show();     
    
    })
    
})

$('body').on('click','#StatusPlayer',function(){
    const player:Player = findPlayerPush($(this));   
    let playerStatusPromise= getPlayerStatus(player)  
    playerStatusPromise.then((value)=>{
        RenderSinglton.RenderThePlayerStatus(value);
         
    })

})

