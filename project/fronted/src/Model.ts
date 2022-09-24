class Model{
    async getPlayers(year:String,teamMate:String):Promise<Player[] | Object>{     
        try{
            const getPlayers = await $.get(`/allThePlayersInSpesificYearAndTeam/?year=${year}&teamname=${teamMate.toLowerCase( )}`)
            let Players:Player[]=[];
            Players = await create_player(getPlayers);            
            return (Players)       
        } catch(err){
            return {err:err}
        }  
        

    }
}


async function getImage(firstName:String,lastName:String):Promise<String>{
    let image = await $.get(`https://nba-players.herokuapp.com/players/${lastName}/${firstName}`)
    if(image == "Sorry, that player was not found. Please check the spelling."){
       image="image"
    }
    return image;
}



async function create_player(getPlayers:any):Promise<Player[]>{
    const Players:Player[]=[];   
    for(let i=0;i<getPlayers.length;i++){
        getPlayers[i].forEach(async(element:any) => {
            let lastName=element.lastName.toLowerCase()
            let firstName = element.firstName.toLowerCase()
            let image = await getImage(firstName,lastName);
            Players.push(new Player(element.firstName,element.lastName,element.jersey,element.pos,image))
        });
    }       
    await delay(3000);
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



