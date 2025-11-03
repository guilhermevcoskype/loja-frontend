import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "ellipsify",
    standalone: true
})
export class EllipsifyPipe implements PipeTransform {
  transform(value: string, maximumLengthAllowed?: number): string {
    return value.length > (maximumLengthAllowed || 20)
      ? `${value.substring(0, 19)}...`
      : value;
  }
}
