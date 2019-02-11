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
