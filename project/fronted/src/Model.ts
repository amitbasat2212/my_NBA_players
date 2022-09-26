class Model{
    async getPlayers(year:String,teamMate:String):Promise<Player[] | Object>{     
        try{
            const getPlayers = await $.get(`/players/?year=${year}&teamname=${teamMate.toLowerCase( )}`)
            let Players:Player[]=[];
            const players = JSON.parse(getPlayers)
            Players = await this.createPlayers(players);            
            return (Players)       
        } catch(err){
            return {err:err}
        }  
        

    }
    async FilterHasBirthDatePlayers(year:String,teamMate:String):Promise<Player[] | Object>{     
        const playersFilter:Player[] | Object=await this.getPlayers(year,teamMate);
        let playersHasBirth:Player[]=[]
        if(Array.isArray(playersFilter)){
            playersHasBirth = playersFilter.filter(player => player.HasBirthDate!=="")    
        }
          
        return playersHasBirth;

         

    }

    
    async createPlayers(getPlayers:any):Promise<Player[]>{
        const Players:Player[]=[];   
           for(let i=0;i<getPlayers.length;i++){
            getPlayers[i].forEach((element:any) => {                 
                Players.push(new Player(element.firstName+element.lastName,element.firstName,element.lastName,element.jersey,element.pos,element.dateOfBirthUTC))
            });
        }       
       
        return Players; 
    }

    
    async AddPlayerTeam(player:Player):Promise<Player | Object> {                                 
        let newPlayer:Player | Object;      
        try{
            newPlayer= await $.post({
                url: "/player/",
                type: "post",
                async: false,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({
                    player
                })              
    
            })       
            return newPlayer;          
        } catch(err){
            return {err:err}
        }  
        
    }

    async DeletePlayer(player:Player):Promise<Player | Object> {                                 
        let newPlayer:Promise<Player | Object>;      
        try{           
                newPlayer= await $.ajax({
                    url: `/player/${player["id"]}`,
                    type: "DELETE",
                    async: false,
                    dataType: "json",
                    contentType: "application/json",                            
        
                })       
                return newPlayer;             
        } catch(err){
            return {err:err}
        }  
        
    }
    

}






class Player{
    id:String 
    FirstName:String
    LastName:String
    jerseyNumber:String
    position:String
    HasBirthDate:String
    
    constructor(id:String,FirstName:String,LastName:String,jerseyNumber:String,position:String,HasBirthDate:String){
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.jerseyNumber=jerseyNumber;
        this.position=position;
        this.HasBirthDate=HasBirthDate;
        this.id=id;
    }


}





