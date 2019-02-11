(function ($) {
    
    /**
     * a11y Jump Menu plugin for jQuery
     *
     * @author: Eirik Refsdal <eirik@nbeat.no>
     */
    $.fn.a11yJumpMenu = function()
    {
        var $el = this;
        
        this.addClass("a11y-jump-menu");
        this.attr("tabindex", 0);
                
        this.$fixture = $([
            '<div class="a11y-skip-nav">',
            '  <ul class="a11y-toolbar" role="menubar">',
            '    <li role="presentation">',
            '      <a class="menu-item" role="button" id="a11y-jump-to-link" aria-haspopup="true" href="#" aria-controls="a11y-sub-menu" tabindex="0">',
            '        Gå til innhold &#8964;',
            '      </a>',
            '      <ol id="a11y-sub-menu" role="menu" class="a11y-hidden" aria-expanded="false">',
            '      </ol>',
            '    </li>',
            '    <li class="details" role="presentation">',
            '      <a class="menu-item" id="a11y-feedback" href="mailto:">Gi oss tilbakemelding om tilgjengelighet</a>',
            '      <button id="a11y-menu-close" class="close menu-item" role="button">Lukk meny</button>',
            '    </li>',
            '  </ul>',
            '</div>'
        ].join("\n"));
        this.html(this.$fixture);

        // Find headings/links
        var counter = 1;
        $("h1, h2").each(function() {
            var id = $(this).attr("id");
            var title = $(this).text();

            if (typeof id === typeof undefined || id === false) {
                id = "hdr-" + counter;
                ++counter;
                $(this).attr("id", id);
            }
            
            $("#a11y-sub-menu").append('<li role="menuitem"><a class="sub-item" tabindex="0" href="#' + id + '">' + title + '</a></li>');
        });

        // Open the menu bar
        this.on("focus", function() {
            $("#a11y-jump-to-link").focus();
            $el.addClass("visible");
        });

        $("#a11y-menu-close").on("click", function(e) {
            if (e.handled !== true) {
                $el.removeClass("visible");
                e.handled = true;
            }
        });

        // Go left/right in menubar
        $(".a11y-toolbar .menu-item").on("keydown", function(e) {
            var id = $(this).attr("id");
            
            if (e.handled !== true) {
                if (39 == e.keyCode) {
                    if ("a11y-jump-to-link" == id) {
                        $("#a11y-feedback").focus();
                    } else if ("a11y-feedback" == id) { 
                        $("#a11y-menu-close").focus();
                    }
                } else if (37 == e.keyCode) {
                    if ("a11y-menu-close" == id) {
                        $("#a11y-feedback").focus();
                    } else if ("a11y-feedback" == id) { 
                        $("#a11y-jump-to-link").focus();
                    }
                }
            }
        });

        // Open submenu on down or tab
        $("#a11y-jump-to-link").on("keydown", function(e) {
            if (e.handled !== true) {
                var isHidden = $("#a11y-sub-menu").hasClass("a11y-hidden");

                if (isHidden) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (40 == e.keyCode || 9 == e.keyCode) {
                        $("#a11y-sub-menu").attr("aria-expanded", true);
                        $("#a11y-sub-menu").removeClass("a11y-hidden");
                        $("#a11y-sub-menu .sub-item").first().focus();

                        e.handled = true;
                    }
                } else if (40 == e.keyCode) {
                    e.preventDefault();
                    e.stopPropagation();
                    $("#a11y-sub-menu .sub-item").first().focus();
                }
            }
        });
        $("#a11y-sub-menu .sub-item").each(function(i) {
            $(this).on("keydown", function(e) {
                if (e.handled !== true) {
                    if (40 == e.keyCode) {
                        e.preventDefault();
                        e.stopPropagation();
                    
                        // console.log("down");
                        $(this).parent().next().children("a").first().focus();
                        
                        e.handled = true;
                    } else if (38 == e.keyCode) {
                        e.preventDefault();
                        e.stopPropagation();

                        // console.log("up");
                        $(this).parent().prev().children("a").first().focus();
                        // $(this).prevUntil(".sub-item").focus();
                        
                        e.handled = true;
                    } else if (39 == e.keyCode) {
                        $("#a11y-feedback").focus();
                    }
                }
            });
        });
        $("#a11y-jump-to-link").on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (e.handled !== true) {
                $("#a11y-sub-menu").attr("aria-expanded", true);
                $("#a11y-sub-menu").removeClass("a11y-hidden");
                e.handled = true;
            }
        });

        $("#a11y-menu-close").on("focus", function(e) {
            if (e.handled !== true) {
                $el.addClass("visible");
                e.handled = true;
            }
        });

        $($el).on("keydown", function(e) {
            if (e.keyCode == 27) { // esc
                // console.log("esc");

                if (e.handled !== true) {
                    $el.removeClass("visible");
                    e.handled = true;
                }
            }
        });

        return this;
    }
}(jQuery));
