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
         * @property {jquery} items
         *           Internal list of items
         */
        items: {},

        /**
         * @property {jquery} subId
         *           #id of the currently used menu element
         */
        subId: 0,

        /**
         * @property {jquery} subPosition
         *           Current position of the submenu
         */
        subPosition: 0,

        /**
         * @property {jquery} numitems
         *           Size of this.items
         */
        numitems: 0,

        /**
         * @property {jquery} perline
         *           Calculated number of items per line
         */
        perline: 1,
        
        /**
         * @property {jquery} resizeTimer
         *           Timer for the window.resize handling
         */
        resizeTimer: null,



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
            this.calculateItemsPerLine();
            this.handleEvents();
        },



        buildItemList: function()
        {
            var self = this;
            var i    = 0;
            
            this.grid.children().each(function() {
                var id = $(this)[0]["id"];
                self.items[id] = i;
                ++i;
            });

            this.numitems = i;
        },



        calculateItemsPerLine: function()
        {
            var el         = $(".list-item", this.grid).first();
            var elWidth    = el.width();
            var gridWidth  = this.grid.width();
            var percentage = Math.round((elWidth / gridWidth) * 100);
            
            if (percentage <= 21) {
                this.perline = 5;
            } else if (percentage <= 26) {
                this.perline = 4;
            } else if (percentage <= 34) {
                this.perline = 3;
            } else if (percentage <= 51) {
                this.perline = 2;
            } else {
                this.perline = 1;
            }

            this.log("Calc items per line: " + this.perline);
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

            $(window).resize(function() {
                clearTimeout(self.resizeTimer);
                self.resizeTimer = setTimeout(function() {
                    self.calculateItemsPerLine();
                    self.repositionSubMenu();
                }, 250);
            });

            $(".list-item", self.grid).on("click", function(e) {
                if ($(this).hasClass("is-selected")) {
                    self.resetGrid();
                } else {
                    self.subId = e.currentTarget.id;
                    self.markSelected();
                    self.insertSubMenu();
                }
            });
        },


        
        calculateSubMenuPosition: function()
        {
            var pos        = this.items[this.subId];
            var subPos     = 0;
            var el         = $("#" + this.subId);

            subPos = (Math.floor(pos / this.perline) * this.perline) + (this.perline - 1);

            if (subPos >= this.numitems) {
                subPos = this.numitems - 1;
            }

            return subPos;
        },



        repositionSubMenu: function()
        {
            if ($(".expanded-category", this.grid).length < 1) {
                return;
            }
            
            var newPos = this.calculateSubMenuPosition();
            var el     = $(".expanded-category", this.grid);

            this.log("Submenu position. Current: " + this.subPosition + ". New: " + newPos);
            
            if (newPos != this.subPosition) {
                el.detach();
                $(".list-item", this.grid).eq(newPos).after(el);
                this.subPosition = newPos;
            }

            this.markSelected();
        },

        

        /**
         * 
         */
        resetGrid: function()
        {
            this.removeSubMenu();
            $(".list-item", self.grid).removeClass("is-selected is-selected-neighbour");
        },


        
        /**
         * Mark selected menu item
         */
        markSelected: function()
        {
            var pos      = this.items[this.subId];
            var startPos = Math.floor(pos / this.perline) * this.perline;

            console.log("her");
            $(".is-selected-neighbour", self.grid).removeClass("is-selected-neighbour");
            console.log("der");

            for (var i = startPos; i <= startPos + (this.perline - 1); ++i) {
                $(".list-item", this.grid).eq(i).addClass("is-selected-neighbour");
            }

            // var expPos = (Math.floor(parentPos/4) * 4) + 3;
            $(".list-item", self.grid).removeClass("is-selected");
            $("#" + this.subId).removeClass("is-selected-neighbour");
            $("#" + this.subId).addClass("is-selected");
        },


        /**
         * Insert/show expanded list
         */
        insertSubMenu: function()
        {
            var pos          = this.calculateSubMenuPosition(this.subId);
            var child        = $('<div>').addClass("expanded-category");
            var childContent = $('<ul>');
            var origContent  = $("#" + this.subId + " .list-item-children").html();

            this.removeSubMenu();
            childContent.html(origContent);
            child.append(childContent);
            $(".list-item", this.grid).eq(pos).after(child);
            child.slideDown();
            this.subPosition = pos;
        },


        
        removeSubMenu: function()
        {
            $(".expanded-category", self.grid).slideUp(function() {
                $(this).remove();
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
    $.fn.nbeatgridaccordion = function(options) {
        this.each(function() {
            $(this).data("nbeatgridaccordion", new $.nbeatgridaccordion(this, options));
        });
        return this;
    };
})(jQuery);
