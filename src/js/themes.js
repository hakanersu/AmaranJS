var Themes = {
  default: function(){
        return '<div class="amaran <%this.template%>">'+
            '<div class="default-spinner">'+
            '<span style="background-color:<% if(typeof this.color == "undefined"){%>#27ae60<%}else{%><%this.color%><%}%>"></span>'+
            '</div>'+
            '<div class="default-message">'+
            '<span><%this.content%></span>'+
            '</div>'+
            '</div>';
      }
};
