from multiprocessing.dummy import Array
import requests;

def check_get_all_players(httpbin_secure):
    response= requests.get('http://localhost:8001/players/')
    print(response);