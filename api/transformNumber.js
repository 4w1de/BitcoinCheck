export const fixedNumber = (number, count) => {
    return Number(number).toFixed(count);
};

export const pointsInNumber = (number, count) => {
    let numberTMP = fixedNumber(number, count);
    let num = numberTMP + '';
    let numArr = num.split('.');
    let [int, dotNum] = numArr;
    let revint = [...int].reverse();
    let len = revint.length;
    let res = [];
    for (let i = 0; i < len; i++) {
        res.push(revint[i]);
        if ((i + 1) % 3 === 0 && i !== len - 1) {
            res.push(',');
        }
    }
    if (dotNum) {
        res.reverse().push('.', ...dotNum);
        return res.join('');
    } else {
        return (res = res.reverse().join(''));
    }
};
