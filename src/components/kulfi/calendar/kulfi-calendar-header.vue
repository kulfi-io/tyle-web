<template>
    <div class="cal-header">
        <b-row class="date">
            <b-col class="cal-date">
                <button data-view="prev" class="targetmonth previous btn btn-primary">
                    <i class="fas fa-chevron-left" />
                </button>
                <label id="date"></label>
                <button  data-view="next" class="targetmonth next btn btn-primary">
                    <i class="fas fa-chevron-right" />
                </button>
            </b-col>
            <b-col class="cal-view">
                <b-row>
                    <b-col class="btn-container left">
                        <button data-view="dayGridMonth" class="view btn btn-primary">month</button>
                    </b-col >
                    <b-col  class="btn-container center">
                        <button  data-view="timeGridWeek" class="view btn btn-primary">week</button>
                    </b-col>
                    <b-col  class="btn-container right">
                        <button  data-view="timeGridDay" class="view btn btn-primary">day</button>
                    </b-col>
                </b-row>
            </b-col>
           
        </b-row>
        <div class="spacer"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'kulfi-cal-header',
    mounted: function(){
        
        var _date = <HTMLLabelElement>this.$parent.$el.querySelector('#date');
        var _views = this.$parent.$el.querySelectorAll('.view');
        var _targetMonth = this.$parent.$el.querySelectorAll('.targetmonth');

        if(_views) {
            _views.forEach((elm) => {
                elm.addEventListener('click', this.changeView)
            })
        }

         if(_targetMonth) {
            _targetMonth.forEach((elm) => {
                elm.addEventListener('click', this.changeMonth)
            })
        }

        if( _date) {
            this.changeDate(new Date());
        }
    },
    props: ['view', 'targetMonth'],
    methods: {
        changeView: function(e: Event) {
            var _view = e.currentTarget as HTMLButtonElement;

            if(_view) {
                var _val = _view.getAttribute('data-view');
                if(_val) {
                    var _current = this.view(_val);

                    if(_val.toLowerCase().indexOf('week') >= 0) {
                        this.changeRange(_current as string);
                    } else {
                        if(_val.toLowerCase().indexOf('day') >= 0) {
                            this.changeDate(new Date(_current), true);
                        } else {
                            this.changeDate(new Date(_current));
                        }
                    }
                }
            }
        },
        changeMonth: function(e: Event) {
            var _view = e.currentTarget as HTMLButtonElement;
            var _date = <HTMLLabelElement>this.$parent.$el.querySelector('#date');

            if(_view) {
                var _val = _view.getAttribute('data-view');
                if(_val) {
                    var _current = this.targetMonth(_val);
                    this.changeDate(new Date(_current));
                }
            }
        },
        formateDate: function(inDate: Date) {

            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];

            var _month =  inDate.getMonth();
            var _year = inDate.getFullYear();
            var _date = inDate.getDate();

            var _items = {
                year: _year,
                month: monthNames[_month],
                date: _date
            };

            return _items;
        },
        changeDate: function(date: Date, displayDay: boolean = false) {
            var _date = <HTMLLabelElement>this.$parent.$el.querySelector('#date');
            
            var _result = this.formateDate(date);
            if(_date) {
                if(!displayDay) {
                    _date.textContent = _result.month + " " + _result.year;
                } else {
                    _date.textContent = _result.month + "  " + _result.date + " " + _result.year;
                }
                
            }
        },
        changeRange: function(range: string) {
            var _date = <HTMLLabelElement>this.$parent.$el.querySelector('#date');

            var _range = JSON.parse(JSON.stringify(range));
            var _start = this.formateDate(new Date(_range.start));
            var _end = this.formateDate(new Date(_range.end));

            if(_date) {
                _date.textContent = _start.month + " " + _start.date;
                _date.textContent += " - ";
                _date.textContent += _end.month + " " + _end.date;

            }

        }
    }

})
</script>
<style lang="scss">
    .cal-header {

        .spacer {
            min-width: 100%;
            padding: 1%;
        }

        button {
            border-radius: 0%;
            text-transform: uppercase;
            background-color: #0ba360;
            font-size: 14px;
        }
        .cal-date {
            min-width: 50%;

            #date {
                color: #a6a7aa;
                min-width: 75%;
                text-align: center;
                font-size: 20px;
                border-bottom: 1px solid #ddd;
                min-height: 87%;

            }

            .next {
                float: right;
            }
        }
        .cal-view {
            min-width: 50%;

            .btn-container {
                min-width: 33%;

                button {
                    min-width: 100%;
                }
            }
        }
       


        // i-phone-se
        $iphone-se-port-height: 568px;
        $iphone-se-port-width: 320px;
        $iphone-se-land-height: 320px;
        $iphone-se-land-width: 568px;

        /* i-phone se */
        @media screen
        and (device-width: $iphone-se-port-width)
        and (device-height: $iphone-se-port-height)
        and (orientation: portrait) 
        {

            button {
                font-size: small;
            }

            .cal-date {
                min-width: 100%;

                #date {
                    min-width: 70%;
                    border-bottom: 1px solid #ddd;

                }
            }
            .cal-view {
                min-width: 100%;

                .center {
                    padding-right: 0%;
                }
            }
        }

        @media screen
        and (device-width: $iphone-se-land-width)
        and (device-height: $iphone-se-land-height)
        and (orientation: landscape) 
        {

            button {
                font-size: small;
            }

            .cal-date {

                #date {
                    min-width: 67%;
                    border-bottom: 1px solid #ddd;

                }
            }

             .cal-view {
                .center {
                    padding-right: 0%;
                }

                .right {
                    padding-left: 11px;
                }
            }
           
        }
    }
   
</style>




