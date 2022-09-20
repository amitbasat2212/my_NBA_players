from fastapi import FastAPI
import uvicorn
from fastapi import Response
import requests
from tems_id import teams_id
app = FastAPI()
league = "league"
standard="standard"
teams="teams"
teamId="teamId"


@app.get('/allThePlayersInSpesificYearAndTeam/')
async def get_all_the_players(year,teamname):
    tems_id_by_name = teams_id[teamname]
    res_players = requests.get(f'http://data.nba.net/10s/prod/v1/{year}/players.json')
    all_the_player_in_year=res_players.json()[league][standard]
    player_in_the_teams_id = list(filter(lambda player:player[teamId]==tems_id_by_name,all_the_player_in_year))
    return player_in_the_teams_id





if __name__ == "__main__":
     uvicorn.run("server:app", host="0.0.0.0", port=8001,reload=True)

