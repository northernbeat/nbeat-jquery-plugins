/**
 * NBeat Checkbox 1.0
 *
 * NBeat Checkbox is a simple jQuery plugin for handling events based
 * on a checkbox state.
 *
 * Copyright (c) 2016 Northern Beat
 * Authors: Eirik Refsdal <eirik@nbeat.no>
 */
(function($) {

    $.nbeatcheckbox = function(checkbox, options) {
        this.init(checkbox, options);
    };



    $.extend($.nbeatcheckbox.prototype, {

        /**
         * @property {object} settings
         *           Configuration settings
         * @property {string} settings.cssClass
         *           CSS classname for the element
         */
        settings: {
            cssClass: "nbeatcheckbox",
            formId: null,
            
            inputIdTransform: function(id)
            {
                return id + "-nbeatcheckbox";
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
         * @property {jquery} checkbox
         *           jQuery selector object for the checkbox button
         */
        checkbox: null,

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
        init: function(checkbox, options)
        {
            this.settings = $.extend({}, this.settings, options);
            this.checkbox = $(checkbox);

            if (!this.checkbox.attr("id")) {
                console.log("Warning: Checkbox is missing id attribute.");
            }

            if (this.checkbox.data("toggle")) {
                this.toggle = $(this.checkbox.data("toggle"));
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

            self.checkbox.on("change", function(event) {
                console.log(self.checkbox);
                if (self.checkbox.is(":checked")) {
                    console.log("  - checked");
                    self.expandToggleContent();
                } else {
                    console.log("  - not checked");
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
    $.fn.nbeatcheckbox = function(options) {
        this.each(function() {
            $(this).data("nbeatcheckbox", new $.nbeatcheckbox(this, options));
        });
        return this;
    };
})(jQuery);
