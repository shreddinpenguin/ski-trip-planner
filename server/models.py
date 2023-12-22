from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
bcrypt = Bcrypt()

from config import db

# Models go here!
class Mountain(db.Model, SerializerMixin):
    __tablename__ = 'mountains'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    ski_pass = db.Column(db.String)
    image = db.Column(db.String)
    description = db.Column(db.String)
    #relationships
    mountain_dest = db.relationship('Mountain_Destinations', back_populates='mountain')
    trip = db.relationship('Trip', back_populates='mountain')
    #serializer
    serialize_rules = ('-mountain_dest.mountain', '-trip',)
    #validations
    @validates('name')
    def validates_name(self, key, value):
        if not value or len(value) <= 1:
            raise ValueError('Needs valid name')
        return value

class Destination(db.Model, SerializerMixin):
    __tablename__ = 'destinations'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String)
    image = db.Column(db.String)
    description = db.Column(db.String)
    #relationships
    mountain_dest = db.relationship('Mountain_Destinations', back_populates='destination')
    trip = db.relationship('Trip', back_populates='destination')
    #serializer
    serialize_rules = ('-mountain_dest.destination', '-trip',)
    #validations
    @validates('name')
    def validates_name(self, key, value):
        if not value or len(value) <= 1:
            raise ValueError('Needs valid name')
        return value
    
class Mountain_Destinations(db.Model, SerializerMixin):
    __tablename__ = 'mountain_destinations'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    mountain_id = db.Column(db.Integer, db.ForeignKey('mountains.id'))
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'))
    #relationships
    mountain = db.relationship('Mountain', back_populates='mountain_dest')
    destination = db.relationship('Destination', back_populates='mountain_dest')
    #serializer
    serialize_rules = ('-mountain.mountain_dest', '-destination.mountain_dest',)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    ski_pass = db.Column(db.String)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    #relationships
    trip_users = db.relationship('Trip_User', back_populates='users')
    #serializer
    serialize_rules = ('-trip.user',)
    #validations
    @validates('name')
    def validates_name(self, key, value):
        if not value or len(value) <= 1:
            raise ValueError('Needs valid name')
        return value
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
class Trip_User(db.Model, SerializerMixin):
    __tablename__ = 'trip_users'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.id'))
    #relationships
    users = db.relationship('User', back_populates='trip_users')
    trips = db.relationship('Trip', back_populates='trip_users')
    #serializer
    serialize_rules = ('-users.trip_users', '-trips.trip_users',)

class Trip(db.Model, SerializerMixin):
    __tablename__ = 'trips'
    id = db.Column(db.Integer, primary_key=True)
    trip_name = db.Column(db.String)
    mountain_id = db.Column(db.Integer, db.ForeignKey('mountains.id'))
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'))
    duration = db.Column(db.Integer)
    public = db.Column(db.String)
    #relationships
    trip_users = db.relationship('Trip_User', back_populates='trips', cascade='all, delete')
    destination = db.relationship('Destination', back_populates='trip')
    mountain = db.relationship('Mountain', back_populates='trip')
    #serializer
    serialize_rules = ('-trip_users.trip', '-destination.trip', '-destination.mountain_dest', '-mountain.trip','-mountain.mountain_dest')
    #validations
    @validates('user', 'destination', 'duration')
    def validates_name(self, key, value):
        if not value:
            raise ValueError('Value must be present')
        return value