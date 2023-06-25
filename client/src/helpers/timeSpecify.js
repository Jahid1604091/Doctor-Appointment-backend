import moment from "moment";

const range = (start, end) => {
    const result = [];
    for (let i = 0; i < start; i++) {
        result.push(i);
    }
    for (let i = end + 1; i < 24; i++) {
        result.push(i);
    }
    
    return result;
};

const disabledDateTime = (timings) => ({
    
    disabledHours: () => range(Number(moment(timings[0]).format('HH')), Number(moment(timings[1]).format('HH'))),
    // disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
});

export default disabledDateTime