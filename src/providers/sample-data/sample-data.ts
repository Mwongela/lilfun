import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

export let SampleDataProvider = {
  getData: () => {
    return [{
      "title": "Gillette Stadium",
      "locationItems": [{
        "latitude": -1.273766,
        "longitude": 36.791118,
        "pageUrl": "https://yahoo.com",
        "mediaUrl": "http://www.panacherock.com/downloads/mp3/01_-_Stormy_Weather.mp3"
      }, {
        "latitude": -3.813240627660875,
        "longitude": -148.13948652915738,
        "pageUrl": "https://google.com",
        "mediaUrl": "http://www.panacherock.com/downloads/mp3/01_-_Stormy_Weather.mp3"
      }, {
        "latitude": -5.281219383026652,
        "longitude": -10.104921314324116,
        "pageUrl": "https://google.com",
        "mediaUrl": "http://www.panacherock.com/downloads/mp3/01_-_Stormy_Weather.mp3"
      }, {
        "latitude": 47.83331195172522,
        "longitude": 122.11137436612307,
        "pageUrl": "https://google.com",
        "mediaUrl": "http://www.panacherock.com/downloads/mp3/01_-_Stormy_Weather.mp3"
      }, {
        "latitude": 75.13946464495464,
        "longitude": -120.22107682298085,
        "pageUrl": "https://google.com",
        "mediaUrl": "http://www.panacherock.com/downloads/mp3/01_-_Stormy_Weather.mp3"
      }, {
        "latitude": 15.135181834736457,
        "longitude": 16.235914355450348,
        "pageUrl": "https://google.com",
        "mediaUrl": "http://www.panacherock.com/downloads/mp3/01_-_Stormy_Weather.mp3"
      }, {
        "latitude": -62.08746415982115,
        "longitude": -145.20195013190624,
        "pageUrl": "https://google.com",
        "mediaUrl": "http://www.panacherock.com/downloads/mp3/01_-_Stormy_Weather.mp3"
      }, {
        "latitude": 79.98176653986496,
        "longitude": 106.4094061476327,
        "pageUrl": "https://google.com",
        "mediaUrl": "http://www.panacherock.com/downloads/mp3/01_-_Stormy_Weather.mp3"
      }, {
        "latitude": 36.82518366443638,
        "longitude": 143.82414610584613,
        "pageUrl": "https://google.com",
        "mediaUrl": "http://www.panacherock.com/downloads/mp3/01_-_Stormy_Weather.mp3"
      }, {
        "latitude": 65.7233982889002,
        "longitude": 38.08977517212014,
        "pageUrl": "https://google.com",
        "mediaUrl": "http://www.panacherock.com/downloads/mp3/01_-_Stormy_Weather.mp3"
      }]
    }];
  },
};
