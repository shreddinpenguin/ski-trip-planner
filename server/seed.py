#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import pandas as pd

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import *

mountains_pd = pd.read_csv('csv_files/mountains.csv')
print(mountains_pd)
def seed_mountains():
    mountains = []
    for index, row in mountains_pd.iterrows():
        m = Mountain(
            name = row["name"],
            ski_pass = row["ski_pass"],
            image = row['image'],
            description = row['description']
        )
        mountains.append(m)
    return mountains

destinations_pd = pd.read_csv('csv_files/destinations.csv')
print(destinations_pd)
def seed_destinations():
    destinations = []
    for index, row in destinations_pd.iterrows():
        d = Destination(
            name = row["name"],
            location = row['location'],
            image = row['image'],
            description = row['description']
        )
        destinations.append(d)
    return destinations

m_dest_pd = pd.read_csv('csv_files/m_dest.csv')
print(m_dest_pd)
def seed_m_dest():
    m_dests = []
    for index, row in m_dest_pd.iterrows():
        md = Mountain_Destinations(
            name = row["name"],
            mountain_id = row['mountain_id'],
            destination_id = row['destination_id']
        )
        m_dests.append(md)
    return m_dests

def seed_users():
    users = []
    taylor_password = "password"
    taylor = User(
        name="Taylor",
        ski_pass= "Epic"
    )
    taylor.password_hash = taylor_password
    users.append(taylor)
    return users

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        try:
            Mountain.query.delete()
        except:
            print('no mountains')
        try:
            Destination.query.delete()
        except:
            print('no destinations')
        try:
            Mountain_Destinations.query.delete()
        except:
            print('no m_dests')
        try:
            User.query.delete()
        except:
            print('no users')
        try:
            Trip.query.delete()
        except:
            print('no trips')
        try:
            Trip_User.query.delete()
        except:
            print('no trip users')
        # Seed code goes here!
        print('seeding m_dest')
        m_dests = seed_m_dest()
        db.session.add_all(m_dests)
        db.session.commit()
        print('seed_mountains')
        mountains = seed_mountains()
        db.session.add_all(mountains)
        db.session.commit()
        print('seeding destinations')
        destinations = seed_destinations()
        db.session.add_all(destinations)
        db.session.commit()
        print("Seeding customers...")
        users = seed_users()
        db.session.add_all(users)
        db.session.commit()
