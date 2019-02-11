;(function($, window, document, undefined)
{

    "use strict";

    let pluginName = "nbeatToc";
    let defaults   = {
        targetEl: "#nbeatToc",
        selector: "h1, h2",
        itemClass: "toc__item"
    };



    function nbeatToc(element, options)
    {
        this.element   = $(element);
        this.config    = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name     = pluginName;
        this.debug     = true;
        this.list      = [];

        this.parseDataConfig();
        this.init();
    }



    $.extend(nbeatToc.prototype, {

        init: function()
        {
            this.parseSource();
            this.renderList();

            if (this.debug == true) {
                console.log(this);
            }
        },



        parseDataConfig: function()
        {
            if (this.element.attr("data-toc-selector")) {
                this.config.selector = this.element.attr("data-toc-selector");
            }

            if (this.element.attr("data-toc-itemclass")) {
                this.config.itemClass = this.element.attr("data-toc-itemclass");
            }
        },



        parseSource: function()
        {
            let self = this;

            $(this.config.selector, this.element).each(function() {
                var el, id, title;
                var hel = $(this);

                if ($("a", hel).length > 0) {
                    el = $("a", hel).first();
                } else {
                    el = hel;
                }

                var title = el.text();
                var id;

                if (el.attr("name")) {
                    id = el.attr("name");
                } else if (el.attr("id")) {
                    id = el.attr("id");
                } else {
                    id = self.createId(title);
                    hel.attr("id", id);
                }

                self.list.push({id: id, title: title});
            });
        },



        renderList: function()
        {
            let targetEl = $(this.config.targetEl);
            let self     = this;

            targetEl.empty();

            $.each(this.list, function(i, obj) {
                targetEl.append('<li class="' + self.config.itemClass +
                                '"><a href="#' + obj.id + '">' + obj.title + '</a></li>');
            });
        },



        createId: function(input)
        {
            let cleaned = input;

            cleaned = cleaned.replace(/(\W)+/g, " ");
            cleaned = cleaned.trim();
            cleaned = cleaned.replace(/\W/g, "_");

            return cleaned;
        }

    });



    $.fn[pluginName] = function(options)
    {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new nbeatToc(this, options));
            }
        });
    };

})(jQuery, window, document);
