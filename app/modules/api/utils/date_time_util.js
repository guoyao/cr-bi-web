define(function () {
    // 处理农历日期，属相，天干，地支等
    var lunar = (function () {
        var LUNAR_INFO = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0,
                0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540,
                0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50,
                0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0,
                0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
                0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2,
                0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573,
                0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4,
                0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5,
                0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
                0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46,
                0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58,
                0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50,
                0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0,
                0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
                0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260,
                0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0,
                0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0,
                0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0],

            ZODIAC_ANIMALS = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],

        // 天干
            HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],

        // 地支
            MUNDANE_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],

            CHINESE_MONTHS = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],

            CHINESE_DATES = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"],

            CHINESE_DAYS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

        /**
         * @description 传出公历y年m月d日对应的农历 [year, month, date]
         * @param {Num}/{Date} yearNumberOrDateObject 年份数值或日期对象
         * @param {Num} month 月份，月份从零开始
         * @param {Num} date 日期
         * @return {Array} [year, month, date] 农历年月日数组
         * */
        function toLunar(yearNumberOrDateObject, month, date) {
            var lunarDateInfo = new Array(3),
                i = 0,
                temp = 0,
                leapMonth = 0,
                isBetweenLeapMonth = false,
                baseDate = new Date(0, 0, 31),
                objDate = (yearNumberOrDateObject instanceof Date) ? yearNumberOrDateObject : new Date(yearNumberOrDateObject, month, date),
                offset = parseInt((objDate.getTime() - baseDate.getTime()) / 86400000, 10);

            for (i = 1900; i < 2050 && offset > 0; i++) {
                temp = getLunarYearDays(i);
                offset -= temp;
            }
            if (offset < 0) {
                offset += temp;
                i--;
            }
            lunarDateInfo[0] = i;
            leapMonth = getLeapMonth(i); //闰哪个月
            for (i = 1; i < 13 && offset > 0; i++) {
                //闰月
                if (leapMonth > 0 && i == (leapMonth + 1) && !isBetweenLeapMonth) {
                    --i;
                    isBetweenLeapMonth = true;
                    temp = getLeapDays(parseInt(lunarDateInfo[0], 10));
                } else {
                    temp = getMonthDays(parseInt(lunarDateInfo[0], 10), i);
                }
                //解除闰月
                if (isBetweenLeapMonth && i == (leapMonth + 1)) {
                    isBetweenLeapMonth = false;
                }
                offset -= temp;
            }
            if (offset === 0 && leapMonth > 0 && i == leapMonth + 1) {
                if (isBetweenLeapMonth) {
                    isBetweenLeapMonth = false;
                } else {
                    isBetweenLeapMonth = true;
                    --i;
                }
            }
            if (offset < 0) {
                offset += temp;
                --i;
            }
            lunarDateInfo[1] = i - 1;
            lunarDateInfo[2] = offset + 1;
            return lunarDateInfo;
        }

        /**
         * @description 获取中文农历月份汉字
         * @param {Num} month 月份数值
         * @return {String} 中文农历月份汉字
         * */
        function getChineseMonth(month) {
            return CHINESE_MONTHS[month];
        }

        /**
         * @description 获取中文农历日期汉字
         * @param {Num} date 日期数值
         * @return {String} 中文农历日期汉字
         * */
        function getChineseDate(date) {
            var result = "";
            if (date == 10)
                return "初十";
            if (date == 20)
                return "二十";
            if (date == 30)
                return "三十";

            var two = parseInt((date) / 10, 10);
            if (two === 0)
                result = "初";
            else if (two == 1)
                result = "十";
            else if (two == 2)
                result = "廿";
            else if (two == 3)
                result = "卅";

            result += CHINESE_DATES[parseInt(date % 10, 10)];

            return result;
        }

        /**
         * @description 获取中文农历月份汉字
         * @param {Num} month 月份数值
         * @return {String} 中文农历月份汉字
         * */
        function getChineseDay(day) {
            return CHINESE_DAYS[day];
        }

        /**
         * @description 传入公历，返回农历，返回字符串格式：庚寅[虎]年五月初五
         * @param {Num}/{Date} yearNumberOrDateObject 年份数值或日期对象
         * @return {String} 格式后的农历字符串
         * */
        function format(yearNumberOrDateObject, month, date)
        {
            var result = "";
            var array = toLunar(yearNumberOrDateObject, month, date);
            if(array) {
                result = getHeavenlyStemAndEarthyBranch(array[0]) + "[" + getZodiacAnimalOfYear(array[0]) + "]年" + getChineseMonth(array[1]) + getChineseDate(array[2]);
            }

            return result;
        }

        /**
         * @private
         * @description 传回农历年的总天数
         * @param {Num} year 年份
         * @return {Num} 天数
         * */
        function getLunarYearDays(year) {
            var i,
                sum = 348;
            for (i = 0x8000; i > 0x8; i >>= 1)
            {
                if ((LUNAR_INFO[year - 1900] & i) !== 0)
                    sum += 1;
            }
            return (sum + getLeapDays(year));
        }

        /**
         * @private
         * @description 传回农历年闰月的天数 , 没闰传回 0
         * @param {Num} year 年份
         * @return {Num} 天数
         * */
        function getLeapDays(year) {
            return getLeapMonth(year) === 0 ? 0 : ((LUNAR_INFO[year - 1900] & 0x10000) === 0 ? 29 : 30);
        }

        /**
         * @private
         * @description 传回农历年闰哪个月 1-12 , 没闰传回 0
         * @param {Num} year 年份
         * @return {Num} 闰月
         * */
        function getLeapMonth(year) {
            return parseInt(LUNAR_INFO[year - 1900] & 0xf, 10);
        }

        /**
         * @private
         * @description 传回农历y年m月的总天数
         * @param {Num} year 年份
         * @param {Num} month 月份，月份从0开始
         * @return {Num} 天数
         * */
        function getMonthDays(year, month) {
            return (LUNAR_INFO[year - 1900] & (0x10000 >> month)) === 0 ? 29 : 30;
        }

        /**
         * @private
         * @description 传回农历年的生肖
         * @param {Num} year 年份
         * @return {String} 生肖
         * */
        function getZodiacAnimalOfYear(year) {
            return ZODIAC_ANIMALS[(year - 4) % 12];
        }

        /**
         * @private
         * @description 传入年份 传回干支, 0=甲子
         * @param {Num} year 年份
         * @return {String} 天干地支
         * */
        function getHeavenlyStemAndEarthyBranch(year) {
            var num = year - 1900 + 36;
            return HEAVENLY_STEMS[num % 10] + MUNDANE_BRANCHES[num % 12];
        }

        return {
            toLunar: toLunar,
            getChineseMonth: getChineseMonth,
            getChineseDate: getChineseDate,
            getChineseDay: getChineseDay,
            format: format
        }
    })();

    function toPretty(value) {
        return value >= 10 ? value.toString() : "0" + value;
    }

    return {
        MILLSECONDS_OF_SECOND: 1000,
        MILLSECONDS_OF_MINUTE: 60 * 1000,
        MILLSECONDS_OF_HOUR: 3600 * 1000,
        lunar: lunar,
        toPretty: toPretty
    };
});