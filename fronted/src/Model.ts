class Model{
    async getPlayers(year:String,teamMate:String):Promise<Player[] | Object>{     
        try{
            const getPlayers = await $.get(`http://localhost:8001/allThePlayersInSpesificYearAndTeam/?year=${year}&teamname=${teamMate}`)
            const Players:Player[]=[];
            getPlayers.forEach(async (element:any) => {
                let image = await $.get(`https://nba-players.herokuapp.com/players/${element.firstName.lower()}/${element.lastName.lower()}`)
                Players.push(new Player(element.firstName,element.lastName,element.jersey,element.pos,image))
            });
            
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



