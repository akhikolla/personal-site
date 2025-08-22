# Examples that need real time updates

Google docs work when multiple ppl are making edits, drivers get notifications ride is ready, new comments pop up during live stream.

### Things to Remember:

    1. Polling should be default option. It's stateless and work with many infras
    2. Always ask interview how real time does this needs to be? pretty real time or fairly fast - using polling.

Typical http follows a request response model, it follows a 3 way handshake and 4 way teardown, burning lot of network overhead for nothing, standard http falls short for real time. This isn't conducive to real time updates.

## Options: Techniques to simulate a server initiated connection

1. WebSockets: Bidirectional persistent connection to enable both server and client side communications with low latency. Abstraction over TCP channels.

   - lifecycle starts as a normal HTTP protocal and can be upgraded via well defined handshake to web socket connection
   - Connection initiated by client and server can send updates to clients
   - Uses same 80 && 443 as HTTP connections.

   wss:// /tickets

   - apis in terms of messages we are sending. WS are bit unique compared to SSE - connection can be open for hours.
   - SSE periodically reconnects to the server. Opening channel and for 30 seconds and closing it and forcing user to reconnect. ?
   - Good idea to terminate them sometime, so that driver/rider etc are messages are sent to them to message the state handled properly.
   - Middleware infra - layer for load balancer for websockets. l7 supports ws. WS is a bare TCP connections as such we cannot use L7 functionalities.

2. Naive Polling: Periodically ask server if it has any new messages available.

   - costly
   - consumes precious resources to answer question that offers no as an answer most of the time.

3. Long Polling: Holds connection open until there are actually data is available or timeout threshold has been reached.

   - sender & reciever may not connect to same server all the time. HTTP based servers are usually stateless
   - We maintain active connections even when the users aren't active.

   #### Cons:

   - Servers endup processing request for long amount of time, this is state, when we design services, we need to avoid state.
   - introduces extra latency when transferring data.

4. SSE - Server Sent Events:

- Server side - sets headers, send updates.
- Every time we get an update instead of sending one monolithic response we send event.
- works out of box with lot of infra.
- This is often times best time available to send high frequency data.
- SSE can send multiple responses within the same http response. basically simulating events, push notifcations we want to send to our client.

5. WebRTC - esoteric of protocols.

- Establish peer to peer connections between clients.
- Signaling server - tells about publicily addressableport.
- stun (find publically addressable address ports), turn server(fallback for clients that can't connect to one another).

## Options: Techniques to simulate updates on a server:

Polling repeatedly for updates. DB, it introduces the latency. DB to stores objects so server can query them. It's pretty uncommon. Real Time updates

1. Consistent Hashsing - to assign users to a server, we always know where users are connected. 
2. Pub/Sub - right user message at right time. 