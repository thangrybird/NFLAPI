var roster = window.roster || {};
roster.entryBar = document.getElementById('#my_entry');

roster.entry = {
  name: 'SirRaptor',
  stats: {
    score: 0,
    rank: '99999'
  },
  leagues: {
    league: {
      name: 'Raptor Raging',
      members: '1000',
      id: 1
    }
  },
  fill: function() {
    if(roster.entryBar){
      
    }
  }
};

roster.picks = {
  1: {
    id: '646',
    name: {
      first: 'Eli',
      last: 'Manning',
      full: 'Eli Manning'
    },
    team: {
      name: 'giants',
      home: 'new york',
      nickname: 'nyg'
    },
    nfl_image: 'http://static.nfl.com/static/content/public/image/getty/headshot/M/A/N/MAN473170.jpg',
    position: {
      id: 1
    }
  },
  2: {
    id: '382',
    name: {
      first: 'Arian',
      last: 'Foster',
      full: 'Arian Foster'
    },
    team: {
      name: 'texans',
      home: 'houston',
      nickname: 'hou'
    },
    nfl_image: 'http://static.nfl.com/static/content/public/image/getty/headshot/F/O/S/FOS107404.jpg',
    position: {
      id: 2
    }
  },
  4: {
    id: '106',
    name: {
      first: 'Fred',
      last: 'Jackson',
      full: 'Fred Jackson' 
    },
    team: {
      name: 'bills',
      home: 'buffalo',
      nickname: 'buf'
    },
    nfl_image: 'http://static.nfl.com/static/content/public/image/getty/headshot/J/A/C/JAC173789.jpg',
    position: {
      id: 2
    }
  }
};

roster.positions = {
  1: 'QB',
  2: 'RB',
  3: 'WR',
  4: 'TE',
  5: 'DEF',
  6: 'K',
  slots: {1:1, 2:2, 3:2, 4:3, 5:3, 6:4, 7:6, 8:5},
  has_filled: {1:'', 2:'', 3:'', 4:'', 5:'', 6:'', 7:'', 8:''},
  fill: function() {
    var message = "Positions:\n\r";
    // fill in picks
    for(var player in roster.picks) {
      this.has_filled[player] = roster.picks[player].id;
    }
    
    // return picked
    for(var position in this.has_filled) {
      var slotElm = document.querySelector('.slot[data-slot-id="'+position+'"]'),
          positionId = this.slots[position];
      if(this.has_filled[position] != '') {
        var slotContent = renderPlayer(positionId, roster.picks[position]);
        
        slotElm.classList.toggle("empty");
        slotElm.setAttribute('data-position-player-id', roster.picks[position].id);
        slotElm.innerHTML = slotContent;
        message += "\t" + roster.entry.name + "'s " + this[roster.picks[position].position.id] + " position has been filled with: " + roster.picks[position].name.full + "!\n";
      }else{
      slotElm.innerHTML = renderPlayer(positionId);
      }
    }
    console.log(message);
  }
};

function renderPlayer(position, player) {
  var template;
  template = "<header class=\"slot label\">"+roster.positions[position]+"</header>\n";
  if(player === undefined) {
    template +=  "<span class=\"player\">\n";
    template += "\t<a href=\"#\" class=\"player select\">Select Player</a>";
    template += "\t<span class=\"player slot-status\">---empty---</span>\n";
    template += "</span>";
  }else{
    template +=  "<span class=\"player "+player.team.nickname+"\">\n";
    template += "\t<span class=\"player headshot\"><img src=\""+player.nfl_image+"\" title=\""+player.name+"\"/></span>\n";
    template += "\t<span class=\"player name\">";
    template += "\t\t<span class=\"name first\">"+player.name.first+"</span>\n";
    template += "\t\t<span class=\"name last\">"+player.name.last+"</span>";
    template += "\t</span>\n";
    template += "\t<span class=\"player game-status\">TBA</span>\n";
    template += "\t<span class=\"player points\">--</span>\n";
    template += "</span>"; 
  }
  
  return template;
}