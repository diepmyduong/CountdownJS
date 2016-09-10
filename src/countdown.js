(function($){

    $.fn.startCountDown = function(options, format){
        //Load default config and extend custom options
        var configs = $.extend({
            units : {
                years       : 0, // Year count
                quarters    : 0, // Quarters count
                months      : 0, // Months count
                weeks       : 0, // Week count
                days        : 0, // Day Count 
                hours       : 0, // hour Count
                minutes     : 0, // minutes Count
                seconds     : 0, // seconds Count
                milliseconds: 0  // millisecond Count
            },
            format              : null, // time Format 
            secondFormat        : null, 
            secondFormatPoint   : 1, // Apply second format when totalSecond greater than point
            minuteFormat        : null,
            minuteFormatPoint   : 1, // Apply minute format when totalMinutes greater than point
            hourFormat          : null,
            hourFormatPoint     : 1, // Apply hour format when totalHours greater than point
            dayFormat           : null,
            dayFormatPoint      : 1, // Apply day format when totalDays greater than point
            weekFormat          : null,
            weekFormatPoint     : 1, // Apply week format when weeks greater than point
            monthFormat         : null,
            monthFormatPoint    : 1, // Apply month format when months greater than point
            yearFormat          : null,
            yearFormatPoint     : 1, // Apply year format when years greater than point
            finishText          : 'Finish!', // Display when countDown is Finished
            precision           : 1000, //The update rate in milliseconds
            onUpdated           : function(){}, // Updated callback
            onFinished          : function(){} // Finished callback
        }, options);


        var tempMoment = moment();
        $.each(configs.units,function(unit, value){
            if(unit != 0){
                tempMoment.add(value,unit);
            }
        })
        var endmoment = tempMoment.toDate();
        return this.each(function(){
            var element = $(this);
            var formatTemplates = element.find('script[type="text/template"]');
            formatTemplates.each(function(){
                //Get template
                var template = $(this);
                var timeTemplate = template.data('time');
                var secondTemplate = template.data('second');
                var minuteTemplate = template.data('month');
                var hourTemplate = template.data('hour');
                var dayTemplate = template.data('day');
                var weekTemplate = template.data('week');
                var monthTemplate = template.data('month');
                var yearTemplate = template.data('year');
                var finishTextTemplate = template.data('finish-text');

                if(timeTemplate != undefined) {
                    configs.format = template.html();
                }else if (secondTemplate != undefined) {
                    configs.secondFormat = template.html();
                    configs.secondFormatPoint = secondTemplate;
                }else if (minuteTemplate != undefined) {
                    configs.minuteFormat = template.html();
                    configs.minuteFormatPoint = minuteTemplate;
                }else if (hourTemplate != undefined) {
                    configs.hourFormat = template.html();
                    configs.hourFormatPoint = hourTemplate;
                }else if (dayTemplate != undefined) {
                    configs.dayFormat = template.html();
                    configs.dayFormatPoint = dayTemplate;
                }else if (weekTemplate != undefined) {
                    configs.weekFormat = template.html();
                    configs.weekFormatPoint = weekTemplate;
                }else if (monthTemplate != undefined) {
                    configs.monthFormat = template.html();
                    configs.monthFormatPoint = monthTemplate;
                }else if (yearTemplate != undefined) {
                    configs.yearFormat = template.html();
                    configs.yearFormatPoint = yearTemplate;
                }else if (finishTextTemplate != undefined) {
                    configs.finishText = template.html();
                }
            })
            element.countdown(endmoment, {
                precision: configs.precision
            })
            .on('update.countdown', function(event){
                var format = configs.format;
                var formatIsCustom = false;
                //Set time format
                if(format == null){
                    format = '%H:%M:%S';
                }else{
                    formatIsCustom = true;
                }
                //Set second format
                if(configs.secondFormat != null && event.offset.totalSeconds >= configs.secondFormatPoint){
                    format = configs.secondFormat;
                    formatIsCustom = true;
                }
                //Set minute format
                if(configs.minuteFormat != null && event.offset.totalMinutes >= configs.minuteFormatPoint){
                    format = configs.minuteFormat + format;
                    formatIsCustom = true;
                }
                //Set hour format
                if(configs.hourFormat != null && event.offset.totalHours >= configs.hourFormatPoint){
                    format = configs.hourFormat + format;
                    formatIsCustom = true;
                }
                //Set day format
                if(configs.dayFormat != null && event.offset.totalDays >= configs.dayFormatPoint) {
                    format = configs.dayFormat + format;
                    formatIsCustom = true;
                }else if(!formatIsCustom && event.offset.totalDays >= configs.dayFormatPoint) {
                    format = '%-d day%!d ' + format;
                }
                //Set week format
                if(configs.weekFormat != null && event.offset.weeks >= configs.weekFormatPoint) {
                    format = configs.weekFormat + format;
                    formatIsCustom = true;
                }else if(!formatIsCustom && event.offset.weeks >= configs.weekFormatPoint) {
                    format = '%-W week%!W ' + format;
                }
                //Set month format
                if(configs.monthFormat != null && event.offset.months >= configs.monthFormatPoint) {
                    format = configs.monthFormat + format;
                    formatIsCustom = true;
                }else if(!formatIsCustom && event.offset.months >= configs.monthFormatPoint) {
                    format = '%-m month%!m ' + format;
                }
                //Set year format
                if(configs.yearFormat != null && event.offset.years >= configs.yearFormatPoint) {
                    format = configs.yearFormat + format;
                    formatIsCustom = true;
                }else if(!formatIsCustom && event.offset.years >= configs.yearFormatPoint) {
                    format = '%-Y year%!Y ' + format;
                }
                element.html(event.strftime(format));
                configs.onUpdated(event);
            })
            .on('finish.countdown', function(event){
                element.html(configs.finishText);
                configs.onFinished(event);
            });
        })
    }
}(jQuery));