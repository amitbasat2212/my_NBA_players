class Model{
    async getPlayers(year:String,teamMate:String):Promise<Player[] | Object | Error >{     
        try{
            const getPlayers = await $.get(`/players/?year=${year}&teamname=${teamMate.toLowerCase( )}`)
            let Players:Player[]=[];            
            const players = JSON.parse(getPlayers)
            Players = await this.createPlayers(players);
            const DreamTeam = await this.getDreamTeam();
            let inDreamTeam:any;
            Players.forEach((element:any)=>{
                if(Array.isArray(DreamTeam)){
                    inDreamTeam=DreamTeam.filter(el => el.id.trim() === element.id.trim())
                }
                if(inDreamTeam.length>0){
                    element.DreamTeam=true;     
                }
            })         
            return (Players)       
        } catch(err){
            return {err:err}
        }  
        

    }


    async getDreamTeam():Promise<Player [] | Object> {                                 
        let dreamTeam;        
        try{                  
                dreamTeam= await $.get(`/playersDream/`)
                const players_json:Player[] = JSON.parse(dreamTeam);     
                const players:Promise<Player[]> = this.createPlayerDreamTeam(players_json);               
                return players;             
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
                let FirstName = element.firstName;                 
                let LastName = element.lastName;                                               
                let image = `https://nba-players.herokuapp.com/players/${LastName}/${FirstName}`;
                Players.push(new Player(element.firstName+element.lastName,element.firstName,element.lastName,element.jersey,element.pos,element.dateOfBirthUTC,false,image))
            });
        }       
       
        return Players; 
    }


    async createPlayerDreamTeam(players:Player[]):Promise<Player[]>{
        const Players:Player[]=[];   
        players.forEach((element:any) => {
            let FirstName:String = element.FirstName.trim();                 
            let LastName:String = element.LastName.trim();                 
            let image:String=`https://nba-players.herokuapp.com/players/${LastName}/${FirstName}`
            Players.push(new Player(element.id,element.FirstName,element.LastName,element.jerseyNumber,element.position,element.HasBirthDate,true,image))
        });
        return Players;
    }

    
    async AddPlayerTeam(player:Player):Promise<Player | Object> {                                 
        let newPlayerResponse: string;   
        try{
            newPlayerResponse= await $.post({
                url: "/player/",
                type: "post",
                async: false,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({
                    player
                })              
    
            }) 
            const players_json = JSON.parse(newPlayerResponse);            
            const newPlayer =  this.createPlayerDreamTeam([players_json])            
              
            return newPlayer;          
        } catch(err){
            return {err:err}
        }  
        
    }


    async DeletePlayer(player:Player):Promise<Player | Object> {                                 
        let newPlayer:string;      
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


    async GetPlayerStatus(player:Player):Promise<PlayerStatus | Object> {                                 
        let PlayerStatusJson; 
        let playerStatus:PlayerStatus;     
        try{  
            const lasName:String = String(player.FirstName.trim());
            const firstName:String = String(player.LastName.trim());         
            PlayerStatusJson= await $.get(`https://nba-players.herokuapp.com/players-stats/${firstName}/${lasName}`)
            playerStatus = new PlayerStatus(PlayerStatusJson["team_name"],PlayerStatusJson["steals_per_game"],PlayerStatusJson["three_point_percentage"],PlayerStatusJson["games_played"],PlayerStatusJson["player_efficiency_rating"],PlayerStatusJson["name"])
            return playerStatus;             
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
    DreamTeam:boolean
    Image:String
    
    constructor(id:String,FirstName:String,LastName:String,jerseyNumber:String,position:String,HasBirthDate:String,DreamTeam:boolean,Image:String){
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.jerseyNumber=jerseyNumber;
        this.position=position;
        this.HasBirthDate=HasBirthDate;
        this.id=id;
        this.DreamTeam=DreamTeam;
        this.Image=Image;
    }


}


class PlayerStatus{
    TeamName:String
    StealsPerGame:String
    threePointPercentege:String
    GamePlayed:String
    PlayerEfficiencyRating:String
    namePlayer:String


    constructor(TeamName:String,StealsPerGame:String,threePointPercentege:String,GamePlayed:String,PlayerEfficiencyRating:String,namePlayer:String){
        this.TeamName = TeamName;
        this.StealsPerGame = StealsPerGame;
        this.threePointPercentege=threePointPercentege;
        this.GamePlayed=GamePlayed;
        this.PlayerEfficiencyRating=PlayerEfficiencyRating;
        this.namePlayer=namePlayer;
    }

}







