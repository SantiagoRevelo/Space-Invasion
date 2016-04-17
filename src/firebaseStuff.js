function FireBaseStuff() {
    this.SCORES_SHOWED = 10;
    this.scoreListRef;
    this.scoresListValues = [];
};

FireBaseStuff.prototype.preload = function() {
    this.scoreListRef = new Firebase('https://spaceinvasion.firebaseio.com/');
    
     
    //this.scoreListRef.push({ name:the_name, score:the_score });
    
    this.scoresListValues = this.scoreListRef.orderByChild('score').limitToLast(this.SCORES_SHOWED);
    
    // Add a callback to handle when a new score is added.
    this.scoreListRef.on('child_added', function(newScoreSnapshot, prevScoreName) {
        FireBaseStuff.prototype.handleScoreAdded(newScoreSnapshot, prevScoreName);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    
    // Attach an asynchronous callback to read the data at our posts reference
    this.scoreListRef.on("value", function(snapshot) {
        console.log(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    
    console.log('Online scores initialized');
};

FireBaseStuff.prototype.handleScoreAdded = function(newScoreSnapshot, prevScoreName) {
   // console.log('Scores Updated: ' + newScoreSnapshot.key() + ":" + newScoreSnapshot.val().name + "-" + newScoreSnapshot.val().score + "\n prevscorename: " + prevScoreName );
};

FireBaseStuff.prototype.addScore = function(theName, theScore) {
        
    this.scoreListRef.push({ name:theName, score:theScore });
};

FireBaseStuff.prototype.getLeaderBoard = function() {
    
};

fbs = new FireBaseStuff();