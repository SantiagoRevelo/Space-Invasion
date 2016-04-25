function FireBaseStuff() {
    this.SCORES_SHOWED = 10;
    this.ref;
    this.scoresListValues;
};

FireBaseStuff.prototype.preload = function() {
    this.ref = new Firebase('https://spaceinvasion.firebaseio.com/');
        
    // Traemos las mejores puntuaciones ordenadas
    //FireBaseStuff.scoresListValues = this.ref;    
    
    // Attach an asynchronous callback to read the data at our posts reference
    this.ref.orderByChild('score').limitToLast(this.SCORES_SHOWED).on("value", this.updateValues.bind(this), function (errorObject) {
        console.log("Error de lectura de los datos de Firebase: " + errorObject.code);
    });    
    //console.log('Iniciadas las puntuaciones Online');
};

FireBaseStuff.prototype.updateValues = function(snapshot) {
        this.scoresListValues = snapshot.val();
        //console.log(snapshot.val());
}

FireBaseStuff.prototype.addScore = function(theName, theScore) {        
  //this.ref.push({'name':theName, 'score':theScore });
  this.ref.child(theName + '-' + theScore).set({'name':theName, 'score':theScore });
};

FireBaseStuff.prototype.getLeaderBoard = function() {
    var cleanList = [];
    for(var i in fbs.scoresListValues) cleanList.push(fbs.scoresListValues[i]);
    
    return cleanList.sort(this.compare); 
};

FireBaseStuff.prototype.compare = function(a, b) {
    return (a.score > b.score)? -1 : (a.score < b.score)? 1 : 0;
}

fbs = new FireBaseStuff();