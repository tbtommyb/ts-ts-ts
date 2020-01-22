import { range, interval } from 'rxjs';
import { zip, repeat } from 'rxjs/operators';

range(0, 16).pipe(
    zip(interval(1000), v => v),
    repeat()
).subscribe(x => console.log(x));
