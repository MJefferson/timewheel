

function drawAlliance(){
  var p = this;
  var vectors = [];

  Planets.forEach(function(planet){
    if(planet.name != p.name){
      var vector = new Path.Line(p.form.position, planet.form.position);
      vector.strokeColor = "#966";

      vectors.push(vector);
    }
  }); 
  
  p.alliances = new Group(vectors);
  p.alliances.moveBelow(planetForms);
  p.alliances.onFrame = function(){
    this.rotate(MW.settings.map.rotationDelta, divineCenter);
  }
}

Planets.forEach(function(p){
  d = drawAlliance.bind(p);
  p.form.on('doubleclick', d);
});
