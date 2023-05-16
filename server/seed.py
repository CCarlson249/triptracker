#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db, User, Event, Trip

if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():
        print("Clearing records...")
        User.query.delete()
        Event.query.delete()
        Trip.query.delete()

 
        db.session.commit()

        print('Database seeded')
        # Seed code goes here!
