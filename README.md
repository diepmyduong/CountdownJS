# CountdownJS
Install

		<script src="libs/jquery-3.1.0.min.js"></script>
		<script src="libs/moment.min.js"></script>
		<script src="libs/jquery.countdown.min.js"></script>
		<script src="src/countdown.js"></script>
	
CountDown JS Sample

Bacsic countdown (30 minutes): 00:23:11

		$('#basicClock').startCountDown({
			units: {
				minutes: 30
			}
		})
	
CountDown Custom Clock

Defaut Options

{
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
        }
	
Countdown with custom format: 1 tiếng 13 phút 56 giây

		//Custom format
			$('#customClock1').startCountDown({
				units: {
					hours: 1,
					minutes: 20,
					seconds: 45
				},
				format: "%-H tiếng %-M phút %-S giây"
			})
	
Countdown with custom second, minute: Finish!

		//Custom format 2
			$('#customClock2').startCountDown({
				units: {
					minutes: 1,
					seconds: 5
				},
				secondFormat: '%S giây',
				minuteFormat: '%M phút '
			})
	
Countdown with custom second, minute at special point (> 30s): Finish!

		
			//Custom format 3
			$('#customClock3').startCountDown({
				units: {
					seconds: 40
				},
				secondFormat: '%S giây',
				secondFormatPoint: 30
			})
	
Countdown with custom finish Text (Default: "Finish!"): Game Over!!!

		//Custom format 4
			$('#customClock4').startCountDown({
				units: {
					seconds: 5
				},
				finishText: "Game Over!!!"
			})
	
Countdown with custom html: 106 weeks 2 days 00: 23: 11

		<span id="customClock5">
			<script type="text/template" data-time>
				<span style="color:red">%H</span>:
				<span style="color:green">%M</span>:
				<span style="color:blue">%S</span>
			</script>
			<script type="text/template" data-day>
				<strong>%-d day%!d </strong>
			</script>
			<script type="text/template" data-week="3">
				<span style="font-size:30px">%-w week%!w </span>
			</script>
			<script type="text/template" data-finish-text>
				<h1>Custom Finish Text</h1>
			</script>
		</span>
			$('#customClock5').startCountDown({
				units : {
					years: 2,
					weeks: 2,
					minutes: 30
				}
			});
		
	
Formater

Directive	Blank-padded	Description
%Y	%-Y	Years left *
%m	%-m	Monts left *
%n	%-n	Days left until the next complete month *
%w	%-w	Weeks left
%W	%-W	Weeks left until the next complete month *
%d	%-d	Days left (taking away weeks)
%H	%-H	Hours left
%M	%-M	Minutes left
%S	%-S	Seconds left
%D	%-D	Total count of days till the end
%I	%-I	Total count of hours thill the end
%N	%-N	Total count of minutes till the end
%T	%-T	Total count of seconds till the end
Modifier	Description
-	Blank padding
!	Pluralization plugin
Pluralization

Directive	Description
%!H	Return s when the hour is different than 1
%!S:plural;	Return plural when seconds if different than 1
%!d:singular,plural;	Return singular when day is 1 and plural otherwise
Example

		event.strftime('%-D day%!D %H:%M:%S');
		// => 1 day 23:45:56 (or) 2 days 23:45:56

		// Now in german
		event.strftime('%-D tag%!D:e; %H:%M:%S');
		// => 1 tag 23:45:56 (or) 2 tage 23:45:56
		event.strftime('%S %!S:sekunde,sekunden;');
		// => 01 sekunde (or) 02 sekunden
	
Events handle

Say hello if countdown to 10s and alert when finish:

Start countDown
		$('#customClock6').startCountDown({
			units : {
				seconds: 15
			},
			onUpdated: function(event){
				if(event.offset.totalSeconds <= 10){
					$('#eventStatus').text('Hello')
				}else{
					$('#eventStatus').text('Updating...')
				}
			},
			onFinished: function(event){
				alert("finish countDown");
			}
		});
	
Event Object

{
	    type:           '{String} The namespaced event type {update,finish,stop}.countdown',
	    strftime:       '{Function} The formatter function',
	    finalDate:      '{Date} The parsed final date native object',
	    elapsed:        '{bool} Passed away the final date?',
	    offset: {
	        seconds     : '{int} Seconds left for the next minute',
	        minutes     : '{int} Minutes left for the next hour',
	        hours       : '{int} Hours left until next day',
	        days        : '{int} Days left until next week',
	        daysToWeek  : '{int} Days left until next week',
	        daysToMonth : '{int} Days left until next month',
	        weeks       : '{int} Weeks left until the final date',
	        weeksToMonth: '{int} Weeks left until the next month',
	        months      : '{int} Months left until final date',
	        years       : '{int} Years left until final date',
	        totalDays   : '{int} Total amount of days left until final date',
	        totalHours  : '{int} Total amount of hours left until final date',
	        totalMinutes: '{int} Total amount of minutes left until final date',
	        totalSeconds: '{int} Total amount of seconds left until final date'
	    }
	}
	
	 
	
	
	
	
	
