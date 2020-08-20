var express = require('express');
var app = express();
var mysql = require('mysql');
var server = require('http').createServer(app);
var io = require ('socket.io')(server);
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");

//Necessary for email
var smtpTransport = nodemailer.createTransport("SMTP",{
host: 'email.host.org',
port: 25,
domain:'business.org',
tls: {ciphers:'SSLv3'}
});

// Keeps track of all the users online (mainly for use in chat systems, but could be useful for responding to [or commenting on] tickets)
var users = [];

//Links mySQL database to the Node server
var db = mysql.createPool({
    host: 'localhost', 
    user: 'root', 
    password: 'pass', 
    database: 'pr_request'
    //port: 3000;
});

//sets up the socket variable
//The socket variable is used to pass and store data on the client side for use in data getting and setting on the server end.
//This will be mainly used for rememebering who's logged in. 
var socket;

//This connects to the service that sends and returns live data
io.on('connection', function(socket){
    //Lets the admin know when a user is connected. Only states when a connection is made to the login/landing page.
    console.log('A user connected');    
    
    socket.on('add_ticket', function(ticket){
        /*console.log(ticket.t_Location,ticket.t_Department,ticket.t_Name,ticket.t_Email,ticket.t_Phone,ticket.t_Program,ticket.t_ProgramDate,ticket.t_DateToReceive,ticket.t_PDisplay,ticket.t_PPressRel,ticket.t_PBroch,ticket.t_PFlyer,ticket.t_PPoster,ticket.t_PBookmark,ticket.t_PBanner,ticket.t_PPhotoBooth,ticket.t_PNotNew,ticket.t_PAsApproved,ticket.t_Unlisted,ticket.t_Some,ticket.t_HavePho,ticket.t_TheLogoMight,ticket.t_PleaseDesign,ticket.t_PrintColor,ticket.t_BW,ticket.t_HaveCopy,ticket.t_Detail);*/
        
        io.emit('add_Ticket', {t_Location: ticket.t_Location, t_Department: ticket.t_Department, t_Name: ticket.t_Name, t_Email: ticket.t_Email, t_Phone: ticket.t_Phone, t_Program: ticket.t_Program, t_ProgramDate: ticket.t_ProgramDate, t_DateToReceive: ticket.t_DateToReceive, t_PDisplay: ticket.t_PDisplay, t_PPressRel: ticket.t_PPressRel, t_PBroch: ticket.t_PBroch, t_PFlyer: ticket.t_PFlyer, t_PPoster: ticket.t_PPoster, t_PBookmark: ticket.t_PBookmark, t_PBanner: ticket.t_PBanner, t_PPhotoBooth: ticket.t_PPhotoBooth, t_PNotNew: ticket.t_PNotNew, t_PAsApproved: ticket.t_PAsApproved, t_Unlisted: ticket.t_Unlisted, t_Some: ticket.t_Some, t_HavePho: ticket.t_HavePho, t_TheLogoMight: ticket.t_TheLogoMight, t_PleaseDesign: ticket.t_PleaseDesign, t_PrintColor: ticket.t_PrintColor, t_BW: ticket.t_BW, t_HaveCopy: ticket.t_HaveCopy, t_Detail: ticket.t_Detail});
        
        add_ticket(ticket.t_Location,ticket.t_Department,ticket.t_Name,ticket.t_Email,ticket.t_Phone,ticket.t_Program,ticket.t_ProgramDate,ticket.t_DateToReceive,ticket.t_PDisplay,ticket.t_PPressRel,ticket.t_PBroch,ticket.t_PFlyer,ticket.t_PPoster,ticket.t_PBookmark,ticket.t_PBanner,ticket.t_PPhotoBooth,ticket.t_PNotNew,ticket.t_PAsApproved,ticket.t_Unlisted,ticket.t_Some,ticket.t_HavePho,ticket.t_TheLogoMight,ticket.t_PleaseDesign,ticket.t_PrintColor,ticket.t_BW,ticket.t_HaveCopy,ticket.t_Detail, function(res){
        if(res){
            //io.emit('refresh feed', msg);
            //console.log('refresh feed, status ');
        } else {
            io.emit('error');
            console.log('there was an error under socket.on add_ticket');
        }
    });
    });
    
    //fSolution, fIsresolved, fDateComplete, fTicketId
    
    socket.on('update_ticket', function(ticket){
        console.log(ticket.t_Location,ticket.t_Department,ticket.t_Name,ticket.t_Email,ticket.t_Phone,ticket.t_Program,ticket.t_ProgramDate,ticket.t_DateToReceive,ticket.t_PDisplay,ticket.t_PPressRel,ticket.t_PBroch,ticket.t_PFlyer,ticket.t_PPoster,ticket.t_PBookmark,ticket.t_PBanner,ticket.t_PPhotoBooth,ticket.t_PNotNew,ticket.t_PAsApproved,ticket.t_Unlisted,ticket.t_Some,ticket.t_HavePho,ticket.t_TheLogoMight,ticket.t_PleaseDesign,ticket.t_PrintColor,ticket.t_BW,ticket.t_HaveCopy,ticket.t_Detail,ticket.t_Completed, ticket.t_PRCom, ticket.fTicketId);
        console.log("we got this far");
        /*io.emit('update_ticket', {fSolution: ticket.fSolution, fIsResolved: ticket.fIsResolved, fDateComplete: ticket.fDateComplete, fTicketId: ticket.fTicketId, fInventory: ticket.fInventory,});*/
        
        update_ticket(ticket.t_Location,ticket.t_Department,ticket.t_Name,ticket.t_Email,ticket.t_Phone,ticket.t_Program,ticket.t_ProgramDate,ticket.t_DateToReceive,ticket.t_PDisplay,ticket.t_PPressRel,ticket.t_PBroch,ticket.t_PFlyer,ticket.t_PPoster,ticket.t_PBookmark,ticket.t_PBanner,ticket.t_PPhotoBooth,ticket.t_PNotNew,ticket.t_PAsApproved,ticket.t_Unlisted,ticket.t_Some,ticket.t_HavePho,ticket.t_TheLogoMight,ticket.t_PleaseDesign,ticket.t_PrintColor,ticket.t_BW,ticket.t_HaveCopy,ticket.t_Detail,ticket.t_Completed, ticket.t_PRCom, ticket.fTicketId, function(res){
        if(res){
            //io.emit('refresh feed', msg);
            //console.log('refresh feed, status ');
        } else {
            io.emit('error');
            console.log('there was an error under socket.on chat message');
        }
    });
    });
    
    //disconnects link to server to prevent too many connections to the server
    socket.on('disconnect', function() {
     //Code inserted in here will run on user disconnect. 
     console.log('A user has disconnected');
        socket.disconnect();
        
    });
    
    

});

//app.listen(3000, function(){
 //   console.log("Listening on *:3000");
//});

//used to start and run the server
server.listen(3003, function(){
    console.log("listening on *:3003");
});

app.use(express.static('files'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//app.get is used to return data based on what your url is. 
//in the case of '/DB' we are returning the database information
app.get('/DB', function(req, res){
    //db.query('SELECT *, DATE_FORMAT(Date_Time, "%b/%d/%Y %I:%i %p") AS ReadTime FROM itrequest15.ticket ORDER BY idTicket DESC', function(err, rows)
    db.query('SELECT *, DATE_FORMAT(v_ProgramDate, "%b/%d/%Y") AS PDate, DATE_FORMAT(v_DateToReceive, "%b/%d/%Y") AS DTRC, DATE_FORMAT(v_TimeCreated, "%b/%d/%Y %I:%i %p") AS TCREATE FROM pr_request.request ORDER BY id', function(err, rows)
                     {
        if (err) console.log(err);
        
        for (i = 0; i < rows.length; i++) { 
            //console.log(i);
            var Stringy = "";
            var AlsoStringy = "";
            var first = 0;
            var Alsofirst = 0;
            
            if (rows[i].v_PDisplay == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }
                        
                    Stringy += "Display";
                }
            if (rows[i].v_PPressRel == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Press Release";
                }
            if (rows[i].v_PBroch == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Brochure";
                }
            if (rows[i].v_PFlyer == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Flyer";
                }
            if (rows[i].v_PPoster == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Poster";
                }
            if (rows[i].v_PBookmark == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Bookmark";
                }
            if (rows[i].v_PBanner == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Banner";
                }
            if (rows[i].v_PPhotoBooth == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "PhotoBooth";
                }
            if (rows[i].v_PNotNew == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "This is not a new design, please redesign, i think it needs updating!";
                }
            
            //===========================================================
            //Please indicate the following:

            if (rows[i].v_Some == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "I have some ideas, so let's talk . . . Call me at the number listed above";
                }
            if (rows[i].v_HavePho == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "I have photos for you";
                }
            if (rows[i].v_TheLogoMight == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "The logo I need might be in your computer files";
                }
            if (rows[i].v_PleaseDesign == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "Please design a new logo";
                }
            if (rows[i].v_PrintColor == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "I'd like to print this in color";
                }
            if (rows[i].v_BW == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "Black & White is good enough";
                }
            if (rows[i].v_HaveCopy == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "I have copy that I will e-mail to you";
                }
            
            rows[i].WhichPro = Stringy;
            rows[i].PleaseInd = AlsoStringy;
            //console.log(rows[i].WhichPro);
            //console.log(rows[i].PleaseInd);
        }
        
        
        
        
        res.send(JSON.stringify(rows));
        //using with express
        //check facebook
    });
});


app.get('/ticket/:id', function(req, res){
    db.query('SELECT *, DATE_FORMAT(v_ProgramDate, "%b/%d/%Y") AS PDate, DATE_FORMAT(v_DateToReceive, "%b/%d/%Y") AS DTRC, DATE_FORMAT(v_TimeCreated, "%b/%d/%Y %I:%i %p") AS TCREATE FROM pr_request.request WHERE request.id='+req.params.id+';', function(err, rows)
                     {
        if (err) console.log(err);
        res.send(JSON.stringify(rows[0]));

    });
});

//the rest of these could have been done much better (or merged into one), but it's quicker to do this the lazy way in this temporary case.
app.get('/OPENREQMONTH', function(req, res){
    //db.query('SELECT *, DATE_FORMAT(Date_Time, "%b/%d/%Y %I:%i %p") AS ReadTime FROM itrequest15.ticket ORDER BY idTicket DESC', function(err, rows)
    db.query('SELECT *, DATE_FORMAT(v_ProgramDate, "%b/%d/%Y") AS PDate, DATE_FORMAT(v_DateToReceive, "%b/%d/%Y") AS DTRC, DATE_FORMAT(v_TimeCreated, "%b/%d/%Y %I:%i %p") AS TCREATE FROM pr_request.request WHERE v_Completed = "No" AND v_DateToReceive > NOW() - INTERVAL 30 DAY ORDER BY id', function(err, rows)
                     {
        if (err) console.log(err);
        console.log("OPENREQ"+ rows);
        for (i = 0; i < rows.length; i++) { 
            //console.log(i);
            var Stringy = "";
            var AlsoStringy = "";
            var first = 0;
            var Alsofirst = 0;
            
            if (rows[i].v_PDisplay == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }
                        
                    Stringy += "Display";
                }
            if (rows[i].v_PPressRel == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Press Release";
                }
            if (rows[i].v_PBroch == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Brochure";
                }
            if (rows[i].v_PFlyer == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Flyer";
                }
            if (rows[i].v_PPoster == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Poster";
                }
            if (rows[i].v_PBookmark == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Bookmark";
                }
            if (rows[i].v_PBanner == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Banner";
                }
            if (rows[i].v_PPhotoBooth == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "PhotoBooth";
                }
            if (rows[i].v_PNotNew == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "This is not a new design, please redesign, i think it needs updating!";
                }
            
            //===========================================================
            //Please indicate the following:

            if (rows[i].v_Some == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "I have some ideas, so let's talk . . . Call me at the number listed above";
                }
            if (rows[i].v_HavePho == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "I have photos for you";
                }
            if (rows[i].v_TheLogoMight == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "The logo I need might be in your computer files";
                }
            if (rows[i].v_PleaseDesign == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "Please design a new logo";
                }
            if (rows[i].v_PrintColor == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "I'd like to print this in color";
                }
            if (rows[i].v_BW == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "Black & White is good enough";
                }
            if (rows[i].v_HaveCopy == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "I have copy that I will e-mail to you";
                }
            
            rows[i].WhichPro = Stringy;
            rows[i].PleaseInd = AlsoStringy;
            //console.log(rows[i].WhichPro);
            //console.log(rows[i].PleaseInd);
        }
        
        
        
        
        res.send(JSON.stringify(rows));
        //using with express
        //check facebook
    });
});


app.get('/OPEN', function(req, res){
    //db.query('SELECT *, DATE_FORMAT(Date_Time, "%b/%d/%Y %I:%i %p") AS ReadTime FROM itrequest15.ticket ORDER BY idTicket DESC', function(err, rows)
    db.query('SELECT *, DATE_FORMAT(v_ProgramDate, "%b/%d/%Y") AS PDate, DATE_FORMAT(v_DateToReceive, "%b/%d/%Y") AS DTRC, DATE_FORMAT(v_TimeCreated, "%b/%d/%Y %I:%i %p") AS TCREATE FROM pr_request.request WHERE v_Completed = "No" ORDER BY id', function(err, rows)
                     {
        if (err) console.log(err);
        
        for (i = 0; i < rows.length; i++) { 
            //console.log(i);
            var Stringy = "";
            var AlsoStringy = "";
            var first = 0;
            var Alsofirst = 0;
            
            if (rows[i].v_PDisplay == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }
                        
                    Stringy += "Display";
                }
            if (rows[i].v_PPressRel == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Press Release";
                }
            if (rows[i].v_PBroch == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Brochure";
                }
            if (rows[i].v_PFlyer == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Flyer";
                }
            if (rows[i].v_PPoster == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Poster";
                }
            if (rows[i].v_PBookmark == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Bookmark";
                }
            if (rows[i].v_PBanner == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Banner";
                }
            if (rows[i].v_PPhotoBooth == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "PhotoBooth";
                }
            if (rows[i].v_PNotNew == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "This is not a new design, please redesign, i think it needs updating!";
                }
            
            //===========================================================
            //Please indicate the following:

            if (rows[i].v_Some == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "I have some ideas, so let's talk . . . Call me at the number listed above";
                }
            if (rows[i].v_HavePho == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "I have photos for you";
                }
            if (rows[i].v_TheLogoMight == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "The logo I need might be in your computer files";
                }
            if (rows[i].v_PleaseDesign == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "Please design a new logo";
                }
            if (rows[i].v_PrintColor == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "I'd like to print this in color";
                }
            if (rows[i].v_BW == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "Black & White is good enough";
                }
            if (rows[i].v_HaveCopy == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "I have copy that I will e-mail to you";
                }
            
            rows[i].WhichPro = Stringy;
            rows[i].PleaseInd = AlsoStringy;
            //console.log(rows[i].WhichPro);
            //console.log(rows[i].PleaseInd);
        }
        
        
        
        
        res.send(JSON.stringify(rows));
        //using with express
        //check facebook
    });
});

app.get('/CLOSED', function(req, res){
    //db.query('SELECT *, DATE_FORMAT(Date_Time, "%b/%d/%Y %I:%i %p") AS ReadTime FROM itrequest15.ticket ORDER BY idTicket DESC', function(err, rows)
    db.query('SELECT *, DATE_FORMAT(v_ProgramDate, "%b/%d/%Y") AS PDate, DATE_FORMAT(v_DateToReceive, "%b/%d/%Y") AS DTRC, DATE_FORMAT(v_TimeCreated, "%b/%d/%Y %I:%i %p") AS TCREATE FROM pr_request.request WHERE v_Completed = "YES" ORDER BY id', function(err, rows)
                     {
        if (err) console.log(err);
        
        for (i = 0; i < rows.length; i++) { 
            //console.log(i);
            var Stringy = "";
            var AlsoStringy = "";
            var first = 0;
            var Alsofirst = 0;
            
            if (rows[i].v_PDisplay == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }
                        
                    Stringy += "Display";
                }
            if (rows[i].v_PPressRel == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Press Release";
                }
            if (rows[i].v_PBroch == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Brochure";
                }
            if (rows[i].v_PFlyer == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Flyer";
                }
            if (rows[i].v_PPoster == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Poster";
                }
            if (rows[i].v_PBookmark == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Bookmark";
                }
            if (rows[i].v_PBanner == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "Banner";
                }
            if (rows[i].v_PPhotoBooth == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "PhotoBooth";
                }
            if (rows[i].v_PNotNew == "Yes")
                {
                    if (first == 0)
                        {
                            first = 1;
                        }else{
                            Stringy += ", ";
                        }
                        
                    Stringy += "This is not a new design, please redesign, i think it needs updating!";
                }
            
            //===========================================================
            //Please indicate the following:

            if (rows[i].v_Some == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "I have some ideas, so let's talk . . . Call me at the number listed above";
                }
            if (rows[i].v_HavePho == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "I have photos for you";
                }
            if (rows[i].v_TheLogoMight == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "The logo I need might be in your computer files";
                }
            if (rows[i].v_PleaseDesign == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "Please design a new logo";
                }
            if (rows[i].v_PrintColor == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "I'd like to print this in color";
                }
            if (rows[i].v_BW == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "Black & White is good enough";
                }
            if (rows[i].v_HaveCopy == "Yes")
                {
                    if (Alsofirst == 0)
                        {
                            Alsofirst = 1;
                        }else{
                            AlsoStringy += ", ";
                        }
                        
                    AlsoStringy += "I have copy that I will e-mail to you";
                }
            
            rows[i].WhichPro = Stringy;
            rows[i].PleaseInd = AlsoStringy;
            //console.log(rows[i].WhichPro);
            //console.log(rows[i].PleaseInd);
        }
        
        
        
        
        res.send(JSON.stringify(rows));
        //using with express
        //check facebook
    });
});


//In this version of app.get, the '/' sets the home page when you access the URL/link. 
app.get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
});

//function for adding a new ticket and sending emails
var add_ticket = function (t_Location, t_Department, t_Name, t_Email, t_Phone, t_Program, t_ProgramDate, t_DateToReceive, t_PDisplay, t_PPressRel, t_PBroch, t_PFlyer, t_PPoster, t_PBookmark, t_PBanner, t_PPhotoBooth, t_PNotNew, t_PAsApproved, t_Unlisted, t_Some, t_HavePho, t_TheLogoMight, t_PleaseDesign, t_PrintColor, t_BW, t_HaveCopy, t_Detail, callback){
    
    console.log("connecting");
    db.getConnection(function(err, connection){
        if(err){
            console.log('there was an issue in at the add_ticket section');
            connection.release();
            callback(false);
            return;
        }
            
        console.log("connected");
        
        var ReqVar = [t_Location, t_Department, t_Name, t_Email, t_Phone, t_Program, t_ProgramDate, t_DateToReceive, t_PDisplay, t_PPressRel, t_PBroch, t_PFlyer, t_PPoster, t_PBookmark, t_PBanner, t_PPhotoBooth, t_PNotNew, t_PAsApproved, t_Unlisted, t_Some, t_HavePho, t_TheLogoMight, t_PleaseDesign, t_PrintColor, t_BW, t_HaveCopy, t_Detail];

        connection.query("INSERT INTO `pr_request`.`request` ( `v_Location`, `v_Department`, `v_Name`, `v_Email`, `v_Phone`, `v_Program`, `v_ProgramDate`, `v_DateToReceive`, `v_PDisplay`, `v_PPressRel`, `v_PBroch`, `v_PFlyer`, `v_PPoster`, `v_PBookmark`, `v_PBanner`, `v_PPhotoBooth`, `v_PNotNew`, `v_PAsApproved`, `v_Unlisted`, `v_Some`, `v_HavePho`, `v_TheLogoMight`, `v_PleaseDesign`, `v_PrintColor`, `v_BW`, `v_HaveCopy`, `v_Detail`, `v_Completed`, `v_TimeCreated`) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? ,'OpenSa Ank', NOW())", ReqVar, function(err, rows){
            console.log("sending");
            if(!err) {
                callback(true);
            }
        });
        
        connection.on('error', function(err) {
            console.log("insert issue found");
            callback(false);
            return;
        });
        
        var mailOptions={
            to : 'PR Request <adam.matthews@elyrialibrary.org>',
            subject : t_Location +" PR Request",
            html : "<p>Title: "+t_Program+"</p><p>Location: "+t_Location+"</p><p>Department: "+t_Department+"</p><p>Name: "+t_Name+"</p><p>Email: "+t_Email+"</p><p>Phone: "+t_Phone+"</p><p>Program Date: "+t_ProgramDate+"</p><p>Date wished to receive: "+t_DateToReceive+"</p><br><p>================<p><b>Products needed: </b><p>Display: "+t_PDisplay+"</p><p>Press Release: "+t_PPressRel+"</p><p>Brochure: "+t_PBroch+"</p><p>Flyer: "+t_PFlyer+"</p><p>Poster: "+t_PPoster+"</p><p>Bookmark: "+t_PBookmark+"</p><p>Banner: "+t_PBanner+"</p><p>PhotoBooth: "+t_PPhotoBooth+"</p><p>This is not a new design, please re-design, I think it needs updating!: "+t_PNotNew+"</p><p>As approved by Department Head: "+t_PAsApproved+"</p><p>Project Unlisted Description: "+t_Unlisted+"</p><p>================<p><br><br><p>Please indicate the following: </p><p>I have ideas, Call me: "+t_Some+"</p><p>I have photos for you: "+t_HavePho+"</p><p>The Logo May be on the computer: "+t_TheLogoMight+"</p><p>Please design a new logo: "+t_PleaseDesign+"</p><p>I'd like to print this in color: "+t_PrintColor+"</p><p>Black & White is good enough: "+t_BW+"</p><p>I have a copy that i'll mail to you: "+t_HaveCopy+"</p><p>Detailed Instructions: "+t_Detail+"</p><br><br>",
            from: 'PrRequest <' + t_Email + '>'
        }
        
        var mailOptions={
            to : 'PrReceipt <' + t_Email + '>',
            subject : t_Location +" PR Request",
            html : "<p>Title: "+t_Program+"</p><p>Location: "+t_Location+"</p><p>Department: "+t_Department+"</p><p>Name: "+t_Name+"</p><p>Email: "+t_Email+"</p><p>Phone: "+t_Phone+"</p><p>Program Date: "+t_ProgramDate+"</p><p>Date wished to receive: "+t_DateToReceive+"</p><br><p>================<p><b>Products needed: </b><p>Display: "+t_PDisplay+"</p><p>Press Release: "+t_PPressRel+"</p><p>Brochure: "+t_PBroch+"</p><p>Flyer: "+t_PFlyer+"</p><p>Poster: "+t_PPoster+"</p><p>Bookmark: "+t_PBookmark+"</p><p>Banner: "+t_PBanner+"</p><p>PhotoBooth: "+t_PPhotoBooth+"</p><p>This is not a new design, please re-design, I think it needs updating!: "+t_PNotNew+"</p><p>As approved by Department Head: "+t_PAsApproved+"</p><p>Project Unlisted Description: "+t_Unlisted+"</p><p>================<p><br><br><p>Please indicate the following: </p><p>I have ideas, Call me: "+t_Some+"</p><p>I have photos for you: "+t_HavePho+"</p><p>The Logo May be on the computer: "+t_TheLogoMight+"</p><p>Please design a new logo: "+t_PleaseDesign+"</p><p>I'd like to print this in color: "+t_PrintColor+"</p><p>Black & White is good enough: "+t_BW+"</p><p>I have a copy that i'll mail to you: "+t_HaveCopy+"</p><p>Detailed Instructions: "+t_Detail+"</p><br><br>",
            from: 'PrRequestSystem <adam.matthews@elyrialibrary.org>'
        }
    
    console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
        console.log(error);

        }else{
        console.log("Message sent: " + response.message);
        }
    });
        
        
        connection.release();
        });
};


//function for updating a previously created ticket. 
var update_ticket = function (t_Location, t_Department, t_Name, t_Email, t_Phone, t_Program, t_ProgramDate, t_DateToReceive, t_PDisplay, t_PPressRel, t_PBroch, t_PFlyer, t_PPoster, t_PBookmark, t_PBanner, t_PPhotoBooth, t_PNotNew, t_PAsApproved, t_Unlisted, t_Some, t_HavePho, t_TheLogoMight, t_PleaseDesign, t_PrintColor, t_BW, t_HaveCopy, t_Detail, t_Completed, t_PRCom,  fTicketId, callback){
    
    console.log("we've made it to the update statement");
    db.getConnection(function(err, connection){
        if(err){
            console.log('there was an issue in the update_ticket section');
            connection.release();
            callback(false);
            return;
        }
                   
            
        //t_Location, t_Department, t_Name, t_Email, t_Phone, t_Program, t_Unlisted, t_Completed, v_PRCom
        
        var ReqVar = [t_Department, t_Name, t_Email, t_Phone, t_Program, t_Unlisted, t_Completed, t_PRCom, t_PDisplay, t_PPressRel, t_PBroch, t_PFlyer, t_PPoster, t_PBookmark, t_PBanner, t_PPhotoBooth, t_PNotNew, t_Some, t_HavePho, t_TheLogoMight, t_PleaseDesign, t_PrintColor, t_BW, t_HaveCopy, t_PRCom, fTicketId];
        
        connection.query("UPDATE `pr_request`.`request` SET `v_Location`='"+ t_Location +"', `v_Department`= ? , `v_Name`= ? , `v_Email`= ? , `v_Phone`= ? , `v_Program`= ? , `v_Unlisted`= ? , `v_Completed`= ? , `v_PRCom`= ? , `v_PDisplay`= ? , `v_PPressRel`= ? , `v_PBroch`= ? , `v_PFlyer`= ? , `v_PPoster`= ? , `v_PBookmark`= ? , `v_PBanner`= ? , `v_PPhotoBooth`= ? , `v_PNotNew`= ? , `v_Some`= ? , `v_HavePho`= ? , `v_TheLogoMight`= ? , `v_PleaseDesign`= ? , `v_PrintColor`= ? , `v_BW`= ? , `v_HaveCopy`= ? , `v_PRCom`= ?  WHERE `id`= ? ", ReqVar, function(err, rows){
            connection.release();
            if(!err) {
                console.log("Update completed");
                callback(true);
            }
        });
        
        connection.on('error', function(err) {
            console.log("The Update failed");
            callback(false);
            return;
        });
        });
};
