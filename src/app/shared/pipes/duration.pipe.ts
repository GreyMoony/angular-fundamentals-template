import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(duration: number): string {
    if (isNaN(duration) || duration < 0) {
      return '00:00 hour';
    }

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');

    const hourLabel = duration < 120  ? 'hour' : 'hours';

    return `${hoursStr}:${minutesStr} ${hourLabel}`;
  }
}
