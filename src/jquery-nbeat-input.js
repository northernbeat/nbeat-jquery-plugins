/**
 * NbeatInput 1.0
 *
 * NbeatInput is a jQuery plugin that handles the behavior of our input
 * search field for jus.no. MNamed so just to "fit in" with
 * flexselect, which we're using for the other parts of the search
 * toolbar.
 *
 * Copyright (c) 2016 Nova Consulting Group
 * Authors: Eirik Refsdal and Espen Holmedal.
 *
 */
(function($) {

    $.nbeatinput = function(input, options) {
        this.init(input, options);
    };



    $.extend($.nbeatinput.prototype, {

        /**
         * @property {object} settings
         *           Configuration settings
         * @property {string} settings.cssClass
         *           CSS classname for the element
         */
        settings: {
            cssClass: "nbeatinput",
            formId: null,
            useButton: false,
            fillClass: "filled",
            
            inputIdTransform: function(id)
            {
                return id + "-nbeatinput";
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
         * @property {jquery} input
         *           jQuery selector object for input
         */
        input: null,

        /**
         * @property {object} button
         *           Placeholder for the button
         */
        button: null,

        /**
         * @property {object} icon
         *           Placeholder for the icon
         */
        icon: null,


        
        /**
         * Initialize the component
         *
         * @param {jQuery} input
         *        jQuery selector for DOM element
         * @param {Object} options
         *        Object with configuration options
         */
        init: function(input, options)
        {
            this.settings = $.extend({}, this.settings, options);
            this.input = $(input);
            this.renderControls();

            if (this.settings.useButton) {
                this.adjustButtonPosition();
                this.setPreselectedIcon();
            }
            
            this.handleEvents();
        },


        
        /**
         * Render the main UI controls for the input
         */
        renderControls: function()
        {
            this.icon = $('<span>').attr({
                id: this.settings.inputIdTransform(this.input.attr("id")) + "-icon"
            }).addClass("icon");

            if (this.settings.useButton) {
                this.button = $('<div>').attr({
                    id: this.settings.inputIdTransform(this.input.attr("id")) + "-button",
                    tabindex: 0
                })
                    .addClass("nbeatinput-icon")
                    .attr("role", "button");
                
                this.button.append(this.icon);
                this.input.after(this.button);
            }
        },



        /**
         * Adjust button position
         */
        adjustButtonPosition: function()
        {
            var el = $("~ .input-group-btn", this.input);

            if (el.length > 0) {
                var width = el.width();
                this.button.css("right", width);
            }
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
            this.registerInputEvents();

            if (this.settings.useButton) {
                this.registerButtonEvents();
            }
        },


        
        /**
         * Set clear icon if we already have input
         */
        setPreselectedIcon: function()
        {
            if (this.input.val() != "") {
                this.setClearIcon();
            } 
        },



        /**
         * Register events for the input field
         */
        registerInputEvents: function()
        {
            var self = this;

            this.input.on("keyup input change", function(e) {
                if (self.inputIsEmpty()) {
                    self.removeIcon();
                    self.input.removeClass(self.settings.fillClass);
                } else {
                    self.setClearIcon();
                    console.log("set class");
                    self.input.addClass(self.settings.fillClass);
                    // self.input.addClass("faen");
                    // console.log(self.settings);
                }
            });
        },
        


        /**
         * Register events for the icon button
         */
        registerButtonEvents: function()
        {
            var self = this;
            // console.log("events");

            this.button.mousedown(function(e) {
                if (true === self.debug) {
                    console.log("icon: click");
                }

                e.preventDefault();
                e.stopPropagation();

                if (self.icon.hasClass("icon-close")) {
                    self.reset();
                    self.input.focus();
                }
            });

            this.button.keydown(function(event) {
                switch (event.keyCode) {
                case 13: // return
                    event.preventDefault();
                    event.stopPropagation();
                    self.reset();
                    self.input.focus();
                    break;
                }
            });
        },



        /**
         * Reset the input
         */
        reset: function()
        {
            this.input.val("");
            this.removeIcon();
        },


        /**
         * Give focus to the input
         */
        focus: function()
        {
            this.input.focus();
        },



        /**
         * 
         */
        inputIsEmpty: function()
        {
            if (this.input.val().length < 1) {
                return true;
            } else {
                return false;
            }
        },


        /**
         * Check if icon is set
         */
        hasIcon: function()
        {
            if (this.icon.hasClass("icon-close")) {
                return true;
            } else {
                return false;
            }
        },



        /**
         * Remove the icon
         */
        removeIcon: function()
        {
            this.icon.removeClass("icon-close");
        },



        /**
         * Set clear icon
         */
        setClearIcon: function()
        {
            this.icon.addClass("icon-close");
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
    $.fn.nbeatinput = function(options) {
        this.each(function() {
            if (this.tagName == "INPUT") {
                $(this).data("nbeatinput", new $.nbeatinput(this, options));
            }
        });
        return this;
    };
})(jQuery);
