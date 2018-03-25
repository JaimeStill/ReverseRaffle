export class EditorValues {
    start: number;
    end: number;
    length: number;
    value: string;
    zeroToStart: string;
    startToEnd: string;
    startToLength: string;
    endToLength: string;

    constructor(start: number, end: number, length: number, value: string) {
        this.start = start;
        this.end = end;
        this.length = length;
        this.value = value;
        this.zeroToStart = value.substring(0, start);
        this.startToEnd = value.substring(start, end);
        this.startToLength = value.substring(start, length);
        this.endToLength = value.substring(end, length);
    }
}
