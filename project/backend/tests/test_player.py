from multiprocessing.dummy import Array
import requests;
import json;
year = 2019
team = "lakers"

new_player = {
    "player":{
        "FirstName":"amit22",
        "LastName":"lolo",
        "jerseyNumber":"2",
        "position":"g",        
        "HasBirthDate":"1/1/2019",
        "DreamTeam":True,
        "Image":"image"
    }
}

def test_get_all_players():
    response_json= requests.get(f'http://localhost:8070/players/?year={year}&teamname={team}')    
    response = response_json.json();    
    assert isinstance(response,object)==True
    assert response_json.status_code==200

def test_add_player():
    response_json= requests.post(f'http://localhost:8070/player/',json=new_player)   
    player = response_json.json(); 
    new_player_added = json.loads(player)        
    assert new_player_added["id"]=="amit22"+"lolo"
    assert new_player_added["FirstName"]=="amit22"
    assert new_player_added["LastName"]=="lolo"
    assert new_player_added["jerseyNumber"]=="2"
    assert new_player_added["position"]=="g"
    assert new_player_added["HasBirthDate"]=="1/1/2019"
    assert response_json.status_code==201
