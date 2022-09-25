class Model{
    async getPlayers(year:String,teamMate:String):Promise<Player[] | Object>{     
        try{
            const getPlayers = await $.get(`/allThePlayersInSpesificYearAndTeam/?year=${year}&teamname=${teamMate.toLowerCase( )}`)
            let Players:Player[]=[];
            const players = JSON.parse(getPlayers)
            Players = await this.createPlayers(players);            
            return (Players)       
        } catch(err){
            return {err:err}
        }  
        

    }
    async FilterActivePlayers(year:String,teamMate:String):Promise<Player[] | Object>{     
        const playersFilter:Player[] | Object=await this.getPlayers(year,teamMate);
        let playersActive:Player[]=[]
        if(Array.isArray(playersFilter)){
            playersActive = playersFilter.filter(player => player.HasBirthDate!=="")    
        }
          
        return playersActive;

         

    }

    
    async createPlayers(getPlayers:any):Promise<Player[]>{
        const Players:Player[]=[];   
           for(let i=0;i<getPlayers.length;i++){
            getPlayers[i].forEach((element:any) => {                 
                Players.push(new Player(element.firstName,element.lastName,element.jersey,element.pos,element.dateOfBirthUTC))
            });
        }       
       
        return Players; 
    }

    async AddPlayerTeam(player:Player):Promise<Player|Object>{
        const player_data = player;
        try{
            const newPlayer = await $.post(`/AddPlayer/`,{data: player_data})
            let Players:Player[]=[];
            const player = JSON.parse(newPlayer)
                     
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
    HasBirthDate:String
    
    constructor(FirstName:String,LastName:String,jerseyNumber:String,position:String,HasBirthDate:String){
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.jerseyNumber=jerseyNumber;
        this.position=position;
        this.HasBirthDate=HasBirthDate;
    }


}





