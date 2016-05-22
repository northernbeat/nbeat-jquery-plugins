/**
 * NBeat Grid Accordion 1.0
 *
 * NBeat Grid Accordion is a jQuery plugin that handles the behavior
 * of a expandable/collapsable accordion menu/list laid out using a flexbox
 * grid
 *
 * Copyright (c) 2016 Northern Beat
 * Authors: Eirik Refsdal <eirik@nbeat.no>
 *
 */
(function($) {

    $.nbeatgridaccordion = function(grid, options) {
        this.init(grid, options);
        console.log("grid accordion");
    };



    $.extend($.nbeatgridaccordion.prototype, {

        /**
         * @property {object} settings
         *           Configuration settings
         * @property {string} settings.cssClass
         *           CSS classname for the element
         */
        settings: {
            cssClass: "nbeatgridaccordion",
            // formId: null,
            
            inputIdTransform: function(id)
            {
                return id + "-nbeatgridaccordion";
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
         * @property {jquery} grid
         *           jQuery selector object for the grid
         */
        grid: null,

        /**
         * @property {jquery} list
         *           Internal list of items
         */
        listitems: [],



        /**
         * Initialize the component
         *
         * @param {jQuery} input
         *        jQuery selector for DOM element
         * @param {Object} options
         *        Object with configuration options
         */
        init: function(grid, options)
        {
            this.settings = $.extend({}, this.settings, options);
            this.grid = $(grid);
            this.buildItemList();
            this.handleEvents();
        },



        buildItemList: function()
        {
            var self = this;
            var i    = 0;
            
            self.grid.children().each(function() {
                var id = $(this)[0]["id"];
                // console.log($(this));
                // console.log(self);
                self.listitems[id] = i;
                ++i;
            });

            // console.log(this.listitems);
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

            $(".title", self.grid).on("click", function(e) {
                var parent    = e.currentTarget.parentNode;
                var parentId  = parent.id;
                var parentPos = self.listitems[parentId];
                var expPos    = (Math.floor(parentPos / 4) * 4) + 3;

                self.markSelected(parentId, parentPos);
                self.insertExpanded(parentId, expPos);
            });
        },



        /**
         * Mark selected menu item
         */
        markSelected: function(id, pos)
        {
            var startPos = Math.floor(pos / 4) * 4;
            
            $(".is-selected-neighbour", self.grid).removeClass("is-selected-neighbour");

            for (var i = startPos; i <= startPos + 3; ++i) {
                $(".list-item", this.grid).eq(i).addClass("is-selected-neighbour");
            }

            // var expPos = (Math.floor(parentPos/4) * 4) + 3;
            $(".list-item", self.grid).removeClass("is-selected");
            $("#" + id).removeClass("is-selected-neighbour");
            $("#" + id).addClass("is-selected");
        },


        /**
         * Log debug messages
         */
        insertExpanded: function(id, pos)
        {
            var child        = $('<div>').addClass("expanded-category");
            var childContent = $('<ul>');
            var origContent  = $("#" + id + " .list-item-children").html();

            console.log(origContent);
            
            // 1. Remove if exists
            if ($(".expanded-category", this.grid).length) {
                $(".expanded-category", this.grid).remove();
            }
            
            // 2. TBD. Fetch proper child data
            childContent.html(origContent);
            child.append(childContent);

            $(".list-item", this.grid).eq(pos).after(child);
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
    $.fn.nbeatgridaccordion = function(options) {
        this.each(function() {
            $(this).data("nbeatgridaccordion", new $.nbeatgridaccordion(this, options));
        });
        return this;
    };
})(jQuery);
