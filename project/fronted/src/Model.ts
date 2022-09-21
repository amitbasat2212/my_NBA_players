class Model{
    async getPlayers(year:String,teamMate:String):Promise<Player[] | Object>{     
        try{
            const getPlayers = await $.get(`/allThePlayersInSpesificYearAndTeam/?year=${year}&teamname=${teamMate.toLowerCase( )}`)
            const Players:Player[]=[];
            for(let i=0;i<getPlayers.length;i++){
                getPlayers[i].forEach(async (element:any) => {
                   // let image = await $.get(`https://nba-players.herokuapp.com/players/${element.firstName.toLowerCase()}/${element.lastName.toLowerCase()}`)
                    Players.push(new Player(element.firstName,element.lastName,element.jersey,element.pos,"image"))
                });
                console.log(Players)
            }
               
            
            return (Players)       
        } catch(err){
            return {err:err}
        }  
        

    }
}


class Player{    
    FirstName:String
    LastName:String
    jerseyNumber:String
    position:String
    imagePlayer:String
    constructor(FirstName:String,LastName:String,jerseyNumber:String,position:String,imagePlayer:String){
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.jerseyNumber=jerseyNumber;
        this.position=position;
        this.imagePlayer = imagePlayer
    }


}



