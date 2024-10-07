from flask import Flask, request, jsonify
import sqlite3
import os
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import serialization

app = Flask(__name__)

# Database initialization for 'users.db'
DATABASE = 'users.db'

# Database paths for 'acceptor.db' and 'initiator.db'
ACCEPTOR_DB = 'acceptor.db'
INITIATOR_DB = 'initiator.db'

def init_db():
    """ Initialize 'users.db' if not already initialized """
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        wallet_address TEXT PRIMARY KEY,
        public_key TEXT
    )
    ''')
    conn.commit()
    conn.close()

def init_collab_db(db_name):
    """ Initialize 'acceptor.db' or 'initiator.db' based on the provided name """
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS collabs (
        collabId TEXT,
        wallet_address TEXT,
        public_key TEXT
    )
    ''')
    conn.commit()
    conn.close()



# Key pair generation function
def generate_ecc_keys():
    private_key = ec.generate_private_key(ec.SECP256R1())
    public_key = private_key.public_key()

    # Generate PEM formatted keys
    private_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL,
        encryption_algorithm=serialization.NoEncryption()
    )

    public_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )

    # Decode the PEM to get the raw bytes and strip headers and footers
    private_key_str = private_pem.decode('utf-8').strip().splitlines()[1:-1]  # Remove the first and last lines
    public_key_str = public_pem.decode('utf-8').strip().splitlines()[1:-1]    # Remove the first and last lines

    # Join the remaining lines back together
    private_key_without_header = "\n".join(private_key_str)
    public_key_without_header = "\n".join(public_key_str)

    return private_key_without_header, public_key_without_header



# Route to generate and return keys
@app.route('/generate_keys', methods=['POST'])
def generate_keys():
    data = request.get_json()

    # Retrieve wallet_address from the request
    wallet_address = data.get('wallet_address')

    if not wallet_address:
        return jsonify({'error': 'Wallet address is required'}), 400

    # Generate ECC public/private key pair
    private_key, public_key = generate_ecc_keys()

    # Store wallet_address and public_key in 'users.db'
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (wallet_address, public_key) VALUES (?, ?)", (wallet_address, public_key))
        conn.commit()
        conn.close()
    except sqlite3.IntegrityError:
        public_key_response = get_public_key_function(wallet_address)
        if 'error' in public_key_response.json:
            return jsonify({'error': f'Some error happened: {wallet_address}'}), 404

        public_key = public_key_response.json['public_key']

        return jsonify({'wallet_address': wallet_address, 'public_key': public_key})

    # Return the private key in the response
    return jsonify({'private_key': private_key})



# Route to fetch public key by wallet address
@app.route('/get_public_key', methods=['GET'])
def get_public_key():
    # Get wallet address from query parameters
    wallet_address = request.args.get('wallet_address')

    if not wallet_address:
        return jsonify({'error': 'Wallet address is required'}), 400

    try:
        # Retrieve public key from 'users.db'
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute("SELECT public_key FROM users WHERE wallet_address = ?", (wallet_address,))
        row = cursor.fetchone()
        conn.close()

        if row:
            public_key = row[0]
            return jsonify({'wallet_address': wallet_address, 'public_key': public_key})
        else:
            return jsonify({'error': 'Wallet address not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    


def get_public_key_function(wallet_address):
    """ Helper function to retrieve public key by wallet address """
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute("SELECT public_key FROM users WHERE wallet_address = ?", (wallet_address,))
        row = cursor.fetchone()
        conn.close()

        if row:
            public_key = row[0]
            return jsonify({'wallet_address': wallet_address, 'public_key': public_key})
        else:
            return jsonify({'error': 'Wallet address not found'})

    except Exception as e:
        return jsonify({'error': str(e)})



# POST route to store collaboration data in acceptor.db or initiator.db
@app.route('/store_collab', methods=['POST'])
def store_collab():
    data = request.get_json()

    # Retrieve wallet_address, collabId, and role (acceptor/initiator) from the request
    wallet_address = data.get('wallet_address')
    collab_id = data.get('collabId')
    role = data.get('string')  # Either 'acceptor' or 'initiator'

    if not wallet_address or not collab_id or not role:
        return jsonify({'error': 'wallet_address, collabId, and string (role) are required'}), 400

    if role not in ['acceptor', 'initiator']:
        return jsonify({'error': 'string must be either "acceptor" or "initiator"'}), 400

    # Get the public key using the existing function
    public_key_response = get_public_key_function(wallet_address)

    if 'error' in public_key_response.json:
        return jsonify({'error': f'Public key not found for wallet address: {wallet_address}'}), 404

    public_key = public_key_response.json['public_key']

    # Store data in the appropriate database (acceptor.db or initiator.db)
    db_name = ACCEPTOR_DB if role == 'acceptor' else INITIATOR_DB

    try:
        init_collab_db(db_name)

        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO collabs (collabId, wallet_address, public_key) VALUES (?, ?, ?)",
                       (collab_id, wallet_address, public_key))
        conn.commit()
        conn.close()

        return jsonify({'message': f'Successfully stored in {db_name}', 'collabId': collab_id, 'wallet_address': wallet_address, 'public_key': public_key})

    except Exception as e:
        return jsonify({'error': str(e)}), 500



# GET route to fetch wallet_address and public_key by collabId and role
@app.route('/get_collab_info', methods=['GET'])
def get_collab_info():
    # Get collabId and role from query parameters
    collab_id = request.args.get('collabId')
    role = request.args.get('string')  # This should be 'acceptor' or 'initiator'

    if not collab_id or not role:
        return jsonify({'error': 'collabId and string (role) are required'}), 400

    if role not in ['acceptor', 'initiator']:
        return jsonify({'error': 'string must be either "acceptor" or "initiator"'}), 400

    # Decide which database to look up
    db_name = ACCEPTOR_DB if role == 'acceptor' else INITIATOR_DB

    try:
        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()
        cursor.execute("SELECT wallet_address, public_key FROM collabs WHERE collabId = ?", (collab_id,))
        row = cursor.fetchone()
        conn.close()

        if row:
            wallet_address, public_key = row
            return jsonify({'collabId': collab_id, 'wallet_address': wallet_address, 'public_key': public_key})
        else:
            return jsonify({'error': f'collabId {collab_id} not found in {role} database'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500





if __name__ == '__main__':
    # Initialize the databases on startup
    if not os.path.exists(DATABASE):
        init_db()
    if not os.path.exists(ACCEPTOR_DB):
        init_collab_db(ACCEPTOR_DB)
    if not os.path.exists(INITIATOR_DB):
        init_collab_db(INITIATOR_DB)

    app.run(debug=True)