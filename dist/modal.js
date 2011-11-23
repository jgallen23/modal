/*!
  * Modal - A basic modal
  * v0.0.5
  * https://github.com/jgallen23/modal
  * copyright JGA 2011
  * MIT License
  */

/*
Fidel.Modal = Fidel.ViewController.extend({
  defaults: {
    id: 'FidelModalOverlay'
  },
  init: function() {
    $("body").delegate('#'+this.id, 'click', this.proxy(this.close));
  },
  close: function() {
    this._overlay.remove();
    this.emit('close');
  },
  showOverlay: function() {
    this._overlay = $('<div id="'+this.id+'"><div></div></div>');
    this._overlay.appendTo('body');
    return this._overlay;
  },
  showImage: function(e) {
    var $overlay = this.showOverlay();
    var img = e.target.parentNode.getAttribute('data-image');
    $overlay.find('div').css('background-image', 'url('+img+')');
    setTimeout(function() {
      $overlay.addClass('zoom');
      setTimeout(function() {
        $overlay.addClass('normal');
      }, 300);
    }, 50);
  },
  showModal: function(e) {
    var $overlay = this.showOverlay();
    var $node = $("#"+e.target.getAttribute('data-modal'));
    $overlay.css('opacity', '1');
    var windowH = $(window).height();
    var windowW = $(window).width();
    $node.show().css({
      'z-index': 1001,
      'position': 'absolute',
      'top': (windowH-$node.height())/2,
      'left': (windowW-$node.width())/2
    });
    var self = this;
    var handle = this.on('close', function() { //should switch to once
      $node.hide();
      self.removeListener(handle);
    });
  }
});
*/
var id = 'ModalOverlay';
var overlay = null;
var options = {
  'backgroundColor': 'rgba(0,0,0,.9)'
  //'background-color': 'rgba(98,102,109,.8)', //tmp for KS
};

var showOverlay = function() {
  if (overlay)
    overlay.remove();
  overlay = $('<div id="'+id+'"><div></div></div>');
  overlay.css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    'background-color': options.backgroundColor,
    'z-index': 1000,
    opacity: 0
  });
  overlay.bind('click', close);
  overlay.appendTo('body');
  return overlay;
};

var animate = function($node) {
  $node.addClass('ModalNone');
  setTimeout(function() {
    $node.addClass('ModalZoom');
    setTimeout(function() {
      $node.addClass('ModalNormal');
      setTimeout(function() {
        $node.removeClass('ModalZoom');
        $node.removeClass('ModalNone');
        $node.removeClass('ModalNormal');
      }, 500);
    }, 300);
  }, 50);
};

var showInline = function($node) {
  var $overlay = showOverlay();
  $overlay.css('opacity', '1');
  var windowH = $(window).height();
  var windowW = $(window).width();
  $node.show().css({
    'z-index': 1001,
    'position': 'fixed',
    'top': (windowH-$node.height())/2,
    'left': (windowW-$node.width())/2
  });

  animate($node);

  $('body').one('modalClose', function() {
    $node.hide();
  });
};

var showiFrame = function(elem) {
  var src = elem.attr('href');
  var $node = $("<iframe/>")
      .addClass('ModalContainer')
      .attr('src', src)
      .css('border', 0);
  if (elem.attr('data-modal-size')) {
    var size = elem.attr('data-modal-size').split('x');
    $node.css({
      width: size[0],
      height: size[1]
    });
  }
  $('body').append($node);
  showInline($node);
};

var show = function(e) {
  var elem = $(e.target);
  var type = elem.attr('data-modal');
  if (type == 'inline') {
    var $node = $(elem.attr('data-modal-container'));
    showInline($node);
  } else if (type == 'iframe') {
    showiFrame(elem);
  }
  window.location.hash = "#modal";
  return false;
};

var close = function() {
  window.location.hash = "";
  overlay.remove();
  $('body').trigger('modalClose');
};

var attach = function(elements) {
  elements.bind('click', show);
};

//init
$(function() {
  attach($("[data-modal]"));
  $('body').delegate('[data-modal-close]', 'click', close);
});

//public
var modal = {
  attach: attach,
  close: close,
  options: options
};
