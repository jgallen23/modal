/*!
  * Fidel Modal - A basic modal for the fidel library
  * v0.0.4
  * https://github.com/jgallen23/fidel.modal
  * copyright JGA 2011
  * MIT License
  */

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
