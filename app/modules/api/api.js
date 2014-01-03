// merge dependencies to single file
define(function (require) {
    "use strict";

    // utils
    require("modules/api/utils/navigation_util");
    require("modules/api/utils/date_time_util");
    require("modules/api/utils/collection_util");
    require("modules/api/utils/class_util");

    // components
    require("modules/api/components/charts/column_chart");
});