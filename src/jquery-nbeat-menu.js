/**
 * NBeat Menu 1.0
 *
 * NBeat Menu is a jQuery plugin that handles the behavior of the main
 * menu usually drawn up by our designers.
 *
 * Copyright (c) 2016 Nova Consulting Group
 * Authors: Eirik Refsdal <eirik@nbeat.no>
 *
 */
(function($) {

    $.nbeatmenu = function(container, options) {
        this.init(container, options);
    };



    $.extend($.nbeatmenu.prototype, {

        /**
         * @property {object} settings
         *           Configuration settings
         * @property {string} settings.cssClass
         *           CSS classname for the element
         */
        settings: {
            cssClass: "nbeatmenu",
            formId: null,
            
            inputIdTransform: function(id)
            {
                return id + "_nbeatmenu";
            },

            inputNameTransform: function(name)
            {
                return;
            },
        },

        /**
         * @property {boolean} debug
         *           Turn on/off internal debugging to console
         */
        debug: false,

        /**
         * @property {jquery} container
         *           jQuery selector object for container
         */
        container: null,

        /**
         * @property {object} button
         *           Clickabe menu button
         */
        button: null,

        /**
         * @property {object} menu
         *           The actual menu itself
         */
        menu: null,

        /**
         * @property {bool} isopen
         *           Is the menu open?
         */
        isopen: false,


        
        /**
         * Initialize the component
         *
         * @param {jQuery} input
         *        jQuery selector for DOM element
         * @param {Object} options
         *        Object with configuration options
         */
        init: function(container, options)
        {
            this.settings = $.extend({}, this.settings, options);
            this.container = $(container);
            this.button = $(".menu-button", this.container)
            this.menu = $(".menu-data", this.container)
            this.handleEvents();
        },


        
        /**
         * Event handling
         *
         * The most important method in this whole plugin. Controls
         * and decides how the dropdown list behaves, reacts to
         * events, and so on.
         */
        handleEvents: function()
        {
            var self      = this;
            var fButton   = false;
            var fMenu     = false;
            var fDocument = false;

            // Handle clicks on the menu button
            this.button.on("click touchstart", function(event) {
                if (!fButton) {
                    fButton = true;
                    setTimeout(function() {
                        fButton = false;
                    }, 100);
                    
                    self.menu.toggleClass("visible");
                    if (self.isopen === false) {
                        self.isopen = true;
                    } else {
                        self.isopen = true;
                    }                        
                }
                
                return false;
            });

            // Handle clicks on menu links
            this.menu.on("click touchstart", function(event) {
                var fMenu = false;
                
                if (!fMenu) {
                    fMenu = true;
                    setTimeout(function() {
                        fMenu = false;
                    }, 100);

                    // console.log("click on menu");
                }

                event.stopPropagation();
            });

            // Close the menu for clicks outside the menu
            $(document.body).on("click touchstart", function(event) {
                if (self.isopen) {
                    var fDocument = false;
                    
                    if (!fDocument) {
                        fDocument = true;
                        setTimeout(function() {
                            fDocument = false;
                        }, 100);
                        
                        self.menu.removeClass("visible");
                    }
                }
            });
        },



        /**
         * Log debug messages
         */
        log: function(msg)
        {
            if (true === this.debug) {
                console.log(msg);
            }
        }
    });


    
    /**
     * The exposed jQuery function
     *
     * @param {Object}
     *        Object with configuration options
     */    
    $.fn.nbeatmenu = function(options) {
        this.each(function() {
            $(this).data("nbeatmenu", new $.nbeatmenu(this, options));
        });
        return this;
    };
})(jQuery);
