This is an sample of mean-stack app.

Development environment:
Mongo 2.6.1
Node 0.10.28

How to run on your machine:
-clone this project
-cd to the project's root(where package.jsp lives)
-issue "npm install" on the terminal
-issue "bower install" on the terminal
-fire up the server by issue "node server.js" on the terminal

What is this?
-This app is a sample of real-time communication via mean-stack and socket-io.
-User sends data in a specific json format to the server
-The server will persist the data, and push it realtime to other end user

How to use:
-open one browser with url "http://localhost:3000/#!/", user should see a header and two charts
-open one more browser with url "http://localhost:3000/#!/products", then type in the specific format data and click send
-the frist browser should see a data stream runing on the header, and the data being plotted to the charts


References:
nodejs:
http://nodejs.org/
-download node, unzip, then follow its README.md to install

mongodb:
http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
-install instruction

mean.io:
http://mean.io/#!/docs
-install instruction

angularjs:
https://docs.angularjs.org/guide
https://github.com/angular-ui/ui-router/wiki
-tutorials and documents

express:
http://expressjs.com/guide.html
http://expressjs.com/4x/api.html
-guide and api reference

socket.io:
http://socket.io/docs/#
-guild on both server and client API, and example of integrate with express

jqPlot:
http://www.jqplot.com/docs/files/usage-txt.html
http://www.jqplot.com/tests/
-a jQuery plugin to draw charts, links have usage and examples