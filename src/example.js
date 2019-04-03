import { IsValidData } from './index'

const requiredCondition = {
    name: filterName => !!filterName, //unique key
    eventId: val => !!val,
    filters: [
        arr => Array.isArray(arr),
        arr => typeof arr.length === 'number' ,
    ]
};

/* EX1 */
const ex1 = {
    name: 'test1',
    eventId: '111',
    filters: [],
};

console.log( '결과1 : ', IsValidData(requiredCondition, ex1) );
// true

/* EX2 */
const ex2 = {
    name: 'test2',
    eventId: '222',
    filters: undefined,
};

console.log( '결과2 : ', IsValidData(requiredCondition, ex2) );
// false