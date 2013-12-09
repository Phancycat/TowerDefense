
// Tower upgrade costs:
var SingleTowerL2 = 500;
var StatusTowerL2 = 500;
var AreaTowerL2   = 500;

var SingleTowerL3 = 2000;
var StatusTowerL3 = 1000;
var AreaTowerL3   = 1500;

var SingleTowerSpec1 = 200;
var SingleTowerSpec2 = 300;

var StatusTowerSpec1 = 250;
var StatusTowerSpec2 = 300;

var AreaTowerSpec1   = 150;
var AreaTowerSpec2   = 250;

var Button = Class.create(Sprite, {
   initialize: function(assetIndex, x, y, width, height) {
      Sprite.apply(this, [width, height]);
      
      this.image = Game.instance.assets[assetIndex];
      this.x = x;
      this.y = y;
   }
});

var SingleTowerBuy = Class.create(Button, {
   initialize: function() {
      Button.apply(this, ['assets/ui/singletowerbuy.png', 320, 600, 50, 50]);
      
      this.tower = null;
      
      this.addEventListener(Event.TOUCH_END, this.placeTower);
   },
   
   placeTower: function(event) {
      if (event.y < 64 * 8
         && this.parentNode.parentNode.map.checkTile(event.x, event.y) == 36) {
         this.parentNode.parentNode.towers.addChild(new SingleTower('assets/towers/industrialRanged1.png', event.x, event.y));
      }
   }
});

/*var StatusTowerBuy = Class.create(Button, {
   initialize: function() {
      Button.apply(this, ['assets/ui/UI_Buttons.png', 320, 600]);
      
      this.tower = null;
      
      this.addEventListener(Event.TOUCH_END, this.placeTower);
   },
   
   placeTower: function(event) {
      if (event.y < 64 * 8
         && this.parentNode.parentNode.map.checkTile(event.x, event.y) == 36) {
         this.parentNode.parentNode.towers.addChild(new StatusTower('assets/towers/industrialStatus1.png', event.x, event.y));
      }
   }
});*/

var MenuScreen = Class.create(Scene, {
   initialize: function() {
      Scene.apply(this);
      this.PlayerGold = 0;
      this.SingleTowerLevel = 1;
      this.AreaTowerLevel   = 1;
      this.StatusTowerLevel = 1;
      
      // Add UI Elements //   
   },
   
   checkGold: function(cost) {
      return (cost < this.PlayerGold);
   },
   
   upgradeSingle: function() {
      switch (SingleUpgradeLevel) {
         case 1: if (this.checkGold(SingleTowerL2)) {
               this.PlayerGold -= SingleTowerL2;
               SingleUpgradeLevel++;
            }
            break;
         case 2: if (this.checkGold(SingleTowerL3)) {
               this.PlayerGold -= SingleTowerL3;
               SingleUpgradeLevel++;
               // REMOVE UI UPGRADE ELEMENT
            }
            break;
      }
   },
   
   upgradeStatus: function() {
      switch (StatusUpgradeLevel) {
         case 1: if (this.checkGold(StatusTowerL2)) {
               this.PlayerGold -= StatusTowerL2;
               StatusUpgradeLevel++;
            }
            break;
         case 2: if (this.checkGold(StatusTowerL3)) {
               this.PlayerGold -= StatusTowerL3;
               StatusUpgradeLevel++;
               // REMOVE UI UPGRADE ELEMENT
            }
            break;
      }
   },
   
   upgradeArea: function() {
      switch (AreaUpgradeLevel) {
         case 1: if (this.checkGold(AreaTowerL2)) {
               this.PlayerGold -= AreaTowerL2;
               AreaUpgradeLevel++;
            }
            break;
         case 2: if (this.checkGold(AreaTowerL3)) {
               this.PlayerGold -= AreaTowerL3;
               AreaUpgradeLevel++;
               // REMOVE UI UPGRADE ELEMENT
            }
            break;
      }
   }
});

var NextLevel = Class.create(Button, {
   initialize: function() {
      Button.apply(this, ['assets/ui/Resume.png', 102, 29]);
   }
});

var PauseScreen = Class.create(Scene, {
   initialize: function() {
      Scene.apply(this);
      
      var pScreen = new UIPause();
		pScreen.x = 220; pScreen.y = 245;
		this.addChild(pScreen);
		
		var rButt = new ResumeButton(pScreen);
		rButt.x = 268; rButt.y = 358;
		this.addChild(rButt);
   }
});


var PauseButton = Class.create(Button, {
	initialize: function() {
		Sprite.apply(this, [20, 20]);
		this.image = Game.instance.assets['assets/ui/Pause.png'];
		this.frame = 0;
		
		this.addEventListener(Event.TOUCH_END, this.pauseGame);	
	},
	
	pauseGame: function() {
      Game.instance.pushScene(PAUSE_SCREEN);
	}
});

var ResumeButton = Class.create(Button, {
	initialize: function(pScreen) {
		Sprite.apply(this, [102, 29]);
		this.image = Game.instance.assets['assets/ui/Resume.png'];
		this.frame = 0;
		
		this.addEventListener(Event.TOUCH_START, this.clickOn);
		this.addEventListener(Event.TOUCH_END, this.clickOff);
		this.addEventListener(Event.TOUCH_END, function(){this.resumeGame(pScreen)});		
	},
	
	clickOn: function() {
		this.frame = 1;
	},
	
	clickOff: function(){
		this.frame = 0;
	},
	
	resumeGame: function(pScreen) {
		Game.instance.popScene();
	}
});

var UIOverlay = Class.create(Sprite, {
	initialize: function() {
		Sprite.apply(this, [640, 70]);
		this.image = Game.instance.assets['assets/ui/Overlay.png'];
		this.frame = 0;	
	}
});

var UIPause = Class.create(Sprite, {
	initialize: function() {
		Sprite.apply(this, [200, 150]);
		this.image = Game.instance.assets['assets/ui/PauseScreen.png'];
		this.frame = 0;
	}
});

var UIButtons = Class.create(Button, {
	initialize: function() {
		Sprite.apply(this, [65, 50]);
		this.image = Game.instance.assets['assets/ui/ButtonTemplate.png'];
		this.frame = 0;
		
		this.addEventListener(Event.TOUCH_START, this.clickOn);
		this.addEventListener(Event.TOUCH_END, this.clickOff);
	},
	
	clickOn: function() {
		this.frame = 1;
	},
	
	clickOff: function(){
		this.frame = 0;
	}
});

var UIResource = Class.create(Sprite, {
	initialize: function() {
		Sprite.apply(this, [640, 40]);
		this.image = Game.instance.assets['assets/ui/Resource.png'];
		this.frame = 0;
	}
	
	//Lives label
	
	//Gold label
	
	//Current Wave label
	
	//Spawn next wave button
	
	//Misc?
});
