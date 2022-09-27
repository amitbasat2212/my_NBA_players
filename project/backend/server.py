import json
from fastapi import FastAPI,status
import uvicorn
from fastapi import Request,HTTPException
import requests
from tems_id import teams_id
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from DreamTeam import Dream_team
from pathlib import Path

app = FastAPI()
league = "league"
standard="standard"
africa="africa"
sacramento="sacramento"
vegas="vegas"
utah="utah"
teams="teams"
teamId="teamId"
HasBirthDate="HasBirthDate"

current_file = Path(__file__)
current_file_dir = current_file.parent
project_root = current_file_dir.parent
project_root_absolute = project_root.resolve()
static_root_absolute = project_root_absolute / "static"


app.mount("/static", StaticFiles(directory=static_root_absolute), name="static")


@app.get('/players/',status_code=status.HTTP_200_OK)
async def get_all_the_players(year,teamname):
    tems_id_by_name = teams_id.get(teamname);
    if(tems_id_by_name==None):
        raise HTTPException(status_code=404, detail="the team dosent excit")
    res_players = requests.get(f'http://data.nba.net/10s/prod/v1/{year}/players.json')
    if(res_players.status_code==200):
        all_the_player_in_year=res_players.json()[league] 
    else:
        raise HTTPException(status_code=404, detail="erorr in the api")
    plyers_by_year_and_teammate=[];
    
    for area in all_the_player_in_year:
        league_players = all_the_player_in_year[area]
        plyers_by_year_and_teammate.append(list(filter(lambda player:player[teamId]==tems_id_by_name ,league_players)))
    players_json = json.dumps(plyers_by_year_and_teammate)
    return players_json


def create_player_dream(player):    
    player = {
        "id":player["player"]["FirstName"]+player["player"]["LastName"],
        "FirstName":player["player"]["FirstName"],
        "LastName":player["player"]["LastName"],
        "jerseyNumber":player["player"]["jerseyNumber"],
        "position":player["player"]["position"],
        "HasBirthDate":player["player"]["HasBirthDate"]
    }
    return player;


@app.post('/player/', status_code=status.HTTP_201_CREATED)
async def add_player_dream(request: Request):        
        respone = await request.json()              
        player = create_player_dream(respone)
        Dream_team.append(player)
        new_player = json.dumps(player)
        return new_player
    
    
    
      
@app.delete('/player/{player_id}',status_code=status.HTTP_200_OK)
async def delete_player(player_id):
    global Dream_team
    dream_list = [item for item in Dream_team if item.get('id').replace(" ", "") != player_id.replace(" ", "")]
    Dream_team = dream_list;
    return {"ok": True}
    


@app.get('/playersDream/',status_code=status.HTTP_200_OK)
async def get_players_dream():  
    return json.dumps(Dream_team);


@app.get('/')
def be():
    return FileResponse('../static/index.html')




if __name__ == "__main__":
     uvicorn.run("server:app", host="0.0.0.0", port=8001,reload=True)

