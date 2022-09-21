from fastapi import FastAPI
import uvicorn
from fastapi import Response
import requests
from tems_id import teams_id
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
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
    all_the_player_in_year=res_players.json()[league] 
    plyers_by_year_and_teammate=[];
    for area in all_the_player_in_year:
        league_players = all_the_player_in_year[area]
        plyers_by_year_and_teammate.append(list(filter(lambda player:player[teamId]==tems_id_by_name,league_players)))
        
    return plyers_by_year_and_teammate



@app.get('/')
def be():
    return FileResponse('../static/index.html')



if __name__ == "__main__":
     uvicorn.run("server:app", host="0.0.0.0", port=8001,reload=True)

