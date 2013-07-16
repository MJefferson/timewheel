

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
  p.alliances.selected = true;
  p.alliances.onFrame = function(){
    this.rotate(MW.settings.map.rotationDelta, divineCenter);
  }
}

function redrawAlliance(planet){
  planet.alliances = null;
  drawAlliance.call(planet);
}

Planets.forEach(function(p){
  d = drawAlliance.bind(p);
  p.form.on('doubleclick', d);
});

paper.view.on('resize', function(){
  Planets.forEach(function(p){
    if(p.alliances){
      p.alliances.remove();
      redrawAlliance(p);
    }
  });  
});
