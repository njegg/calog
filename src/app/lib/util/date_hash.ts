
export namespace DateHash {
  const dayInMS = (1000 * 60 * 60 * 24);

  export const today = fromDate(new Date());  

  export function fromDate(date: Date): number {
    let year = date.getFullYear() * 10000;
    let month = date.getMonth() * 100;
    let day = date.getDate();

    return year + day + month;
  }

  export function getDate(hash: number): Date {
    let date = new Date(0);
    date.setFullYear(hash / 1_0000 | 0);
    date.setMonth(hash % 1_0000 / 1_00 | 0);
    date.setDate(hash % 1_00);

    return date;
  }

  export function dayDif(low: number, high: number): number {
    return (getDate(high).getTime() - getDate(low).getTime()) 
           / dayInMS | 0;
  }
}

