Fidel.Modal = Fidel.ViewController.extend({
  defaults: {
    id: 'FidelModalOverlay'
  },
  init: function() {
    $("body").delegate('#'+this.id, 'click', this.proxy(this.close));
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
