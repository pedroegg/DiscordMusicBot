import re
import os
import json
import requests
from bs4 import BeautifulSoup
from flask import Flask, session, render_template, request, Response, render_template_string, g

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(120)

@app.route('/searchQuery')
def search_by_query():
    query = request.args.get('q')
    headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:86.0) Gecko/20100101 Firefox/86.0'}    
    query = 'https://www.youtube.com/results?search_query=' + query                                     
    content = requests.get(query, headers=headers)
    soup = BeautifulSoup(content.text, 'html.parser')
    initial_data = soup.find('script',string=re.compile('ytInitialData'))                               

    str_initial_data = str(initial_data)                                                                
    extracted_josn_text = str_initial_data.split(';')[0].strip()                                        
    new_extracted_josn_text = re.sub('<script nonce=.*>var ytInitialData = ','',extracted_josn_text)    
    video_results = json.loads(new_extracted_josn_text)
    objectReturn = {}
    
    try:
        video_json = video_results['contents']['twoColumnSearchResultsRenderer']['primaryContents']["sectionListRenderer"]["contents"][0]["itemSectionRenderer"]["contents"][0]['videoRenderer']
        video_id = video_json['videoId']
        video_name = video_json['title']['runs'][0]['text']
    
        objectReturn['videoID'] = video_id
        objectReturn['videoTitle'] = video_name
        objectReturn['videoFounded'] = True
        
    except:
        objectReturn['videoID'] = 0
        objectReturn['videoTitle'] = ''
        objectReturn['videoFounded'] = False
        
    return json.dumps(objectReturn)

@app.route('/searchURL')
def search_by_url():
    search = request.args.get('url')
    content = requests.get(search)
    objectReturn = {}
    if 'Vídeo indisponível' in content.text:
        objectReturn['videoID'] = 0
        objectReturn['videoTitle'] = ''
        objectReturn['videoFounded'] = False
    else:
        soup = BeautifulSoup(content.text, 'html.parser')
        video_name = soup.find(itemprop='name')
        video_id = soup.find(itemprop='videoId')
        
        objectReturn['videoID'] = video_id['content']
        objectReturn['videoTitle'] = video_name['content']
        objectReturn['videoFounded'] = True
    
    return json.dumps(objectReturn)

if __name__ == '__main__':
    print("Crawler running!")
    app.run(host='127.0.0.1', port=4000, debug=False)