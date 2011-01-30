(function( $ ){
  $.fn.template = function(name, data) {
        var template = $('.templates .' + name).first().html();
        return this.append(Mustache.to_html(template, data));
  };
})( jQuery );

