(function(){
  function Timewheel(){
    this.settings = {
      isPaused: false
    };
    this.settings.map = {
      panningEnabled: false,
      defaultZoom: 3,
      zenith: 90,
      conversionFactor: 2
    };
  }

  // state-related methods
  // 
  // 
  Timewheel.prototype.pause = function(){
    if(!this.settings.isPaused){
      //do ui things
      this.settings.isPaused = true;
      this.ui.toggleTopMenu();
      this.ui.toggleOverlay(); 
      this.ui.toggleMapToolbar();
      this.ui.toggleMapToolbarOverlay(); 
    }
  };

  Timewheel.prototype.resume = function(){
    if(this.settings.isPaused){
      this.settings.isPaused = false;
      this.ui.toggleTopMenu();
      this.ui.toggleOverlay(); 
      this.ui.toggleMapToolbar();
      this.ui.toggleMapToolbarOverlay(); 
    }
  };

  // ui-related methods
  // 
  //
  var ui = Timewheel.prototype.ui =  {};

  ui.toggleGameState = function(){
    this.ui.toggleTopMenu();
    this.ui.toggleOverlay(); 
    this.ui.toggleMapToolbar();
    this.ui.toggleMapToolbarOverlay(); 
  };

  ui.toggleTopMenu = function(){
    $("h1.main-header").toggleClass("collapsed-state"); 
  };

  ui.toggleOverlay = function(){
    $(".canvas > .overlay").toggleClass("active");
  };

  ui.toggleMapToolbar = function(){
    $("#map-toolbar").toggleClass("inactive");
  };

  ui.toggleMapToolbarOverlay = function(){
    $("#map-toolbar-overlay").toggleClass("active");
  };


  //export a single global object
  window.Timewheel = Timewheel;
})();
