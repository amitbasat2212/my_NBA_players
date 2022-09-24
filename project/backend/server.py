import json
from pydoc import plain
from urllib import response
from fastapi import FastAPI
import uvicorn
from fastapi import Response,Request,HTTPException
import requests
from tems_id import teams_id
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from DreamTeam import Dream_team
import os
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
isActive="isActive"

current_file = Path(__file__)
current_file_dir = current_file.parent
project_root = current_file_dir.parent
project_root_absolute = project_root.resolve()
static_root_absolute = project_root_absolute / "static"


app.mount("/static", StaticFiles(directory=static_root_absolute), name="static")


@app.get('/allThePlayersInSpesificYearAndTeam/')
async def get_all_the_players(year,teamname):
    tems_id_by_name = teams_id[teamname]
    res_players = requests.get(f'http://data.nba.net/10s/prod/v1/{year}/players.json')
    if(res_players.status_code==200):
        all_the_player_in_year=res_players.json()[league] 
    else:
        raise HTTPException(status_code=404, detail="erorr in the api")
    plyers_by_year_and_teammate=[];
    for area in all_the_player_in_year:
        league_players = all_the_player_in_year[area]
        plyers_by_year_and_teammate.append(list(filter(lambda player:player[teamId]==tems_id_by_name and player[isActive],league_players)))
    
    return plyers_by_year_and_teammate


def create_player_dream(player):
    player = {
        "id":player["FirstName"]+player["LastName"],
        "FirstName":player["FirstName"],
        "LastName":player["LastName"],
        "jerseyNumber":player["jerseyNumber"],
        "position":player["position"],
        "Image":player["Image"],
    }
    return player;


@app.post('/AddPlayer/')
async def add_player_dream(request: Request):
    respone = await request.json()    
    player = create_player_dream(respone)
    Dream_team.append(player)
    return json.dump(player)
    

@app.delete('/DeletePlayer/{id_player}')
async def delete_player(id_player):
    global Dream_team
    dream_list = [item for item in Dream_team if item.get('id') != id_player]
    Dream_team = dream_list;
    


@app.get('/getPlayer/{id_player}')
async def get_player(id_player):
    dict_player = [item for item in Dream_team if item['id'] == id_player]
    return json.dump(dict_player);


@app.get('/')
def be():
    return FileResponse('../static/index.html')




if __name__ == "__main__":
     uvicorn.run("server:app", host="0.0.0.0", port=3001,reload=True)

