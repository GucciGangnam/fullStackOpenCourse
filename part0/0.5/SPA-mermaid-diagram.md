```mermaid
sequenceDiagram
    participant browser
    participant server

Note right of browser: The client makes a post request to the URL with a JSON payload of contents.
    browser->>server: POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
    activate server
    server-->>browser: Status 201
    deactivate server

    Note left of server: The server runs the code to take the req.body contents and update the list. 

    browser->>server: most likely the same initial GET request but not defined in the documentation.
    activate server
Note to right of browser: The browser sees the 201 response and as a result, runs a function to update its list data. 

    

    
```
