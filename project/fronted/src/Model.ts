class Model{
    async getPlayers(year:String,teamMate:String):Promise<Player[] | Object>{     
        try{
            const getPlayers = await $.get(`/allThePlayersInSpesificYearAndTeam/?year=${year}&teamname=${teamMate.toLowerCase( )}`)
            let Players:Player[]=[];
            Players = await createPlayers(getPlayers);            
            return (Players)       
        } catch(err){
            return {err:err}
        }  
        

    }
}


function getImage(firstName:String,lastName:String):any{
    $.ajax({
            method: "GET",
            url: `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`,
            success:function(result){
                return result;
            }
           
               
          })   
             
}



async function createPlayers(getPlayers:any):Promise<Player[]>{
    const Players:Player[]=[];   
       for(let i=0;i<getPlayers.length;i++){
        getPlayers[i].forEach((element:any) => {
            let lastName=element.lastName.toLowerCase()
            let firstName = element.firstName.toLowerCase()
            let image = getImage(firstName,lastName);
            Players.push(new Player(element.firstName,element.lastName,element.jersey,element.pos,image))
        });
    }       
   
    return Players; 
}

class Player{    
    FirstName:String
    LastName:String
    jerseyNumber:String
    position:String
    Image:String
    constructor(FirstName:String,LastName:String,jerseyNumber:String,position:String,Image:String){
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.jerseyNumber=jerseyNumber;
        this.position=position;
        this.Image = Image
    }


}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}



