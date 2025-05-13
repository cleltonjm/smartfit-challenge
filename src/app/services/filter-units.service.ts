import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';

const OPENING_HOURS = {
  morning: {
    first: '06',
    last: '12'
  },
  afternoon: {
    first: '12',
    last: '18'
  },
  evening: {
    first: '18',
    last: '23'
  }
}

type HOURS_INDEXES = 'morning' | 'afternoon' | 'evening';

@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {

  constructor() { }

  transformWeekDay(weekday: number) {
    switch (weekday) {
      case 0:
        return 'Dom.'
      case 6:
        return 'Sab.'
      default:
        return 'Seg. à Sex.'  
    }
  }

  filterUnits(unit: Location , open_hour: string, close_hour: string) {
    if (!unit.schedules) return true;
    
    let open_hour_filter = parseInt(open_hour, 10)
    let close_hour_filter = parseInt(close_hour, 10)

    let todays_weekday = this.transformWeekDay(new Date().getDay());

    for(let i = 0; i < unit.schedules.length; i++) {
      let schedule_hour = unit.schedules[i].hour
      let schedule_weekday = unit.schedules[i].weekdays

      if (todays_weekday === schedule_weekday) {
        if (schedule_hour !== 'Fechada') {
          let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ')
          let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10)
          let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10)

          if (unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_filter) return true
          else return false
        }
      }
    }

    return false
  }

  filter (results: Location[], showClosed: boolean, hour: string) {
    let intermediateResults = results;
    
    if (!showClosed) {
     intermediateResults = results.filter(location => location.opened === true) 
    }

    if (hour) {
      const OPEN_HOURS = OPENING_HOURS[hour as HOURS_INDEXES].first
      const CLOSE_HOURS = OPENING_HOURS[hour as HOURS_INDEXES].last
      return intermediateResults.filter(location => this.filterUnits(location, OPEN_HOURS, CLOSE_HOURS));
    } else {
      return intermediateResults;
    }
  }
}
