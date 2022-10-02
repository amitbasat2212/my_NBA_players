from multiprocessing.dummy import Array
import requests;
import json;

def get_all_players():
    year = 2019
    team = "lakers"
    response_json= requests.get(f'http://localhost:8080/players/?year={year}&teamname={team}')    
    response = response_json.json();  
    players = {"status":response_json.status_code,"response":response}
    return players;


def test_get_all_players():
    responce_all_players = get_all_players();
    assert isinstance(responce_all_players["response"],str)==True
    assert responce_all_players["status"]==200




