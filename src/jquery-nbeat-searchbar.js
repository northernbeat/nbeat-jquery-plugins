/**
 * NBeat Search Bar 1.0
 *
 * NBeat Search Bar is a jQuery plugin that handles the behavior of an
 * expandable search bar.
 *
 * Copyright (c) 2016 Northern Bar
 * Authors: Eirik Refsdal <eirik@nbeat.no>
 *
 */
(function($) {

    $.nbeatsearchbar = function(container, options) {
        this.init(container, options);
    };



    $.extend($.nbeatsearchbar.prototype, {

        /**
         * @property {object} settings
         *           Configuration settings
         * @property {string} settings.cssClass
         *           CSS classname for the element
         */
        settings: {
            cssClass: "nbeatsearchbar",
            formId: null,
            
            inputIdTransform: function(id)
            {
                return id + "-nbeatsearchbar";
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
         * @property {object} submit
         *           Clickable submit button
         */
        submit: null,

        /**
         * @property {object} input
         *           The input field
         */
        input: null,

        /**
         * @property {object} icon
         *           The icon
         */
        icon: null,

        /**
         * @property {object} input
         *           The input field
         */
        form: null,

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
            this.submit = $(".menu-search-submit", this.container)
            this.input = $(".menu-search-input", this.container)
            this.icon = $(".menu-search-icon", this.container)
            this.form = $("form", this.container)
            this.handleEvents();
        },


        
        /**
         * Event handling
         */
        handleEvents: function()
        {
            var self       = this;
            var fContainer = false;
            var fInput     = false;
            var fSubmit    = false;

            // Handle clicks on the collapsed container/icon
            this.container.on("click touchstart focus", function(event) {
                if (!fContainer) {
                    fContainer = true;
                    setTimeout(function() {
                        fContainer = false;
                    }, 100);
                    
                    if (self.isopen === false) {
                        event.stopPropagation();
                        self.container.addClass("expanded");
                        self.isopen = true;
                        self.expand();

                        return false;
                    }              
                }
            });

            // Collapse when the input loses focus
            this.input.on("focusout", function(event) {
                var target = event.relatedTarget;
                
                if (!fInput) {
                    fInput = true;
                    setTimeout(function() {
                        fInput = false;
                    }, 100);

                    // FIXME: Hack for now to handle clicks on submit button when expanded
                    if (target && target.className && "menu-search-submit" === target.className) {
                        this.form.submit();
                        return;
                    }
                    
                    if (self.isopen === true) {
                        self.container.removeClass("expanded");
                        self.isopen = false;
                        self.collapse();
                    }              
                }
            });
        },


        expand: function()
        {
            this.input.focus();
            this.container.removeAttr("tabindex");
        },


        collapse: function()
        {
            this.container.attr("tabindex", 0);
        },



        /**
         * Log debug messages
         */
        log: function(msg)
        {
            if (true === this.debug) {
                // console.log(msg);
            }
        }
    });


    
    /**
     * The exposed jQuery function
     *
     * @param {Object}
     *        Object with configuration options
     */    
    $.fn.nbeatsearchbar = function(options) {
        this.each(function() {
            $(this).data("nbeatsearchbar", new $.nbeatsearchbar(this, options));
        });
        return this;
    };
})(jQuery);
