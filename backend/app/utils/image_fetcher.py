# Stub: fetch images using Bing Image Search API (or other). This file provides a simple example.
# You must provide BING_API_KEY in env to use this.
import os, requests, io
from ..core import settings

BING_URL = "https://api.bing.microsoft.com/v7.0/images/search"

def search_image_by_query(query: str, count: int = 3):
    api_key = settings.BING_API_KEY
    if not api_key:
        raise RuntimeError('BING_API_KEY not set in env')
    headers = { 'Ocp-Apim-Subscription-Key': api_key }
    params = {'q': query, 'count': count, 'imageType': 'Photo'}
    r = requests.get(BING_URL, headers=headers, params=params, timeout=15)
    r.raise_for_status()
    data = r.json()
    results = []
    for it in data.get('value', []):
        results.append({'contentUrl': it.get('contentUrl'), 'hostPageUrl': it.get('hostPageUrl')})
    return results

def download_image_to_file(url: str, dest_path: str):
    r = requests.get(url, stream=True, timeout=20)
    r.raise_for_status()
    with open(dest_path, 'wb') as f:
        for chunk in r.iter_content(1024):
            f.write(chunk)
    return dest_path
