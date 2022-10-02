from multiprocessing.dummy import Array
import requests;
import json;

new_player ={
        "player":{
            "id":"amit22"+"lolo",
            "FirstName":"amit22",
            "LastName":"lolo",
            "jerseyNumber":"2",
            "position":"g",        
            "HasBirthDate":"1/1/2019"
        }
   }

def get_all_players():
    year = 2019
    team = "lakers"
    response_json= requests.get(f'http://localhost:8080/players/?year={year}&teamname={team}')    
    response = response_json.json();  
    players = {"status":response_json.status_code,"response":response}
    return players;

def add_player():         
    response_json= requests.post(f'http://localhost:8080/player/',data=new_player)   
    
    response = response_json.json();  
    print(response)
    players = {"status":response_json.status_code,"response":response}
    return players;




def test_get_all_players():
    responce_all_players = get_all_players();
    assert isinstance(responce_all_players["response"],str)==True
    assert responce_all_players["status"]==200

def test_add_player():
    new_player = add_player();
    assert new_player["response"].id=="amit22"+"lolo"
    assert new_player["response"].FirstName=="amit22"
    assert new_player["response"].LastName=="lolo"
    assert new_player["response"].jerseyNumber=="2"
    assert new_player["response"].position=="g"
    assert new_player["response"].HasBirthDate=="1/1/2019"
    assert new_player["status"]==200


add_player()