<template>
    <div>
        <cal-header :view="changeView" :targetMonth="changeMonth"/>
        <div id='calendar'></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as moment from 'moment';
import CalHeader from '../calendar/kulfi-calendar-header.vue';

import { Calendar, EventApi, View } from '@fullcalendar/core';
import dayGrid from '@fullcalendar/daygrid';
import timeGrid from '@fullcalendar/timegrid';
import interaction from '@fullcalendar/interaction';
import bootstrapTheme  from '@fullcalendar/bootstrap'

import '@fullcalendar/bootstrap/main.min.css';
import '@fullcalendar/core/main.min.css';
import '@fullcalendar/daygrid/main.min.css';
import '@fullcalendar/timegrid/main.min.css';

import '@fullcalendar/bootstrap/main.min.js';
import '@fullcalendar/core/main.min.js';
import '@fullcalendar/daygrid/main.min.js';
import '@fullcalendar/timegrid/main.min.js';

let calendarType: Calendar;

export default Vue.extend({
    name: 'kulfi-calendar',
    components: {
        CalHeader
    },
    data: function() {
        return {
            calendar: calendarType
        }
    },
    mounted: function(){
        var _calendar = <HTMLDivElement>this.$parent.$el.querySelector('#calendar');
        if(_calendar) {
            this.calendarInit(_calendar)
        }

    },
    methods: {
        calendarInit: function(elm: HTMLDivElement) {
            var _self = this;
            this.calendar = new Calendar(elm, {
                plugins: [bootstrapTheme, dayGrid, timeGrid, interaction],
                themeSystem: 'bootstrap',
                header: false,
                businessHours: {
                    startTime: '10:00',
                    endTime: '23:59'
                },
                dateClick: function(info) {
                    var _nowDate = moment(new Date());
                    var _selectDate = moment(new Date(info.date)); 
                    _self.dateClick(_nowDate, _selectDate, info.allDay, info.view);
                }
            });

            this.calendar.render();
        },
        dateClick: function(now: moment.Moment, selected:  moment.Moment, allDay: boolean, view: View) {
            // alert('now: ' + now + ' sel: ' + selected)

            if(selected.date() >= now.date() ) alert('true')
            else alert('false')
           
        },
        changeView: function(view: string) {
            this.calendar.changeView(view);
            
            if(view.toLowerCase().indexOf('week') >= 0) {
                return this.dateRange();
            }

            return this.calendar.getDate();
        },
        changeMonth: function(target: string) {
            
            if(target.toLowerCase() === 'prev') {
                this.calendar.prev();
            }

            if(target.toLowerCase() === 'next') {
                this.calendar.next();
            }

            return this.calendar.getDate();
        },
        dateRange: function() {
            var _view = this.calendar.view;
            var _start = _view.activeStart;
            var _end = _view.activeEnd;

            var _range = {
                start: _start,
                end: _end
            };

            return _range;
        }
    }

})
</script>

<style lang="scss">

    // i-phone-se
    $iphone-se-port-height: 568px;
    $iphone-se-port-width: 320px;

    /* i-phone se */
    @media screen
    and (device-width: $iphone-se-port-width)
    and (device-height: $iphone-se-port-height)
    and (orientation: portrait) {

       /* Toolbar
        --------------------------------------------------------------------------------------------------*/
        .fc-toolbar {
            display: grid;
            height: auto !important;
        }

        .fc-scroller,
        .fc-day-grid-container,
        .fc-time-grid-container {
            /* */
            overflow: hidden !important;
            height: auto !important; }

        }

</style>

