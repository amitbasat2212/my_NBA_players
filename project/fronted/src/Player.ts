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