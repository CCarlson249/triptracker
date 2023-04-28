#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db, User, Location, Event, Trip, trip_locations

if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():
        print("Clearing records...")
        User.query.delete()
        Location.query.delete()
        Event.query.delete()
        Trip.query.delete()

    # Add airports to database
        airports = [
            {
                'airports': 'Hartsfield-Jackson Atlanta International Airport',
                'latitude': 33.6407,
                'longitude': -84.4277,
            },
            {
                'airports': 'Los Angeles International Airport',
                'latitude': 33.9416,
                'longitude': -118.4085,
            },
            {
                'airports': 'Chicago O’Hare International Airport',
                'latitude': 41.9742,
                'longitude': -87.9073,
            },
            {
                'airports': 'Dallas/Fort Worth International Airport',
                'latitude': 32.8998,
                'longitude': -97.0403,
            },
            {
                'airports': 'Denver International Airport',
                'latitude': 39.8561,
                'longitude': -104.6737,
            },
            {
                'airports': 'John F. Kennedy International Airport',
                'latitude': 40.6413,
                'longitude': -73.7781,
            },
            {
                'airports': 'San Francisco International Airport',
                'latitude': 37.6189,
                'longitude': -122.3748,
            },
            {
                'airports': 'McCarran International Airport',
                'latitude': 36.0800,
                'longitude': -115.1522,
            },
            {
                'airports': 'Seattle-Tacoma International Airport',
                'latitude': 47.4502,
                'longitude': -122.3088,
            },
            {
                'airports': 'Orlando International Airport',
                'latitude': 28.4294,
                'longitude': -81.3080,
            },
            {
                'airports': 'Charlotte Douglas International Airport',
                'latitude': 35.2144,
                'longitude': -80.9473,
            },
            {
                'airports': 'Newark Liberty International Airport',
                'latitude': 40.6895,
                'longitude': -74.1745,
            },
            {
                'airports': 'Phoenix Sky Harbor International Airport',
                'latitude': 33.4342,
                'longitude': -112.0115,
            },
            {
                'airports': 'George Bush Intercontinental Airport',
                'latitude': 29.9844,
                'longitude': -95.3414,
            },
            {
                'airports': 'Logan International Airport',
                'latitude': 42.3656,
                'longitude': -71.0096,
            },
            {
                'airports': 'Miami International Airport',
                'latitude': 25.7959,
                'longitude': -80.2870,
            },
            {
                'airports': 'Minneapolis-St. Paul International Airport',
                'latitude': 44.8820,
                'longitude': -93.2218,
            },
            {
                'airports': 'Fort Lauderdale-Hollywood International Airport',
                'latitude': 26.0726,
                'longitude': -80.1528,
            },
            {
                'airports': 'LaGuardia Airport',
                'latitude': 40.7769,
                'longitude': -73.8740,
            },
            {
                'airports': 'Ronald Reagan Washington National Airport',
                'latitude': 38.8512,
                'longitude': -77.0402,
            },
            {
                'airports': 'Salt Lake City International Airport',
                'latitude': 40.7884,
                'longitude': -111.9778,
            },
            {
                'airports': 'San Diego International Airport',
                'latitude': 32.7338,
                'longitude': -117.1933,
            },
            {
                'airports': 'Baltimore/Washington International Thurgood Marshall Airport',
                'latitude': 39.1754,
                'longitude': -76.6683,
            },
            {
                'airports': 'Lambert-St. Louis International Airport',
                'latitude': 38.7477,
                'longitude': -90.3599,
            },
            {
                'airports': 'Tampa International Airport',
                'latitude': 27.9756,
                'longitude': -82.5333,
            },
            {
                'airports': 'Portland International Airport',
                'latitude': 45.5898,
                'longitude': -122.5951,
            },
            {
                'airports': 'Austin-Bergstrom International Airport',
                'latitude': 30.1975,
                'longitude': -97.6664,
            },
            {
                'airports': 'Nashville International Airport',
                'latitude': 36.1263,
                'longitude': -86.6774,
            },
            {
                'airports': 'Raleigh-Durham International Airport',
                'latitude': 35.8776,
                'longitude': -78.7875,
            },
            {
                'airports': 'William P. Hobby Airport',
                'latitude': 29.6454,
                'longitude': -95.2789,
            },
            {
                'airports': 'San Antonio International Airport',
                'latitude': 29.5337,
                'longitude': -98.4698,
            },
            {
                'airports': 'Pittsburgh International Airport',
                'latitude': 40.4915,
                'longitude': -80.2329,
            },
            {
                'airports': 'Louis Armstrong New Orleans International Airport',
                'latitude': 29.9934,
                'longitude': -90.2580,
            },
            {
                'airports': 'Cincinnati/Northern Kentucky International Airport',
                'latitude': 39.0533,
                'longitude': -84.6622,
            },
            {
                'airports': 'Kansas City International Airport',
                'latitude': 39.2976,
                'longitude': -94.7139,
            },
            {
                'airports': 'Cleveland Hopkins International Airport',
                'latitude': 41.4057,
                'longitude': -81.8538,
            },
            {
                'airports': 'Sacramento International Airport',
                'latitude': 38.6955,
                'longitude': -121.5908,
            },
            {
                'airports': 'Indianapolis International Airport',
                'latitude': 39.7173,
                'longitude': -86.2944,
            },
            {
                'airports': 'Oakland International Airport',
                'latitude': 37.7126,
                'longitude': -122.2137,
            }]

        locations = [Location(**airport) for airport in airports]
        db.session.add_all(locations)
        db.session.commit()

        print('Database seeded')
        # Seed code goes here!
