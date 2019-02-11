/**
 * NBeat Radio 1.0
 *
 * NBeat Radio is a simple jQuery plugin for handling events based on
 * a radio button state.
 *
 * Copyright (c) 2016 Northern Beat
 * Authors: Eirik Refsdal <eirik@nbeat.no>
 */
(function($) {

    $.nbeatradio = function(radio, options) {
        this.init(radio, options);
    };



    $.extend($.nbeatradio.prototype, {

        /**
         * @property {object} settings
         *           Configuration settings
         * @property {string} settings.cssClass
         *           CSS classname for the element
         */
        settings: {
            cssClass: "nbeatradio",
            formId: null,
            
            inputIdTransform: function(id)
            {
                return id + "-nbeatradio";
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
         * @property {jquery} radio
         *           jQuery selector object for the radio button
         */
        radio: null,

        /**
         * @property {jquery} name
         *           Radio button group name
         */
        name: null,

        /**
         * @property {object} target
         *           The togglable element
         */
        toggle: null,

        /**
         * @property {bool} toggleIsExpanded
         *           Is the togglable element expanded?
         */
        toggleIsExpanded: false,


        
        /**
         * Initialize the component
         *
         * @param {jQuery} input
         *        jQuery selector for DOM element
         * @param {Object} options
         *        Object with configuration options
         */
        init: function(radio, options)
        {
            this.settings = $.extend({}, this.settings, options);
            this.radio = $(radio);

            if (!this.radio.attr("id")) {
                console.log("Warning: Radio button is missing id attribute.");
            }

            if (this.radio.attr("name")) {
                this.name = this.radio.attr("name");
            } else {
                console.log("Warning: Radio button is missing name attribute.");
            }

            if (this.radio.data("toggle")) {
                this.toggle = $(this.radio.data("toggle"));
            }

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
            var self = this;

            $("input[name=" + this.name + "]:radio").on("change", function(event) {
                var el = $("input[name=" + self.name + "]:checked").first();

                if (el.attr("id") == self.radio.attr("id")) {
                    self.expandToggleContent();
                } else {
                    self.collapseToggleContent();
                }
            });
        },

        expandToggleContent: function()
        {
            this.toggle.slideDown(350);
        },

        collapseToggleContent: function()
        {
            this.toggle.slideUp(350);
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
    $.fn.nbeatradio = function(options) {
        this.each(function() {
            $(this).data("nbeatradio", new $.nbeatradio(this, options));
        });
        return this;
    };
})(jQuery);
