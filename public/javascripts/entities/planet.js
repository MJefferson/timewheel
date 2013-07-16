//= require_self
//= require state_vectors
//
//Static view = sky as seen at midnight from the Northern hemisphere of capital planet
//length = altitude; angle = azimuth;
//Zenith is at length of 90; Capital planet itself is represented at Zenith
var zenith = MW.settings.map.zenith;
var conversionFactor = MW.settings.map.conversionFactor;
var divineCenter = view.center;

var horizon = new Path.Circle({
  center: divineCenter,
  radius: 100 * conversionFactor,
  strokeColor: "DDD",
  strokeWidth: 3,
  fillColor: "#333",
  opacity: 0.9
});

var planetForms = new Group();

function Planet(cfg){
  this.name = cfg.name;
  this.altitude = cfg.alt;
  this.azimuth = cfg.azi;
  this.population = cfg.pop || 120000;
  this.government = cfg.govt || "Republic";
  this.leader = cfg.leader || "Governor Cratylus";
  this.symbol = cfg.sym || "MCR";
}

Planet.prototype.getLength = function(){
  return (zenith - this.altitude) * conversionFactor;
};

Planet.prototype.getAngle = function(){
  return this.azimuth;
};

Planet.prototype.updatePosition = function(){
  this.form.position = divineCenter + this.location;
};

Planet.prototype.drawOrbit = function(){
  this.orbit = new Path.Circle({
    center: divineCenter,
    radius: this.getLength(),
    strokeColor: "#CCC"
  });
  this.orbit.dashArray = [10,12];
  this.orbit.moveBelow(this.form);
};

Planet.prototype.removeOrbit = function(){
  this.orbit.remove();
};

Planet.prototype.render = function(){

  this.location = new Point({ length: this.getLength(), angle: this.getAngle() });

  if(this.name != "Ebla"){ //or whatever the capitol is now.
    this.form = new Path.Circle({
      center: divineCenter + this.location,
      radius: 7,
      strokeColor: "yellow",
      fillColor: "#CCC"
    });
  } else {
    this.form = new Path.Circle({
      center: divineCenter,
      radius: 9,
      strokeColor: "white",
      strokeWidth: 2,
      fillColor: "#999"
    });
    this.form.dashArray = [8,2];
  }

  this.form.onClick = function(){
    $("#planet-info").show();
    $("#planet-info").html(planetInfoTemplate(this));
    $("#planet-info a#close-info").click(function(){ $("#planet-info").hide(); });
  }.bind(this);

  this.form.onMouseEnter = function(){ this.drawOrbit(); }.bind(this);
  this.form.onMouseLeave = function(){ this.removeOrbit(); }.bind(this);
  planetForms.addChild(this.form);
};


Planets = planets.map(function(p){
  return new Planet(p);
});

Planets.forEach(function(p){
  p.render();
});


function resetDivineCenter(){
  divineCenter = view.center;
}

function orientToCenter(){
  horizon.position = divineCenter;
  Planets.forEach(function(p){
    p.updatePosition();
  });
}

function rotateAroundCenter(){
  if(!MW.settings.isPaused){
    Planets.forEach(function(p){
      p.form.rotate(MW.settings.map.rotationDelta, divineCenter);
    });
  }
}

view.on('resize', resetDivineCenter);
view.on('resize', orientToCenter);
view.on('frame', rotateAroundCenter);

function onMouseDrag(e){
  if(MW.settings.map.panningEnabled){
    var d = e.delta / 3;
    view.scrollBy(d);
  }
}
