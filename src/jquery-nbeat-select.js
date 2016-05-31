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
            }).addClass("icon icon-arrow-down");

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

                if (self.icon.hasClass("icon-close")) {
                    self.fullReset();
                    self.input.focus();
                    self.markSelected(0);
                    self.pickSelected();
                    self.submit();
                } else if (self.icon.hasClass("icon-arrow-down")) {
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
            this.icon.removeClass("icon-arrow-down icon-close");
        },



        /**
         * Set arrow icon
         */
        setDefaultIcon: function()
        {
            this.icon.removeClass("icon-close").addClass("icon-arrow-down");
        },



        /**
         * Set remove icon
         */
        setClearIcon: function()
        {
            this.icon.removeClass("icon-arrow-down").addClass("icon-close");
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
