// 引入 moment 时间插件
import moment from "moment";
moment.locale("zh-cn");

export default {
  // 获取今日
  getToday() {
    let today = "";
    today = moment(moment().valueOf()).format("MM/DD");
    return today;
  },

  // 获取今年的所有日期
  getYearDays() {
    let currentYear = moment().year(); // 当前年份
    let yesterday = moment().subtract(1, "days"); // 昨天的日期
    let daysList = [];

    for (let month = 0; month <= yesterday.month(); month++) {
      let daysInMonth = moment().year(currentYear).month(month).daysInMonth(); // 每个月的天数
      let endDay = month === yesterday.month() ? yesterday.date() : daysInMonth; // 如果是昨天所在的月份，则取昨天之前的日期，否则取该月的最后一天

      for (let i = 0; i < endDay; i++) {
        let day = moment()
          .year(currentYear)
          .month(month)
          .date(i + 1)
          .format("MM/DD");
        let val = moment()
          .year(currentYear)
          .month(month)
          .date(i + 1)
          .format("YYYYMMDD");
        daysList.push({ date: day, val: val });
      }
    }

    return daysList;
  },

  // 获取今年到现在的每个月份的日期列表
  getYearToCurrentMonthDays() {
    let monthList = [];
    let currentMonth = moment().month(); // 当前月份
    console.log("currentMonth", currentMonth);
    for (let i = 0; i < currentMonth; i++) {
      let month = moment().month(i).format("YYYY/MM");
      let val = moment().month(i).startOf("month").format("YYYYMMDD");
      monthList.push({ date: month, val: val });
    }
    return monthList;
  },

  // 获取今年到现在的每个周份的日期列表
  getYearToCurrentWeeks() {
    let currentYear = moment().year(); // 当前年份
    let currentDate = moment(); // 当前日期
    let weekList = [];

    // 循环遍历每周
    for (
      let weekStart = moment()
        .year(currentYear)
        .startOf("year")
        .startOf("isoWeek");
      weekStart.isSameOrBefore(currentDate, "day");
      weekStart.add(1, "week").startOf("isoWeek")
    ) {
      let weekEnd = weekStart.clone().endOf("isoWeek");

      if (weekEnd.isBefore(currentDate, "day")) {
        // 排除当前这周
        weekList.push({
          date: `${weekStart.format("MM/DD")} - ${weekEnd.format("MM/DD")}`,
          start: weekStart.format("YYYYMMDD"),
          end: weekEnd.format("YYYYMMDD"),
          val: weekEnd.format("YYYYMMDD"),
        });
      }
    }

    return weekList;
  },

  // 获取任意两个日期中的所有日期
  enumerateDaysBetweenDates(startDate, endDate) {
    let daysList = [];
    const start = moment(startDate);
    const end = moment(endDate);
    const day = end.diff(start, "days");
    daysList.push(start.format("MM-DD"));
    for (let i = 1; i <= day; i++) {
      daysList.push(start.add(1, "days").format("MM-DD"));
    }
    return daysList;
  },
};
