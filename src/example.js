import { IsValidData } from './index'

const requiredCondition1 = ['name', 'eventId', 'address'];  //array일 경우, 값의 유무만 체크

const requiredCondition2 = {    // 함수라면, 등록된 함수로 validation check
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
};

console.log( '결과1 : ', IsValidData(requiredCondition1, ex1) );
// false (adderss is undefined

/* EX2 */
const ex2 = {
    name: 'test2',
    eventId: '222',
    filters: ['profile', 'event'],
};

console.log( '결과2 : ', IsValidData(requiredCondition2, ex2) );
// true