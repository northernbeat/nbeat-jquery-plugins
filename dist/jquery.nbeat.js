!function(e){e.fn.a11yJumpMenu=function(){var a=this;this.addClass("a11y-jump-menu"),this.attr("tabindex",0),this.$fixture=e(['<div class="a11y-skip-nav">','  <ul class="a11y-toolbar" role="menubar">','    <li role="presentation">','      <a class="menu-item" role="button" id="a11y-jump-to-link" aria-haspopup="true" href="#" aria-controls="a11y-sub-menu" tabindex="0">',"        Gå til innhold &#8964;","      </a>",'      <ol id="a11y-sub-menu" role="menu" class="a11y-hidden" aria-expanded="false">',"      </ol>","    </li>",'    <li class="details" role="presentation">','      <a class="menu-item" id="a11y-feedback" href="mailto:">Gi oss tilbakemelding om tilgjengelighet</a>','      <button id="a11y-menu-close" class="close menu-item" role="button">Lukk meny</button>',"    </li>","  </ul>","</div>"].join("\n")),this.html(this.$fixture);var n=1;return e("h1, h2").each(function(){var a=e(this).attr("id"),t=e(this).text();void 0!==a&&!1!==a||(a="hdr-"+n,++n,e(this).attr("id",a)),e("#a11y-sub-menu").append('<li role="menuitem"><a class="sub-item" tabindex="0" href="#'+a+'">'+t+"</a></li>")}),this.on("focus",function(){e("#a11y-jump-to-link").focus(),a.addClass("visible")}),e("#a11y-menu-close").on("click",function(e){!0!==e.handled&&(a.removeClass("visible"),e.handled=!0)}),e(".a11y-toolbar .menu-item").on("keydown",function(a){var n=e(this).attr("id");!0!==a.handled&&(39==a.keyCode?"a11y-jump-to-link"==n?e("#a11y-feedback").focus():"a11y-feedback"==n&&e("#a11y-menu-close").focus():37==a.keyCode&&("a11y-menu-close"==n?e("#a11y-feedback").focus():"a11y-feedback"==n&&e("#a11y-jump-to-link").focus()))}),e("#a11y-jump-to-link").on("keydown",function(a){!0!==a.handled&&(e("#a11y-sub-menu").hasClass("a11y-hidden")?(a.preventDefault(),a.stopPropagation(),40!=a.keyCode&&9!=a.keyCode||(e("#a11y-sub-menu").attr("aria-expanded",!0),e("#a11y-sub-menu").removeClass("a11y-hidden"),e("#a11y-sub-menu .sub-item").first().focus(),a.handled=!0)):40==a.keyCode&&(a.preventDefault(),a.stopPropagation(),e("#a11y-sub-menu .sub-item").first().focus()))}),e("#a11y-sub-menu .sub-item").each(function(a){e(this).on("keydown",function(a){!0!==a.handled&&(40==a.keyCode?(a.preventDefault(),a.stopPropagation(),e(this).parent().next().children("a").first().focus(),a.handled=!0):38==a.keyCode?(a.preventDefault(),a.stopPropagation(),e(this).parent().prev().children("a").first().focus(),a.handled=!0):39==a.keyCode&&e("#a11y-feedback").focus())})}),e("#a11y-jump-to-link").on("click",function(a){a.preventDefault(),a.stopPropagation(),!0!==a.handled&&(e("#a11y-sub-menu").attr("aria-expanded",!0),e("#a11y-sub-menu").removeClass("a11y-hidden"),a.handled=!0)}),e("#a11y-menu-close").on("focus",function(e){!0!==e.handled&&(a.addClass("visible"),e.handled=!0)}),e(a).on("keydown",function(e){27==e.keyCode&&!0!==e.handled&&(a.removeClass("visible"),e.handled=!0)}),this}}(jQuery);
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

!function(e){e.nbeatcheckbox=function(e,t){this.init(e,t)},e.extend(e.nbeatcheckbox.prototype,{settings:{cssClass:"nbeatcheckbox",formId:null,inputIdTransform:function(e){return e+"-nbeatcheckbox"},inputNameTransform:function(e){}},debug:!1,checkbox:null,toggle:null,toggleIsExpanded:!1,init:function(t,n){this.settings=e.extend({},this.settings,n),this.checkbox=e(t),this.checkbox.attr("id")||console.log("Warning: Checkbox is missing id attribute."),this.checkbox.data("toggle")&&(this.toggle=e(this.checkbox.data("toggle"))),this.handleEvents()},handleEvents:function(){var e=this;e.checkbox.on("change",function(t){console.log(e.checkbox),e.checkbox.is(":checked")?(console.log("  - checked"),e.expandToggleContent()):(console.log("  - not checked"),e.collapseToggleContent())})},expandToggleContent:function(){this.toggle.slideDown(350)},collapseToggleContent:function(){this.toggle.slideUp(350)},log:function(e){!0===this.debug&&console.log(e)}}),e.fn.nbeatcheckbox=function(t){return this.each(function(){e(this).data("nbeatcheckbox",new e.nbeatcheckbox(this,t))}),this}}(jQuery);
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

!function(i){i.nbeatgridaccordion=function(i,e){this.init(i,e)},i.extend(i.nbeatgridaccordion.prototype,{settings:{cssClass:"nbeatgridaccordion",inputIdTransform:function(i){return i+"-nbeatgridaccordion"},inputNameTransform:function(i){}},debug:!1,grid:null,items:{},subId:0,subPosition:0,numitems:0,perline:1,resizeTimer:null,init:function(e,t){this.settings=i.extend({},this.settings,t),this.grid=i(e),this.buildItemList(),this.calculateItemsPerLine(),this.handleEvents()},buildItemList:function(){var e=this,t=0;this.grid.children().each(function(){var s=i(this)[0].id;e.items[s]=t,++t}),this.numitems=t},realWidth:function(e){var t=e.clone();t.css("visibility","hidden"),i("body").append(t);var s=t.outerWidth();return t.remove(),s},calculateItemsPerLine:function(){var e=i(".list-item",this.grid).first(),t=e.width(),s=this.grid.width(),n=Math.round(t/s*100);this.log("Real Calc, el: "+this.realWidth(e)),this.log("Real Calc, elWidth: "+this.realWidth(this.grid)),this.log("Calc, el: "+e),this.log("Calc, elWidth: "+t),this.log("Calc, gridWidth: "+s),this.log("Calc, percentage: "+n),this.perline=n<=21?5:n<=26?4:n<=34?3:n<=51?2:1,this.log("Calc items per line: "+this.perline)},handleEvents:function(){var e=this;i(window).resize(function(){clearTimeout(e.resizeTimer),e.resizeTimer=setTimeout(function(){e.calculateItemsPerLine(),e.repositionSubMenu()},250)}),i(".list-item",e.grid).on("click",function(t){e.calculateItemsPerLine(),i(this).hasClass("is-selected")?e.resetGrid():(e.subId=t.currentTarget.id,e.markSelected(),e.insertSubMenu())})},calculateSubMenuPosition:function(){var e=this.items[this.subId],t=0;i("#"+this.subId);return(t=Math.floor(e/this.perline)*this.perline+(this.perline-1))>=this.numitems&&(t=this.numitems-1),t},repositionSubMenu:function(){if(!(i(".expanded-category",this.grid).length<1)){var e=this.calculateSubMenuPosition(),t=i(".expanded-category",this.grid);this.log("Submenu position. Current: "+this.subPosition+". New: "+e),e!=this.subPosition&&(t.detach(),i(".list-item",this.grid).eq(e).after(t),this.subPosition=e),this.markSelected()}},resetGrid:function(){this.removeSubMenu(),i(".list-item",this.grid).removeClass("is-selected is-selected-neighbour")},markSelected:function(){var e=this.items[this.subId],t=Math.floor(e/this.perline)*this.perline;i(".is-selected-neighbour",this.grid).removeClass("is-selected-neighbour");for(var s=t;s<=t+(this.perline-1);++s)i(".list-item",this.grid).eq(s).addClass("is-selected-neighbour");i(".list-item",this.grid).removeClass("is-selected"),i("#"+this.subId).removeClass("is-selected-neighbour"),i("#"+this.subId).addClass("is-selected")},insertSubMenu:function(){var e=this.calculateSubMenuPosition(this.subId),t=i("<div>").addClass("expanded-category"),s=i("<ul>"),n=i("#"+this.subId+" .list-item-children").html();this.removeSubMenu(),s.html(n),t.append(s),i(".list-item",this.grid).eq(e).after(t),t.slideDown(),this.subPosition=e},removeSubMenu:function(){i(".expanded-category",this.grid).slideUp(function(){i(this).remove()})},log:function(i){!0===this.debug&&console.log(i)}}),i.fn.nbeatgridaccordion=function(e){return this.each(function(){i(this).data("nbeatgridaccordion",new i.nbeatgridaccordion(this,e))}),this}}(jQuery);
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


        realWidth: function(obj)
        {
            var clone = obj.clone();
            clone.css("visibility", "hidden");
            $("body").append(clone);
            var width = clone.outerWidth();
            clone.remove();
            return width;
        },



        calculateItemsPerLine: function()
        {
            var el         = $(".list-item", this.grid).first();
            var elWidth    = el.width();
            var gridWidth  = this.grid.width();
            var percentage = Math.round((elWidth / gridWidth) * 100);

            this.log("Real Calc, el: " + this.realWidth(el));
            this.log("Real Calc, elWidth: " + this.realWidth(this.grid));
            this.log("Calc, el: " + el);
            this.log("Calc, elWidth: " + elWidth);
            this.log("Calc, gridWidth: " + gridWidth);
            this.log("Calc, percentage: " + percentage);
            
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

                // Currently calculate each time, as a workaround for
                // handling grids that are hidden when initiated,
                // which would couse items per line to be 1.
                self.calculateItemsPerLine();

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
            $(".list-item", this.grid).removeClass("is-selected is-selected-neighbour");
        },


        
        /**
         * Mark selected menu item
         */
        markSelected: function()
        {
            var pos      = this.items[this.subId];
            var startPos = Math.floor(pos / this.perline) * this.perline;

            $(".is-selected-neighbour", this.grid).removeClass("is-selected-neighbour");

            for (var i = startPos; i <= startPos + (this.perline - 1); ++i) {
                $(".list-item", this.grid).eq(i).addClass("is-selected-neighbour");
            }

            // var expPos = (Math.floor(parentPos/4) * 4) + 3;
            $(".list-item", this.grid).removeClass("is-selected");

            // FIXME: Must not use ID directly. Fucks up self-contained things.
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
            $(".expanded-category", this.grid).slideUp(function() {
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

!function(t){t.nbeatinput=function(t,n){this.init(t,n)},t.extend(t.nbeatinput.prototype,{settings:{cssClass:"nbeatinput",formId:null,useButton:!1,fillClass:"filled",inputIdTransform:function(t){return t+"-nbeatinput"},inputNameTransform:function(t){}},debug:!1,input:null,button:null,icon:null,init:function(n,i){this.settings=t.extend({},this.settings,i),this.input=t(n),this.renderControls(),this.settings.useButton&&(this.adjustButtonPosition(),this.setPreselectedIcon()),this.handleEvents()},renderControls:function(){this.icon=t("<span>").attr({id:this.settings.inputIdTransform(this.input.attr("id"))+"-icon"}).addClass("icon"),this.settings.useButton&&(this.button=t("<div>").attr({id:this.settings.inputIdTransform(this.input.attr("id"))+"-button",tabindex:0}).addClass("nbeatinput-icon").attr("role","button"),this.button.append(this.icon),this.input.after(this.button))},adjustButtonPosition:function(){var n=t("~ .input-group-btn",this.input);if(n.length>0){var i=n.width();this.button.css("right",i)}},handleEvents:function(){this.registerInputEvents(),this.settings.useButton&&this.registerButtonEvents()},setPreselectedIcon:function(){""!=this.input.val()&&this.setClearIcon()},registerInputEvents:function(){var t=this;this.input.on("keyup input change",function(n){t.inputIsEmpty()?(t.removeIcon(),t.input.removeClass(t.settings.fillClass)):(t.setClearIcon(),t.input.addClass(t.settings.fillClass))})},registerButtonEvents:function(){var t=this;this.button.mousedown(function(n){!0===t.debug&&console.log("icon: click"),n.preventDefault(),n.stopPropagation(),t.icon.hasClass("icon-close")&&(t.reset(),t.input.focus())}),this.button.keydown(function(n){switch(n.keyCode){case 13:n.preventDefault(),n.stopPropagation(),t.reset(),t.input.focus()}})},reset:function(){this.input.val(""),this.removeIcon()},focus:function(){this.input.focus()},inputIsEmpty:function(){return this.input.val().length<1},hasIcon:function(){return!!this.icon.hasClass("icon-close")},removeIcon:function(){this.icon.removeClass("icon-close")},setClearIcon:function(){this.icon.addClass("icon-close")},log:function(t){!0===this.debug&&console.log(t)}}),t.fn.nbeatinput=function(n){return this.each(function(){"INPUT"==this.tagName&&t(this).data("nbeatinput",new t.nbeatinput(this,n))}),this}}(jQuery);
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
                    // console.log("set class");
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

!function(n){n.nbeatmenu=function(n,t){this.init(n,t)},n.extend(n.nbeatmenu.prototype,{settings:{cssClass:"nbeatmenu",formId:null,inputIdTransform:function(n){return n+"-nbeatmenu"},inputNameTransform:function(n){}},debug:!1,container:null,button:null,menu:null,isopen:!1,init:function(t,e){this.settings=n.extend({},this.settings,e),this.container=n(t),this.button=n(".menu-button",this.container),this.menu=n(".menu-data",this.container),this.handleEvents()},handleEvents:function(){var t=this,e=!1;this.button.on("click touchstart",function(n){return e||(e=!0,setTimeout(function(){e=!1},100),t.menu.toggleClass("visible"),t.isopen,t.isopen=!0),!1}),n("a",this.menu).on("click touchstart",function(n){var t=!1;t||(t=!0,setTimeout(function(){t=!1},100)),n.stopPropagation()})},log:function(n){!0===this.debug&&console.log(n)}}),n.fn.nbeatmenu=function(t){return this.each(function(){n(this).data("nbeatmenu",new n.nbeatmenu(this,t))}),this}}(jQuery);
/**
 * NBeat Menu 1.0
 *
 * NBeat Menu is a jQuery plugin that handles the behavior of the main
 * menu usually drawn up by our designers.
 *
 * Copyright (c) 2016 Northern Beat
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
                return id + "-nbeatmenu";
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
         *           Clickable menu button
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
            $("a", this.menu).on("click touchstart", function(event) {
                var fMenu = false;
                
                if (!fMenu) {
                    fMenu = true;
                    setTimeout(function() {
                        fMenu = false;
                    }, 100);
                }

                event.stopPropagation();
            });

            // Close the menu for clicks outside the menu
            // $(document.body).on("click touchstart", function(event) {
                
            //     if (self.isopen) {
            //         var fDocument = false;
                    
            //         if (!fDocument) {
            //             fDocument = true;
            //             setTimeout(function() {
            //                 fDocument = false;
            //             }, 100);
                        
            //             self.menu.removeClass("visible");
            //         }
            //     }
            // });
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

!function(t){t.nbeatradio=function(t,n){this.init(t,n)},t.extend(t.nbeatradio.prototype,{settings:{cssClass:"nbeatradio",formId:null,inputIdTransform:function(t){return t+"-nbeatradio"},inputNameTransform:function(t){}},debug:!1,radio:null,name:null,toggle:null,toggleIsExpanded:!1,init:function(n,i){this.settings=t.extend({},this.settings,i),this.radio=t(n),this.radio.attr("id")||console.log("Warning: Radio button is missing id attribute."),this.radio.attr("name")?this.name=this.radio.attr("name"):console.log("Warning: Radio button is missing name attribute."),this.radio.data("toggle")&&(this.toggle=t(this.radio.data("toggle"))),this.handleEvents()},handleEvents:function(){var n=this;t("input[name="+this.name+"]:radio").on("change",function(i){t("input[name="+n.name+"]:checked").first().attr("id")==n.radio.attr("id")?n.expandToggleContent():n.collapseToggleContent()})},expandToggleContent:function(){this.toggle.slideDown(350)},collapseToggleContent:function(){this.toggle.slideUp(350)},log:function(t){!0===this.debug&&console.log(t)}}),t.fn.nbeatradio=function(n){return this.each(function(){t(this).data("nbeatradio",new t.nbeatradio(this,n))}),this}}(jQuery);
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

!function(n){n.nbeatsearchbar=function(n,t){this.init(n,t)},n.extend(n.nbeatsearchbar.prototype,{settings:{cssClass:"nbeatsearchbar",formId:null,inputIdTransform:function(n){return n+"-nbeatsearchbar"},inputNameTransform:function(n){}},debug:!1,container:null,submit:null,input:null,icon:null,form:null,isopen:!1,init:function(t,i){this.settings=n.extend({},this.settings,i),this.container=n(t),this.submit=n(".menu-search-submit",this.container),this.input=n(".menu-search-input",this.container),this.icon=n(".menu-search-icon",this.container),this.form=n("form",this.container),this.handleEvents()},handleEvents:function(){var n=this,t=!1,i=!1;this.container.on("click touchstart focus",function(i){if(!t&&(t=!0,setTimeout(function(){t=!1},100),!1===n.isopen))return i.stopPropagation(),n.expand(),!1}),this.input.on("focusout",function(t){var e=t.relatedTarget;if(!i){if(i=!0,setTimeout(function(){i=!1},100),e&&e.className&&"menu-search-submit"===e.className)return void this.form.submit();!0===n.isopen&&n.collapse()}})},expand:function(){this.container.addClass("expanded"),this.isopen=!0,this.input.focus(),this.container.removeAttr("tabindex")},collapse:function(){this.container.removeClass("expanded"),this.isopen=!1,this.container.attr("tabindex",0)},log:function(n){this.debug}}),n.fn.nbeatsearchbar=function(t){return this.each(function(){n(this).data("nbeatsearchbar",new n.nbeatsearchbar(this,t))}),this}}(jQuery);
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
                        self.collapse();
                    }              
                }
            });
        },


        expand: function()
        {
            this.container.addClass("expanded");
            this.isopen = true;
            this.input.focus();
            this.container.removeAttr("tabindex");
        },


        collapse: function()
        {
            this.container.removeClass("expanded");
            this.isopen = false;
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

var NbeatSelectSorter={score:function(r,e){var t=r.toLowerCase().split(" "),n=e.length;if(""==(e=e.toLowerCase()))return 1;for(var o=0;o<t.length;++o)if(t[o].substring(0,n)==e)return 1;return 0}};
var NbeatSelectSorter = (function () {
    return {
        score: function (string, query)
        {
            var stringSplit = string.toLowerCase().split(" ");
            var queryLength = query.length;
            var query       = query.toLowerCase();

            if ("" == query) {
                return 1;
            }

            for (var i = 0; i < stringSplit.length; ++i) {
                if (stringSplit[i].substring(0, queryLength) == query) {
                    return 1;
                }
            }

            return 0;
        }
    }
})();

!function(t){t.nbeatselect=function(t,e){this.init(t,e)},t.extend(t.nbeatselect.prototype,{settings:{sortBy:"score",preSelection:!0,selectedClass:"nbeatselect-selected",dropdownClass:"nbeatselect-dropdown",showDisabledOptions:!1,autoSubmit:!1,formId:null,inputIdTransform:function(t){return t+"-nbeatselect"},inputNameTransform:function(t){},dropdownIdTransform:function(t){return t+"-nbeatselect-dropdown"}},debug:!1,select:null,inputContainer:null,input:null,button:null,icon:null,dropdown:null,dropdownList:null,label:null,cache:[],results:[],lastAbbreviation:null,abbreviationBeforeFocus:null,selectedIndex:0,picked:!1,allowMouseMove:!0,dropdownMouseover:!1,indexOptgroupLabels:!1,visible:!1,init:function(e,s){this.settings=t.extend({},this.settings,s),this.select=t(e),this.reloadCache(),this.renderControls(),this.handleEvents(),this.setPreselectedIcon()},reloadCache:function(){var e,s,i,n,o=this.settings.indexOptgroupLabels;this.cache=this.select.find("option").map(function(){return e=t(this).text(),s=t(this).parent("optgroup").attr("label"),i=o?[e,s].join(" "):e,n=t(this).parent("optgroup").attr("disabled")||t(this).attr("disabled"),{text:t.trim(i),name:t.trim(e),value:t(this).val(),disabled:n,score:0}})},renderControls:function(){var e=this.settings.preSelection?this.select.find("option:selected"):null;this.inputContainer=t("<div>").addClass("nbeatselect-container"),this.input=t('<input type="text" autocomplete="off" />').attr({id:this.settings.inputIdTransform(this.select.attr("id")),name:this.settings.inputNameTransform(this.select.attr("name")),accesskey:this.select.attr("accesskey"),tabindex:this.select.attr("tabindex"),style:this.select.attr("style"),placeholder:this.select.attr("data-placeholder")}).addClass(this.select.attr("class")).attr("required",this.select.attr("required")).val(t.trim(e?e.text():"")).css({visibility:"visible"}),this.icon=t("<span>").attr({id:this.settings.inputIdTransform(this.select.attr("id"))+"-icon"}).addClass("icon icon-expand"),this.button=t("<div>").attr({id:this.settings.inputIdTransform(this.select.attr("id"))+"-button",tabindex:0}).addClass("nbeatselect-icon").attr("role","button").attr("tabindex","-1"),this.label=t("<label>").attr({id:this.settings.inputIdTransform(this.select.attr("id"))+"-label",tabindex:0}).text(this.select.attr("data-placeholder")).attr("tabindex","-1"),this.dropdown=t("<div></div>").attr({id:this.settings.dropdownIdTransform(this.select.attr("id"))}).addClass(this.settings.dropdownClass),this.dropdownList=t("<ul></ul>"),this.dropdown.append(this.dropdownList),this.button.append(this.icon),this.inputContainer.append(this.input),this.inputContainer.append(this.button),this.inputContainer.append(this.label),this.select.after(this.inputContainer),this.select.hide(),t("body").append(this.dropdown)},handleEvents:function(){this.registerInputEvents(),this.registerDropdownEvents(),this.registerButtonEvents()},setPreselectedIcon:function(){""!=this.input.val()&&this.setClearIcon()},registerInputEvents:function(){var e=this;this.input.click(function(){!0===e.debug&&console.log("input: click"),e.lastAbbreviation=null,e.focus(),e.renderDropdown()}),this.input.mouseup(function(t){!0===e.debug&&console.log("input: mouseup"),t.preventDefault()}),this.input.focus(function(){!0===e.debug&&console.log("input: focus"),e.abbreviationBeforeFocus=e.input.val(),e.input[0].setSelectionRange(0,e.input.val().length),e.picked||e.filterResults()}),this.input.blur(function(){!0===e.debug&&console.log("input: blur"),e.dropdownMouseover||(e.hide(),e.input.val().length<1&&e.setDefaultIcon())});var s=this.input;this.select.change(function(){!0===e.debug&&console.log("input: change"),s.val(t.trim(t(this).find("option:selected").text()))}),this.input.keyup(function(t){switch(!0===e.debug&&console.log("input: keyup"),t.keyCode){case 13:!0===e.debug&&console.log("input: enter"),t.preventDefault(),!0===e.isVisible()?(e.pickSelected(),e.focusAndHide()):(e.focusAndHide(),e.pickSelected(),e.submit(),e.setClearIcon());break;case 27:!0===e.debug&&console.log("input: escape"),t.preventDefault(),e.reset(),e.focusAndHide();break;case 40:case 38:break;default:e.filterResults()}}),this.input.keydown(function(t){switch(t.keyCode){case 9:e.pickSelected(),e.hide(),e.setClearIcon();break;case 33:t.preventDefault(),e.markFirst();break;case 34:t.preventDefault(),e.markLast();break;case 38:t.preventDefault(),e.moveSelected(-1);break;case 40:t.preventDefault(),e.moveSelected(1);break;case 13:case 27:t.preventDefault(),t.stopPropagation()}})},registerDropdownEvents:function(){var e=this;this.dropdownList.mouseover(function(s){if(!0===e.debug&&console.log("dropdownList: mouseover"),e.allowMouseMove){if("LI"==s.target.tagName){var i=e.dropdown.find("li");e.markSelected(i.index(t(s.target)))}}else e.allowMouseMove=!0}),this.dropdownList.mouseleave(function(){!0===e.debug&&console.log("dropdownList: mouseleave"),e.markSelected(-1)}),this.dropdownList.mouseup(function(t){!0===e.debug&&console.log("dropdownList: mouseup"),e.pickSelected(),e.focusAndHide(),e.setClearIcon(),e.submit()}),this.dropdownList.bind("touchstart",function(s){if(!0===e.debug&&console.log("dropdownList: touchstart"),"LI"==s.target.tagName){var i=e.dropdown.find("li");e.markSelected(i.index(t(s.target)))}}),this.dropdown.mouseover(function(t){!0===e.debug&&console.log("dropdown: mouseover"),e.dropdownMouseover=!0}),this.dropdown.mouseleave(function(t){!0===e.debug&&console.log("dropdown: mouseleave"),e.dropdownMouseover=!1}),this.dropdown.mousedown(function(t){!0===e.debug&&console.log("dropdown: mousedown"),t.preventDefault()})},registerButtonEvents:function(){var t=this;this.button.mousedown(function(e){!0===t.debug&&console.log("icon: click"),e.preventDefault(),e.stopPropagation(),t.icon.hasClass("icon-remove")?(t.fullReset(),t.input.focus(),t.markSelected(0),t.pickSelected(),t.submit()):t.icon.hasClass("icon-expand")&&(t.focus(),t.dropdown.show())}),this.button.keydown(function(e){switch(e.keyCode){case 13:e.preventDefault(),e.stopPropagation(),t.fullReset(),t.input.focus()}})},filterResults:function(){var e=this.settings.showDisabledOptions,s=this.input.val(),i=[],n=this.input.val();s!=this.lastAbbreviation&&(t.each(this.cache,function(){this.disabled&&!e||(this.score=NbeatSelectSorter.score(this.text,s),this.score>0&&i.push(this))}),this.results=i,""==n||"name"==this.settings.sortBy?this.sortResultsByName():this.sortResultsByScore(),this.renderDropdown(),this.markFirst(),this.lastAbbreviation=s,this.picked=!1,this.allowMouseMove=!1,0===n.length?this.removeIcon():n.length>0&&this.setClearIcon())},sortResultsByScore:function(){this.results.sort(function(t,e){return e.score-t.score})},sortResultsByName:function(){this.results.sort(function(t,e){return t.name<e.name?-1:t.name>e.name?1:0})},renderDropdown:function(){var e=this.settings.showDisabledOptions,s=this.dropdown.outerWidth()-this.dropdown.innerWidth(),i=this.inputContainer.offset(),n="",o="";this.dropdown.css({width:this.inputContainer.outerWidth()-s+2+"px",top:i.top+this.inputContainer.outerHeight()+"px",left:i.left+"px",maxHeight:""}),t.each(this.results,function(){this.disabled&&!e||(o=this.disabled?' class="disabled"':"",n+="<li"+o+">"+this.name+"</li>")}),this.dropdownList.html(n),this.adjustMaxHeight(),this.dropdown.show()},adjustMaxHeight:function(){var e=t(window).height()+t(window).scrollTop()-this.dropdown.outerHeight(),s=parseInt(this.dropdown.css("top"),10),i=s>e?Math.max(0,e-s+this.dropdown.innerHeight())+"px":"";this.dropdown.css("max-height",i)},markSelected:function(e){if(!(e<0||e>=this.results.length)){var s=this.dropdown.find("li"),i=t(s[e]),n=i.position().top,o=n+i.outerHeight()-this.dropdown.height();i.hasClass("disabled")?this.selectedIndex=null:(this.selectedIndex=e,s.removeClass(this.settings.selectedClass),i.addClass(this.settings.selectedClass),o>0?(this.allowMouseMove=!1,this.dropdown.scrollTop(this.dropdown.scrollTop()+o)):n<0&&(this.allowMouseMove=!1,this.dropdown.scrollTop(Math.max(0,this.dropdown.scrollTop()+n))))}},pickSelected:function(){var t=this.results[this.selectedIndex];t&&!t.disabled?(this.input.val(t.name),this.setValue(t.value),this.picked=!0,this.input.addClass("filled")):this.reset()},setValue:function(t){this.select.val()!==t&&this.select.val(t).change()},hide:function(){this.dropdown.hide(),this.lastAbbreviation=null,this.visible=!1},moveSelected:function(t){this.markSelected(this.selectedIndex+t)},markFirst:function(){this.markSelected(0)},markLast:function(){this.markSelected(this.results.length-1)},reset:function(){this.input.val(this.abbreviationBeforeFocus)},fullReset:function(){this.input.val(""),this.lastAbbreviation=null,this.picked=!1,this.input.removeClass("filled")},focus:function(){this.input.focus()},focusAndHide:function(){this.focus(),this.hide()},submit:function(){!0===this.settings.autoSubmit&&t("#"+this.settings.formId).submit()},isVisible:function(){return!0===this.visible},removeIcon:function(){this.icon.removeClass("icon-expand icon-remove")},setDefaultIcon:function(){this.icon.removeClass("icon-remove").addClass("icon-expand")},setClearIcon:function(){this.icon.removeClass("icon-expand").addClass("icon-remove")},log:function(t){!0===this.debug&&console.log(t)}}),t.fn.nbeatselect=function(e){return this.each(function(){t(this).data("nbeatselect")?t(this).data("nbeatselect").reloadCache():"SELECT"==this.tagName&&t(this).data("nbeatselect",new t.nbeatselect(this,e))}),this}}(jQuery);
/**
 * flexselect: a jQuery plugin, version: %RELEASE_VERSION% (%RELEASE_DATE%)
 * @requires jQuery v1.3 or later
 *
 * FlexSelect is a jQuery plugin that makes it easy to convert a select box into
 * a Quicksilver-style, autocompleting, flex matching selection tool.
 *
 * For usage and examples, visit:
 * http://rmm5t.github.io/jquery-flexselect/
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2009-2015, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 *
 * Customized version for NCG by Eirik Refsdal and Espen Holmedal.
 *
 */
(function($) {

    $.nbeatselect = function(select, options) {
        this.init(select, options);
    };



    $.extend($.nbeatselect.prototype, {

        /**
         * @property {object} settings
         *           Configuration settings
         * @property {string} settings.sortBy
         *           Sort order when searching, either "score" or "name"
         * @property {boolean} settings.preSelection
         *           Whether to check for an option element with the selected attribute or not
         * @property {string} settings.selectedClass
         *           Classname to add to the selected element
         * @property {string} settings.dropdownClass
         *           Classname to add to the new, fancy dropdown div
         * @property {boolean} settings.showDisabledOptions
         *           Include disabled elements or not?
         * @property {boolean} settings.autoSubmit
         *           
         * @property {string} settings.formId
         *           
         */
        settings: {
            sortBy: "score", 
            preSelection: true,
            selectedClass: "nbeatselect-selected",
            dropdownClass: "nbeatselect-dropdown",
            showDisabledOptions: false,
            autoSubmit: false,
            formId: null,
            // label: false,
            
            inputIdTransform: function(id)
            {
                return id + "-nbeatselect";
            },

            inputNameTransform: function(name)
            {
                return;
            },

            dropdownIdTransform: function(id)
            {
                return id + "-nbeatselect-dropdown";
            }
        },

        /**
         * @property {boolean} debug
         *           Turn on/off internal debugging to console
         */
        debug: false,

        /**
         * @property {jquery} select
         *           jQuery selector object for dropdown
         */
        select: null,

        /**
         * @property {object} inputContainer
         *           Container for the controls
         */
        inputContainer: null,

        /**
         * @property {object} input
         *           The new, dynamically created <input>
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
         * @property {object} dropdown
         *           Container for the dropdown
         */
        dropdown: null,

        /**
         * @property {object} dropdownList
         *           The new dropdown list itself
         */
        dropdownList: null,

        /**
         * @property {object} label
         *           Container for the label
         */
        label: null,

        /**
         * @property {object} cache
         *           Internal data structure
         */
        cache: [],

        /**
         * @property {array} results
         *           Array of dropdown list elements matching the current query
         */
        results: [],

        /**
         * @property {string} lastAbbreviation
         *           Seems to be used just to prevent running
         *           filterResults() when the user has not typed
         *           anything new.
         */
        lastAbbreviation: null,

        /**
         * @property {} ... - 
         */
        abbreviationBeforeFocus: null,

        /**
         * @property {integer} selectedIndex
         *           Currently selected/hovered element in the dropdown list
         */
        selectedIndex: 0,

        /**
         * @property {} ... - 
         */
        picked: false,

        /**
         * @property {} ... - 
         */
        allowMouseMove: true,

        /**
         * @property {} ... - 
         */
        dropdownMouseover: false, // Workaround for poor IE behaviors

        /**
         * @property {} ... - 
         */
        indexOptgroupLabels: false,

        /**
         * @property {boolean} visible
         *           State variable; is the dropdown visible or not?
         */
        visible: false,


        
        /**
         * Initialize the component
         *
         * @param {jQuery} select
         *        jQuery selector for DOM element
         * @param {Object} options
         *        Object with configuration options
         */
        init: function(select, options)
        {
            this.settings = $.extend({}, this.settings, options);
            this.select = $(select);
            this.reloadCache();
            this.renderControls();
            this.handleEvents();
            this.setPreselectedIcon();
        },


        
        /**
         * Reload the cache
         *
         * Loop through all the option elements inside our select, and
         * build an internal data structure of them.
         *
         * @returns {Object} something
         */
        reloadCache: function()
        {
            var name, group, text, disabled;
            var indexGroup = this.settings.indexOptgroupLabels;

            this.cache = this.select.find("option").map(function() {
                name     = $(this).text();
                group    = $(this).parent("optgroup").attr("label");
                text     = indexGroup ? [name, group].join(" ") : name;
                disabled = $(this).parent("optgroup").attr("disabled") || $(this).attr('disabled');

                return {
                    text:     $.trim(text),
                    name:     $.trim(name),
                    value:    $(this).val(),
                    disabled: disabled,
                    score:    0.0
                };
            });
        },



        /**
         * Render the main UI controls for the dropdown
         *
         * Renders the actual dropdown.
         * 1. Create a new container for the input and icon
         * 2. Create a new <input> element, and assign to this.input
         *    - Add any classes from this.select
         *    - Set value of <input> to val() of preselected <option>, or blank
         * 3. Create the icon button
         * 4. Create this.dropdown and this.dropdownList, add list inside dropdown
         * 5. Inject this.input into the DOM right after original <select>
         * 6. Inject this.dropdown at the end of <body>
         */
        renderControls: function()
        {
            var selected = this.settings.preSelection ? this.select.find("option:selected") : null;
            
            this.inputContainer = $('<div>').addClass("nbeatselect-container");

            this.input = $('<input type="text" autocomplete="off" />').attr({
                id: this.settings.inputIdTransform(this.select.attr("id")),
                name: this.settings.inputNameTransform(this.select.attr("name")),
                accesskey: this.select.attr("accesskey"),
                tabindex: this.select.attr("tabindex"),
                style: this.select.attr("style"),
                placeholder: this.select.attr("data-placeholder")
            })
                .addClass(this.select.attr("class"))
                .attr("required", this.select.attr("required"))
                .val($.trim(selected ? selected.text() : ""))
                .css({
                    visibility: "visible"
                });
            
            this.icon = $('<span>').attr({
                id: this.settings.inputIdTransform(this.select.attr("id")) + "-icon"
            }).addClass("icon icon-expand");

            this.button = $('<div>').attr({
                id: this.settings.inputIdTransform(this.select.attr("id")) + "-button",
                tabindex: 0
            })
                .addClass("nbeatselect-icon")
                .attr("role",     "button")
                .attr("tabindex", "-1");

            this.label = $('<label>').attr({
                id: this.settings.inputIdTransform(this.select.attr("id")) + "-label",
                tabindex: 0
            })
                .text(this.select.attr("data-placeholder"))
                .attr("tabindex", "-1");

            
            this.dropdown = $("<div></div>").attr({
                id: this.settings.dropdownIdTransform(this.select.attr("id"))
            }).addClass(this.settings.dropdownClass);
            this.dropdownList = $("<ul></ul>");
            this.dropdown.append(this.dropdownList);
            
            this.button.append(this.icon);
            this.inputContainer.append(this.input);
            this.inputContainer.append(this.button);
            this.inputContainer.append(this.label);

            this.select.after(this.inputContainer);
            this.select.hide();
            $("body").append(this.dropdown);
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
            this.registerDropdownEvents();
            this.registerButtonEvents();
        },


        
        // FIXME
        setPreselectedIcon: function() {
            if (this.input.val() != '') {
                this.setClearIcon();
            } 
        },


        
        /**
         * Register events for the input field
         *
         * Event handlers for the input field for mouse and
         * touch. Keyboard events are not covered here.
         */
        registerInputEvents: function()
        {
            var self = this;

            // The user clicks on the input field
            // 
            // 1. lastAbbreviation is reset, meaning that... we'll
            //    be able to redraw the dropdown list inside filterResults()?
            // 2. Run the focus handler for input? Will then be run twice, not
            //    really sure why?
            this.input.click(function() {
                if (true === self.debug) {
                    console.log("input: click");
                }
                
                self.lastAbbreviation = null;
                self.focus();
                self.renderDropdown();
            });

            // This is so Safari selection actually occurs.
            this.input.mouseup(function(event) {
                if (true === self.debug) {
                    console.log("input: mouseup");
                }
                
                event.preventDefault();
            });

            // The input field gets focus
            //
            // 1. abbreviationBeforeFocus is set to whatever the value
            //    of input was, storing the old value. Not sure when
            //    we'll use it yet.
            // 2. Run the select event handler for input? Not sure why.
            // 3. If we have NOT picked any items, rundt filterResults()
            this.input.focus(function() {
                if (true === self.debug) {
                    console.log("input: focus");
                }
                self.abbreviationBeforeFocus = self.input.val();
                // self.input.select();
                self.input[0].setSelectionRange(0, self.input.val().length);

                if (!self.picked) {
                    self.filterResults();
                }
            });

            // The input field loses focus
            //
            // If the mouse is NOT over the dropdown, hide the dropdown
            // the dropdown
            this.input.blur(function() {
                if (true === self.debug) {
                    console.log("input: blur");
                }
                
                if (!self.dropdownMouseover) {
                    self.hide();

                    if (self.input.val().length < 1) {
                        self.setDefaultIcon();
                    }
                }
            });

            // If the original <select> changes value, update our
            // representation of it (the <input>)
            var input = this.input;
            this.select.change(function () {
                if (true === self.debug) {
                    console.log("input: change");
                }
                
                input.val($.trim($(this).find('option:selected').text()));
            });

            // Keyboard events
            this.input.keyup(function(event) {
                if (true === self.debug) {
                    console.log("input: keyup");
                }
                switch (event.keyCode) {

                // Return/enter
                case 13:
                    if (true === self.debug) {
                        console.log("input: enter");
                    }
                    
                    event.preventDefault();
                    
                    if (self.isVisible() === true) {
                        self.pickSelected();
                        self.focusAndHide();
                        // console.log("enter: focus and hide");
                    } else {
                        // console.log("enter: submit");
                        self.focusAndHide();
                        self.pickSelected();
                        self.submit();
                        self.setClearIcon();
                    }
                    break;

                // Escape
                case 27:
                    if (true === self.debug) {
                        console.log("input: escape");
                    }

                    event.preventDefault();
                    self.reset();
                    self.focusAndHide();
                    break;

                    case 40:
                        //!!! Ved pil opp og ned skal ikke listen filtreres
                    break;
                    case 38:
                        //!!! Ved pil opp og ned skal ikke listen filtreres 
                    break;

                default:
                    self.filterResults();
                    break;
                }
            });
            
            this.input.keydown(function(event) {
                switch (event.keyCode) {
                case 9:  // tab
                    self.pickSelected();
                    self.hide();
                    self.setClearIcon();
                    break;
                case 33: // pgup
                    event.preventDefault();
                    self.markFirst();
                    break;
                case 34: // pgedown
                    event.preventDefault();
                    self.markLast();
                    break;
                case 38: // up
                    event.preventDefault();
                    self.moveSelected(-1);
                    break;
                case 40: // down
                    event.preventDefault();
                    self.moveSelected(1);
                    break;
                case 13: // return
                case 27: // esc
                    event.preventDefault();
                    event.stopPropagation();
                    // console.log("enter 2");
                    break;
                }
            });


        },


        
        /**
         * Register events for the dropdown
         *
         * Event handlers for the dropdown container and list itslef
         * for mouse and touch. Keyboard events are not covered here.
         */
        registerDropdownEvents: function()
        {
            var self = this;

            // The user moves the mouse over the dropdown list
            this.dropdownList.mouseover(function(event) {
                if (true === self.debug) {
                    console.log("dropdownList: mouseover");
                }

                if (!self.allowMouseMove) {
                    self.allowMouseMove = true;
                    return;
                }

                // Why isn't this just done with CSS and :hover?
                if (event.target.tagName == "LI") {
                    var rows = self.dropdown.find("li");
                    self.markSelected(rows.index($(event.target)));
                }
            });

            // The user moves the mouse away from the dropdown list
            this.dropdownList.mouseleave(function() {
                if (true === self.debug) {
                    console.log("dropdownList: mouseleave");
                }

                self.markSelected(-1);  // FIXE: This really does _nothing_
            });

            // In reality: The user clicks on an element
            this.dropdownList.mouseup(function(event) {
                if (true === self.debug) {
                    console.log("dropdownList: mouseup");
                }

                self.pickSelected();
                self.focusAndHide();
                self.setClearIcon();
                self.submit();
            });

            // Touch events for mobile
            this.dropdownList.bind("touchstart", function(event) {
                if (true === self.debug) {
                    console.log("dropdownList: touchstart");
                }

                if (event.target.tagName == "LI") {
                    var rows = self.dropdown.find("li");
                    self.markSelected(rows.index($(event.target)));
                }
            });
            
            // Toggle dropdownMouseover state
            this.dropdown.mouseover(function(event) {
                if (true === self.debug) {
                    console.log("dropdown: mouseover");
                }

                self.dropdownMouseover = true;
            });
            
            // Toggle dropdownMouseover state
            this.dropdown.mouseleave(function(event) {
                if (true === self.debug) {
                    console.log("dropdown: mouseleave");
                }

                self.dropdownMouseover = false;
            });

            // Disable any events for clicks on the dropdown container
            this.dropdown.mousedown(function(event) {
                if (true === self.debug) {
                    console.log("dropdown: mousedown");
                }

                event.preventDefault();
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

                if (self.icon.hasClass("icon-remove")) {
                    self.fullReset();
                    self.input.focus();
                    self.markSelected(0);
                    self.pickSelected();
                    self.submit();
                } else if (self.icon.hasClass("icon-expand")) {
                    self.focus();
                    self.dropdown.show();
                }
            });

            this.button.keydown(function(event) {
                switch (event.keyCode) {
                case 13: // return
                    event.preventDefault();
                    event.stopPropagation();
                    self.fullReset();
                    self.input.focus();
                    break;
                }
            });
        },



        /**
         * Filter results
         *
         * 1. For each entry in this.cache (list of all <option>
         *    elements in the original <select>:
         *    - Run sorting function with:
         *      - this.text:    text value for the given <option> element
         *      - abbreviation: What the user has typed in the <input> field
         *    - If we have a score higher than zero, add to results array
         * 2. Sort this.results
         * 3. Render the dropdown
         */
        filterResults: function()
        {
            var showDisabled = this.settings.showDisabledOptions;
            var abbreviation = this.input.val();
            var results      = [];
            var inputVal     = this.input.val();

            if (abbreviation == this.lastAbbreviation) {
                return;
            }

            $.each(this.cache, function() {
                if (this.disabled && !showDisabled) {
                    return;
                }

                this.score = NbeatSelectSorter.score(this.text, abbreviation);

                if (this.score > 0.0) {
                    results.push(this);
                }
            });
            this.results = results;

            if ("" == inputVal || "name" == this.settings.sortBy) {
                this.sortResultsByName();
            } else {
                this.sortResultsByScore();
            }

            this.renderDropdown();
            this.markFirst();
            this.lastAbbreviation = abbreviation;
            this.picked = false;
            this.allowMouseMove = false;

            if (inputVal.length === 0) {
                this.removeIcon();
            } else if (inputVal.length > 0) {
                this.setClearIcon();
            }
        },


        
        /**
         * Sort internal results array by score
         *
         * Return negative, zero, or positive, depending on which
         * value is the larger.
         */
        sortResultsByScore: function()
        {
            this.results.sort(function(a, b) {
                return b.score - a.score;
            });
        },



        /**
         * Sort internal results array by name
         *
         * Return -1, 0, or 1, depending on which value is the larger
         */
        sortResultsByName: function()
        {
            this.results.sort(function(a, b) {
                return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
            });
        },



        /**
         * Render UI for the dropdown itself
         *
         * 1. Calculate basic position and size for dropdown, and set CSS
         * 2. Loop through this.results array;
         *    - Add <li> element for each
         * 3. Update and display this.dropdownList
         */
        renderDropdown: function()
        {
            var showDisabled        = this.settings.showDisabledOptions;
            var dropdownBorderWidth = this.dropdown.outerWidth() - this.dropdown.innerWidth();
            var inputOffset         = this.inputContainer.offset();
            var html                = "";
            var disabledAttribute   = "";

            this.dropdown.css({
                width:     (this.inputContainer.outerWidth() - dropdownBorderWidth + 2) + "px",
                top:       (inputOffset.top + this.inputContainer.outerHeight()) + "px",
                left:      inputOffset.left + "px",
                maxHeight: ""
            });

            $.each(this.results, function() {
                if (this.disabled && !showDisabled) {
                    return;
                }

                disabledAttribute = this.disabled ? ' class="disabled"' : "";
                html += "<li" + disabledAttribute + ">" + this.name + "</li>";
            });
            
            this.dropdownList.html(html);
            this.adjustMaxHeight();
            this.dropdown.show();

            // eirikref
            // this.visible = true;
            // this.removeIcon();
            // console.log("render");
        },


        
        /**
         * Adjust max height for dropdown
         */
        adjustMaxHeight: function()
        {
            var maxTop = $(window).height() + $(window).scrollTop() - this.dropdown.outerHeight();
            var top    = parseInt(this.dropdown.css("top"), 10);
            var maxVal = top > maxTop
                ? (Math.max(0, maxTop - top + this.dropdown.innerHeight()) + "px")
                : "";
            
            this.dropdown.css("max-height", maxVal);
        },



        /**
         * Mark an element in the dropdown
         *
         * Unset and set CSS class for elements, and adjust
         * scrollbar/view inside the list.
         *
         * FIXME: Could we avoid find("li") for each hover?
         */
        markSelected: function(n)
        {
            if (n < 0 || n >= this.results.length) {
                return;
            }

            var rows  = this.dropdown.find("li");
            var row   = $(rows[n]);
            var top   = row.position().top;
            var delta = top + row.outerHeight() - this.dropdown.height();

            if (row.hasClass("disabled")) {
                this.selectedIndex = null;
                return;
            }

            this.selectedIndex = n;
            rows.removeClass(this.settings.selectedClass);
            row.addClass(this.settings.selectedClass);

            if (delta > 0) {
                this.allowMouseMove = false;
                this.dropdown.scrollTop(this.dropdown.scrollTop() + delta);
            } else if (top < 0) {
                this.allowMouseMove = false;
                this.dropdown.scrollTop(Math.max(0, this.dropdown.scrollTop() + top));
            }
        },



        /**
         * Mark an element in the dropdown
         *
         * Unset and set CSS class for elements, and adjust
         * scrollbar/view inside the list.
         *
         * FIXME: Could we avoid find("li") for each hover?
         */
        pickSelected: function()
        {
            var selected = this.results[this.selectedIndex];
            if (selected && !selected.disabled) {
                this.input.val(selected.name);
                this.setValue(selected.value);
                this.picked = true;
                this.input.addClass("filled");
            } else {
                this.reset();
            }
        },


        
        /**
         * Set select value
         *
         * Update value of the original <select> element
         *
         */
        setValue: function(val)
        {
            if (this.select.val() === val) {
                return;
            }
            this.select.val(val).change();
        },



        /**
         * Hide the dropdown
         */
        hide: function()
        {
            this.dropdown.hide();
            this.lastAbbreviation = null;
            this.visible = false;
        },


        
        /**
         * Move selection to another element in the list.
         */
        moveSelected: function(n)
        {
            this.markSelected(this.selectedIndex + n);
        },



        /**
         * Move selection to the first element in the list
         */
        markFirst: function()
        {
            this.markSelected(0);
        },



        /**
         * Move selection to the last element in the list
         */
        markLast: function()
        {
            this.markSelected(this.results.length - 1);
        },



        /**
         * Reset the input
         * FIXME: Not sure when used
         */
        reset: function()
        {
            this.input.val(this.abbreviationBeforeFocus);
            // this.setDefaultIcon();
        },


        /**
         * Reset the input
         * FIXME: Not sure when used
         */
        fullReset: function()
        {
            this.input.val("");
            this.lastAbbreviation = null;
            this.picked = false;
            this.input.removeClass("filled");
            // this.setDefaultIcon();
        },


        // resetSelect: function()
        // {
        //     this.input.val("");
        //     this
        // },



        /**
         * Give focus to the input
         * FIXME: Not sure when used
         */
        focus: function()
        {
            this.input.focus();
        },



        /**
         * Give focus to the input and then hide.
         * FIXME: Not sure when used.
         */
        focusAndHide: function()
        {
            this.focus();
            this.hide();
        },



        /**
         * Submit the form
         */
        submit: function()
        {
            // console.log("submit");
            if (this.settings.autoSubmit === true) {
                // console.log("submitting...");
                var el = $("#" + this.settings.formId);
                el.submit();
            }
        },



        /**
         * Is the dropdown visible or not?
         */
        isVisible: function()
        {
            // console.log(this.visible);
            if (this.visible === true) {
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
            this.icon.removeClass("icon-expand icon-remove");
        },



        /**
         * Set arrow icon
         */
        setDefaultIcon: function()
        {
            this.icon.removeClass("icon-remove").addClass("icon-expand");
        },



        /**
         * Set remove icon
         */
        setClearIcon: function()
        {
            this.icon.removeClass("icon-expand").addClass("icon-remove");
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
    $.fn.nbeatselect = function(options) {
        this.each(function() {
            if ($(this).data("nbeatselect")) {
                $(this).data("nbeatselect").reloadCache();
            } else if (this.tagName == "SELECT") {
                $(this).data("nbeatselect", new $.nbeatselect(this, options));
            }
        });
        return this;
    };
})(jQuery);

!function(t,n,e,i){"use strict";var r="nbeatSpecialNumber",s={propertyName:"value"};function u(n,e){this.element=t(n),this.settings=t.extend({},s,e),this._defaults=s,this._name=r,this.debug=!0,this.init()}t.extend(u.prototype,{init:function(){this.initEventHandlers(),1==this.debug&&console.log(this)},initEventHandlers:function(){var t=this;this.element.on("change",function(){t.validate()})},validate:function(){var t=!1;switch(this.settings.format){case"no.nin":t=this.validateNoNin();break;case"no.bankAccount":t=this.validateNoBankAccount();break;default:console.log("nbeat.specialNumber: Unknown number format '"+this.settings.format+"'")}console.log(this.element),1==t?this.element.get(0).setCustomValidity(""):this.element.get(0).setCustomValidity("nbeatSpecialNumber: Invalid number value.")},validateNoNin:function(){function t(t){const n=parseInt(t[0]),e=parseInt(t[2]);return 8===n||9===n?"FHNumber":n>=4&&n<=7?"DNumber":4===e||5===e?"HNumber":"birthNumber"}function n(t){const n=t.slice(0,4),e=t.slice(4,6),r=parseInt(e),s=parseInt(t.slice(6,9));let u="20";s>=0&&s<500?u="19":s>=500&&s<750&&r>=54?u="18":s>=900&&s<1e3&&r>=40&&(u="19");const a=moment(n+u+e,"DDMMYYYY",!0);return a.isValid()?a:i}var e=this.element.val();return e.trim(),e=e.replace(/\s/g,""),!(isNaN(e)||11!=e.length||!function(t){function n(t,n){return t.reduce((t,e,i)=>t+e*n[i],0)%11==0}const e=t.split("").map(Number);return n([3,7,6,1,8,9,4,5,2,1],e)&&n([5,4,3,2,7,6,5,4,3,2,1],e)}(e))&&("FHNumber"===t(e)||function(e){const r=function(e){const r=function(e){if(11!==e.length)return i;switch(t(e)){case"birthNumber":return function(t){return n(t)}(e);case"DNumber":return function(t){return n((parseInt(t[0])-4).toString()+t.slice(1,11))}(e);case"HNumber":return function(t){const e=(parseInt(t[2])-4).toString();return n(t.slice(0,2)+e+t.slice(3,11))}(e)}return i}(e);if(null==r)return i;const s=moment().diff(r,"years");return s>=0&&s<125?s:i}(e);return null==r?[]:[r]}(e).length>0)},validateNoBankAccount:function(){function t(t){var n=0;t.split("").reverse().forEach(function(t,e){n+=parseInt(t,10)*(e%6+2)});var e=n%11;return 0===e?"0":1===e?"-":11-e+""}var n,e,i=this.element.val();return i.trim(),i=i.replace(/\D/g,""),!isNaN(i)&&11==i.length&&(e=(n=i).length-1,n.substr(e)===t(n.substr(0,e)))}}),t.fn[r]=function(n){return this.each(function(){t.data(this,"plugin_"+r)||t.data(this,"plugin_"+r,new u(this,n))})}}(jQuery,window,document);
;(function($, window, document, undefined)
{

    "use strict";

    var pluginName = "nbeatSpecialNumber";
    var defaults   = {
        propertyName: "value"
    };



    function nbeatSpecialNumber(element, options)
    {
        this.element = $(element);

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.debug = true;
        this.init();
    }



    $.extend(nbeatSpecialNumber.prototype, {

        init: function()
        {
            this.initEventHandlers();

            if (this.debug == true) {
                console.log(this);
            }
        },



        initEventHandlers: function()
        {
            var self = this;
            
            this.element.on("change", function() {
                self.validate();
            });
        },



        validate: function()
        {
            var isValid = false;

            switch (this.settings.format) {
                case "no.nin": 
                    isValid = this.validateNoNin();
                     break;

                case "no.bankAccount": 
                    isValid = this.validateNoBankAccount();
                     break;

                default:
                    console.log("nbeat.specialNumber: Unknown number format '" + this.settings.format + "'");
            }

            console.log(this.element);
            
            if (isValid == true) {
                this.element.get(0).setCustomValidity("");
            } else {
                this.element.get(0).setCustomValidity("nbeatSpecialNumber: Invalid number value.");
            }
        },



        // Adapted from https://github.com/mikaello/norwegian-national-id-validator
        validateNoNin: function()
        {

            function validateChecksum(fieldVal)
            {

                function calculatePart(factors, valueArr)
                {
                    const productSum = factors.reduce(
                        (acc, value, index) => (acc + (value * valueArr[index])),
                        0,
                    )
                    
                    return (productSum % 11) === 0                
                }
                
                const factorsFirst  = [3, 7, 6, 1, 8, 9, 4, 5, 2, 1]
                const factorsSecond = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2, 1]
                const valueArr      = fieldVal.split("").map(Number)
                
                return calculatePart(factorsFirst, valueArr) &&
                       calculatePart(factorsSecond, valueArr);
            }

            
            
            function getNumberType(fieldVal)
            {
                const firstDigit = parseInt(fieldVal[0]);
                const thirdDigit = parseInt(fieldVal[2])

                if (firstDigit === 8 || firstDigit === 9) {
                    return "FHNumber";
                } else if (firstDigit >= 4 && firstDigit <= 7) {
                    return "DNumber";
                } else if (thirdDigit === 4 || thirdDigit === 5) {
                    return "HNumber";
                } else {
                    return "birthNumber"
                }
            }


            
            function possibleAgesOfPersonWithIdNumber(elevenDigits)
            {
                const possibleAge = possibleAgeOfPersonWithIdNumber(elevenDigits);
                return possibleAge == null ? [] : [possibleAge];
            }


            
            function possibleAgeOfPersonWithIdNumber(elevenDigits)
            {
                const birthDate = possibleBirthDateOfIdNumber(elevenDigits)
                if (birthDate == null) {
                    return undefined
                }

                const years = moment().diff(birthDate, 'years')
                return years >= 0 && years < 125 ? years : undefined;
            }


            
            function idNumberContainsBirthDate(elevenDigits)
            {
                return getNumberType(elevenDigits) !== 'FHNumber'
            }



            function possibleBirthDateOfIdNumber(elevenDigits)
            {
                if (elevenDigits.length !== 11) return undefined
                const type = getNumberType(elevenDigits)
                switch (type) {
                case 'birthNumber': return possibleBirthDateOfBirthNumber(elevenDigits)
                case 'DNumber': return possibleBirthDateOfDNumber(elevenDigits)
                case 'HNumber': return possibleBirthDateOfHNumber(elevenDigits)
                }
                return undefined
            }


            
            function possibleBirthDateOfBirthNumber(elevenDigits)
            {
                return getBirthDate(elevenDigits)
            }


            
            function possibleBirthDateOfHNumber(elevenDigits)
            {
                const correctedThirdDigit = (parseInt(elevenDigits[2]) - 4).toString()
                return getBirthDate(elevenDigits.slice(0, 2) + correctedThirdDigit + elevenDigits.slice(3,11))
            }


            
            function possibleBirthDateOfDNumber(elevenDigits)
            {
                const correctedFirstDigit = (parseInt(elevenDigits[0]) - 4).toString()
                return getBirthDate(correctedFirstDigit + elevenDigits.slice(1, 11))
            }


            
            function getBirthDate(elevenDigitsWithDDMMYY)
            {
                const DDMM = elevenDigitsWithDDMMYY.slice(0,4)
                const YY = elevenDigitsWithDDMMYY.slice(4,6)
                const YY_int = parseInt(YY);
                const ageGroupNumber = parseInt(elevenDigitsWithDDMMYY.slice(6,9))

                let centuryPrefix = '20';
                if (ageGroupNumber >= 0 && ageGroupNumber < 500) {
                    centuryPrefix = '19'
                } else if (ageGroupNumber >= 500 && ageGroupNumber < 750 && YY_int >= 54) {
                    centuryPrefix = '18'
                } else if (ageGroupNumber >= 900 && ageGroupNumber < 1000 && YY_int >= 40) {
                    centuryPrefix = '19'
                }

                const birthDate = moment(DDMM + centuryPrefix + YY, 'DDMMYYYY', true)
                return birthDate.isValid() ? birthDate : undefined;
            }


            
            var fieldVal = this.element.val();
            var numberType;

            fieldVal.trim();
            fieldVal = fieldVal.replace(/\s/g, "");
            
            if (isNaN(fieldVal) || 
                fieldVal.length != 11 || 
                !validateChecksum(fieldVal)) {
                return false;
            }

            numberType = getNumberType(fieldVal);

            if (numberType === "FHNumber") {
                return true;
            } else {
                return possibleAgesOfPersonWithIdNumber(fieldVal).length > 0;
            }
        },
        


        // Adapt from https://github.com/smh/checkdigit
        validateNoBankAccount: function()
        {
            function isValid(input)
            {
                var checkDigitIndex = input.length - 1;
                return input.substr(checkDigitIndex) === create(input.substr(0, checkDigitIndex));
            }
            
            function apply(input)
            {
                return input + create(input);
            }
            
            function create(input)
            {
                var sum = 0;
                input.split('').reverse().forEach(function (value, index) {
                    sum += parseInt(value, 10) * (index % 6 + 2);
                });
                var sumMod11 = sum % 11;
                if (sumMod11 === 0) {
                    return '0';
                } else if (sumMod11 === 1) {
                    return '-';
                } else {
                    return (11 - sumMod11) + '';
                }
            }

            var fieldVal = this.element.val();

            fieldVal.trim();
            fieldVal = fieldVal.replace(/\D/g, "");

            if (isNaN(fieldVal) || 
                fieldVal.length != 11) {
                return false;
            }

            return isValid(fieldVal);
        }
        
    });


    $.fn[pluginName] = function(options)
    {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new nbeatSpecialNumber(this, options));
            }
        });
    };

})(jQuery, window, document);
