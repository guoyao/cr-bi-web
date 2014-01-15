// merge dependencies to single file
define(function (require) {
    "use strict";

    // core
    require("modules/api/core/class");

    // utils
    require("modules/api/utils/navigation_util");
    require("modules/api/utils/date_time_util");
    require("modules/api/utils/collection_util");
    require("modules/api/utils/log_util");

    // components
    require("modules/api/components/charts/column_chart");
    require("modules/api/components/charts/pie_chart");
});