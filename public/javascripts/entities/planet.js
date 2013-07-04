function Planet(cfg){
  this.name = cfg.name;
  this.altitude = cfg.alt;
  this.azimuth = cfg.azi;
  this.population = cfg.pop || 120000;
  this.government = cfg.govt || "Republic"
  this.leader = cfg.leader || "Governor Cratylus"
  this.symbol = cfg.sym || "MCR"
}

Planet.prototype.getLength = function(){
  return (zenith - this.altitude) * conversionFactor;
}

Planet.prototype.getAngle = function(){
  return this.azimuth;
}

Planet.prototype.updatePosition = function(){
  this.form.position = view.center + this.location;
}

Planet.prototype.drawOrbit = function(){
  this.orbit = new Path.Circle({
    center: view.center,
    radius: this.getLength(),
    strokeColor: "#AFA"
  });
  this.orbit.dashArray = [10,4];
}

Planet.prototype.removeOrbit = function(){
  this.orbit.remove();
}

Planet.prototype.render = function(){

  this.location = new Point({ length: this.getLength(), angle: this.getAngle() });

  if(this.name != "Ebla"){
    this.form = new Path.Circle({
      center: view.center + this.location,
      radius: 7,
      strokeColor: "yellow",
      fillColor: "#CCC"
    });
  } else {
    this.form = new Path.Circle({
      center: view.center,
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
}

//Static view = sky as seen at midnight from the Northern hemisphere of capital planet
//length = altitude; angle = azimuth;
//Zenith is at length of 90; Capital planet itself is represented at Zenith
zenith = 90;
conversionFactor = 2;

Planets = planets.map(function(p){
  return new Planet(p);
});

Planets.forEach(function(p){
  p.render();
});

var a = new Point({length: 5, angle: 90});

var c = new Point({length: 90, angle: 90});

horizon = new Path.Circle({
  center: view.center,
  radius: 100 * conversionFactor,
  strokeColor: "DDD",
  strokeWidth: 3,
  opacity: .5
});

function onResize(e){
  horizon.position = view.center;
  Planets.forEach(function(p){
    p.updatePosition();
  });
}

function onFrame(e){
  Planets.forEach(function(p){
    p.c.rotate(.03, view.center);
  });
}

