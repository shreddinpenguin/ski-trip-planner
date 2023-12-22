#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session
from flask_restful import Resource
# Local imports
from config import app, db, api
# Add your model imports
from models import Destination, User, Mountain, Trip, Trip_User

app.secret_key = b'\xdd\x05hA\x80e}\x0b\x91\x17\x9c(\x95H\x95S'

#Routes
@app.before_request
def check_session():
    print(session)
    if session.get('user_id') is None:
        session['user_id'] = None
        print(session['user_id'])
    else:
        print('There is a session')
        print(session['user_id'])

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'

@app.route('/destinations')
def get_destinations():
    return make_response([destination.to_dict(only=('id', 'name', 'image', 'location', 'description')) for destination in Destination.query.all()], 200)

@app.route('/destinations/<int:id>')
def destination_by_id(id):
    destination = Destination.query.filter(Destination.id == id).first()
    if not destination:
        return make_response({'error': 'destination not found'}, 404)
    else:
        return make_response(destination.to_dict(), 200)

@app.route('/mountains')
def get_mountains():
    return make_response([mountain.to_dict() for mountain in Mountain.query.all()], 200)

@app.route('/mountains/<int:id>')
def mountain_by_id(id):
    mountain = Mountain.query.filter(Mountain.id == id).first()
    if not mountain:
        return make_response({'error': 'mountain not found'}, 404)
    else:
        return make_response(mountain.to_dict(), 200)
    
@app.route('/trips', methods = ['GET', 'POST'])
def get_trips():
    trips = Trip.query.all()
    if request.method == 'GET':
        return make_response([trip.to_dict() for trip in trips], 200)
    elif request.method == 'POST':
        data = request.get_json()
        try:
            new_trip = Trip(
                trip_name = data['trip_name'],
                mountain_id = data['mountain_id'],
                destination_id = data['destination_id'],
                duration = data['duration'],
                public = data['public']
            )
            db.session.add(new_trip)
            db.session.commit()
        except Exception as e:
            print(e)
            return make_response({"errors": ["validation errors"]}, 400)
        return make_response(new_trip.to_dict(), 201)
    
@app.route('/trip_users', methods = ['GET', 'POST'])
def get_trip_users():
    trip_users = Trip_User.query.filter(Trip_User.user_id==session['user_id']).all()
    if request.method == 'GET':
        return make_response([trip_user.to_dict() for trip_user in trip_users], 200)
    elif request.method == 'POST':
        data = request.get_json()
        print(data)
        try:
            new_trip_user = Trip_User(
                trip_id = data['trip_id'],
                user_id = data['user_id']
            )
            db.session.add(new_trip_user)
            db.session.commit()
        except Exception as e:
            print("EXCEPTION: ", e)
            return make_response({"errors": ["validation errors"]}, 400)
        return make_response(new_trip_user.to_dict(), 201)

@app.route('/trips/<int:id>', methods = ['GET', 'PATCH', 'DELETE'])
def trip_by_id(id):
    trip = Trip.query.filter(Trip.id == id).first()
    if not trip:
            return make_response({"error": "trip not found"}, 404)
    elif request.method == 'GET':
        return make_response(trip.to_dict(), 200)
    elif request.method == 'PATCH':
        data = request.get_json()
        try:
            for attr in data:
                setattr(trip, attr, data[attr])
            db.session.add(trip)
            db.session.commit()
        except Exception as e:
            return make_response({"errors": ["validation errors"]}, 400)
        return make_response(trip.to_dict(only=('id', 'user', 'destination')), 202)
    elif request.method == 'DELETE':
        db.session.delete(trip)
        db.session.commit()
        return {}, 204
    


@app.route('/signup', methods = ['POST'])
def signup():
    if request.method == 'POST':
        data = request.get_json()
        try:
            new_user = User(
                name = data['name'],
                ski_pass = data['ski_pass'],
            )
            new_user.password_hash = data["password"]
            print(new_user)
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            print(session['user_id'])
        except Exception as e:
            return make_response({"errors": ["validation errors"]}, 400)
        return make_response(new_user.to_dict(), 201)
    
@app.route('/login', methods = ['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        name = data['name']
        password = data['password']
        user = User.query.filter(User.name==name).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return make_response(user.to_dict(), 200)
        else:
            return make_response('Unauthorized', 401)

@app.route('/logout', methods = ['DELETE'])
def logout():
    if request.method == 'DELETE':
        if session.get('user_id'):
            session['user_id'] = None 
        return {}, 204
    
@app.route('/checksession', methods = ['GET'])
def get_session():
    user_id = session['user_id']
    if user_id:
        user = User.query.filter(User.id == user_id).first()
        return user.to_dict(), 200
    
    return {}, 401

@app.route('/users/<int:id>', methods = ['GET', 'PATCH', 'DELETE'])
def user_by_id(id):
    user = User.query.filter(User.id == id).first()
    if not user:
        return make_response({'error': 'user not found'}, 404)
    elif request.method == 'GET':
        return make_response(user.to_dict(only=('id', 'name')), 200)
    elif request.method == 'PATCH':
        data = request.get_json()
        try:
            for attr in data:
                setattr(user, attr, data[attr])
            db.session.add(user)
            db.session.commit()
        except Exception as e:
            return make_response({"errors": ["validation errors"]}, 400)
        return make_response(user.to_dict(only=('id', 'name')), 202)
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return {}, 204

if __name__ == '__main__':
    app.run(port=5555, debug=True)

