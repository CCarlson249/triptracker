from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-created_at', '-updated_at', '-trips')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    trips = db.relationship('Trip', backref='user')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}>'

class Trip(db.Model, SerializerMixin):
    __tablename__ = 'trips'

    serialize_rules = ('-created_at', '-updated_at', '-events', )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    depart_day = db.Column(db.Date, nullable=False)
    depart_time = db.Column(db.Time, nullable=False)
    arrive_day = db.Column(db.Date, nullable=False)
    arrive_time = time = db.Column(db.Time, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    flight_number = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    events = db.relationship('Event', backref='trip')

    locations = db.relationship('Location', secondary='trip_locations', backref=db.backref('trips', lazy='dynamic'))


class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    serialize_rules = ('-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time)
    description = db.Column(db.String)
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'

    serialize_rules = ('-created_at', '-updated_at')
                       
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

trip_locations = db.Table('trip_locations',
    db.Column('trip_id', db.Integer, db.ForeignKey('trips.id')),
    db.Column('location_id', db.Integer, db.ForeignKey('locations.id'))
)
