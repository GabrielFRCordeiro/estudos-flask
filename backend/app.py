from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_connection

# Usa nome do arquivo para configurar raiz do projeto
app = Flask(__name__)
# Permite navegadores realizarem requisições para backend Flask, mesmo se estiverem hospedados em dominios ou portas diferentes
CORS(app)

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json  # pega json do javascript
    conn = get_connection()  # conecta python com sql
    cursor = conn.cursor()  # traduz comandos sql para python e vice versa
    cursor.execute("""
    INSERT INTO users (name, email, age)
    VALUES (%s, %s, %s)
    """, (data['name'], data['email'], data['age']))
    conn.commit()
    return jsonify({"message": "User created successfully"}), 201

@app.route('/users', methods=['GET'])
def get_users():
    conn = get_connection()
    cursor = conn.cursor(dictionary = True)
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()  # salva dicionario em variavel
    return jsonify(users), 200

# Atualizar usuário
@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET name=%s, email=%s, age=%s WHERE id=%s",
                   (data['name'], data['email'], data['age'], id))
    conn.commit()
    return jsonify({"message": "User updated successfully"}), 200
 
# Deletar usuário
@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE id=%s", (id,))
    conn.commit()
    return jsonify({"message": "User deleted successfully"}), 200
 
if __name__ == '__main__':
    app.run(debug=True)
