## Decentralised Secure Collaboration

### Development Repository

#### For fellow developers: before you start:

Update your `settings.json` in `VSCode` with the one given in the root.


### Frontend:

Running in `react js`.

To run, type command: `npm start`

Note: To interract with Solana, you will need to have Phantom wallet extension in your browser.


### Backend: 

When Connect Wallet button is clicked:
`/generate_keys`

POST

query: wallet_address

When 'registering', it will give as output the private key for the user to save personally, and save the public key + wallet address in users.db

When 'log in', it will just give you the public key

example:
curl -X POST http://127.0.0.1:5000/generate_keys -H "Content-Type: application/json" -d '{"wallet_address": "mySecretWalletAddress123"}'



`/get_public_key`

GET

gives you public key

query: wallet_address

example:
curl -X GET "http://127.0.0.1:5000/get_public_key?wallet_address=mySecretWalletAddress123"




`/store_collab`

POST

When the user (after logged in) clicks either initiator or acceptor button, it creates a initiator.db or acceptor.db and stores the info
query: wallet_address, collabId and a string = initiator or acceptor, depending on which button is selected

example:
`curl -X POST http://127.0.0.1:5000/store_collab \
-H "Content-Type: application/json" \
-d '{"wallet_address": "mySecretWalletAddress123", "collabId": "collab123", "string": "initiator"}'`




`/get_collab_info`

GET

gives us collab info, that is wallet_address and public_key

query: collabId and string= initiator or acceptor

example:
curl -X GET "http://127.0.0.1:5000/get_collab_info?collabId=collab123&string=initiator"





`/get_all_collabs`

GET

gives you info of all collabs

query: null

output: collabId, public_key, role (initiator or acceptor), wallet_address

example: curl -X GET "http://127.0.0.1:5000/get_all_collabs"




`/get_all_collabs_rolebased`

GET

gives you info of all collabs of a specific role (initiator or acceptor)

query: string role

output: collabid, wallet_address, public_key

example: curl -X GET "http://127.0.0.1:5000/get_all_collabs_rolebased?string=initiator" 


### Solana:

#### SBT Rating

A Solana program for decentralized ratings.

Built using Solana's `Anchor` framework.

Run in Devnet: `anchor deploy --provider.cluster devnet`; Testnet: change to testnet.

Keygen: `solana-keygen new -o ~/.config/solana/id.json`.

Airdrop: `solana airdrop 2 <YOUR_WALLET_ADDRESS>`.

Run and test: `anchor test`.
