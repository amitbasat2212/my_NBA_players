from multiprocessing.dummy import Array
import requests;
import json;
year = 2019
team = "lakers"

new_player = {
    "player":{
        "id":"amit22"+"lolo",
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


def test_delete_player():
    response_json= requests.delete(f'http://localhost:8070/player/amit22"+"lolo')   
    it_delete_player = response_json.json();     
    assert response_json.status_code==200
    assert it_delete_player["ok"]==True;  


def test_get_all_players_dream():
   response_json= requests.get(f'http://localhost:8070/playersDream/')   
   get_all_team_json= response_json.json(); 
   get_all_team = json.loads(get_all_team_json)
   print(get_all_team)
   assert get_all_team[0]["id"]=="amit22"+"lolo"
   assert get_all_team[0]["FirstName"]=="amit22"
   assert get_all_team[0]["LastName"]=="lolo"
   assert get_all_team[0]["jerseyNumber"]=="2"
   assert get_all_team[0]["position"]=="g"
   assert get_all_team[0]["HasBirthDate"]=="1/1/2019"
   assert response_json.status_code==200   



