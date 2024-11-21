from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_connection

app - Flash(__name__)
CORS(app)

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    conn = get_connection()  # conecta python com sql
    cursor = conn.cursor()  # traduz comandos sql para python e vice versa
    cursor.execute("""
    INSERT INTO users (name, email, age)
    VALUES (%s, %s, %s)
    """, (data['name'], data['email'], data['age']))
    conn.commit()
    return jsonify({"message": "User created successfully"}), 201
