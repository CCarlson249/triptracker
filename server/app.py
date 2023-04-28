#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import *
from models import User, Trip, Event, Location, trip_locations

# Views go here!
class Signup(Resource):

    def post(self):
        request_json = request.get_json()
        username = request_json.get('username')
        password = request_json.get('password')
        

        user = User(
            username=username
        )

        user.password_hash = password

        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return make_response(user.to_dict(), 201)
        except IntegrityError:
            return make_response({"error":"422 Unprocessable Entity"}, 422)
        
api.add_resource(Signup, '/signup')

class CheckSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            return make_response(user.to_dict(), 200)
        except:
            return make_response({"error": "Unauthorized"}, 401)
        
api.add_resource(CheckSession, '/check_session')

class Login(Resource):
    def post(self):
        request_json = request.get_json()
        username = request_json.get('username')
        password = request_json.get('password')
        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return make_response(user.to_dict(), 200)
        return make_response({"error": "401 Unauthroized"},401)
    
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
            return make_response({"message": "Logout Sucessful"}, 204)
        return make_response({"error": "401 Unauthorized"}, 401)

api.add_resource(Logout, '/logout')

class Users(Resource):

    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)
    
api.add_resource(Users, '/users')

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        return make_response(user.to_dict(), 200)
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"error": "user not found"},404)
        request_json = request.get_json()
        for attr in request_json:
            setattr(user, attr, request_json[attr])
        db.session.add(user)
        db.session.commit()

        return make_response(user.to_dict(),202)

api.add_resource(UserById, '/users/<int:id>')

# general get request
@app.route('/trips', methods=['GET'])
def get_trips():
    trips = Trip.query.all()
    return jsonify({'trips': [trip.to_dict() for trip in trips]})

# get by id
@app.route('/trips/<int:id>', methods=['GET'])
def get_trip(id):
    trip = Trip.query.get_or_404(id)
    return jsonify(trip.to_dict())

# create new trip
@app.route('/trips', methods=['POST'])
def create_trip():
    data = request.get_json()
    trip = Trip(
        name=data['name'],
        start=data['start'],
        end=data['end'],
        depart_day=data['depart_day'],
        depart_time=data['depart_time'],
        arrive_day=data['arrive_day'],
        arrive_time=data['arrive_time'],
        flight_number=data['flight_number']
    )
    db.session.add(trip)
    db.session.commit()

    # Query locations with matching airports
    start_location = Location.query.filter_by(airports=trip.start).first()
    end_location = Location.query.filter_by(airports=trip.end).first()

    # Associate locations with trip
    if start_location and end_location:
        trip.locations.append(start_location)
        trip.locations.append(end_location)
        db.session.commit()

        # Create new association table row
        db.session.execute(trip_locations.insert().values(trip_id=trip.id, location_id=start_location.id))
        db.session.execute(trip_locations.insert().values(trip_id=trip.id, location_id=end_location.id))
        db.session.commit()

    return jsonify(trip.to_dict()), 201

# update trip by id
@app.route('/trips/<int:id>', methods=['PATCH'])
def update_trip(id):
    trip = Trip.query.get_or_404(id)
    data = request.get_json() or {}
    for key, value in data.items():
        setattr(trip, key, value)
    db.session.commit()
    return jsonify(trip.to_dict())

# delete trip by id
@app.route('/trips/<int:id>', methods=['DELETE'])
def delete_trip(id):
    trip = Trip.query.get_or_404(id)
    db.session.delete(trip)
    db.session.commit()
    return '', 204
# General GET request for all events
@app.route('/events')
def get_events():
    events = Event.query.all()
    return jsonify([event.to_dict() for event in events])

# GET request for a specific event by ID
@app.route('/events/<int:event_id>')
def get_event(event_id):
    event = Event.query.get(event_id)
    if event:
        return jsonify(event.to_dict())
    else:
        return jsonify({'message': 'Event not found'}), 404

# POST request to create a new event
@app.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()
    event = Event(**data)
    db.session.add(event)
    db.session.commit()
    return jsonify(event.to_dict()), 201

# PATCH request to update an existing event by ID
@app.route('/events/<int:event_id>', methods=['PATCH'])
def update_event(event_id):
    event = Event.query.get(event_id)
    if event:
        data = request.get_json()
        for key, value in data.items():
            setattr(event, key, value)
        db.session.commit()
        return jsonify(event.to_dict())
    else:
        return jsonify({'message': 'Event not found'}), 404

# DELETE request to delete an existing event by ID
@app.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Event.query.get(event_id)
    if event:
        db.session.delete(event)
        db.session.commit()
        return jsonify({'message': 'Event deleted'})
    else:
        return jsonify({'message': 'Event not found'}), 404
@app.route('/locations')
def get_locations():
    locations = Location.query.all()
    return jsonify([location.to_dict() for location in locations])



if __name__ == '__main__':
    app.run(port=5555, debug=True)
