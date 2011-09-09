/*!
  * Fidel Modal - A basic modal for the fidel library
  * v0.0.1
  * https://github.com/jgallen23/fidel-modal
  * copyright JGA 2011
  * MIT License
  */

Fidel.Modal = Fidel.ViewController.extend({
  defaults: {
    id: 'FidelModalOverlay'
  },
  init: function() {
    $('#'+this.id).live('click', this.proxy(this.close));
  },
  close: function() {
    this._overlay.remove();
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
  }
});
